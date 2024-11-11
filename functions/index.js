const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const app = express();

admin.initializeApp();
const db = admin.firestore();
const storage = admin.storage().bucket();

const uploadLoadPic = async (userId, image) => {
  try {
    const buffer = Buffer.from(image, "base64");
    const filePath = `profilePics/${userId}.jpg`;

    const fileRef = storage.file(filePath);
    await fileRef.save(buffer, {contentType: "image/jpeg"});

    const [url] = await fileRef.getSignedUrl({
      action: "read",
      expires: "03-01-2500",
    });

    await db.collection("accounts").doc(userId).update({profilePic: url});
    return url;
  } catch (error) {
    return {error: true, message: error.message};
  }
};

app.put("/accounts/:id", async (req, res) => {
  const userId = req.params.id;
  const {username, email} = req.body;

  try {
    await db.collection("accounts")
        .doc(userId)
        .set({username, email, profilePic: null});
    res.json({message: "Account document created successfully"});
  } catch (error) {
    res.status(500).json({error: "Failed to create account document"});
  }
});

app.get("/accounts/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const doc = await db.collection("accounts")
        .doc(userId)
        .get();

    if (!doc.exists) {
      return res.status(404).json({error: "Invalid account ID"});
    }
    res.json(doc.data());
  } catch (error) {
    return res.status(500).json({error: "Failed to fetch account details"});
  }
});

app.patch("/accounts/:id", async (req, res) => {
  const userId = req.params.id;
  const detailItem = req.body;

  try {
    if (detailItem.image) {
      const url = await uploadLoadPic(userId, detailItem.image);
      await db.collection("accounts").doc(userId).update({profilePic: url});
    } else {
      await db.collection("accounts")
          .doc(userId)
          .update(detailItem);
    }
    res.json({message: "Account details updated successfully"});
  } catch (error) {
    res.status(500).json({error: "Failed to update account details"});
  }
});

app.delete("/accounts/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    await db.collection("accounts")
        .doc(userId)
        .delete();
    res.json({message: "Account deleted successfully"});
  } catch (error) {
    res.status(500).json({error: "Failed to delete account document"});
  }
});

exports.api = functions.https.onRequest(app);

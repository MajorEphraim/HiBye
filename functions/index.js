const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const app = express();

admin.initializeApp();
const db = admin.firestore();

app.put("/accounts/:id", async (req, res) => {
  const userId = req.params.id;
  const {username, email} = req.body;

  try {
    await db.collection("accounts")
        .doc(userId)
        .set({username, email, profilePic: null});
    res.json({
      message: "Account document created successfully"});
  } catch (error) {
    res.status(500).json({
      error: "Failed to create account document",
    });
  }
});

app.get("/accounts/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const doc = await db.collection("accounts")
        .doc(userId)
        .get();

    if (!doc.exists) {
      return res.status(404)
          .json({error: "Invalid account ID"});
    }
    res.json(doc.data());
  } catch (error) {
    return res.status(500).json({
      error: "Failed to fetch account details",
    });
  }
});

app.patch("/accounts/:id", async (req, res) => {
  const userId = req.params.id;
  const detailItem = req.body;

  try {
    await db.collection("accounts")
        .doc(userId).update(detailItem);

    res.json({
      message: "Account details updated successfully"});
  } catch (error) {
    console.error("Error updating account:", error);
    res.status(500).json(
        {error: "Failed to update account details",
          message: error.message});
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
    res.status(500).json({
      error: "Failed to delete account document"});
  }
});

exports.api = functions.https.onRequest(app);

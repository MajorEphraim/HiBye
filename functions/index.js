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


app.post("/friend-requests/:id", async (req, res) => {
  const userId = req.params.id;
  const {personId} = req.body;

  // Format current date as YYYY/MM/DD
  const currentDate = new Date();
  const dateSent = `${currentDate.
      getFullYear()}/${(currentDate.
      getMonth()+1)}/${currentDate
      .getDate()}`;

  try {
    await db.collection("friend requests").add({
      senderId: userId,
      receiverId: personId,
      timeSent: Date.now(),
      status: "requested",
      dateSent,
    });

    res.status(200).json({
      message: "Friend request sent successfully",
    });
  } catch (error) {
    console.error("Error processing friend request:", error);
    res.status(500).json({
      error: "Failed to process a friend request",
    });
  }
});

app.patch("/friend-requests/:id", async (req, res) => {
  const requestId = req.params.id;
  const {status} = req.body;

  try {
    await db.collection("friend requests")
        .doc(requestId).update({status});

    res.json({
      message: "Friend request processed successfully"});
  } catch (error) {
    res.status(500).json(
        {error: "Failed to process friend request updates",
          message: error.message});
  }
});


exports.api = functions.https.onRequest(app);

exports.fetchAccounts = functions.https
    .onRequest(async (req, res) => {
      try {
        const limit = 15; // Number of accounts to fetch per request
        const offset = parseInt(req.query.offset) ||
     0;
        const accountsRef = db.collection("accounts")
            .offset(offset)
            .limit(limit);

        const snapshot = await accountsRef.get();

        // Extract account data from Firestore snapshot
        const accounts = snapshot
            .docs
            .map((doc) => ({...{id: doc.id, status: "request"},
              ...doc.data()}));

        // Send accounts and next offset back in response
        res.status(200).json({
          accounts,
          nextOffset: offset + limit,
        });
      } catch (error) {
        console.error("Error fetching accounts:", error);
        res.status(500)
            .json({error: "Failed to fetch accounts"});
      }
    });


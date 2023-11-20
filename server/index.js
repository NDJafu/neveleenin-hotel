const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;

const {MongoClient} = require('mongodb');

const url = 'mongodb+srv://OOPGroup:<insert pass here>@oopdcluster.acgetdd.mongodb.net/?retryWrites=true&w=majority' ;
const client = new MongoClient(url);
async function run() {
  try {
    await client.connect();
    const db = client.db('Hotel_Management');
    const collection = db.collection('user_info');

    // Find the first document in the collection
    const first = await collection.findOne();
    console.log(first);
  } finally {
    // Close the database connection when finished or an error occurs
    await client.close();
  }
}
run().catch(console.error);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

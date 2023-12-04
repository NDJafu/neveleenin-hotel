const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const app = express();
const port = 3000;
const {MongoClient} = require('mongodb');

const userRouter = require("./router/userRouter")
const hotelRouter = require("./router/hotelRouter")
const roomRouter = require("./router/roomRouter")
const policyRouter = require("./router/policyRouter")
const reviewRouter = require("./router/reviewRouter")

app.use(express.json())
app.use(cors())

const url = 'mongodb+srv://PussyMan:WhatAreYouLookinAtPussy@testingcluster.w43hpcb.mongodb.net/?retryWrites=true&w=majority' ;
mongoose.connect(url);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('What are you looking at pussy!');
});

app.use("/User", userRouter)
app.use("/hotel", hotelRouter)
app.use("/room", roomRouter)
app.use("/policy", policyRouter)
app.use("/review", reviewRouter)

app.get("/", (req, res) => {
  res.send("What r u lookin at? Pussy!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

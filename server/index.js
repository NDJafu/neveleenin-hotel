require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());

const authRouter = require("./router/authRouter");
const userRouter = require("./router/userRouter");
const hotelRouter = require("./router/hotelRouter");
const roomRouter = require("./router/roomRouter");
const policyRouter = require("./router/policyRouter");
const reviewRouter = require("./router/reviewRouter");
const hotelServiceRouter = require("./router/hotelServiceRouter");
const invoiceRouter = require("./router/invoiceRouter");
const roomAmenitiesRouter = require("./router/RoomAmenityRouter");
const legalDocumentRouter = require("./router/legalDocumentRouter");
const authenticateUser = require("./middlewares/authentication");

const url =
  "mongodb+srv://PussyMan:WhatAreYouLookinAtPussy@testingcluster.w43hpcb.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(url);

mongoose.connection.once("open", () => {
  console.log("Connected to database successfully!");
});

app.use("/auth", authRouter);
app.use("/user", authenticateUser, userRouter);
app.use("/hotel", hotelRouter);
app.use("/room", roomRouter);
app.use("/policy", authenticateUser, policyRouter);
app.use("/review", authenticateUser, reviewRouter);
app.use("/service", authenticateUser, hotelServiceRouter);
app.use("/invoice", invoiceRouter);
app.use("/amenities", authenticateUser, roomAmenitiesRouter);
app.use("/documents", authenticateUser, legalDocumentRouter);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

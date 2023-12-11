require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
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

const PORT = process.env.PORT;
const url = process.env.MONGO_URI;

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

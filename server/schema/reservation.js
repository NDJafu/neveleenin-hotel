const mongoose = require("mongoose");

const reservationSchema = mongoose.Schema(
  {
    roomID: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "Room",
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    guestName: {
      type: String,
      required: false,
    },
    userID: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["PLACED", "WAIT_FOR_PAYMENT"],
      default: "WAIT_FOR_PAYMENT",
    },
    checkInTime: {
      type: Date,
      required: true,
    },
    checkOutTime: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Reservation = mongoose.model("Reservation", reservationSchema);
module.exports = Reservation;

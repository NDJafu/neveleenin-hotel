const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
  hotelName: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  legalDocuments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LegalDocument",
    },
  ],
  services: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
    },
  ],
  policies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Policy",
    },
  ],
  hotelAddress: {
    type: String,
    required: true,
  },
  membershipStatus: {
    type: String,
    enum: ["Available", "Not_Available"],
    default: "Available",
    required: true,
  },
  hotelDescription: {
    type: String,
    required: true,
  },
  pricing: {
    type: Number,
    required: false,
  },
  images: {
    type: [String],
  },
});

const Hotel = mongoose.model("Hotel", hotelSchema);

module.exports = Hotel;

const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  hotelID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel",
    required: true,
  },
  roomNumber: {
    type: Number,
    required: true,
  },
  roomSize: {
    type: Number,
    required: true,
  },
  images: {
    type: [String],
  },
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;

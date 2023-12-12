const mongoose = require("mongoose");

const roomAmenitySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

const RoomAmenity = mongoose.model("RoomAmenity", roomAmenitySchema);
module.exports = RoomAmenity;

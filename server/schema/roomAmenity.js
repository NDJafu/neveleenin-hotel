const mongoose = require("mongoose");

const roomAmenitySchema = mongoose.Schema({
  name: {
    type: String,
    enum: ["1 BED", "2 BEDS"],
    default: "1 BED",
    required: true,
  },
  description: {
    type: String,
  },
});

const RoomAmenity = mongoose.model("RoomAmenity", roomAmenitySchema);
module.exports = RoomAmenity;

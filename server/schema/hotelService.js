const mongoose = require("mongoose");

const hotelServiceSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

const HotelService = mongoose.model("HotelService", hotelServiceSchema);
module.exports = HotelService;

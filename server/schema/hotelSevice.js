const mongoose = require('mongoose');

const hotelService = mongoose.Schema({
    HotelID: {
        type: mongoose.Schema.ObjectId,
        ref: "Hotel",
        require: true
    },
    name: {
        type: String,
        enum: ["", ""],
        require: true
    },
    description: {
        type: String,
    }
})

const HotelService = mongoose.model("RoomAmenity", hotelService)
module.exports = HotelService
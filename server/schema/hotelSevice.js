const mongoose = require('mongoose');

const hotelServiceSchema = mongoose.Schema({
    HotelID: {
        type: mongoose.Schema.ObjectId,
        ref: "Hotel",
        required: true
    },
    name: {
        type: String,
        enum: ["", ""], 
        required: true
    },
    description: {
        type: String,
    }
});

const HotelService = mongoose.model("HotelService", hotelServiceSchema);
module.exports = HotelService;

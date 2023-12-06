const mongoose = require('mongoose');

const roomAmenity = mongoose.Schema({
    RoomID: {
        type: mongoose.Schema.ObjectId,
        ref: "Room",
        require: true
    },
    name: {
        type: String,
        enum: ["1 BED", "2 BEDS"],
        default: "1 BED",
        require: true
    },
    description: {
        type: String,
    }
})

const RoomAmenity = mongoose.model("RoomAmenity", roomAmenity)
module.exports = RoomAmenity
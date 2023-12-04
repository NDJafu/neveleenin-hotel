const mongoose = require("mongoose")

const reverstration = mongoose.Schema({
    roomID: {
        type: mongoose.Schema.ObjectId,
        require: true,
        ref: "Room"
    },
    userID: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        require: true
    },
    reverstrationStatus: {
        type: String,
        enum: ['PLACED', 'WAIT_FOR_PAYMENT'],
        default: 'WAIT_FOR_PAYMENT'
    },
    bookingDate: {
        type: Date,
        require: true
    },
    checkInTime: {
        type: Date,
        require: true
    },
    checkOutTime: {
        type: Date,
        require: true
    } 
})

const Reverstration = mongoose.model('Reverstration', reverstration)
module.exports = Reverstration
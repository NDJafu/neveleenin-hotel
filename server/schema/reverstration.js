const mongoose = require("mongoose");

const reverstrationSchema = mongoose.Schema({
    roomID: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "Room"
    },
    userID: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    reverstrationStatus: {
        type: String,
        enum: ['PLACED', 'WAIT_FOR_PAYMENT'],
        default: 'WAIT_FOR_PAYMENT'
    },
    bookingDate: {
        type: Date,
        required: true
    },
    checkInTime: {
        type: Date,
        required: true
    },
    checkOutTime: {
        type: Date,
        required: true
    } 
});

const Reverstration = mongoose.model('Reverstration', reverstrationSchema);
module.exports = Reverstration;

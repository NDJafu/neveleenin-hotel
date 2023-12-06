const mongoose = require("mongoose");

const reservationSchema = mongoose.Schema({
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
    status: {
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

const Reservation = mongoose.model('Reservation', reservationSchema);
module.exports = Reservation;

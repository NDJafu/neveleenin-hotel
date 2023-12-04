const mongoose = require("mongoose")

const review = mongoose.Schema({
    HotelID: {
        type: mongoose.Schema.ObjectId,
        require: true,
        ref: "Hotel"
    },
    userID: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        require: true
    },
    commentText: {
        type: String,
        require: false
    },
    rating: {
        type: String,
        require: true
    },
    reviewDate: {
        type: Date,
        requrie: true
    }
})

const Review = mongoose.model("Review", review)
module.exports = Review
const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
    HotelID: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "Hotel"
    },
    userID: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    commentText: {
        type: String,
        required: false
    },
    rating: {
        type: Number, 
        required: true
    },
    reviewDate: {
        type: Date,
        required: true
    }
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;

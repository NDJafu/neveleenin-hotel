const router = require("express").Router();
const mongoose = require("mongoose");
const Review = require("../schema/review");

// Get all reviews
router.get("/getall", async (req, res) => {
  try {
    const reviews = await Review.find().populate("hotelID").populate("userID");
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new review
router.post("/create", async (req, res) => {
  const { hotelID, userID, commentText, rating, reviewDate } = req.body;

  const newReview = new Review({
    hotelID,
    userID,
    commentText,
    rating,
    reviewDate,
  });

  try {
    await newReview.save();
    res.status(201).json({ message: "Review created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a review
router.put("/:reviewID", async (req, res) => {
  const reviewID = req.params.reviewID;
  const { commentText, rating } = req.body;

  try {
    const review = await Review.findOne(reviewID);

    if (!review) {
      res.status(404).json({ message: "Review not found" });
      return;
    }

    review.commentText = commentText || review.commentText;
    review.rating = rating || review.rating;

    await review.save();

    res.status(200).json({ message: "Review updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a review
router.delete("/:reviewID", async (req, res) => {
  const reviewID = req.params.reviewID;

  try {
    const review = await Review.findOneAndDelete(reviewID);

    if (!review) {
      res.status(404).json({ message: "Review not found" });
      return;
    }

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

const router = require("express").Router();
const mongoose = require("mongoose");
let User = require("../schema/user");

router.post("/register", async (req, res) => {
  const { userName, password } = req.body;

  const newUser = new User({ userName, password });

  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

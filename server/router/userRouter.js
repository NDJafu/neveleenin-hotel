const router = require("express").Router();
const mongoose = require("mongoose");
let User = require("../schema/user");

router.get("/getall", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a user
router.put("/:username", async (req, res) => {
  const username = req.params.username;
  const { username: newUsername, password: newPassword } = req.body;

  try {
    const user = await User.findOne(username);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    user.username = newUsername || user.username;
    user.password = newPassword || user.password;

    await user.save();

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a user
router.delete("/:username", async (req, res) => {
  const username = req.params.username;

  try {
    const user = await User.findOneAndDelete(username);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

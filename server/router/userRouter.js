const router = require("express").Router();
let User = require("../schema/user");
const { checkPermissonToChangeInfo } = require("../utils/checkPermission");

router.get("/getall", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a user
router.put("/:userID", async (req, res) => {
  const { userID } = req.params;

  const { newUsername, newPassword } = req.body;

  checkPermissonToChangeInfo(req.user, userID);

  try {
    const user = await User.findById(userID);

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
router.delete("/:userID", async (req, res) => {
  const userID = req.params.userID;

  try {
    const user = await User.findByIdAndDelete(userID);

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

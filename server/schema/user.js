const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide email."],
    unique: [true, "This email is already used."],
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: {
      values: ["admin", "user", "owner"],
      message: "{VALUE} is not supported",
    },
    default: "user",
  },
  avatar: {
    type: String,
    default: "https://telegra.ph/file/dc3eb96bbf0f9ad746d15.png",
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;

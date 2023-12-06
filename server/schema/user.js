const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: [true, "Username already exists!"],
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

userSchema.methods.comparePassword = async function (clientPass) {
  const isMatch = await bcrypt.compare(clientPass, this.password);
  return isMatch;
};

const User = mongoose.model("User", userSchema);

module.exports = User;

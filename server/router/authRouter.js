const router = require("express").Router();
const jwt = require("jsonwebtoken");
let User = require("../schema/user");

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(500)
      .json({ error: "You need to field all the information" });
  }

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(500).json({ error: "User is not exist" });
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      return res.status(500).json({ error: "Password is invalid" });
    }

    const foundUser = {
      id: user._id,
      username: user.username,
      role: user.role,
      avatar: user.avatar,
    };

    const accessToken = jwt.sign(foundUser, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "5m",
    });

    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    res.cookie("token", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Login successfully!", accessToken });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(500)
      .json({ error: "You need to field all the information" });
  }

  const isFirstAccount = (await User.countDocuments({})) === 0;

  const user = await User.create({
    username,
    password,
    role: isFirstAccount ? "admin" : "user",
  });

  try {
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/refresh", async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.token) return res.sendStatus(401);

  const refreshToken = cookies.token;

  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET,
    async (err, decoded) => {
      if (err) return res.sendStatus(403);

      const user = await User.findById(decoded.id);

      if (!user) return res.sendStatus(401);

      const accessToken = jwt.sign(
        {
          id: user._id,
          username: user.username,
          role: user.role,
          avatar: user.avatar,
        },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: "5m" }
      );
      res.status(200).json({ accessToken });
    }
  );
});

router.post("/logout", async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.token) return res.sendStatus(204);

  res.clearCookie("token", { httpOnly: true });
  res.status(200).json({ message: "logout success!" });
});

module.exports = router;

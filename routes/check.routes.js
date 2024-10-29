const express = require("express");
const router = express.Router({ mergeParams: true });
// const auth = require("../middleware/auth.middleware");

router.post("/", async (req, res) => {
  try {
    const { userId } = req.body;
    console.log("req", req.body);
    const exitingUser = await User.findOne({ _id: userId });
    if (exitingUser) {
      return res.status(400).json({
        error: {
          message: "EMAIL_EXISTS",
          code: 400,
        },
      });
    }

    const hashedPassword = await bcrypt.hash(mobile, 12);
    const newUser = await User.create({
      ...generateUserData(),
      ...req.body,
      password: hashedPassword,
    });
    const tokens = TokenService.generate({ _id: newUser._id });
    await TokenService.save(newUser._id, tokens.refreshToken);
    console.log("1", tokens);
    res.status(201).send({ ...tokens, userId: newUser._id });
  } catch (e) {
    res.status(500).json({
      message: "на сервере произошла ошибкаю Попробуйте позже",
    });
  }
});

module.exports = router;

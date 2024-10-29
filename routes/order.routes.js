const express = require("express");
const Order = require("../models/Order");
const User = require("../models/User");
const { sendMail, sendMailInfo } = require("../utils/sendVerificationMail");
const router = express.Router({ mergeParams: true });
// const auth = require("../middleware/auth.middleware");

router.post("/", async (req, res) => {
  try {
    const { userId } = req.body;
    const findUser = await User.findById(userId);
    if (findUser !== null) {
      try {
        const newOrder = await Order.create({
          ...req.body,
        });
        // sendMailInfo(findUser, newOrder).catch(console.error);

        res.status(201).send();
      } catch (error) {
        console.log("error", error);
        res.status(401).json({ message: "falseUser" });
      }
    }
  } catch (e) {
    res.status(500).json({
      message: "на сервере произошла ошибкаю Попробуйте позже",
    });
  }
});

module.exports = router;

const express = require("express");
const User = require("../models/User");
// const auth = require("../middleware/auth.middleware");
const router = express.Router({ mergeParams: true });
require("dotenv").config();

router.get("/", async (req, res) => {
  try {
    const list = await User.find();
    const newList = list.map((elem) => {
      return { _id: elem._id, email: elem.email };
    });
    res.send(newList);
  } catch (e) {
    res.status(500).json({
      message: "на сервере произошла ошибкаю Попробуйте позже",
    });
  }
});

router.get("/getApi", async (req, res) => {
  try {
    const { id } = req.query;
    const api = process.env.PAYMENT_URL;
    const findUser = await User.findById(id);
    if (findUser !== null) {
      console.log("api", api, typeof api);
      res.status(200).send(api);
    } else {
      res.status(401).json({ message: "Unauthorize" });
    }
  } catch (e) {
    res.status(500).json({
      message: "на сервере произошла ошибкаю Попробуйте позже",
    });
  }
});

module.exports = router;

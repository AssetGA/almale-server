const express = require("express");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const router = express.Router({ mergeParams: true });
const tokenService = require("../services/token.service");
require("dotenv").config();
const randomNumber = require("../utils/randomNumber");
const { sendVerificationMail } = require("../utils/sendVerificationMail");
const UserChecks = require("../models/UserChecks");

router.post("/verify", async (req, res) => {
  try {
    const { email } = req.body;
    const userFind = await User.findOne({ email: email });
    await randomNumber.start();
    const number = randomNumber.getNumber();
    if (userFind !== null) {
      const userChecks1 = await UserChecks.findOne({ email: email });
      if (userChecks1 === null) {
        await UserChecks.create({
          ...req.body,
          num: number,
        });
      } else {
        await UserChecks.findByIdAndUpdate(
          userChecks1._id,
          { num: number },
          {
            new: true,
          }
        );
      }
      console.log("111111111");
      sendVerificationMail(userFind, number).catch(console.error);
      res.status(200).send({ content: null });
    } else {
      const userChecksFind = await UserChecks.findOne({ email: email });

      if (userChecksFind !== null) {
        const updateUser = await UserChecks.findByIdAndUpdate(
          userChecksFind._id,
          { num: number },
          {
            new: true,
          }
        );
        console.log("5555555");
        sendVerificationMail(updateUser, number).catch(console.error);
        res.status(200).send({ content: null });
      } else {
        const user = await UserChecks.create({
          ...req.body,
          num: number,
        });
        sendVerificationMail(user, number).catch(console.error);
        res.status(200).send({ content: null });
      }
    }
  } catch (e) {
    res.status(500).json({
      message: "на сервере произошла ошибкаю Попробуйте позже",
    });
  }
});

router.patch("/verify", async (req, res) => {
  try {
    const { code, mobile, name, email, street, city, postalCode } = req.body;
    const userFind = await User.findOne({ email: email });
    const api = process.env.PAYMENT_URL;
    if (userFind === null) {
      const user = {
        name: name,
        email: email,
        mobile: mobile,
        street: street,
        city: city,
        postalCode: postalCode,
      };
      const checkUser = await UserChecks.findOne({ email: email });
      const a = code === checkUser.num;
      if (a) {
        try {
          const userNew = await User.create(user);
          const userSend = { _id: userNew._id };
          res
            .status(200)
            .send({ content: true, user: userSend, id: userNew._id, api: api });
        } catch (error) {
          res.status(401).json({ message: "falseUser" });
        }
      } else {
        res.status(401).json({ message: "Unauthorize" });
      }
      await checkUser.deleteOne();
    } else {
      const checkUser = await UserChecks.findOne({ email: email });

      const a = code === checkUser.num;
      if (a) {
        //   const updateUser = await User.findByIdAndUpdate(
        //     userFind._id,
        //     {
        //       mobile: mobile,
        //       street: street,
        //       city: city,
        //       postalCode: postalCode,
        //     },
        //     {
        //       new: true,
        //     }
        //   );
        //   const userSend = { _id: updateUser._id, email: updateUser.email };

        res
          .status(200)
          .send({ content: true, user: null, id: userFind._id, api: api });
      } else {
        res.status(401).json({ message: "Unauthorize" });
      }
      await checkUser.deleteOne();
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка попробуйте позже" });
  }
});

module.exports = router;

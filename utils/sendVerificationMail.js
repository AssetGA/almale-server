"use strict";

const nodemailer = require("nodemailer");
require("dotenv").config();

// отправка верификации
const sendVerificationMail = async (user, number) => {
  let transporter = nodemailer.createTransport(
    {
      host: "smtp.mail.ru",
      port: 465,
      secure: true,
      auth: {
        user: process.env.USERNAME_NODEMAILER,
        pass: process.env.PASSWORD_NODEMAILER,
      },
    },
    {
      // default message fields

      // sender info
      from: `Alma Le <${process.env.USERNAME_NODEMAILER}>`,
      headers: {
        "X-Laziness-level": 1000,
      },
    }
  );

  let mailOptions = {
    to: user.email,
    subject: "Sending Email using Node.js",
    text: `${user.name}, Вас Приветствует компания Alma Le`,
    html: `<h1>Вас приветствует Alma Le</h1>
    <p >Введите код верификации ${number}</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error occurred");
      console.log(error.message);
      return process.exit(1);
    }

    console.log("Message code sent successfully!");
  });
};

module.exports = { sendVerificationMail };

require('dotenv').config({ path: "/home/csolution/Desktop/AMAN TRAINING/expresscart/server/.env" }); // this is important!

const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

const sendMail = (user, callback) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.SENDMAIL_EMAIL,
            pass: process.env.SENDMAIL_PASSWORD
        }
    });
    const mailOptions = {
        from: `"Test", ${process.env.SENDMAIL_EMAIL}`,
        to: `<${user.email}>`,
        subject: "Confirm Account",
        html: "<h1>And here is the place for HTML</h1>"
    };
    transporter.sendMail(mailOptions, callback);
}

router.post("/sendmail", (req, res) => {
    console.log("request came");
    let user = req.body;
    sendMail(user, (err, info) => {
        if (err) {
            console.log(err);
            res.status(400);
            res.send({ error: "Failed to send email" });
        } else {
            console.log("Email has been sent");
            res.send(info);
        }
    });
});

module.exports = router
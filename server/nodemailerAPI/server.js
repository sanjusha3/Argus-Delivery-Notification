const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
require("dotenv").config();


// const port = 3001;
// app.listen(port, () => {
//     console.log(`Server is running on port: ${port}`);
// });

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: process.env.user,
        pass: process.env.pass,
        clientId: process.env.clientId,
        clientSecret: process.env.clientSecret,
        refreshToken: process.env.refreshToken,
    },
});

transporter.verify((err, success) => {
    err
        ? console.log(err)
        : console.log(`=== Server is ready to take messages: ${success} ===`);
});

let mailOptions = {
    from: process.env.user,
    to: "gunnu7007@gmail.com",
    subject: "Nodemailer API",
    text: "Hi from your nodemailer API",
};

transporter.sendMail(mailOptions, function (err, data) {
    console.log("trying");
    if (err) {
        console.log("trying");
        console.log("Error " + err);
    } else {
        console.log("Email sent successfully");
    }
});

const port = 3001;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
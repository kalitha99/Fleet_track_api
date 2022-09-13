const express = require('express')
const nodemailer = require("nodemailer");
require("dotenv").config();

const sendingMail =  (to, subject, msg) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'noereply.fleettrack@gmail.com',
            pass: process.env.MAIL_PASSWORD
        }
    });

    let mailOptions = {
        from: "noereply.fleettrack@gmail.com",
        to: to,
        subject: subject,
        text: msg
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error)
        } else {
            console.log("Email Sent: " + info.response)
        }
    })
}


module.exports = {sendingMail};
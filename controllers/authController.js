const express = require('express')
const User = require("../models/userModel")
const jwt = require('jsonwebtoken')
require("dotenv").config();
sendEmail = require("../send_mail/Send_mail")

const handleSignup = async (req, res) => {
    console.log(req.body)
    try {
        await User.create({
            name: req.body.name,
            password: req.body.password,
            role: req.body.role,
            email: req.body.email
        })
        console.log("new user created")
        let to = req.body.email
        let subject = "New user credentials"
        let msg = "For loging in  to system please use these credentials and once you login change your password." + " USER NAME : " + req.body.name + "  PASSWORD : " + req.body.password + "."
        sendEmail.sendingMail(to, subject, msg)
        res.json({status: 'ok', msg: "account created"})
    } catch (err) {
        console.log(err)
        res.json({status: 'error', error: 'Duplicate email'})
    }

}
const updatePw = async (req, res) => {
    console.log(req.body)
    try {
    const user = await User.findOneAndUpdate({
            name: req.body.name,
        },
        {
            $set: {
                password:req.body.password

            }
        },
        {new: true, useFindAndModify: false}
    )
        res.json({status: 'ok', msg: 'Updated'})
        let to = user.email
        let subject = "User credentials updated"
        let msg = "User credentials of this account has benn updated if ti was not you please contact admin "
        sendEmail.sendingMail(to, subject, msg)
    } catch (err) {
        console.log(err)
        res.json({status: 'error', msg: 'Duplicate email'})
    }

}
const handleLogin = async (req, res) => {
    console.log(req.body)

    const user = await User.findOne({
        name: req.body.name,
        password: req.body.password
    })
    if (user) {
        console.log(user)
        const accessToken = jwt.sign({
                name: user.name,
                email: user.email,
                role: user.role
            }, process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: '8h'
            })
        const refreshToken = jwt.sign({
                name: user.name
            }, process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: '1d'
            })
        res.json({
            status: "ok",
            name: user.name,
            email: user.email,
            accessToken: accessToken,
            refreshToken: refreshToken,
            roles: user.role
        });
        console.log("success")
    } else {

        res.status(409).json({msg: 'wrong user name or password'});
        console.log("error")
    }


}


module.exports = {handleSignup, handleLogin, updatePw};
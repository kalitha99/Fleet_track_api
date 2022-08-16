const express = require('express')
const User = require("../models/userModel")
const jwt = require('jsonwebtoken')
require("dotenv").config();

const handleSignup = async (req, res) => {
    console.log(req.body)
    try {
        await User.create({
            name: req.body.name,
            password: req.body.password,
            role: req.body.role
        })
        console.log("new user created")
        res.json({status: 'ok'})
    } catch (err) {
        console.log(err)
        res.json({status: 'error', error: 'Duplicate email'})
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
            accessToken: accessToken,
            refreshToken: refreshToken,
            roles: user.role
        });
        console.log("success")
    } else {

        res.status(409).json({ msg: 'wrong user name or password'});
        console.log("error")
    }


}



module.exports = {handleSignup, handleLogin};
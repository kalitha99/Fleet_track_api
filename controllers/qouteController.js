const express = require('express')
const User = require("../models/userModel")
const jwt = require('jsonwebtoken')
require("dotenv").config();


const getQoute = async (req, res) => {
    const token = req.headers['x-access-token']
    console.log(token)
    try {

        const user = await User.find()

        return res.json({status: 'ok', quote: user})

    } catch (error) {
        console.log(error)
        res.sendStatus(403);
        res.json({status: 'error', error: 'invalid token'})
    }
}

module.exports = {getQoute };
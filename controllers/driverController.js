const Drivers = require("../models/DriversModel")
require("dotenv").config();

const createDriver = async (req, res) => {
    console.log(req.body)
    try {
        await Drivers.create({
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
            nic: req.body.nic,
            address: req.body.address,
            tpNo: req.body.tpNo,
            licenseNum: req.body.licenseNum,
            bloodGroup: req.body.bloodGroup,
        })
        console.log("new driver created")
        res.json({status: 'ok',msg:"Driver Details added successfully"})
    } catch (err) {
        console.log(err)
        res.status(400).json({ msg: 'entered one or more wrong details'});
    }

}

const getDriver = async (req, res) => {
    const token = req.headers['x-access-token']
    console.log(token)
    console.log("getDrivers")
    try {

        const drivers = await Drivers.find()

        return res.json({status: 'ok', drivers: drivers})

    } catch (error) {
        console.log(error)
        res.sendStatus(403);
        res.json({status: 'error', error: 'invalid token'})
    }
}

module.exports = {createDriver,getDriver};
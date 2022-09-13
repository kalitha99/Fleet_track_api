const Drivers = require("../models/DriversModel")
const Vehicles = require("../models/VehiclesModel")
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
            assigned_vehicle: req.body.assigned_vehicle
        })
        console.log("new driver created")
        res.json({status: 'ok', msg: "Driver Details added successfully"})
    } catch (err) {
        console.log(err)
        res.status(400).json({msg: 'entered one or more wrong details'});
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

const getDriverById = async (req, res) => {
    const token = req.headers['x-access-token']
    console.log(req.body.email)
    console.log("getDrivers")
    try {

        const drivers = await Drivers.findOne({email: req.body.email})

        return res.json({status: 'ok', drivers: drivers})

    } catch (error) {
        console.log(error)
        res.sendStatus(403);
        res.json({status: 'error', error: 'invalid token'})
    }
}

const assignVehicleToDriver = async (req, res) => {
    const token = req.headers['x-access-token']
    console.log(token)
    console.log("update odo")

    try {

        console.log(req.body)
        if (req.body.status) {

            console.log("unassign")
            let drivers = await Drivers.findOneAndUpdate(
                {_id: req.body.name},
                {assigned_vehicle: req.body.status}
            )
            console.log(drivers)
            let vehicles = await Vehicles.findOneAndUpdate(
                {registration_number: req.body.registration_number},
                {
                    $set: {
                        assigned_driver: req.body.status,
                        assigned_driver_id: req.body.status,
                        available_for_trip: false
                    }

                }
            )

            if (drivers && vehicles) {
                res.json({status: 'ok', msg: 'Successfully Unassigned'})
            } else {
                res.json({status: 'ok', msg: 'Unassign unsuccessful'})
            }

        } else {

            console.log("assign")
            let drivers = await Drivers.findOneAndUpdate({_id: req.body.name},
                {assigned_vehicle: req.body.registration_number}
            )
            console.log(drivers)
            let vehicles = await Vehicles.findOneAndUpdate({registration_number: req.body.registration_number},
                {
                    $set: {
                        assigned_driver: drivers.name,
                        assigned_driver_id: req.body.name,
                        available_for_trip: true
                    }
                }
            )

            if (drivers && vehicles) {
                res.json({status: 'ok', msg: 'Assign success'})
            } else {
                res.json({status: 'ok', msg: 'Assign unsuccessful'})
            }
        }

    } catch (error) {
        console.log(error)
        res.sendStatus(403);
        res.json({status: 'error', error: 'Something went wrong'})
    }
}

const searchDrivers = async (req, res) => {
    const token = req.headers['x-access-token']
    console.log(token)
    console.log("Search ")

    try {
        console.log(req.body)
        var drivers;
        if (req.body.assigned_vehicle == "" && req.body.name == "") {
            console.log("if")
            drivers = await Drivers.find()
        } else if (req.body.name == "") {
            console.log("else if")
            drivers = await Drivers.find({
                assigned_vehicle: req.body?.assigned_vehicle
            })
        } else if (req.body.name !== "" && req.body.assigned_vehicle !== "") {
            console.log("else")
            drivers = await Drivers.find({
                "$and": [
                    {assigned_vehicle: req.body?.assigned_vehicle},
                    {name: req.body.name}
                ]

            })
        }
        return res.json({status: 'ok', drivers: drivers, msg: 'Search successful!! '})

    } catch (error) {
        console.log(error)
        res.sendStatus(403);
        res.json({status: 'error', error: 'Something went wrong'})
    }
}

const searchAssignedDrivers = async (req, res) => {
    const token = req.headers['x-access-token']
    console.log(token)
    console.log("Search ")

    try {
        console.log(req.body)
        var drivers;

        drivers = await Drivers.find({
            assigned_vehicle: {$ne: req.body?.assigned_vehicle}
        })

        return res.json({status: 'ok', drivers: drivers, msg: 'Search successful!! '})

    } catch (error) {
        console.log(error)
        res.sendStatus(403);
        res.json({status: 'error', error: 'Something went wrong'})

    }
}

const updateDriver = async (req, res) => {
    const token = req.headers['x-access-token']
    console.log(token)
    console.log("end Trips")

    try {

        let driver = await Drivers.findOneAndUpdate({_id: req.body.id},
            {
                $set: {
                    name: req.body.name,
                    email: req.body.email,
                    age: req.body.age,
                    nic: req.body.nic,
                    address: req.body.address,
                    tpNo: req.body.tpNo,
                    licenseNum: req.body.licenseNum,
                    bloodGroup: req.body.bloodGroup,
                    assigned_vehicle: req.body.assigned_vehicle,

                }
            },
            {new: true, useFindAndModify: false}
        )

        return res.json({status: 'ok', msg: "trip Finished"})


    } catch (error) {
        console.log(error)
        res.sendStatus(403);
        res.json({status: 'error', error: 'invalid token'})
    }
}


module.exports = {createDriver, getDriver, assignVehicleToDriver, searchDrivers, searchAssignedDrivers, getDriverById, updateDriver};
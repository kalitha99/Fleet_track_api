const Vehicles = require("../models/VehiclesModel")
require("dotenv").config();

const createVehicle = async (req, res) => {
    console.log(req.body)
    try {
        await Vehicles.create({
            make: req.body.make,
            model: req.body.model,
            year: req.body.year,
            initial_odo_reading: req.body.initial_odo_reading,
            latest_odo_reading: req.body.initial_odo_reading,
            registration_number: req.body.registration_number,
            revenue_license_num: req.body.revenue_license_num,
            revenue_license_issue_date: req.body.revenue_license_issue_date,
            revenue_license_expire_date: req.body.revenue_license_expire_date,
            fuel_type: req.body.fuel_type,
            vehicle_type: req.body.vehicle_type,
        })
        console.log("new vehicle created")
        res.json({status: 'ok', msg: "vehicle created"})
    } catch (err) {
        console.log(err)
        res.status(400).json({msg: 'entered one or more wrong details'});
    }

}

const getVehicles = async (req, res) => {
    const token = req.headers['x-access-token']
    console.log(token)
    console.log("getVehicles")
    try {

        const vehicles = await Vehicles.find()

        return res.json({status: 'ok', vehicles: vehicles})

    } catch (error) {
        console.log(error)
        res.sendStatus(403);
        res.json({status: 'error', error: 'invalid token'})
    }
}

const searchVehicles = async (req, res) => {
    const token = req.headers['x-access-token']
    console.log(token)
    console.log("update odo")

    try {
        console.log(req.body)
        var vehicles;
        if (req.body.registration_number == "" && req.body.make == "" && req.body.model == ""  ) {
            console.log("if")
            vehicles = await Vehicles.find()
        }else {
            console.log("else")
            vehicles = await Vehicles.find({
                "$or":[
                    {registration_number: req.body?.registration_number},
                    {make: req.body?.make},
                    {model: req.body?.model}
                ]
            })
        }

        console.log(vehicles)
        //vehicles.registration_number = req.body.registration_number;
        //vehicles.save();
        return res.json({status: 'ok', vehicles: vehicles, msg: 'update successful!! '})

    } catch (error) {
        console.log(error)
        res.sendStatus(403);
        res.json({status: 'error', error: 'Something went wrong'})
    }
}


const updateLatestOdoReading = async (req, res) => {
    const token = req.headers['x-access-token']
    console.log(token)
    console.log("update odo")

    try {
        console.log(req.body)
        let vehicles = await Vehicles.findOne({registration_number: req.body.registration_number})
        vehicles.latest_odo_reading = req.body.new_odo;
        console.log(vehicles)
        vehicles.save(function(err, user) {
            if (err) return res.json({status: 'err', vehicles: vehicles, msg: "Something went wrong"});
            res.json({status: 'ok', vehicles: vehicles, msg: 'update successful!! '})
        });

    } catch (error) {
        console.log(error)
        res.sendStatus(403);
        res.json({status: 'error', error: 'Something went wrong'})
    }
}

const enterRevenueLicenseDetails = async (req, res) => {
    const token = req.headers['x-access-token']
    console.log(token)
    console.log("update Revenue License Details")

    try {
        console.log(req.body)
        let vehicles = await Vehicles.findOne({registration_number: req.body.registration_number})
        vehicles.revenue_license_num = req.body.revenue_license_num;
        vehicles.revenue_license_issue_date = req.body.revenue_license_issue_date;
        vehicles.revenue_license_expire_date = req.body.revenue_license_expire_date;
        console.log(vehicles)
        vehicles.save(function(err, user) {
            if (err) return res.json({status: 'err', vehicles: vehicles, msg: "Something went wrong"});
            res.json({status: 'ok', vehicles: vehicles, msg: 'update successful!! '})
        });


    } catch (error) {
        console.log(error)
        res.sendStatus(403);
        res.json({status: 'error', error: 'Something went wrong'})
    }
}




module.exports = {createVehicle, getVehicles, updateLatestOdoReading, searchVehicles, enterRevenueLicenseDetails};
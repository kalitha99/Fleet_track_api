const Drivers = require("../models/DriversModel")
const Vehicles = require("../models/VehiclesModel")
const Trip = require("../models/TripModel")

require("dotenv").config();

let date_ob = new Date();

// current date
// adjust 0 before single digit date
let date = ("0" + date_ob.getDate()).slice(-2);

// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// current year
let year = date_ob.getFullYear();

let enteredOn = date + '/' + month + '/' + year

const addNewTrip = async (req, res) => {
    console.log(req.file)
    try {

        const data = {
            registration_number: req.body.registration_number,
            driver_id: req.body.driver_id,
            destination_of_trip: req.body.destination,
            distance_of_trip: req.body.distance_of_trip,
            starting_odo: req.body.latest_odo_reading,
            status: "to be completed",
            trip_date: req.body.trip_date,
            driver_name: req.body.name,
        }

        return Trip.create(data).then(async trip => {
            console.log("\n>> Created Trip:\n", trip);

            let vehicles = await Vehicles.findOneAndUpdate({registration_number: req.body.registration_number},
                {
                    $push: {trip_details: trip._id},
                    $set: {available_for_trip: "false"}
                },
                {new: true, useFindAndModify: false}
            )
            let drivers = await Drivers.findOneAndUpdate({_id: req.body.driver_id},
                {
                    $push: {trip_details: trip._id}
                },
                {new: true, useFindAndModify: false})

            if (vehicles && drivers) {
                (res.json({status: 'ok', msg: "Entry added"}))
            } else {
                (res.json({status: 'err', msg: "Something went wrong"}))
            }


            // console.log(expense._id)
        })

    } catch (err) {
        console.log(err)
        res.status(400).json({msg: 'entered one or more wrong details'});
    }

}

const cancelTrip = async (req, res) => {
    console.log(req.file)
    try {

        let vehicles = await Vehicles.findOneAndUpdate({registration_number: req.body.registration_number},
            {$set: {available_for_trip: true}}
        )
        const Length = vehicles.trip_details.length
        console.log(Length)

        let trip = await Trip.findOneAndUpdate({_id: vehicles.trip_details[Length - 1]},
            {
                $set: {status: "Canceled"}
            },
            {new: true, useFindAndModify: false}
        )

        if (vehicles && trip) {
            (res.json({status: 'ok', msg: "Entry deleted"}))
        } else {
            (res.json({status: 'err', msg: "Something went wrong"}))
        }


    } catch (err) {
        console.log(err)
        res.status(400).json({msg: 'entered one or more wrong details'});
    }

}

const getTrips = async (req, res) => {
    const token = req.headers['x-access-token']
    console.log(token)
    console.log("getTrips")
    let trip
    try {

        if (req.body.registration_number == "" && req.body.name == "") {
            trip = await Trip.find()
        } else if (req.body.name == "") {
            trip = await Trip.find({registration_number: req.body.registration_number})
        } else if (req.body.registration_number == "") {
            trip = await Trip.find({driver_name: req.body.name})
        }
        console.log(trip)
        return res.json({status: 'ok', trip: trip})

    } catch (error) {
        console.log(error)
        res.sendStatus(403);
        res.json({status: 'error', error: 'invalid token'})
    }
}

const startTrip = async (req, res) => {
    const token = req.headers['x-access-token']
    console.log(token)
    console.log("start Trips")
    let trip
    try {

        let trip = await Trip.findOneAndUpdate({_id: req.body.id},
            {
                $set: {status: "Started",}
            },
            {new: true, useFindAndModify: false}
        )
        return res.json({status: 'ok', msg: "trip started"})

    } catch (error) {
        console.log(error)
        res.sendStatus(403);
        res.json({status: 'error', error: 'invalid token'})
    }
}

const endTrip = async (req, res) => {
    const token = req.headers['x-access-token']
    console.log(token)
    console.log("end Trips")

    try {

        let trip = await Trip.findOneAndUpdate({_id: req.body.id},
            {
                $set: {status: "Finished", completed_date: enteredOn, finishing_odo:req.body.finishing_odo}
            },
            {new: true, useFindAndModify: false}
        )


        let vehicles = await Vehicles.findOneAndUpdate({registration_number: req.body.registration_number},
            {$set: {available_for_trip: true}}
        )
        if(trip && vehicles) {
            return res.json({status: 'ok', msg: "trip Finished"})
        }else {
            return res.json({status: 'ok', msg: "Something went wrong"})
        }

    } catch (error) {
        console.log(error)
        res.sendStatus(403);
        res.json({status: 'error', error: 'invalid token'})
    }
}


module.exports = {addNewTrip, cancelTrip, getTrips, startTrip, endTrip}
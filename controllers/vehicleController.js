const Vehicles = require("../models/VehiclesModel")
const VehicleExpense = require("../models/VehicleExpencesModel")
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
            assigned_driver: "unassigned",
            available_for_trip:"false"

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

        const vehicles = await Vehicles.find({}, {})
        let vehi = vehicles
        console.log(vehicles)
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
        if (req.body.registration_number == "" && req.body.make == "" && req.body.model == "" && req.body.assigned_driver == "") {
            console.log("if")
            vehicles = await Vehicles.find()
        } else {
            console.log("else")
            vehicles = await Vehicles.find({
                "$or": [
                    {registration_number: req.body?.registration_number},
                    {make: req.body?.make},
                    {model: req.body?.model},
                    {assigned_driver: req.body.assigned_driver}
                ]
            })
        }

        //console.log(vehicles)
        //vehicles.registration_number = req.body.registration_number;
        //vehicles.save();
        return res.json({status: 'ok', vehicles: vehicles, msg: 'update successful!! '})

    } catch (error) {
        console.log(error)
        res.sendStatus(403);
        res.json({status: 'error', error: 'Something went wrong'})
    }
}

const searchVehiclesAssignedDriver = async (req, res) => {
    const token = req.headers['x-access-token']
    console.log(token)
    console.log("update odo")

    try {
        console.log(req.body)
        var vehicles;
        console.log("else")
        vehicles = await Vehicles.find({
            "$and": [
                {registration_number: req.body?.registration_number},
                {assigned_driver: req.body.assigned_driver}
            ]
        })
        //console.log(vehicles)
        //vehicles.registration_number = req.body.registration_number;
        //vehicles.save();
        return res.json({status: 'ok', vehicles: vehicles, msg: 'Search successful!! '})

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
        vehicles.save(function (err, user) {
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
    console.log(req.file)
    console.log("update Revenue License Details")

    try {

        const data = {
            registration_number: req.body.registration_number,
            expense_type: req.body.expense_type,
            expense_date: enteredOn,
            expense_name: req.body.expense_name,
            expense_cost: req.body.expense_cost,
            entered_by: req.body.entered_by,
            entered_on: enteredOn,
            proof: req.file.path,
        }

        return VehicleExpense.create(data).then(expense => {
            console.log("\n>> Created expense:\n", expense);

            return Vehicles.findOneAndUpdate({registration_number: req.body.registration_number},
                {
                    $push: {expenses: expense._id},
                    $set: {
                        revenue_license_num: req.body.revenue_license_num,
                        revenue_license_issue_date: req.body.revenue_license_issue_date,
                        revenue_license_expire_date: req.body.revenue_license_expire_date
                    }
                },
                {new: true, useFindAndModify: false}
            ).then(res.json({status: 'ok', msg: "Entry added"}))

            // console.log(expense._id)
        })


    } catch
        (error) {
        console.log(error)
        res.sendStatus(403);
        res.json({status: 'error', error: 'Something went wrong'})
    }
}

const enterInsuranceDetails = async (req, res) => {
    const token = req.headers['x-access-token']
    console.log(token)
    console.log("update Revenue License Details")

    try {

        const data = {
            registration_number: req.body.registration_number,
            expense_type: req.body.expense_type,
            expense_date: enteredOn,
            expense_name: req.body.expense_name,
            expense_cost: req.body.expense_cost,
            entered_by: req.body.entered_by,
            entered_on: enteredOn,
            proof: req.file.path,
        }

        return VehicleExpense.create(data).then(expense => {
            console.log("\n>> Created expense:\n", expense);

            return Vehicles.findOneAndUpdate({registration_number: req.body.registration_number},
                {
                    $push: {expenses: expense._id},
                    $set: {
                        insurance_num : req.body.insurance_num,
                        insurance_issue_date : req.body.insurance_issue_date,
                        insurance_expire_date : req.body.insurance_expire_date,
                    }
                },
                {new: true, useFindAndModify: false}
            ).then(res.json({status: 'ok', msg: "Entry added"}))


        })
    } catch (error) {
        console.log(error)
        res.sendStatus(403);
        res.json({status: 'error', error: 'Something went wrong'})
    }
}

const updateVehicle = async (req, res) => {
    const token = req.headers['x-access-token']
    console.log(token)
    console.log("Update vehicle")

    try {

        let vehicle = await Vehicles.findOneAndUpdate({registration_number: req.body.registration_number},
            {
                $set: {
                    make: req.body.make,
                    model: req.body.model,
                    year: req.body.year,
                    initial_odo_reading: req.body.initial_odo_reading,
                    latest_odo_reading: req.body.initial_odo_reading,
                    revenue_license_num: req.body.revenue_license_num,
                    revenue_license_issue_date: req.body.revenue_license_issue_date,
                    revenue_license_expire_date: req.body.revenue_license_expire_date,
                    fuel_type: req.body.fuel_type,
                    vehicle_type: req.body.vehicle_type,
                    insurance_expire_date: req.body.insurance_expire_date,
                    insurance_issue_date: req.body.insurance_issue_date,
                    insurance_num: req.body.insurance_num,
                    assigned_driver: req.body.assigned_driver,
                }
            },
            {new: true, useFindAndModify: false}
        )

        return res.json({status: 'ok', msg: "Vehicle Updated"})


    } catch (error) {
        console.log(error)
        res.sendStatus(403);
        res.json({status: 'error', error: 'invalid token'})
    }
}

const getVehiclesWithExpenses = async (req, res) => {
    const token = req.headers['x-access-token']
    console.log(token)
    console.log("getVehicles")
    try {

        const vehicles = await Vehicles.find({registration_number: req.body.registration_number}, {}).sort({date: -1}).populate("expenses").populate("fuel_expenses").populate("service_expenses")
        let vehi = vehicles
        console.log(vehicles)
        return res.json({status: 'ok', vehicles: vehicles})

    } catch (error) {
        console.log(error)
        res.sendStatus(403);
        res.json({status: 'error', error: 'invalid token'})
    }
}


module.exports = {
    createVehicle,
    getVehicles,
    updateLatestOdoReading,
    searchVehicles,
    enterRevenueLicenseDetails,
    enterInsuranceDetails,
    searchVehiclesAssignedDriver,
    updateVehicle,
    getVehiclesWithExpenses
};
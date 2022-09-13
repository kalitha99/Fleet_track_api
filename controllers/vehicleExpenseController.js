const VehicleExpense = require("../models/VehicleExpencesModel")
const Vehicles = require("../models/VehiclesModel")
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

const addVehicleExpense = async (req, res) => {
    console.log(req.file)
    try {
        //let vehicles = await Vehicles.findOne({registration_number: req.body.registration_number})
        const data = {
            registration_number: req.body.registration_number,
            expense_type: req.body.expense_type,
            expense_date: req.body.expense_date,
            expense_name: req.body.expense_name,
            expense_cost: req.body.expense_cost,
            entered_by: req.body.entered_by,
            entered_on: enteredOn,
            proof: req.file.path,
        }

        return VehicleExpense.create(data).then(expense => {
            console.log("\n>> Created expense:\n", expense);

            return Vehicles.findOneAndUpdate({registration_number: req.body.registration_number},
                {$push: {expenses: expense._id}},
                {new: true, useFindAndModify: false}
            ).then(res.json({status: 'ok', msg: "Entry added"}))

            // console.log(expense._id)
        })

    } catch (err) {
        console.log(err)
        res.status(400).json({msg: 'entered one or more wrong details'});
    }

}

const getVehiclesWithExpenses = async (req, res) => {
    const token = req.headers['x-access-token']
    console.log(token)
    console.log("get Vehicles with expense details")
    try {

        const vehicles = await Vehicles.find().populate("expenses").populate("fuel_expenses").populate("service_expenses")
        let vehi = vehicles.registration_number
        console.log(vehicles)
        return res.json({status: 'ok', vehicles: vehicles})

    } catch (error) {
        console.log(error)
        res.sendStatus(403);
        res.json({status: 'error', error: 'invalid token'})
    }
}

module.exports = {addVehicleExpense, getVehiclesWithExpenses}
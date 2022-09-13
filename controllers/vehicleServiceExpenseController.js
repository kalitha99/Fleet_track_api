const VehicleServiceExpense = require("../models/VehicleServiceExpencesModel")
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

const addVehicleServiceExpense = async (req, res) => {
    console.log(req.file)
    try {
        let vehicles = await Vehicles.findOne({registration_number: req.body.registration_number})
        if (vehicles){
            const data = {
                registration_number: req.body.registration_number,
                expense_type: req.body.expense_type,
                expense_date: req.body.expense_date,
                due_on: req.body.due_on,
                done_on: req.body.done_on,
                expense_cost: req.body.expense_cost,
                entered_by: req.body.entered_by,
                entered_on: enteredOn,
                proof: req.file.path,
            }

            return VehicleServiceExpense.create(data).then(expense => {
                console.log("\n>> Created expense:\n", expense);

                return Vehicles.findOneAndUpdate({registration_number: req.body.registration_number},
                    {$push: {service_expenses: expense._id}},
                    {new: true, useFindAndModify: false}
                ).then(res.json({status: 'ok', msg: "Entry added"}))

                // console.log(expense._id)
            })
        }else {
            res.json({status: 'err', msg: "Vehicle registration number is wrong!!"})
        }


    } catch (err) {
        console.log(err)
        res.status(400).json({msg: 'entered one or more wrong details'});
    }

}

module.exports = {addVehicleServiceExpense}
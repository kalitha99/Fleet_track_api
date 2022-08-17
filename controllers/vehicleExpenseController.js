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

let enteredOn = date+'/'+month+'/'+year

const addVehicleExpense = async (req, res) => {
    console.log(req.file)
    try {
        await VehicleExpense.create({
            registration_number: req.body.registration_number,
            expense_type: req.body.expense_type,
            expense_date: req.body.expense_date,
            expense_name: req.body.expense_name,
            expense_cost: req.body.expense_cost,
            entered_by: req.body.entered_by,
            entered_on: enteredOn,
            proof:req.file.path,
        })
        console.log("new vehicle created")
        res.json({status: 'ok', msg: "Entry added"})
    } catch (err) {
        console.log(err)
        res.status(400).json({msg: 'entered one or more wrong details'});
    }

}

module.exports ={addVehicleExpense}
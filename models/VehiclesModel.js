const mongoose = require('mongoose')
const VehicleExpense = require("../models/VehicleExpencesModel")
const VehiclesModel = new mongoose.Schema(
    {
        make: {type: String, required: true},
        model: {type: String, required: true},
        year: {type: Number, required: true},
        initial_odo_reading: {type: Number, required: true},
        latest_odo_reading: {type: Number, required: true},
        registration_number: {type: String, required: true, unique: true},
        revenue_license_num: {type: String, required: true, unique: true},
        revenue_license_issue_date: {type: Date, required: true},
        revenue_license_expire_date: {type: Date, required: true},
        insurance_num: {type: String},
        insurance_issue_date: {type: Date,},
        insurance_expire_date: {type: Date,},
        fuel_type: {type: String, required: true},
        vehicle_type: {type: String, required: true},
        available_for_trip:{type:String},
        assigned_driver:{type:String},
        assigned_driver_id:{type:String},
        expenses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'VehicleExpenses'
            }
        ],
        fuel_expenses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'VehicleFuelExpensesModel'
            }
        ],
        service_expenses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'VehicleServiceExpensesModel'
            }
        ],
        trip_details: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'tripDetails'
            }
        ],

    },
    {collection: 'vehicle-data'}
)

const model = mongoose.model('VehicleData', VehiclesModel)

module.exports = model
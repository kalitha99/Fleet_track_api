const mongoose = require('mongoose')

const VehicleFuelExpensesModel = new mongoose.Schema(
    {
        registration_number: {
            type: String,
            required: true
        },
        expense_type: {
            type: String,
            required: true
        },
        expense_date: {
            type: String,
            required: true
        },
        expense_cost: {
            type: Number,
            required: true
        },
        number_of_liters: {
            type: Number,
            required: true
        },
        entered_by: {
            type: String,
            required: true
        },
        entered_on: {
            type: String,
            required: true
        },
        proof: {
            data: Buffer,
            contentType: String,
        },
    },
    {collection: 'Vehicle-Fuel-Expenses'}
)

const model = mongoose.model('VehicleFuelExpensesModel', VehicleFuelExpensesModel)

module.exports = model
const mongoose = require('mongoose')

const VehicleServiceExpensesModel = new mongoose.Schema(
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
        done_on: {
            type: Number,
            required: true
        },
        due_on: {
            type: Number,
            required: true
        },
        expense_cost: {
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
    {collection: 'Vehicle-Service-Expenses'}
)

const model = mongoose.model('VehicleServiceExpensesModel', VehicleServiceExpensesModel)

module.exports = model
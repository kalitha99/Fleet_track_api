const mongoose = require('mongoose')

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
        fuel_type: {type: String, required: true},
        vehicle_type: {type: String, required: true},
    },
    {collection: 'vehicle-data'}
)

const model = mongoose.model('VehicleData', VehiclesModel)

module.exports = model
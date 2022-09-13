const mongoose = require('mongoose')

const DriversModel = new mongoose.Schema(
    {
        name: {type: String, required: true,},
        email: {type: String, unique: true, required: true},
        age: {type: Number, required: true},
        nic: {type: String, required: true,unique: true},
        address: {type: String, required: true},
        tpNo: {type: Number, required: true, unique: true,},
        licenseNum: {type: String, required: true, unique: true,},
        bloodGroup: {type: String, required: true},
        assigned_vehicle: {type: String},
        trip_details: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'tripDetails'
            }
        ],

    },
    {collection: 'Driver-data'}
)

const model = mongoose.model('DriverData', DriversModel)

module.exports = model

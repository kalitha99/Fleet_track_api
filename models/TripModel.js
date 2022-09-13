const mongoose = require('mongoose')

const tripDetails = new mongoose.Schema(
    {
        driver_name: {type: String, required: true},
        driver_id: {type: String, required: true},
        registration_number: {type: String, required: true},
        distance_of_trip: {type: Number},
        destination_of_trip: {type: String},
        starting_odo: {type: Number},
        finishing_odo: {type: Number},
        status: {type: String},
        trip_date: {type: String},
        completed_date: {type: String},
    },
    {collection: 'trip-Details'}
)

const model = mongoose.model('tripDetails', tripDetails)

module.exports = model

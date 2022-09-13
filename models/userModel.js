const mongoose = require('mongoose')

const UserModel = new mongoose.Schema(
    {
        name: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        quote: {type: String},
        email: {type: String, unique: true},
        role: {type: String, required: true}
    },
    {collection: 'user-data'}
)

const model = mongoose.model('UserData', UserModel)

module.exports = model

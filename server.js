const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/userModel')
const PORT = process.env.PORT || 3500;
const jwt = require('jsonwebtoken')
require("dotenv").config();
const path = require('path');

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URL
).then(() => console.log("DB Connected"))
    .catch((err) => console.log(err))

app.use('/api', require('./routes/api/auth'))
app.use('/api/quote', require('./routes/api/quote'))
app.use('/api/vehicles', require('./routes/api/vehicleRoute'))
app.use('/api/Drivers', require('./routes/api/driverRoutes'))
app.use('/api/Expenses', require('./routes/api/vehicleExpenseRoutes'))

app.use('/public', express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log(`server running on port ${PORT} `))
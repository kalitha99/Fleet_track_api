const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/userModel')
const PORT = process.env.PORT || 3500;
const jwt = require('jsonwebtoken')
require("dotenv").config();
const path = require('path');
const VehicleServiceExpense = require("./models/VehicleServiceExpencesModel")
const Vehicle = require("./models/VehiclesModel")
var nodemailer = require("nodemailer")
sendEmail = require("./send_mail/Send_mail")


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
app.use('/api/Trip', require('./routes/api/tripRoutes'))

var cron = require('node-cron');


cron.schedule('00 24 01 * * *', async () => {

    const vehicle = await Vehicle.find()

    const ServiceNotification = async (vehicle) => {
        for (let i = 0; i < vehicle.length; i++) {
            const service = vehicle[i].service_expenses.length
            console.log(vehicle[i])
            if (service > 0) {
                const vehi = await VehicleServiceExpense.findOne({_id: vehicle[i]?.service_expenses[service - 1]})
                if ((Number(vehi?.due_on)) - (Number(vehicle[i].latest_odo_reading)) < 500) {
                    let test = (Number(vehi.due_on)) - (Number(vehicle[i].latest_odo_reading));
                    console.log(test)
                    let to = "kalithadissanayake44@gmail.com"
                    let subject = vehicle[i].registration_number + "Service reminder"
                    let msg = "Service is due on Vehicle under registration " + vehicle[i].registration_number + ". " + "Only " + test + "Km left till service."
                    sendEmail.sendingMail(to, subject, msg)

                } else {
                    let test = (Number(vehi?.due_on)) - (Number(num.latest_odo_reading));
                    console.log("Not to do")
                }

            }

        }
    }

    const InsuaranceNotification = async (vehicle) => {
        var currentdate = new Date();

        for (let i = 0; i < vehicle.length; i++) {
            const insurance_expire_date = vehicle[i].insurance_expire_date
            console.log(currentdate)
            console.log(insurance_expire_date)
            console.log(Math.abs(insurance_expire_date - currentdate))
            //datetime
            if (Math.abs((insurance_expire_date - currentdate)) < 432000000) {
                console.log(" to do")
                let to = "kalithadissanayake44@gmail.com"
                let subject = vehicle[i].registration_number + " Insurance reminder"
                let msg = "Insurance is due on Vehicle under registration number " + vehicle[i].registration_number + ". Date of expire:"+ insurance_expire_date + ". " + "Policy Number :  " + vehicle[i].insurance_num + "."
                sendEmail.sendingMail(to, subject, msg)

            } else {
                // let test = (Number(vehi?.due_on)) - (Number(num.latest_odo_reading));
                console.log("Not to do")
            }

        }


    }

    const RevenueLicenseNotification = async (vehicle) => {
        var currentdate = new Date();

        for (let i = 0; i < vehicle.length; i++) {
            const revenue_license_expire_date = vehicle[i].revenue_license_expire_date
            console.log(currentdate)
            console.log(revenue_license_expire_date)
            console.log(Math.abs(revenue_license_expire_date - currentdate))
            //datetime
            if (Math.abs((revenue_license_expire_date - currentdate)) < 432000000) {
                console.log(" to do")
                let to = "kalithadissanayake44@gmail.com"
                let subject = vehicle[i].registration_number + " Revenue License reminder"
                let msg = "Revenue License is due on Vehicle under registration Number " + vehicle[i].registration_number + ". Date of expire: "+ revenue_license_expire_date + ". " + "License  Number :  " + vehicle[i].revenue_license_num + ". To renew got this Link `https://www.gov.lk/services/erl/es/erl/view/index.action`"
                sendEmail.sendingMail(to, subject, msg)

            } else {
                // let test = (Number(vehi?.due_on)) - (Number(num.latest_odo_reading));
                console.log("Not to do")
            }

        }


    }

    ServiceNotification(vehicle)
    InsuaranceNotification(vehicle)
    RevenueLicenseNotification(vehicle)
})


app.use('/public', express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log(`server running on port ${PORT} `))

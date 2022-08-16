const express = require('express');
const router = express.Router();
const DriverController = require("../../controllers/driverController")
const verifyJWT =require('../../middelware/verifyJWT')
const verifyRoles =require('../../middelware/verifyRoles')


router.post('/addNewDriver', verifyJWT, verifyRoles('admin'), DriverController.createDriver);
router.get('/getDrivers', verifyJWT, verifyRoles('admin','user'), DriverController.getDriver);


module.exports = router;
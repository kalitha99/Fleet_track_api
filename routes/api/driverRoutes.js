const express = require('express');
const router = express.Router();
const DriverController = require("../../controllers/driverController")
const verifyJWT =require('../../middelware/verifyJWT')
const verifyRoles =require('../../middelware/verifyRoles')


router.post('/addNewDriver', verifyJWT, verifyRoles('admin'), DriverController.createDriver);
router.get('/getDrivers', verifyJWT, verifyRoles('admin','user'), DriverController.getDriver);
router.post('/getDriverById', verifyJWT, verifyRoles('admin','user','driver'), DriverController.getDriverById);
router.post('/searchDrivers', verifyJWT, verifyRoles('admin','user'), DriverController.searchDrivers);
router.post('/searchAssignedDrivers', verifyJWT, verifyRoles('admin','user'), DriverController.searchAssignedDrivers);
router.post('/assignVehicleToDriver', verifyJWT, verifyRoles('admin','user'), DriverController.assignVehicleToDriver);
router.post('/updateDriver', verifyJWT, verifyRoles('admin','driver'), DriverController.updateDriver);


module.exports = router;
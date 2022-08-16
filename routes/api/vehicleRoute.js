const express = require('express');
const router = express.Router();
const vehicleController = require("../../controllers/vehicleController")
const verifyJWT = require('../../middelware/verifyJWT')
const verifyRoles = require('../../middelware/verifyRoles')

router.post('/addNewVehicle', verifyJWT, verifyRoles('admin'), vehicleController.createVehicle);
router.get('/getVehicles', verifyJWT, verifyRoles('admin', 'user'), vehicleController.getVehicles);
router.post('/searchVehicles', verifyJWT, verifyRoles('admin', 'user'), vehicleController.searchVehicles);
router.post('/updateOdo', verifyJWT, verifyRoles('admin', 'user'), vehicleController.updateLatestOdoReading);
router.post('/updateRevenueLicense', verifyJWT, verifyRoles('admin', 'user'), vehicleController.enterRevenueLicenseDetails);
router.post('/updateInsuranceDetails', verifyJWT, verifyRoles('admin', 'user'), vehicleController.enterInsuranceDetails);


module.exports = router;
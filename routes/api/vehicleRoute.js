const express = require('express');
const router = express.Router();
const vehicleController = require("../../controllers/vehicleController")
const verifyJWT = require('../../middelware/verifyJWT')
const verifyRoles = require('../../middelware/verifyRoles')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
        console.log(file)
    }

})
const upload = multer({storage: storage})

router.post('/addNewVehicle', verifyJWT, verifyRoles('admin'), vehicleController.createVehicle);
router.get('/getVehicles', vehicleController.getVehicles);
router.post('/searchVehicles', verifyJWT, verifyRoles('admin', 'user'), vehicleController.searchVehicles);
router.post('/searchVehiclesAssignedDriver', verifyJWT, verifyRoles('admin', 'user'), vehicleController.searchVehiclesAssignedDriver);
router.post('/updateOdo', verifyJWT, verifyRoles('admin', 'user'), vehicleController.updateLatestOdoReading);
router.post('/updateRevenueLicense', verifyJWT, verifyRoles('admin', 'user'), upload.single("image"), vehicleController.enterRevenueLicenseDetails);
router.post('/updateInsuranceDetails', verifyJWT, verifyRoles('admin', 'user'), upload.single("image"), vehicleController.enterInsuranceDetails);
router.post('/updateVehicle', verifyJWT, verifyRoles('admin'), vehicleController.updateVehicle);
router.post('/getVehiclesWithExpenses', verifyJWT, verifyRoles('admin', 'user'), vehicleController.getVehiclesWithExpenses);


module.exports = router;
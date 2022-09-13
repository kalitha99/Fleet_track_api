const express = require('express');
const router = express.Router();
const vehicleExpenseController = require('./../../controllers/vehicleExpenseController')
const vehicleServiceExpenseController = require('./../../controllers/vehicleServiceExpenseController')
const vehicleFuelExpenseController = require('./../../controllers/fuelExpensesController')
const verifyJWT = require('../../middelware/verifyJWT')
const verifyRoles = require('../../middelware/verifyRoles')
const multer = require('multer')

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
        console.log(file)
    }

})
const upload = multer({storage:storage})


router.post('/addVehicleExpense',upload.single("image"), vehicleExpenseController.addVehicleExpense);
router.post('/addFuelExpense',upload.single("image"), vehicleFuelExpenseController.addFuelExpense);
router.post('/addVehicleServiceExpense',upload.single("image"), vehicleServiceExpenseController.addVehicleServiceExpense);
router.post('/getVehiclesWithExpenses',upload.single("image"), vehicleExpenseController.getVehiclesWithExpenses);

module.exports = router;
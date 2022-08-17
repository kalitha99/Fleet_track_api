const express = require('express');
const router = express.Router();
const vehicleExpenseController = require('./../../controllers/vehicleExpenseController')
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


router.post('/addVehicleExpense', verifyJWT, verifyRoles('admin', 'user'),upload.single("image"), vehicleExpenseController.addVehicleExpense);

module.exports = router;
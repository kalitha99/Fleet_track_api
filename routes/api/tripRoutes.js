const express = require('express');
const router = express.Router();
const TripController = require("../../controllers/TripController")
const verifyJWT =require('../../middelware/verifyJWT')
const verifyRoles =require('../../middelware/verifyRoles')


router.post('/addNewTrip', verifyJWT, verifyRoles('admin','user'), TripController.addNewTrip);
router.post('/cancelTrip', verifyJWT, verifyRoles('admin'), TripController.cancelTrip);
router.post('/getTrips', verifyJWT, verifyRoles('admin','user','driver'), TripController.getTrips);
router.post('/startTrip', verifyJWT, verifyRoles('admin','user','driver'), TripController.startTrip);
router.post('/endTrip', verifyJWT, verifyRoles('admin','user','driver'), TripController.endTrip);

module.exports = router;
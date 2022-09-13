const express = require('express');
const router = express.Router();
const authController = require('../../controllers/authController');
const verifyJWT =require('../../middelware/verifyJWT')
const verifyRoles =require('../../middelware/verifyRoles')

router.post('/login', authController.handleLogin);
router.post('/handleSignup', verifyJWT, verifyRoles('admin'), authController.handleSignup);
router.post('/updatePw', verifyJWT, verifyRoles('driver'), authController.updatePw);


module.exports = router;
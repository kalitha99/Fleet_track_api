const express = require('express');
const router = express.Router();
const qouteController = require('../../controllers/qouteController');
const verifyJWT =require('../../middelware/verifyJWT')
const verifyRoles =require('../../middelware/verifyRoles')

router.get('/', verifyJWT, verifyRoles('admin'), qouteController.getQoute);

module.exports = router;
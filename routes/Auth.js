const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
const { restrict } = require('../services/authhelper');

router.post('/signup', ctrl.auth.signup);
router.post('/login', ctrl.auth.login);
router.get('/verify', restrict,  ctrl.auth.verifyUser);

module.exports = router;

const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.post('/signup', ctrl.auth.signup);
router.post('/login', ctrl.auth.login);
router.get('/', ctrl.auth.verifyUser);
router.get('/signup', ctrl.auth.checkDuplicates);
router.get('/login', ctrl.auth.checkAccountType);
// router.get('/', ctrl.auth.isBusiness);

module.exports = router;
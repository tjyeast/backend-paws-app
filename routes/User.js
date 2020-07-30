const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
const { restrict } = require('../services/authhelper');

router.get('/profile', ctrl.user.getProfile);
router.get('/profile/descript/:id', ctrl.user.findUserDescription)
router.put('/profile/edit', restrict, ctrl.user.editUser);
router.get('/all', ctrl.user.showAllUsers);

module.exports = router;
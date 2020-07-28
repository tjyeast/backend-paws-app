const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.get('/profile', ctrl.user.getProfile);
router.put('/profile/edit', ctrl.user.editUser);
router.get('/all', ctrl.user.showAllUsers);

module.exports = router;
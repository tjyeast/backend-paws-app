const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
const { restrict } = require('../services/authhelper');

router.get('/all', ctrl.animal.showAllAnimals);
router.get('/:id', ctrl.animal.showAnimal);
router.post('/create', restrict, ctrl.animal.createAnimal);
router.get('/user/:id', restrict, ctrl.animal.findAnimalsByUser)
router.get('/description/:id', ctrl.animal.findAnimalDescription)
router.get('/type/:type', ctrl.animal.findAnimalsByType);
router.delete('/delete/:id', restrict, ctrl.animal.deleteAnimal);
router.put('/edit/:id', restrict, ctrl.animal.editAnimal);

module.exports = router;
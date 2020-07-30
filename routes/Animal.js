const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.get('/all', ctrl.animal.showAllAnimals);
router.get('/:id', ctrl.animal.showAnimal);
router.get('/user/:id', ctrl.animal.findAnimalsByUser)
router.get('/description/:id', ctrl.animal.findAnimalDescription)
router.get('/type/:type', ctrl.animal.findAnimalsByType);
router.post('/create', ctrl.animal.createAnimal);
router.delete('/delete/:id', ctrl.animal.deleteAnimal);
router.put('/edit/:id', ctrl.animal.editAnimal);

module.exports = router;
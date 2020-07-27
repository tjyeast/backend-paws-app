const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.post('/create', ctrl.animal.createAnimal);
router.get('/all', ctrl.animal.showAllAnimals);
router.get('/:id', ctrl.animal.showAnimal);
router.delete('/delete/:id', ctrl.animal.deleteAnimal);
router.put('/edit/:id', ctrl.animal.editAnimal);
router.get('/type/:type', ctrl.animal.findAnimalsByType);

module.exports = router;
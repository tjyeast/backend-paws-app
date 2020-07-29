const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.get('/', ctrl.animal.showAllAnimals);
router.get('/:id', ctrl.animal.showAnimal);
router.get('/type/:type', ctrl.animal.findAnimalsByType);
router.post('/create', ctrl.animal.createAnimal);
router.delete('/delete/:id', ctrl.animal.deleteAnimal);
router.put('/edit/:id', ctrl.animal.editAnimal);

module.exports = router;
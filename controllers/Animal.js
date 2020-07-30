const Animal = require('../models').Animal;
const User = require('../models').User;
const Description = require('../models').Description;

const createAnimal = (req, res) => {
	Animal.create(req.body, (err, createdAnimal) => {
		if(err){
			return res.status(500).json(err);
		}
		res.status(200).json(createdAnimal);
	});
}

const showAnimal = (req, res) => {
    Animal.findById(req.params.id)
    .populate('user')
    .populate('description')
    .exec((err, foundAnimal) => {
        if(err){
            return res.status(500).json(err);
        }
        res.status(200).json(foundAnimal);
    })
}

const showAllAnimals = (req, res) => {
    Animal.find({}, (err, foundAllAnimals) => {
        if(err){
            return res.status(500).json(err);
        }
        res.status(200).json(foundAllAnimals);
    })
}

const deleteAnimal = (req, res)=>{
	Animal.findByIdAndRemove(req.params.id, (err, deletedAnimal) => {
		if(err){
			return res.status(500).json(err);
		}
		res.status(200).json(deletedAnimal);
	});
}

const editAnimal = (req, res)=>{
	Animal.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedAnimal) => {
		if(err){
			return res.status(500).json(err);
		}
		res.status(200).json(updatedAnimal);
	});
}

const findAnimalsByType = (req, res) => {
	Animal.find({"type.type" : req.params.type}, (err, foundAllAnimals) => {
		if(err){
			return res.status(500).json(err);
		}
		res.status(200).json(foundAllAnimals)
	})
}

const findAnimalsByUser = (req, res) => {
	Animal.find({"user" : req.params.id}, (err, foundUserAnimals) => {
		if(err){
			return res.status(500).json(err);
		}
		res.status(200).json(foundUserAnimals)
	})
}

const findAnimalDescription = (req, res) => {
	Description.find({"animal" : req.params.id}, (err, foundAnimalDescription) => {
		if(err){
			return res.status(500).json(err);
		}
		res.status(200).json(foundAnimalDescription)
	})
}

module.exports = {
    createAnimal,
    showAnimal,
    showAllAnimals,
    deleteAnimal,
    editAnimal,
	findAnimalsByType,
	findAnimalsByUser,
	findAnimalDescription
}
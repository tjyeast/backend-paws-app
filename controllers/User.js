const User = require('../models').User;
const Description = require('../models').Description;
const Animal = require('../models').Animal;

const showAllUsers = (req, res)=>{
	User.find({}, (err, foundUsers) => {
		if(err){
			return res.status(500).json(err);
		}
        res.status(200).json(foundUsers);
	})
}


const getProfile = (req, res) => {
    User.findById(req.params.id)
    .populate('description')
    .populate('animal')
    .exec((err, foundUser) => {
        if(err){
            return res.status(500).json(err);
        }
        res.status(200).json(foundUser);
    })
}

const deleteUser = (req, res)=>{
	User.findByIdAndRemove(req.params.id, (err, deletedUser) => {
		if(err){
			return res.status(500).json(err);
		}
		res.status(200).json(deletedUser);
	});
}

const editUser = (req, res) => {
	User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedUser) => {
		if(err){
			return res.status(500).json(err);
		}
		res.status(200).json(updatedUser);
	});
}

const findUserDescription = (req, res) => {
	Description.find({"user" : req.params.id}, (err, foundUserDescription) => {
		if(err){
			return res.status(500).json(err);
		}
		res.status(200).json(foundUserDescription)
	})
}

const addUserDescription = (req, res) => {
	Description.create(req.body, (err, newDescription) => {
		if(err) {
			return res.status(500).json(err);
		}
		res.status(200).json(newDescription);
	})
}

module.exports={
    getProfile,
    deleteUser,
    editUser,
	showAllUsers,
	findUserDescription,
	addUserDescription
}

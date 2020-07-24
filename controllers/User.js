const User = require('../models').User;

const createUser = (req, res) => {
    User.create(req.body, (err, createdUser) => {
        if(err){
            return res.status(500).json(err);
        }
        res.status(200).json(createdUser);
    });
}

module.exports={
    createUser
}
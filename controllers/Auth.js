require('dotenv').config();

const User = require('../models').User;
// const constants = require('../constants');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = (req, res) => {
    User.create(req.body, (err, createdUser) => {
        if(err){
            return res.status(500).json(err)
        }
        res.status(200).json(createdUser);
    })
}
        

const login = (req, res) => {
    User.findOne(req.body.username, (err, foundUser) => {
        if(err){
            return res.status(500).json('no such user');
        }
        if(foundUser => {
            bcrypt.compare(req.body.password, foundUser.password) .then(match => {
                if(match) {
                    const token = jwt.sign(
                        {
                            username: foundUser.username,
                            id: foundUser.id
                        },
                        process.env.JWT_SECRET,
                        {
                            expiresIn: "30 days"
                        }
                    )
                    console.log(foundUser);
                    res.send(token);
                }else{
                    res.status(500).json(err);
                }
            })
        })
        res.send(200).json(foundUser);
    })
}

const verifyUser = (req, res) => {
    User.findById(req.params.id, {
        attributes: ['id']
    })
    .then(foundUser => {
        res.status(200).json(foundUser);
    })
    .catch(err => {
        res.status(500).json(err);
    }) 
}

const checkDuplicates = (req, res, next) => {
    User.findOne({
        username: req.body.username
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (user) {
            res.status(400).send({ message: "Username is already in use!"});
            return;
        }
        next();
    })
}

const checkAccountType = (req, res, next) => {
    if (req.body.accountType) {
        for (let i = 0; i < req.body.accountType.length; i++) {
            if (!accountType.includes(req.body.accountType[i])) {
                res.status(400).send({
                    message: `Account type ${req.body.accountType[i]} does not exist!`
                });
                return;
            }
        }
    }
    next();
}

module.exports = {
    signup,
    login,
    verifyUser,
    checkDuplicates,
    checkAccountType
}
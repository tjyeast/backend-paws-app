require('dotenv').config();

const User = require('../models').User;
// const constants = require('../constants');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = (req, res) => {
    User.create(req.body, (err, newUser) => {
        if(err){
            return res.status(500).json(err);
        }
        res.status(200).json(newUser);
        console.log(newUser);
    })
    if(newUser => {
        const token = jwt.sign(
            {
                username: newUser.username,
                id: newUser._id,
                accountType: newUser.accountType
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "30 days"
            }
        )
        res.status(200).json({
            "token" : token
        });
        res.status(200).json(newUser)
    })
    res.status(500).send("bad request")
}


        

const login = (req, res) => {
    User.findOne({username: req.body.username}, (err, foundUser) => {
        if(err) {
            return res.status(500).json("No such user");
        }
        console.log(foundUser);
    })
    .then(foundUser => {
        if(foundUser){
            bcrypt.compare(req.body.password, foundUser.password, (err, match) => {
                if(match){

                    const token = jwt.sign(
                        {
                            username: foundUser.username,
                            id: foundUser._id,
                            accountType: foundUser.accountType
                        },
                        process.env.JWT_SECRET,
                        {
                            expiresIn: "30 days"
                        }
                    )
                    res.status(200).json({
                        "token" : token
                    });
                } else {
                    res.status(500).send(`ERROR: Incorrect Username/Password`);
                }
            })
        }  
        else{
            res.status(500).send(`ERROR: Incorrect Username/Password`);
        }    
    })
    .catch(err => {
        res.status(500).json(err);
    })
}

// const verifyUser = (req, res) => {
//     User.findById(req.params.id, {
//         attributes: ['id']
//     })
//     .then(foundUser => {
//         res.status(200).json(foundUser);
//     })
//     .catch(err => {
//         res.status(500).json(err);
//     }) 
// }

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
    checkDuplicates,
    checkAccountType
}
require('dotenv').config();

const User = require('../models').User;

const bcrypt = require('bcrypt');
const { genToken } = require('../services/authhelper');

const buildAuthResponse = (user) => {
    const userData = {
      username: user.username,
      id: user._id,
    };
  
    const token = genToken(userData);
  
    return {
      user: userData,
      token,
    };
  };

const signup = (req, res) => {
    User.create(req.body, (err, newUser) => {
        if(err){
            return res.status(500).json(err);
        }
        console.log(newUser);
        const respData = buildAuthResponse(newUser);

        res.json(respData);
    })
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

                    const respData = buildAuthResponse(foundUser);
                    res.json(respData);
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

const verifyUser = (req, res) => {
    const user = res.locals.user;
    res.json(user);
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
    checkDuplicates,
    checkAccountType,
    verifyUser,
    buildAuthResponse
}
require('dotenv').config();

const User = require('../models').User;

const bcrypt = require('bcrypt');
const { genToken } = require('../services/authhelper');

const buildAuthResponse = (user) => {
    const userData = {
      name: user.name,
      username: user.username,
      email: user.email,
      type: user.type,
      id: user._id,

    };
  
    const token = genToken(userData);
  
    return {
      user: userData,
      token,
    };
  };

const signup = (req, res) => {
    req.body.accountType = req.body.type;
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


module.exports = {
    signup,
    login,
    verifyUser,
    buildAuthResponse
}
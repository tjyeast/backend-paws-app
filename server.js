require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const routes = require('./routes');

//middleware
app.use(bodyParser.json());

const verifyToken = (req, res, next) => {
    let token = req.headers['authorization'];
    if(token){
        token = token.substring(constants.BEARER_START_INDEX) //remove string Bearer from the token
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
        if(err || !decodedUser){
            return res.status(constants.UNAUTHORIZED).send(`ERROR: ${err}`);
        }
        req.user = decodedUser;//set the decoded payload to req object as the user information(username, id)

        next();// for cotrol to go to the next line of code
    })
}

app.use('/user', routes.user)

app.get('/', (req, res) => {
    res.send('Homepage');
})

app.use('/user', routes.user)

app.listen(process.env.PORT, () => {
    console.log(`I am listening on port ${process.env.PORT}`);
})


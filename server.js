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
    
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
            if(err || !decodedUser){
                return res.status(500).send("unauthorized");
            }
            req.user = decodedUser;//set the decoded payload to req object as the user information(username, id)

            next();// for cotrol to go to the next line of code
        })
    }
}

const isBusiness = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
  
      User.type.find(
        {
          _id: { $in: user.type }
        },
        (err, accountType) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
  
          for (let i = 0; i < accountType.length; i++) {
            if (accountType[i].type === "business") {
              next();
              return;
            }
          }
  
          res.status(403).send({ message: "Requires a business account" });
          return;
        }
      );
    });
  };


app.use('/user', routes.user);
app.use('/profile', verifyToken, routes.user);
app.use('/auth', routes.auth);
app.use('/animal', routes.animal);
app.use('/animal', verifyToken, isBusiness, routes.animal);
app.use('/post/edit', verifyToken, isBusiness, routes.post);
app.use('/post/delete', verifyToken, isBusiness, routes.post);
app.use('/post/create', verifyToken, isBusiness, routes.post);
app.use('/post', routes.post);

app.get('/', (req, res) => {
    res.send('Homepage');
})


app.listen(process.env.PORT, () => {
    console.log(`I am listening on port ${process.env.PORT}`);
})


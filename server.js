require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
const routes = require('./routes');

const corsOptions = {
  origin: ['http://localhost:3000'],
  methods: "GET,POST,PUT,DELETE",
  credentials: true, //allows session cookies to be sent back and forth
  optionsSuccessStatus: 200 //legacy browsers
}

//middleware
app.use(cors(corsOptions))
app.use(bodyParser.json());


  const business = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
      if(err) {
        res.status(500).send({ message: err });
        return;
      }
      //str.include("business") to match the type.... 
    })
  }

app.use('/user', routes.user);
app.use('/auth', routes.auth);
app.use('/animal', routes.animal);
app.use('/post', routes.post);

app.get('/', (req, res) => {
    res.send('Homepage');
})


app.listen(process.env.PORT, () => {
    console.log(`I am listening on port ${process.env.PORT}`);
})


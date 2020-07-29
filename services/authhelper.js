const jwt = require('jsonwebtoken');
require('dotenv').config();

const genToken = (data) => {
    const token = jwt.sign(data, process.env.JWT_SECRET);
    return token;
  };
  
  const restrict = (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const data = jwt.verify(token, process.env.JWT_SECRET);
      res.locals.user = data;
      next();
    } catch (e) {
      console.log(e);
      res.status(403).send('Unauthorized');
    }
  }

  module.exports = {
      genToken,
      restrict
  }
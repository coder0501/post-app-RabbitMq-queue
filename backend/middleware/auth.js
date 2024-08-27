// middleware/auth.js
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  console.log("token", token)
  // if (!token) {
  //   return res.status(401).json({ message: 'No token, authorization denied' });
  // }

  try {
    const decoded = jwt.verify(token, process.env.secret_key);
    console.log("decoded->", decoded);
    console.log(token, process.env.secret_key);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = auth;


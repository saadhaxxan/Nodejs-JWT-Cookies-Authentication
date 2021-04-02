const jwt = require("jsonwebtoken");
require("dotenv").config();

const Auth = async function (req, res, next) {
  try {
    const key = req.cookies.jwt;
    const verifyUser = jwt.verify(key, process.env.SECRET_KEY);
    console.log("Token Verified");
    next();
  } catch (error) {
    res.status(401).send(error);
  }
};

module.exports = Auth;

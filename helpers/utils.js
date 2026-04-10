const crypto = require('crypto');
const jwt = require("jsonwebtoken");

function isValidateEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

function validatePassword(password) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return regex.test(password);
}


const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
}


const generateAccessToken = (user) => {
  const token = jwt.sign(user, process.env.JWT_SEC)
  return token
}


module.exports = { isValidateEmail, validatePassword, generateOTP, generateAccessToken }
const jwt = require('jsonwebtoken');
const fs = require('fs');

const secret = fs.readFileSync('jwt.evaluation.key');

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const generateJWT = (user) => jwt.sign({ payload: { user } }, secret, jwtConfig);

const decodeJWT = (token) => jwt.decode(token, secret);

module.exports = {
  generateJWT,
  decodeJWT,
};

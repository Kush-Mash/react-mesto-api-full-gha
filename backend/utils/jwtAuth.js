const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET = 'key_key_key' } = process.env;

const checkToken = (token) => jwt.verify(token, NODE_ENV !== 'production' ? JWT_SECRET : 'dev-secret');

const signToken = (payload) => jwt.sign(payload, NODE_ENV !== 'production' ? JWT_SECRET : 'dev-secret');

module.exports = {
  checkToken,
  signToken,
};

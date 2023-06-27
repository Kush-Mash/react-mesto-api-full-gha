const mongoose = require('mongoose');
const { checkToken } = require('../utils/jwtAuth');
const UnauthorizedError = require('../errors/UnauthorizedError');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');

  try {
    const payload = checkToken(token);

    req.user = {
      _id: new mongoose.Types.ObjectId(payload._id),
    };
    next();
  } catch (err) {
    throw new UnauthorizedError('Пользователь не авторизован');
  }
};

module.exports = auth;

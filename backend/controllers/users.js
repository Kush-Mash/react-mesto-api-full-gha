const { default: mongoose } = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { signToken } = require('../utils/jwtAuth');

const MONGO_DUPLICATE_KEY_ERROR = 11000;
const SALT_ROUNDS = 10;

const ConflictError = require('../errors/ConflictError');
const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .orFail(() => {
      throw new Error('Unauthorized');
    })
    .then((user) => Promise.all([user, bcrypt.compare(password, user.password)]))
    .then(([user, isEqual]) => {
      if (!isEqual) {
        throw new UnauthorizedError('Пользователь не авторизован');
      }
      const token = signToken({ _id: user._id });
      res.send({ token });
    })
    .catch((err) => {
      if (err.message === 'Unauthorized') {
        next(new UnauthorizedError('Пользователь не авторизован'));
      } else {
        next(err);
      }
    });
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    email, password, name, about, avatar,
  } = req.body;

  bcrypt.hash(password, SALT_ROUNDS).then((hash) => {
    User.create({
      email, password: hash, name, about, avatar,
    })
      .then(() => {
        res.status(201).send({
          email, name, about, avatar,
        });
      })
      .catch((err) => {
        if (err instanceof mongoose.Error.ValidationError) {
          next(new ValidationError('Переданы некорректные данные при создании пользователя'));
        } else if (err.code === MONGO_DUPLICATE_KEY_ERROR) {
          next(new ConflictError('Такой пользователь уже существует'));
        } else {
          next(err);
        }
      });
  })
    .catch(next);
};

const getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError('Пользователь с указанным id не найден'));
      } else if (err instanceof mongoose.Error.CastError) {
        next(new ValidationError('Передан некорректный id'));
      } else {
        next(err);
      }
    });
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с указанным id не найден');
      } else {
        res.send({ user });
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new ValidationError('Переданы некорректные данные при обновлении профиля'));
      } else {
        next(err);
      }
    });
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с указанным id не найден');
      } else {
        res.send({ user });
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new ValidationError('Переданы некорректные данные при обновлении аватара'));
      } else {
        next(err);
      }
    });
};

const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId).then((user) => {
    if (!user) {
      throw new NotFoundError('Пользователь не найден');
    }
    res.send(user);
  })
    .catch(next);
};

module.exports = {
  login,
  getUsers,
  createUser,
  getUserById,
  updateUser,
  updateUserAvatar,
  getCurrentUser,
};

const mongoose = require('mongoose');
const validator = require('validator');

const { ObjectId } = mongoose.Schema.Types;

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Обязательное поле'],
    minlength: [2, 'Минимальная длина названия - 2'],
    maxlength: [30, 'Максимальная длина поля названия - 30'],
  },
  link: {
    type: String,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL',
    },
    required: [true, 'Обязательное поле'],
  },
  owner: {
    type: ObjectId,
    ref: 'user',
    required: [true, 'Обязательное поле'],
  },
  likes: [{
    type: ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);

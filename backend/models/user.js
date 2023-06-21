const mongoose = require('mongoose');
const validator = require('validator');
const isEmail = require('validator/lib/isEmail');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    required: [true, 'Обязательное поле'],
    select: false, // по умолчанию хеш пароля пользователя не будет возвращаться из базы
  },
  name: {
    type: String,
    minlength: [2, 'Минимальная длина имени - 2'],
    maxlength: [30, 'Максимальная длина имени - 30'],
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: [2, 'Минимальная длина описания - 2'],
    maxlength: [30, 'Максимальная длина описания - 30'],
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate(value) {
      if (!validator.isURL(value)) {
        throw new Error('Некорректный URL');
      }
    },
  },
}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);

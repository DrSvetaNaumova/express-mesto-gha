const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Поле "имя" должно быть заполнено'],
      minLength: [2, 'Минимальная длина поля "имя" - 2'],
      maxLength: [30, 'Максимальная длина поля "имя" - 30'],
    },

    about: {
      type: String,
      required: [true, 'Поле "о себе" должно быть заполнено'],
      minLength: [2, 'Минимальная длина поля "имя" - 2'],
      maxLength: [30, 'Максимальная длина поля "имя" - 30'],
    },

    avatar: {
      type: String,
      required: [true, 'Поле "ссылка на аватар" должно быть заполнено'],
      validate: {
        validator: (v) => validator.isURL(v),
        message: 'Некорректная ссылка',
      },
    },
  },

  { versionKey: false },
);

module.exports = mongoose.model('user', userSchema);

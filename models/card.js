const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Поле "название" должно быть заполнено'],
      minLength: [2, 'Минимальная длина поля "название" - 2'],
      maxLength: [30, 'Максимальная длина поля "название" - 30'],
    },

    link: {
      type: String,
      required: [true, 'Поле "ссылка на картинку" должно быть заполнено'],
      validate: {
        validator: (v) => validator.isURL(v),
        message: 'Некорректная ссылка',
      },
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    likes: {
      type: mongoose.Schema.Types.Array,
      default: [],
    },

    createdAt: {
      type: Date,
      default: Date.now,
      required: true,
    },
  },

  { versionKey: false },
);

module.exports = mongoose.model('card', cardSchema);

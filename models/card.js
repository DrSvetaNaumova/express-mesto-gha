const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле должно быть заполнено'],
    minLength: [2, 'Поле должно содержать не меньше 2 знаков'],
    maxLength: [30, 'Поле должно содержать не больше 30 знаков'],
  },

  link: {
    type: String,
    required: [true, 'Поле должно быть заполнено'],
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
});

module.exports = mongoose.model('card', cardSchema);

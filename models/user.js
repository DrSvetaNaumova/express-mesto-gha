const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле должно быть заполнено'],
    minLength: [2, 'Поле должно содержать не меньше 2 знаков'],
    maxLength: [30, 'Поле должно содержать не больше 30 знаков'],
  },

  about: {
    type: String,
    required: [true, 'Поле должно быть заполнено'],
    minLength: [2, 'Поле должно содержать не меньше 2 знаков'],
    maxLength: [30, 'Поле должно содержать не больше 30 знаков'],
  },

  avatar: {
    type: String,
    required: [true, 'Поле должно быть заполнено'],
  },
});

module.exports = mongoose.model('user', userSchema);

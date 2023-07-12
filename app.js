const express = require('express');

const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;

const app = express();

// const path = require('path');

// app.use(express.static(path.join(__dirname, 'public')));

const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

// временное решение авторизации, добавляет в каждый запрос объект user
app.use((req, res, next) => {
  req.user = {
    _id: '64aad88f661de3020b0e5b2f',
  };

  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.get('/', (_req, res) => {
  res.send('hello 123');
});

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});

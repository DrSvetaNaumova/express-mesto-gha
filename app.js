const express = require('express');

const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;

const app = express();

// const path = require('path');

// app.use(express.static(path.join(__dirname, 'public')));

const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

const { errors } = require('celebrate');

const auth = require('./middlewares/auth');

const { logErrors, errorHandler } = require('./middlewares/errors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signup', require('./routes/signup'));
app.post('/signin', require('./routes/login'));

app.use(auth);
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

// app.get('/', (_req, res) => {
//   res.send('hello');
// });

app.use('*', require('./routes/page404'));

app.use(errors());

app.use(logErrors);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});

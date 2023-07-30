const express = require('express');

// const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;

const app = express();

const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

const { errors } = require('celebrate');

// const auth = require('./middlewares/auth');

const { errorHandler, logErrors } = require('./middlewares/errors');
const router = require('./routes/index');

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// В последних версиях ExpressJS пакет body-parser уже встроен во фреймворк

app.use(express.json());

app.use(router);

// app.post('/signup', require('./routes/signup'));
// app.post('/signin', require('./routes/login'));
// app.use('/users', auth, require('./routes/users'));
// app.use('/cards', auth, require('./routes/cards'));
// app.use('*', require('./routes/page404'));

app.use(errors());

app.use(logErrors, errorHandler);

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});

const express = require('express');

const { PORT = 3000 } = process.env;

const app = express();

const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

const { errors } = require('celebrate');

const { errorHandler, logErrors } = require('./middlewares/errors');
const router = require('./routes/index');

app.use(express.json());

app.use(router);

app.use(errors());

app.use(logErrors, errorHandler);

// app.listen(PORT, () => {
//   console.log(`App is running on port ${PORT}`);
// });

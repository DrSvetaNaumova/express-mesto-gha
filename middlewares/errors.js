const CustomError = require('../errors/CustomError');

function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}

function errorHandler(err, req, res, next) {
  if (err instanceof CustomError) { // проверка, что это моя типизированная ошибка
    res.status(err.statusCode).send({
      message: err.message,
    });
  } else {
    res.status(500).send({
      message: 'Произошла внутренняя ошибка на сервере',
    });
  }
}

module.exports = { logErrors, errorHandler };

// if (err.name === 'DocumentNotFoundError') {
//   res.status(404).send({
//     message: 'Объект с указанным id не существует.',
//   });
// }

// if (err.code === 11000) {
//   res.status(409).send({
//     message: 'Пользователь с данным email уже зарегистрирован.',
//   });
// }

// if (err.name === 'ValidationError' || err.name === 'CastError') {
//   res.status(400).send({
//     message: 'Переданы некорректные данные объекта.',
//   });
// } else {
//   res.status(500).send({
//     message: 'Произошла внутренняя ошибка на сервере',
//   });
// }

module.exports = { logErrors, errorHandler };

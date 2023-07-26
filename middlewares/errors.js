function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}

function errorHandler(err, req, res, _next) {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Произошла внутренняя ошибка на сервере';

  res.status(statusCode).send({
    message,
  });
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
}

module.exports = { logErrors, errorHandler };

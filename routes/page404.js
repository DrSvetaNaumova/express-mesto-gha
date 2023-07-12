const router = require('express').Router();

router.all('*', (_req, res) => {
  res.status(404).send({ message: 'Нет такой страницы!' });
});

module.exports = router;

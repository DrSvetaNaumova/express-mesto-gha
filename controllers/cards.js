const Card = require('../models/card');

module.exports.getAllCards = (_req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({
          message: 'Переданы некорректные данные при создании карточки.',
        });
      }
      return res.status(500).send({ message: 'Произошла ошибка.' });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail()
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({
          message: 'Карточка с указанным id не найдена.',
        });
      }
      if (err.name === 'CastError') {
        return res.status(400).send({
          message: 'Переданы несуществующие данные для постановки лайка.',
        });
      }
      return res.status(500).send({ message: 'Произошла ошибка.' });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true }
  )
    .orFail()
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({
          message: 'Карточка с указанным id не найдена.',
        });
      }
      if (err.name === 'CastError') {
        return res.status(400).send({
          message: 'Переданы несуществующие данные для снятия лайка.',
        });
      }
      return res.status(500).send({ message: 'Произошла ошибка.' });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail()
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({
          message: 'Карточка с указанным id не найдена.',
        });
      }
      if (err.name === 'CastError') {
        res
          .status(400)
          .send({ message: 'Переданы некорректные данные карточки.' });
      }
      return res.status(500).send({ message: 'Произошла ошибка.' });
    });
};

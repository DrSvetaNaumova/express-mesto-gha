const Card = require('../models/card');
const NotFoundDataError = require('../errors/NotFoundDataError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.getAllCards = async (_req, res, next) => {
  try {
    const cards = await Card.find({});
    return res.send({ data: cards });
  } catch (err) {
    return next(err);
  }
};

// module.exports.getAllCards = (_req, res) => {
//   Card.find({})
//     .then((cards) => res.send({ data: cards }))
//     .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
// };

module.exports.createCard = async (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  try {
    const card = await Card.create({ name, link, owner });
    return res.status(201).send({ data: card });
  } catch (err) {
    return next(err);
  }
};

// module.exports.createCard = (req, res) => {
//   const { name, link } = req.body;
//   const owner = req.user._id;

//   Card.create({ name, link, owner })
//     .then((card) => res.status(201).send({ data: card }))
//     .catch((err) => {
//       if (err.name === 'ValidationError') {
//         return res.status(400).send({
//           message: 'Переданы некорректные данные при создании карточки.',
//         });
//       }
//       return res.status(500).send({ message: 'Произошла ошибка.' });
//     });
// };

module.exports.likeCard = async (req, res, next) => {
  try {
    let card;
    try {
      card = await Card.findByIdAndUpdate(
        req.params.cardId,
        { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
        { new: true },
      ).orFail();
    } catch (err) {
      if (!card) {
        throw new NotFoundDataError('Карточка не существует.');
      } else {
        throw err;
      }
    }
    return res.status(200).send(card);
  } catch (err) {
    return next(err);
  }
};

// module.exports.likeCard = async (req, res, next) => {
//   try {
//     const card = await Card.findByIdAndUpdate(
//       req.params.cardId,
//       { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
//       { new: true },
//     ).orFail();
//     return res.status(200).send(card);
//   } catch (err) {
//     return next(err);
//   }
// };

// module.exports.likeCard = (req, res) => {
//   Card.findByIdAndUpdate(
//     req.params.cardId,
//     { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
//     { new: true },
//   )
//     .orFail()
//     .then((card) => res.status(200).send(card))
//     .catch((err) => {
//       if (err.name === 'DocumentNotFoundError') {
//         return res.status(404).send({
//           message: 'Карточка с указанным id не найдена.',
//         });
//       }
//       if (err.name === 'CastError') {
//         return res.status(400).send({
//           message: 'Переданы несуществующие данные для постановки лайка.',
//         });
//       }
//       return res.status(500).send({ message: 'Произошла ошибка.' });
//     });
// };

module.exports.dislikeCard = async (req, res, next) => {
  try {
    let card;
    try {
      card = await Card.findByIdAndUpdate(
        req.params.cardId,
        { $pull: { likes: req.user._id } }, // убрать _id из массива
        { new: true },
      ).orFail();
    } catch (err) {
      if (!card) {
        throw new NotFoundDataError('Карточка не существует.');
      } else {
        throw err;
      }
    }
    return res.status(200).send(card);
  } catch (err) {
    return next(err);
  }
};

// module.exports.dislikeCard = async (req, res, next) => {
//   try {
//     const card = await Card.findByIdAndUpdate(
//       req.params.cardId,
//       { $pull: { likes: req.user._id } }, // убрать _id из массива
//       { new: true }
//     ).orFail();
//     return res.status(200).send(card);
//   } catch (err) {
//     return next(err);
//   }
// };

// module.exports.dislikeCard = (req, res) => {
//   Card.findByIdAndUpdate(
//     req.params.cardId,
//     { $pull: { likes: req.user._id } }, // убрать _id из массива
//     { new: true },
//   )
//     .orFail()
//     .then((card) => res.status(200).send(card))
//     .catch((err) => {
//       if (err.name === 'DocumentNotFoundError') {
//         return res.status(404).send({
//           message: 'Карточка с указанным id не найдена.',
//         });
//       }
//       if (err.name === 'CastError') {
//         return res.status(400).send({
//           message: 'Переданы несуществующие данные для снятия лайка.',
//         });
//       }
//       return res.status(500).send({ message: 'Произошла ошибка.' });
//     });
// };

module.exports.deleteCard = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.cardId).orFail();
    if (!card) {
      throw new NotFoundDataError('Карточка не существует.');
    }
    if (String(card.owner) !== String(req.user._id)) {
      throw new ForbiddenError('Нет прав для удаления карточки.');
    }
    await Card.findByIdAndRemove(req.params.cardId).orFail();
    return res.status(200).send(card);
  } catch (err) {
    return next(err);
  }
};

// module.exports.deleteCard = async (req, res, next) => {
//   try {
//     const card = await Card.findById(req.params.cardId).orFail();

//     if (!card.owner.equals(req.user._id)) {
//       return res
//         .status(403)
//         .send({ message: 'Нет прав для удаления карточки' });
//     }
//     await Card.findByIdAndRemove(req.params.cardId).orFail();
//     return res.status(200).send(card);
//   } catch (err) {
//     return next(err);
//   }
// };

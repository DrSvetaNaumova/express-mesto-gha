const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getAllCards,
  createCard,
  likeCard,
  dislikeCard,
  deleteCard,
} = require('../controllers/cards');

// возвращает все карточки
router.get('/', getAllCards);

// создаёт карточку
router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      link: Joi.string().pattern(/^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*$/),
    }),
  }),
  createCard,
);

// ставит лайк
router.put('/:cardId/likes', likeCard);

// удаляет лайк
router.delete('/:cardId/likes', dislikeCard);

// удаляет карточку
router.delete('/:cardId', deleteCard);

module.exports = router;

const router = require('express').Router();

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
router.post('/', createCard);

// ставит лайк
router.put('/:cardId/likes', likeCard);

// удаляет лайк
router.delete('/:cardId/likes', dislikeCard);

// удаляет карточку
router.delete('/:cardId', deleteCard);

module.exports = router;

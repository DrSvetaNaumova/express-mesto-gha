const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getAllUsers,
  getCurrentUserInfo,
  getUserById,
  updateUserNameAndAbout,
  updateUserAvatar,
} = require('../controllers/users');

// возвращает всех пользователей
router.get('/', getAllUsers);

// возвращает текущего пользователя
router.get('/me', getCurrentUserInfo);

// возвращает пользователя по _id
router.get(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().length(24).hex().required(),
    }),
  }),
  getUserById,
);

// обновляет профиль пользователя
router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  updateUserNameAndAbout,
);

// обновляет аватар пользователя
router.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      // avatar: Joi.string().pattern(^(https?:\/\/)? ([\w-]{1,32}\.[\w-]{1,32})[^\s@]*$),
      avatar: Joi.string().pattern(/^(https?:\/\/)? ([\w-]{1,32}\.[\w-]{1,32})[^\s@]*$/),
    }),
  }),
  updateUserAvatar,
);

module.exports = router;

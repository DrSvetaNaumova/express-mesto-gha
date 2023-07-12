const router = require('express').Router();

const { getAllUsers, createUser, getUserById, updateUserNameAndAbout, updateUserAvatar } = require('../controllers/users');

// возвращает всех пользователей
router.get('/', getAllUsers);

// создаёт пользователя
router.post('/', createUser);

// возвращает пользователя по _id
router.get('/:userId', getUserById);

// обновляет профиль пользователя
router.patch('/me', updateUserNameAndAbout);

// обновляет аватар пользователя
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;

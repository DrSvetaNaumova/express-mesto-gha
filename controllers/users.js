const User = require('../models/user');
const InaccurateDataError = require('../errors/InaccurateDataError');

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    return res.send({ data: users });
  } catch (err) {
    return next(err);
  }
};

// module.exports.getAllUsers = (req, res) => {
//   User.find({})
//     .then((users) => res.send({ data: users }))
//     .catch(() => res.status(500).send({ message: 'Произошла ошибка.' }));
// };

// module.exports.updateUserNameAndAbout = async (req, res, next) => {
//   const { name, about } = req.body;
//   try {
//     let user;
//     try {
//       user = await User.findByIdAndUpdate(
//         req.user._id,
//         { name, about },
//         { new: true, runValidators: true },
//       ).orFail();
//     } catch (err) {
//       if (err.name === 'ValidationError') {
//         throw new InaccurateDataError(
//           'Переданы некорректные данные при обновлении данных пользователя.',
//         );
//       } else {
//         throw err;
//       }
//     }
//     return res.status(200).send(user);
//   } catch (err) {
//     return next(err);
//   }
// };

module.exports.updateUserNameAndAbout = async (req, res, next) => {
  const { name, about } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    )
      .orFail();
    return res.status(200).send(user);
  } catch (err) {
    return next(err);
  }
};


// module.exports.updateUserNameAndAbout = (req, res) => {
//   const { name, about } = req.body;

//   User.findByIdAndUpdate(
//     req.user._id,
//     { name, about },
//     { new: true, runValidators: true },
//   )
//     .orFail()
//     .then((user) => res.status(200).send(user))
//     .catch((err) => {
//       if (err.name === 'ValidationError') {
//         return res.status(400).send({
//           message:
//             'Переданы некорректные данные при обновлении данных пользователя.',
//         });
//       }
//       return res.status(500).send({ message: 'Произошла ошибка.' });
//     });
// };

module.exports.updateUserAvatar = async (req, res, next) => {
  const { avatar } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true }
    ).orFail();
    return res.status(200).send(user);
  } catch (err) {
    return next(err);
  }
};

// module.exports.updateUserAvatar = (req, res) => {
//   const { avatar } = req.body;

//   User.findByIdAndUpdate(
//     req.user._id,
//     { avatar },
//     { new: true, runValidators: true },
//   )
//     .orFail()
//     .then((user) => res.status(200).send(user))
//     .catch((err) => {
//       if (err.name === 'ValidationError') {
//         return res.status(400).send({
//           message: 'Переданы некорректные данные при обновлении аватара.',
//         });
//       }
//       return res.status(500).send({ message: 'Произошла ошибка.' });
//     });
// };

module.exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId).orFail();
    return res.status(200).send(user);
  } catch (err) {
    return next(err);
  }
};

// module.exports.getUserById = (req, res) => {
//   User.findById(req.userId)
//     .orFail()
//     .then((user) => res.status(200).send(user))
//     .catch((err) => {
//       if (err.name === 'CastError') {
//         return res
//           .status(400)
//           .send({ message: 'Переданы некорректные данные id пользователя.' });
//       }
//       if (err.name === 'DocumentNotFoundError') {
//         return res.status(404).send({ message: 'Пользователь не существует.' });
//       }
//       return res.status(500).send({ message: 'Произошла ошибка.' });
//     });
// };

module.exports.getCurrentUserInfo = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).orFail();
    return res.status(200).send(user);
  } catch (err) {
    return next(err);
  }
};

// module.exports.getCurrentUserInfo = (req, res) => {
//   User.findById(req.user._id)
//     .orFail()
//     .then((user) => res.status(200).send(user))
//     .catch((err) => {
//       if (err.name === 'CastError') {
//         return res
//           .status(400)
//           .send({ message: 'Переданы некорректные данные id пользователя.' });
//       }
//       if (err.name === 'DocumentNotFoundError') {
//         return res.status(404).send({ message: 'Пользователь не существует.' });
//       }
//       return res.status(500).send({ message: 'Произошла ошибка.' });
//     });
// };

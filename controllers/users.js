const User = require('../models/user');
const NotFoundDataError = require('../errors/NotFoundDataError');

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    return res.send({ data: users });
  } catch (err) {
    return next(err);
  }
};

module.exports.updateUserNameAndAbout = async (req, res, next) => {
  const { name, about } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    ).orFail();
    return res.status(200).send(user);
  } catch (err) {
    return next(err);
  }
};

module.exports.updateUserAvatar = async (req, res, next) => {
  const { avatar } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    ).orFail();
    return res.status(200).send(user);
  } catch (err) {
    return next(err);
  }
};

module.exports.getUserById = async (req, res, next) => {
  try {
    let user;
    try {
      user = await User.findById(req.params.userId).orFail();
    } catch (err) {
      if (!user) {
        throw new NotFoundDataError('Пользователь не существует.');
      } else {
        throw err;
      }
    }
    return res.status(200).send(user);
  } catch (err) {
    return next(err);
  }
};

module.exports.getCurrentUserInfo = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).orFail();
    return res.status(200).send(user);
  } catch (err) {
    return next(err);
  }
};

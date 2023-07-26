const bcrypt = require('bcryptjs');
const User = require('../models/user');

module.exports.createUser = async (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    });
    return res
      .status(201)
      .send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      });
  } catch (err) {
    return next(err);
  }
};

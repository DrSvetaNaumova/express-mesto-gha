const jwt = require('jsonwebtoken');

const User = require('../models/user');

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
    return res.status(200).send({ token });
  } catch (err) {
    return res.status(401).send({ message: 'Ошибка авторизации' });
  }
};

// module.exports.login = (req, res) => {
//   const { email, password } = req.body;

//   return User.findUserByCredentials(email, password)
//     .then((user) => {
//       const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
//       res.send({ token });
//     })
//     .catch(() => {
//       res
//         .status(401)
//         .send({ message: 'Ошибка авторизации' });
//     });
// };

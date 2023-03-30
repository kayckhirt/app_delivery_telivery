const md5 = require('md5');
const usersService = require('../services/users.service');
const { generateJWT } = require('../auth/jwt.auth');

// const { CustomError } = require('../errors/custom.error');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await usersService.getByEmail(email, password);
    return res.status(200).json({ token });
  } catch (err) {
     next(err);
  }
};

const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    await usersService.create({ name, email, password: md5(password), role });
    return res.status(201).json({ token: generateJWT({ email, password, role }) });
  } catch (err) {
    next(err);
  }
};

const getByToken = async (req, res, next) => {
  try {
    const { user } = req.body;
    // const result = await usersService.getByToken(user);
    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// const getById = async (req, res, next) => {
//   try {
//     return res.status(200).json();
//   } catch (err) {
//     next(err);
//   }
// };

// const getAll = async (_req, res, next) => {
//   try {
//     return res.status(200).json();
//   } catch (err) {
//     next(err);
//   }
// };

module.exports = {
  login,
  register,
  getByToken,
  // getById,
  // getAll,
};

const md5 = require('md5');
const usersService = require('../services/users.service');
const { generateJWT } = require('../auth/jwt.auth');

// const { CustomError } = require('../errors/custom.error');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await usersService.getByEmail(email, password);
    return res.status(200).json(user);
  } catch (err) {
     next(err);
  }
};

const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const id = await usersService.create({ name, email, password: md5(password), role });
    return res.status(201).json({ token: generateJWT({ email, password, role, id }) });
  } catch (err) {
    next(err);
  }
};

const getAllSellers = async (_req, res, next) => {
  try {
  const sellers = await usersService.getAllSellers();
  return res.status(200).json(sellers);
} catch (err) {
  next(err);
}
};

module.exports = {
  login,
  register,
  getAllSellers,
};

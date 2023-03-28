// const usersService = require('../services/users.service');

// const { CustomError } = require('../errors/custom.error');

const login = async (req, res, next) => {
  try {
return res.status(200).json(req.body);
  } catch (err) {
     next(err);
  }
};

const register = async (req, res, next) => {
  try {
    return res.status(201).json();
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
  // getById,
  // getAll,
};

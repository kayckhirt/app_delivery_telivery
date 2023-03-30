const md5 = require('md5');
const { generateJWT } = require('../auth/jwt.auth');
const { User } = require('../database/models');
const { CustomError } = require('../errors/custom.error');

const getByEmail = async (email, password) => {
  const result = await User.findOne({ where: { email } });
  if (!result) throw CustomError('404', 'Email e/ou senha inválidos');
  if (result.password !== md5(password)) throw CustomError('404', 'Email e/ou senha inválidos');
  delete result.password;
  return generateJWT(result.dataValues);
};

const create = async ({ name, email, password, role }) => {
  const user = await User.findOne({ where: { email } });
  if (user) throw CustomError('409', 'O usuário já existe');
  await User.create({ name, email, password, role });
};

const getAll = async () => {};

module.exports = {
  getByEmail,
  create,
  getAll,
};

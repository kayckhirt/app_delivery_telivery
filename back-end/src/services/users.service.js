const md5 = require('md5');
const { generateJWT, decodeJWT } = require('../auth/jwt.auth');
const { User } = require('../database/models');
const { CustomError } = require('../errors/custom.error');

const getByEmail = async (email, password) => {
  const result = await User.findOne({ where: { email } });
  if (!result) throw CustomError('404', 'Email e/ou senha inválidos');
  if (result.password !== md5(password)) throw CustomError('404', 'Email e/ou senha inválidos');
  delete result.password;
  return generateJWT(result.dataValues);
};

const getByUserId = async (id) => {
  const result = await User.findByPk({ where: { id } });
  if (!result) throw CustomError('404', 'Usuário inexistente');
  if (result.password !== md5(result.dataValues.password)) { 
    throw CustomError('404', 'Login invalido'); 
}
  delete result.dataValues.password;
  return generateJWT(result.dataValues);
};

const create = async ({ name, email, password, role }) => {
  const user = await User.findOne({ where: { email } });
  if (user) throw CustomError('409', 'O usuário já existe');
  await User.create({ name, email, password, role });
};

const getAll = async () => {};

const getByToken = async (token) => {
  const payload = decodeJWT(token);
  console.log(payload);
  const user = await User.findOne({ where: { ...payload } }, {
    attributes: {
      exclude: ['password'],
    },
  });
  return user;
};

module.exports = {
  getByEmail,
  getByUserId,
  create,
  getAll,
  getByToken,
};

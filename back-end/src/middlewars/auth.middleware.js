const CustomError = require('../errors/custom.error');
const { decodeJWT } = require('../auth/jwt.auth');
const UsersService = require('../services/users.service');

module.exports = async (req, _res, next) => {
   const { authorization: token } = req.headers;
   try {
     if (!token) throw CustomError('401', 'Token not found');
    const decode = decodeJWT(token);

    if (!decode) { throw CustomError('401', 'Expired or invalid token'); }

    const user = await UsersService.getByUserId(decode.payload.user.id);
    if (!user) {
      throw CustomError('401', 'Erro ao procurar usuário do token'); 
    } 
    req.body.user = user;
    next();
   } catch (err) {
    next(err);
   }
};

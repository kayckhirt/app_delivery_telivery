const { CustomError } = require('../errors/custom.error');

module.exports = async (req, _res, next) => {
  try {
    const { name, price, urlImage } = req.body;

    if (!name) throw CustomError('400', 'name is required');

    if (!price) throw CustomError('400', 'price is required');

    if (!urlImage) throw CustomError('400', 'urlImage is required');

   next();
  } catch (err) {
   next(err);
  }
};

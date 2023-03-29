const CustomError = (statusCode, message) => {
  const error = new Error(message);
  const errorWithStatusCode = Object.assign(error, { statusCode });
  return errorWithStatusCode;
};

module.exports = {
  CustomError,
};

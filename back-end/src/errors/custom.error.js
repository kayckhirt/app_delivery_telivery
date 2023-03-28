const CustomError = (statusCode, message) => {
  const error = new Error(message);
  error.stack = statusCode;
  return error;
};

module.exports = {
  CustomError,
};

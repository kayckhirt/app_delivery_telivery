module.exports = (error, _req, res, _next) => {
  const { statusCode = 500, message } = error;
  console.log('oi');
  return res.status(Number(statusCode)).json({ message });
}; 

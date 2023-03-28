module.exports = (error, _req, res, _next) => {
  const { stack = 500, message } = error;
  return res.status(Number(stack)).json({ message });
}; 

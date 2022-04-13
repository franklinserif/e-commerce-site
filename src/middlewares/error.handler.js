function logError(err, res, req, next) {
  console.log(`%cI ⚠️ ${err} `, 'color: red');
  next(err);
}

function errorHandler(err, res, req, next) {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

function boomErrorHandler(err, res, req, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }
  next(err);
}

module.exports = { logError, errorHandler, boomErrorHandler };

const mongoose = require('mongoose');

const STATUS_BAD_REQUEST = 400;
// const STATUS_UNAUTHORIZED = 401;
// const STATUS_FORBIDDEN = 403;
const STATUS_NOT_FOUND = 404;
const STATUS_CONFLICT = 409;
const STATUS_INTERNAL_SERVER_ERROR = 500;
const { CastError, ValidationError, DocumentNotFoundError } = mongoose.Error;
const ForbiddenError = require('./forbidden_error');
const UnauthorizedError = require('./unauthorized_error');

const handleErrors = (err, res) => {
  if (err instanceof DocumentNotFoundError) {
    return res.status(STATUS_NOT_FOUND).send({ message: 'Данные не найдены!' });
  }
  if (err instanceof CastError || err instanceof ValidationError) {
    return res.status(STATUS_BAD_REQUEST).send({ message: 'Некорректные данные!' });
  }
  if (err.code === 11000) {
    return res.status(STATUS_CONFLICT).send({ message: 'Пользователь с таким email уже существует. Пожалуйста, используйте другой email.' });
  }
  if (err instanceof UnauthorizedError || err instanceof ForbiddenError) {
    return res.status(err.statusCode).send({ message: err.message });
  }
  return res.status(STATUS_INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка!' });
};

module.exports = { handleErrors, UnauthorizedError };

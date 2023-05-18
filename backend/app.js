const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const router = require('./routes/index');
const { handleErrors } = require('./errors/erorrs');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { DocumentNotFoundError } = mongoose.Error;
const { PORT = 3000 } = process.env;
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
});

const allowList = ['http://mesto.alisakrasnopolina.nomoredomains.monster',
  'http://mesto.alisakrasnopolina.nomoredomains.monster',
  'http://mesto.alisakrasnopolina.nomoredomains.monster/signin',
  'http://mesto.alisakrasnopolina.nomoredomains.monster/signup',
  'http://mesto.alisakrasnopolina.nomoredomains.monster/users/me',
  'http://mesto.alisakrasnopolina.nomoredomains.monster/users',
  'http://mesto.alisakrasnopolina.nomoredomains.monster/users/avatar',
  'http://mesto.alisakrasnopolina.nomoredomains.monster/cards',
  'http://mesto.alisakrasnopolina.nomoredomains.monster/cards/:cardId/likes',
  'http://mesto.alisakrasnopolina.nomoredomains.monster/cards/:cardId',
  'https://mesto.alisakrasnopolina.nomoredomains.monster',
  'https://mesto.alisakrasnopolina.nomoredomains.monster/signin',
  'https://mesto.alisakrasnopolina.nomoredomains.monster/signup',
  'https://mesto.alisakrasnopolina.nomoredomains.monster/users/me',
  'https://mesto.alisakrasnopolina.nomoredomains.monster/users',
  'https://mesto.alisakrasnopolina.nomoredomains.monster/users/avatar',
  'https://mesto.alisakrasnopolina.nomoredomains.monster/cards',
  'https://mesto.alisakrasnopolina.nomoredomains.monster/cards/:cardId/likes',
  'https://mesto.alisakrasnopolina.nomoredomains.monster/cards/:cardId',
];

// const corsOptions = {
//   origin: true,
//   methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
//   allowedHeaders: ['Content-type', 'Authorization'],
//   credentials: true,
//   preflightContinue: false,
//   optionsSuccessStatus: 204,
// };

app.options(
  '*',
  cors({
    origin: allowList,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    allowedHeaders: ['Content-type', 'Authorization'],
    credentials: true,
    exposedHeaders: ['set-cookie'],
    optionsSuccessStatus: 204,
  }),
);

app.use(
  cors({
    origin: allowList,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    allowedHeaders: ['Content-type', 'Authorization'],
    credentials: true,
    exposedHeaders: ['set-cookie'],
    optionsSuccessStatus: 204,
  }),
);

app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use('*', (req, res, next) => {
  next(new DocumentNotFoundError());
});

app.use((err, req, res, next) => {
  handleErrors(err, res);
  next();
});

app.listen(PORT);

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const router = require('./routes/index');
const { handleErrors } = require('./errors/erorrs');
const { requestLogger, errorLogger } = require('./middlewares/logger');
require('dotenv').config();

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

const allowList = [
  'https://mesto.alisakrasnopolina.nomoredomains.monster',
  'http://mesto.alisakrasnopolina.nomoredomains.monster',
  'https://localhost:3000',
  'http://localhost:3000',
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
    allowedHeaders: ['Content-type', 'Authorization', 'Accept'],
    credentials: true,
    exposedHeaders: ['set-cookie'],
    optionsSuccessStatus: 204,
  }),
);

app.use(
  cors({
    origin: allowList,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    allowedHeaders: ['Content-type', 'Authorization', 'Accept'],
    credentials: true,
    exposedHeaders: ['set-cookie'],
    optionsSuccessStatus: 204,
  }),
);

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

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

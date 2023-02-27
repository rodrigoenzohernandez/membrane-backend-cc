const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./src/routes/index');
const ordersRouter = require('./src/routes/orders');

const app = express();
const API_PREFIX = 'api';

const NODE_ENV = process.env.NODE_ENV || 'dev';
app.use(logger(NODE_ENV));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(`/${API_PREFIX}/`, indexRouter);
app.use(`/${API_PREFIX}/orders/`, ordersRouter);
app.use(`/${API_PREFIX}/healthCheck`, require('express-healthcheck')());

module.exports = app;

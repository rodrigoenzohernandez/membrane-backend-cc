require('dotenv').config();

const {
  LOG_LEVEL = 'debug',
  NODE_ENV = 'dev',
  SOCKET_URL = null,
  API_PORT = 3001,
} = process.env;

module.exports = {
  LOG_LEVEL, NODE_ENV, SOCKET_URL, API_PORT,
};

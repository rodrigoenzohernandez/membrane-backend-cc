require('dotenv').config();

const {
  LOG_LEVEL = 'debug',
  NODE_ENV = 'dev',
  EXTERNAL_SOCKET_URL = null,
  LOCAL_SOCKET_URL = null,
  API_PORT = 3001,
  WSS_PORT = 9090,
} = process.env;

module.exports = {
  LOG_LEVEL, NODE_ENV, EXTERNAL_SOCKET_URL, LOCAL_SOCKET_URL, API_PORT, WSS_PORT,
};

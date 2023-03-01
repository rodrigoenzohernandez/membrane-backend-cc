const WebSocketServer = require('ws');
const WebSocket = require('ws');

const logger = require('./Logger');
const { WSS_PORT } = require('../config');

const createWebSocketServer = () => {
  const wsServer = new WebSocketServer.Server({ port: WSS_PORT }, () => {
    logger.debug(`Web Socket Server listening on ${WSS_PORT}`);

    wsServer.on('connection', (ws) => {
      ws.on('message', (data) => {
        wsServer.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(data.toString());
          }
        });
      });
    });
  });
};
module.exports = createWebSocketServer;

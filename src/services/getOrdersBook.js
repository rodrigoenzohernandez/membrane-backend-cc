const WebSocket = require('ws');
const { SOCKET_URL } = require('../config');

async function getOrdersBook(symbol, res) {
  const ws = new WebSocket(SOCKET_URL);

  const response = { bid: [], ask: [] };

  const msg = JSON.stringify({
    event: 'subscribe',
    channel: 'book',
    symbol,
  });

  ws.on('open', () => ws.send(msg));

  ws.on('message', (message) => {
    const decoded = JSON.parse(message);
    const snapshot = decoded[1] || null;
    if (snapshot?.length > 3) {
      ws.close();

      const tips = snapshot.map((row) => ({ price: row[0], amount: row[2] }));
      tips.forEach((element) => {
        const { amount } = element;
        if (amount > 0) response.bid.push(element);
        else response.ask.push(element);
      });
      return res.send(response);
    }
    return {};
  });

  ws.on('error', (err) => res.status(404).send({ msg: 'We had a problem communicating to the external websocket', err }));
}

module.exports = getOrdersBook;

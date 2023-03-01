const WebSocket = require('ws');
const { EXTERNAL_SOCKET_URL, LOCAL_SOCKET_URL } = require('../config');

async function getOrdersBook(symbol, res) {
  const ws = new WebSocket(EXTERNAL_SOCKET_URL);
  const wsMembrane = new WebSocket(LOCAL_SOCKET_URL);

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

    // close ws once the snapshot is read
    if (snapshot?.length > 3) {
      ws.close();

      // transform stream data into array of objects with prices and amounts
      const tips = snapshot.map((row) => ({ price: row[0], amount: row[2] }));
      tips.forEach((element) => {
        const { amount } = element;
        if (amount > 0) response.bid.push(element);
        else response.ask.push(element);
      });

      // socket message
      const data = Buffer.from(JSON.stringify({ tag: 'book', response }));
      wsMembrane.send(data);

      // API response
      return res.send(response);
    }
    return null;
  });

  ws.on('error', (err) => res.status(404).send({ msg: 'We had a problem communicating to the external websocket', err }));
}

module.exports = getOrdersBook;

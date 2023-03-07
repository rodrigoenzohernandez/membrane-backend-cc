const WebSocket = require('ws');
const { EXTERNAL_SOCKET_URL } = require('../config');

async function simulate(res, symbol, operation, amount) {
  const ws = new WebSocket(EXTERNAL_SOCKET_URL);
  let effectivePrice = 0;
  let rest = amount;
  let operationType = operation;

  const msg = JSON.stringify({
    event: 'subscribe',
    channel: 'book',
    symbol,
  });

  ws.on('open', () => ws.send(msg));

  ws.on('message', (message) => {
    const decoded = JSON.parse(message);
    const order = decoded[1] || null;

    if (order?.length === 3) {
      let [,, orderAmount] = order;
      const [price] = order;

      // If the operation is buy the ask orders must be used (orders with amount in negative)
      if (operationType === 'BUY' && orderAmount < 0) {
        orderAmount *= -1;
        const enoughContracts = ((orderAmount - rest) >= 0);

        if (enoughContracts) {
          effectivePrice += (rest * price);
          operationType = 'DONE';
          return ws.close();
        }
        rest -= orderAmount;
        effectivePrice += (orderAmount * price);
      }
    }
    return null;
  });

  ws.on('close', () => {
    res.send({
      data: { amount, avgPrice: effectivePrice / amount, effectivePrice },
    });
  });

  ws.on('error', (err) => {
    res.status(404).send({ msg: 'We had a problem communicating to the external websocket', err });
  });
}

module.exports = simulate;

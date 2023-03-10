const WebSocket = require('ws');
const { EXTERNAL_SOCKET_URL, LOCAL_SOCKET_URL } = require('../config');

let effectivePrice = 0;
let rest = 0;
let operationType = null;

/**
 * Calculates the effectivePrice and closes the ws when its done.
 * If the operation is BUY the ask orders will be used (orders with negative amount)
 * If the operation is SELL the bid orders will be used (orders with positive amount)
 */
function calculateOperation(order, ws) {
  let [,, orderAmount] = order;
  const [price] = order;

  if ((operationType === 'BUY' && orderAmount < 0) || (operationType === 'SELL' && orderAmount > 0)) {
    orderAmount = Math.abs(orderAmount);
    const enoughContracts = ((orderAmount - rest) >= 0);

    if (enoughContracts) {
      effectivePrice += (rest * price);
      operationType = 'DONE';
      return ws.close();
    }
    rest -= orderAmount;
    effectivePrice += (orderAmount * price);
  }
  return null;
}

function simulate(res, symbol, operation, amount) {
  const ws = new WebSocket(EXTERNAL_SOCKET_URL);
  const wsMembrane = new WebSocket(LOCAL_SOCKET_URL);

  effectivePrice = 0;
  rest = amount;
  operationType = operation;

  const msg = JSON.stringify({
    event: 'subscribe',
    channel: 'book',
    symbol,
  });

  ws.on('open', () => ws.send(msg));

  ws.on('message', (message) => {
    const decoded = JSON.parse(message);
    const order = decoded[1] || null;

    // Use the orders inside the snapshot. Ex: [[ 22202, 1, 0.007 ],[ 22200, 2, 0.101 ],...]
    if (order?.length > 3) {
      const snapshot = order;

      for (let i = 0; i < snapshot.length; i += 1) {
        calculateOperation(snapshot[i], ws);
        if (operationType === 'DONE') break;
      }
    }
    // Use the individual orders. Ex: [ 22203, 8, -1.84461458 ]
    if (order?.length === 3) {
      calculateOperation(order, ws);
    }
    return null;
  });

  ws.on('close', () => {
    const response = { amount, avgPrice: effectivePrice / amount, effectivePrice };
    const wsData = Buffer.from(JSON.stringify({ tag: 'simulate', response }));
    wsMembrane.send(wsData);
    res.send({
      data: response,
    });
  });

  ws.on('error', (err) => {
    res.status(404).send({ msg: 'We had a problem communicating to the external websocket', err });
  });
}

module.exports = simulate;

const getOrdersBook = require('../services/getOrdersBook');
const formatPair = require('../utils/formatPair');

const ordersController = {
  async getOrderBook(req, res) {
    try {
      const symbol = formatPair(req.query.pair);
      await getOrdersBook(symbol, res);
    } catch (error) {
      res.json(error);
    }
  },
  simulateOperation(req, res) {
    try {
      res.send({ title: 'WIP: simulateOperation' });
    } catch (error) {
      res.json(error);
    }
  },
};

module.exports = ordersController;

const getOrdersBook = require('../services/getOrdersBook');
const simulate = require('../services/simulate');

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
  async simulateOperation(req, res) {
    try {
      const { pair, operation, amount } = req.body;
      const symbol = formatPair(pair);
      await simulate(res, symbol, operation, amount);
    } catch (error) {
      res.json(error);
    }
  },
};

module.exports = ordersController;

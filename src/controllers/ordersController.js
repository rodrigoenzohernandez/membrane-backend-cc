const ordersController = {
  getOrderBook(req, res) {
    try {
      res.send({ title: 'WIP: getOrderBook' });
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

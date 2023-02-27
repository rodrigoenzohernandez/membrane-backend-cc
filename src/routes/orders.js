const express = require('express');

const router = express.Router();

const ordersController = require('../controllers/ordersController');
const isValidPair = require('../middlewares/isValidPair');

router.get('/book', isValidPair, ordersController.getOrderBook);
router.post('/simulate', isValidPair, ordersController.simulateOperation);

module.exports = router;

const express = require('express');

const router = express.Router();

const indexController = require('../controllers/indexController');

router.get('/', indexController.getMessage);
router.get('/version', indexController.getVersion);

module.exports = router;

const validPairs = require('../constants');

const isValidPair = (req, res, next) => {
  const pair = req.query.pair || req.body.pair || null;
  if (validPairs.includes(pair)) {
    return next();
  }
  return res.status(404).send({ msg: 'Invalid or missing pair' });
};
module.exports = isValidPair;

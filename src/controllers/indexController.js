const { version } = require('../../package.json');

const indexController = {
  getMessage(req, res) {
    try {
      res.send({ title: 'membrane-backend-cc' });
    } catch (error) {
      res.json(error);
    }
  },
  getVersion(req, res) {
    try {
      res.send({ version });
    } catch (error) {
      res.json(error);
    }
  },
};

module.exports = indexController;

const routes = require('./routes/index');
require('./helper/DB_connection');

const app = async (req, res) => {
  routes(req, res);
};

module.exports = app;

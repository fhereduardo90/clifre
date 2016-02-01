//require('dotenv').load();

var config = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT
};

module.exports = {
  development: config,
  production: config,
  test: config
};

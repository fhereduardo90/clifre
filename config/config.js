require('dotenv').config({ silent: true });

const configDevelopment = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  logging: false,
};

// const configTest = {
//   username: process.env.DB_USER_TEST,
//   password: process.env.DB_PASSWORD_TEST,
//   database: process.env.DB_NAME_TEST,
//   dialect: 'postgres',
//   host: process.env.DB_HOST_TEST,
//   port: process.env.DB_PORT_TEST,
// };

module.exports = {
  development: configDevelopment,
  production: configDevelopment,
  test: configDevelopment,
};

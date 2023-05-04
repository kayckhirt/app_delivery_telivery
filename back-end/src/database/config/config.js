require('dotenv').config();

const environment = process.env.NODE_ENV;

const suffix = {
  prod: '',
  production: '',
  dev: '-dev',
  development: '-dev',
  test: '-test',
};

const options = {
  host: process.env.HOSTNAME || process.env.MYSQLHOST,
  port: process.env.MYSQLPORT,
  database: 
    `${process.env.MYSQLDATABASE}${suffix[environment] || suffix.test}`,
  username: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  dialect: 'mysql',
  dialectOptions: {
    timezone: 'Z',
  },
  logging: false,
};

module.exports = {
  development: {
    ...options,
  },
  test: {
    ...options,
  },
  production: {
    ...options,
  },
};

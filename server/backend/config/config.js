require('dotenv').config({ path: "/home/csolution/Desktop/AMAN TRAINING/expresscart/server/.env" }); // this is important!
// console.log(JSON.stringify({
//   "username": process.env.DB_USERNAME,
//   "password": process.env.DB_PASSWORD,
//   "database": process.env.DB_DATABASE,
//   "host": process.env.DB_HOST,
//   "dialect": "postgres"
// }))
module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST,
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
};
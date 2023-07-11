require('dotenv').config({ path: "/home/csolution/Desktop/AMAN TRAINING/expresscart/.env" }); // this is important!

const { Sequelize } = require('sequelize');

// create db Connection
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DIALECT,
});

// instantiate db Connection to application
sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

module.exports = sequelize;
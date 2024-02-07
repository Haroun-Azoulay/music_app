"use strict";
const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbHost = process.env.DB_HOST;
const dbDriver = process.env.DB_DRIVER;
const dbPassword = process.env.DB_PASSWORD;

console.log('DB_NAME:', dbName);
console.log('DB_USER:', dbUser);
console.log('DB_HOST:', dbHost);
console.log('DB_DRIVER:', dbDriver);
console.log('DB_PASSWORD:', dbPassword);

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: dbDriver
});

module.exports = sequelizeConnection;

const express = require('express');
const jsonParser = express.json();
const bodyParser = require('body-parser');

const db = require('./config/db');
const Sequelize = require("sequelize");


const nodemailer = require('nodemailer');
const renderer = require('vue-server-renderer').createRenderer();

const app = express();
const port = process.env.PORT || 5432;
var cors = require('cors');
const { on } = require('nodemon');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
const sequelize = new Sequelize(db.database, db.user, db.password, {
    dialect: "postgres",
    host: db.host,
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // <<<<<<< YOU NEED THIS
        }
    }
});
async function a() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
a();
const express = require('express');
const jsonParser = express.json();
const bodyParser = require('body-parser');

const db = require('./config/db-codefirst');
const Sequelize = require("sequelize");


const nodemailer = require('nodemailer');
const renderer = require('vue-server-renderer').createRenderer();

const app = express();
const port = process.env.PORT || 3000;
var cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
const sequelize = new Sequelize(db.database, db.user, db.password, {
    dialect: "postgres",
    protocol: 'postgres',
    host: db.host,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    define: { timestamps: db.timestamps }
});
const models = require('./app/models')(sequelize)

sequelize.sync({ force: false, alter: false }).then(result => {
    console.log(result.models)
    require('./app/routes')(app, sequelize, models, jsonParser, nodemailer);
    app.listen(port, function() {
        console.log('We are live on ' + port);
    });
}).catch(err => console.error(err));
const mysql = require('mysql2');

require('dotenv').config();

//Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        //Your sql username
        user: process.env.DB_USER,
        //Your MySql password
        password: process.env.DB_PW,
        database: process.env.DB_NAME
    },
    console.log(`Connected to the Company Database successfully!`)
);

module.exports = db;
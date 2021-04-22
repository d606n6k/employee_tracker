// mysql package to connect to the database
const mysql = require('mysql');
const util = require('util');

// database connection info
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employee_trackerdb',
});

// connect to the database
connection.connect((err) => {
    if (err) throw err;
});

// this will promise my application to satisfy my connect.query FIRST and THEN move on to the next step in the app
connection.query = util.promisify(connection.query);

module.exports = connection;
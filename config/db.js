var mysql = require('mysql');
var proxyMysqlDeadlockRetries = require('node-mysql-deadlock-retries');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user:  process.env.DB_USER,
    password:  process.env.DB_PASSWORD,
    database:  process.env.DB_NAME,
    connectionLimit: 100, //important
    supportBigNumbers: true,
    timezone: 'utc' //<-- here
});


var retries = 100    // How many times will the query be retried when the ER_LOCK_DEADLOCK error occurs
var minMillis = 10   	// The minimum amount of milliseconds that the system sleeps before retrying
var maxMillis = 10000 	// The maximum amount of milliseconds that the system sleeps before retrying
var debug = 1		 	// Show all the debugs on how the proxy is working
var show_all_errors = 1			// Show all errors that are outside of the proxy

pool.on('connection', function (connection) {
    proxyMysqlDeadlockRetries(connection, retries, minMillis, maxMillis, debug, show_all_errors);
})

module.exports = pool;


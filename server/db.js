/*
    Pool object - holds the login credentials for database
*/
const keys = require('./keys');
const { Pool } = require('pg');

// Where is the data stored???
const pool = new Pool({
    user: keys.pgUser,
    host: keys.pgHost,
    database: keys.pgDatabase,
    password: keys.pgPassword,
    post: keys.pgPort
});

module.exports = pool;

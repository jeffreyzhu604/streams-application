/*
    Pool object - holds the login credentials for database
*/
const { Pool } = require('pg');

// Where is the data stored???
const pool = new Pool({
    user: 'jeffreyzhu',
    host: 'localhost',
    database: 'streams',
    password: 'megaman',
    post: 5432
});

module.exports = pool;

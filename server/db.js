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

pool.on('connect', () => {
    pool
        .query(`CREATE TABLE IF NOT EXISTS 
                users (
                    uid SERIAL PRIMARY KEY,
                    username VARCHAR(255) UNIQUE,
                    email VARCHAR(255),
                    email_verified BOOLEAN,
                    date_created DATE,
                    last_login DATE
                )
                `)
        .catch((err) => console.log(err));
});

pool.on('connect', () => {
    pool
        .query(`CREATE TABLE IF NOT EXISTS
                streams (
                    sid SERIAL PRIMARY KEY,
                    title VARCHAR(255),
                    stream_description VARCHAR,
                    user_id INT REFERENCES users(uid),
                    streamer_name VARCHAR REFERENCES users(username),
                    date_created TIMESTAMP
                )        
                `)
        .catch((err) => console.log(err));
});

pool.on('connect', () => {
    pool
        .query(`CREATE TABLE IF NOT EXISTS
                comments (
                    cid SERIAL PRIMARY KEY,
                    comment VARCHAR(255),
                    username VARCHAR REFERENCES users(username),
                    user_id INT REFERENCES users(uid),
                    stream_id INT REFERENCES streams(sid),
                    cid_reference INT REFERENCES comments(cid),
                    date_created TIMESTAMP
                )            
            `)
        .catch((err) => console.log(err));
})

module.exports = pool;

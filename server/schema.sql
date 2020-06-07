CREATE TABLE users (
    uid SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    email VARCHAR(255),
    email_verified BOOLEAN,
    date_created DATE,
    last_login DATE
);

CREATE TABLE streams (
    sid SERIAL PRIMARY KEY,
    title VARCHAR(255),
    stream_description VARCHAR,
    user_id INT REFERENCES users(uid),
    streamer_name VARCHAR REFERENCES users(username),
    date_created TIMESTAMP
);

CREATE TABLE comments (
    cid SERIAL PRIMARY KEY,
    comment VARCHAR(255),
    username VARCHAR REFERENCES users(username),
    user_id INT REFERENCES users(uid),
    stream_id INT REFERENCES streams(sid),
    date_created TIMESTAMP
);
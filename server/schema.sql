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
    cid_reference INT REFERENCES comments(cid),
    date_created TIMESTAMP
);

-- Query to obtain nested comments
WITH RECURSIVE nested_comments AS (
	-- non-recursive term
    SELECT
		cid,
        comment, 
        username,
        user_id,
        stream_id,
        cid_reference,
        date_created
	FROM
		comments 
	WHERE
        -- If cid=1, it prints comment with that id and everything that branches from it
        -- cid_reference IS NULL prints everything
        cid_reference IS NULL AND stream_id=$1
	UNION
        -- recursive term
		SELECT
            c.cid,
            c.comment,
            c.username,
            c.user_id,
            c.stream_id,
            c.cid_reference,
            c.date_created
		FROM
            comments c
		INNER JOIN nested_comments n_c ON n_c.cid = c.cid_reference
) SELECT
	*
FROM
    nested_comments;    
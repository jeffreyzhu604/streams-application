var express = require('express');
var router = express.Router(); // allows us to make http requests
var pool = require('../server/db');

// Stream routes

// Create stream
router.post('/api/post/streams', (req, res, next) => {
    const values = [req.body.title, req.body.stream_description, req.body.uid, req.body.username];
    pool.query(`INSERT INTO streams(title, stream_description, user_id, streamer_name, date_created)
                VALUES($1, $2, $3, $4, NOW())`, values, (q_err, q_res) => {
                    if (q_err) return next(q_err);
                    res.json(q_res.rows);
                })
});

// Edit stream
router.put('/api/put/streams/:id', (req, res, next) => {
    const values = [req.body.title, req.body.stream_description, req.body.sid];
    pool.query(`UPDATE streams SET title=$1, stream_description=$2, date_created=NOW()
                WHERE sid=$3`, values, (q_err, q_res) => {
                    if (q_err) return next(q_err);
                    res.json(q_res.rows);
                })
})

// Fetch streams
router.get('/api/get/streams', (req, res, next) => {
    pool.query(`SELECT * FROM streams ORDER BY date_created DESC`, (q_err, q_res) => {
        res.json(q_res.rows);
    })
})

// Fetch stream
router.post('/api/get/streams/:id', (req, res, next) => {
    const values = [req.body.sid];
    pool.query(`SELECT * FROM streams WHERE sid=$1`, values, (q_err, q_res) => {
        if (q_err) return next(q_err);
        res.json(q_res.rows);
    })
})

// Delete stream
router.delete('/api/delete/streams/:sid', (req, res, next) => {
    const values = [req.params.sid];
    pool.query(`DELETE FROM streams WHERE sid=$1`, values, (q_err, q_res) => {
        if (q_err) return next(q_err);
        res.json(q_res.rows);
    })
})

// User routes

// Post user profile to db
router.post('/api/post/userprofiletodb', (req, res, next) => {
    const values = [req.body.profile.nickname, req.body.profile.email, req.body.profile.email_verified];
    pool.query(`INSERT INTO users(username, email, email_verified, date_created)
                VALUES($1, $2, $3, NOW())
                ON CONFLICT DO NOTHING`, values, (q_err, q_res) => {
                    if (q_err) return next(q_err);
                    res.json(q_res.rows);
                })
})

// Fetch user profile from db
router.get('/api/get/userprofilefromdb', (req, res, next) => {
    const values = [String(req.query.email)];
    pool.query(`SELECT * FROM users WHERE email=$1`, values, (q_err, q_res) => {
        if (q_err) return next(q_err);
        res.json(q_res.rows);
    })
})

// Comment routes

// Create comment
router.post('/api/post/comment', (req, res, next) => {
    const values = [req.body.comment, req.body.username, req.body.uid, req.body.sid];
    pool.query(`INSERT INTO comments(comment, username, user_id, stream_id, date_created)
                VALUES($1, $2, $3, $4, NOW())`, values, (q_err, q_res) => {
                    if (q_err) return next(q_err);
                    res.json(q_res.rows);
                })
})

// Fetch comment
router.post('/api/get/comment/:id', (req, res, next) => {
    const values = [req.body.cid];
    pool.query(`SELECT * FROM comments WHERE cid=$1`, values, (q_err, q_res) => {
        if (q_err) return next(q_res);
        res.json(q_res.rows);
    })
})

// Fetch comments
router.get('/api/get/comments', (req, res, next) => {
    const values = [req.body.sid];
    pool.query('SELECT * FROM comments WHERE sid=$1 ORDER BY date_created DESC', values, (q_err, q_res) => {
        if (q_err) return next(q_err);
        res.json(q_res.rows);
    })
})

// Edit comment

// Delete comment

module.exports = router;
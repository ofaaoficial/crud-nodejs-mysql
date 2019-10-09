const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/create', (req, res) => {
    res.render('books/create');
});

router.post('/create', (req, res) => {
    res.send('received');
})

module.exports = router;
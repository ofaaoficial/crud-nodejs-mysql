const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/create', (req, res) => {
    res.render('books/create');
});

router.post('/create', async (req, res) => {
    //Destructuring
    const {title, description} = req.body ;
    const newBook = {
        title,
        description
    }

    await pool.query('INSERT INTO books SET ?', [newBook]);
    res.send('received');
});



module.exports = router;
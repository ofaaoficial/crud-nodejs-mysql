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

router.get('/', async (req, res) => {
    await pool.query("SELECT * FROM books", async (err, resQuery) => {
        if(err) throw new Error(err);
        let books = await resQuery;
        res.render('books/index', {books});
    } );
});


module.exports = router;
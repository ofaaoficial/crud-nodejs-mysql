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
    res.redirect('/books');
});

router.get('/', async (req, res) => {
    await pool.query("SELECT * FROM books", async (err, resQuery) => {
        if(err) throw new Error(err);
        let books = await resQuery;
        res.render('books/index', {books});
    } );
});

router.get('/edit/:id', async (req, res) => {
    await pool.query("SELECT * FROM books WHERE id = ?", [req.params.id], async (err, resQuery) => {
        if(err) throw new Error(err);
        let book = await resQuery;
        res.render('books/edit', {book})
    });
})

router.get('/delete/:id', async (req, res) => {
    await pool.query('DELETE FROM books WHERE id = ?', [req.params.id]);
    res.redirect('/books');
})

module.exports = router;
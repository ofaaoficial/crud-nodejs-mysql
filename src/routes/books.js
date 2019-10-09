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
    req.flash('msg', 'Book saved successfully.');
    res.redirect('/books');
});

router.get('/', async (req, res) => {
    await pool.query("SELECT * FROM books", async (err, resQuery) => {
        if(err) throw new Error(err);
        const books = await resQuery;
        res.render('books/index', {books});
    } );
});

router.get('/edit/:id', async (req, res) => {
    const {id} = req.params;
    await pool.query("SELECT * FROM books WHERE id = ?", [id], async (err, resQuery) => {
        if(err) throw new Error(err);
        const book = await resQuery[0];
        res.render('books/edit', {book})
    });
})

router.post('/edit/:id', async (req, res) => {
    const {id} = req.params;
    const {title, description} = req.body;
    await pool.query('UPDATE books SET ? WHERE id = ?', [{title,description}, id]);
    res.redirect('/books');
})

router.get('/delete/:id', async (req, res) => {
    let {id} = req.params;
    await pool.query('DELETE FROM books WHERE id = ?', [id]);
    res.redirect('/books');
})

module.exports = router;
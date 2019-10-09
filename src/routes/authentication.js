const express = require('express');
const router = express.Router();

router.get('/sign-up', (req, res) => {
    res.render('auth/signup.hbs');
})

router.post('/sign-up', (req, res) => {
    console.log(req.body);
})

module.exports = router;
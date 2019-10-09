const express = require('express');
const router = express.Router();

const passport = require('passport');

router.get('/sign-up', (req, res) => {
    res.render('auth/signup.hbs');
})

// router.post('/sign-up', (req, res) => {
//     passport.authenticate('local.signup', {
//         successRedirect: '/profile',
//         failureRedirect: '/sign-up',
//         failureFlash: true
//     });
// })

router.post('/sign-up', passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/sign-up',
    failureFlash: true
}));

router.get('/profile', (req, res) => {
    res.send('authenticated');
})

module.exports = router;
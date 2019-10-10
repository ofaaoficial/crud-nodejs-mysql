const express = require('express');
const router = express.Router();

const passport = require('passport');


//Sign up - Register
router.get('/sign-up', (req, res) => {
    res.render('auth/signup.hbs');
});

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

//Sign in - Login
router.get('/sign-in', (req, res) => {
    res.render('auth/signin');
});

router.post('/sign-in', (req, res, next) => {
    passport.authenticate('local.signin',{
        successRedirect: '/profile',
        failureRedirect: '/sign-in',
        failureFlash: true
    })(req, res, next);
});

router.get('/profile', (req, res) => {
    res.send('authenticated');
});

module.exports = router;
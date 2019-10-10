const express = require('express');
const router = express.Router();

const passport = require('passport');
const { isLoggedIn, isNotLoggedId } = require('../lib/auth');

//Sign up - Register
router.get('/sign-up', isNotLoggedId, (req, res) => {
    res.render('auth/signup.hbs');
});

// router.post('/sign-up', (req, res) => {
//     passport.authenticate('local.signup', {
//         successRedirect: '/profile',
//         failureRedirect: '/sign-up',
//         failureFlash: true
//     });
// })

router.post('/sign-up', isNotLoggedId, passport.authenticate('local.signup', {
    successRedirect: '/home',
    failureRedirect: '/sign-up',
    failureFlash: true
}));

//Sign in - Login
router.get('/sign-in', isNotLoggedId, (req, res) => {
    res.render('auth/signin');
});

router.post('/sign-in', isNotLoggedId, (req, res, next) => {
    passport.authenticate('local.signin',{
        successRedirect: '/home',
        failureRedirect: '/sign-in',
        failureFlash: true
    })(req, res, next);
});

router.get('/home', isLoggedIn, (req, res) => {
    res.render('home');
});

router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/sign-in');
});

module.exports = router;
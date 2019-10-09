const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const pool = require('../database');
const {encryptPassword} = require('../lib/helpers');

passport.use('local.signup', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
}, async (req, username, password, done) =>{
    const {fullname, email} = req.body;
    const newUser = {
        username,
        password,
        fullname,
        email
    }
    newUser.password = await encryptPassword(newUser.password);
    const result = await pool.query('INSERT INTO users SET ?', [newUser], async (err, resQuery)=>{
        newUser.id =  resQuery.insertId;
        return done(null, newUser);
    });
}));

passport.serializeUser((usr, done) => {
    done(null, usr.id);
});

passport.deserializeUser(async (id, done)=> {
    await pool.query('SELECT * FROM users WHERE id = ?', [id], async (err, resQuery)=>{
        done(null, resQuery[0]);
    });
});

const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oidc');
const db = require('../db');

const router = express.Router();

passport.use(new GoogleStrategy({
    clientID: process.env['GOOGLE_CLIENT_ID'],
    clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
    callbackURL: '/oauth2/redirect/google',
    scope: ['profile']
},
(issuer, profile, cb) => {
    db.get('SELECT * FROM federated_credentials WHERE provider = ? AND subject = ?', [
        issuer,
        profile.id
    ], (err, row) => {
        if (err) { return cb(err); }
        if (!row) {
            db.run('INSERT INTO users (name) VALUES (?)', [
                profile.displayName
            ], (err) => {
                if (err) { return cb(err); }

                const id = this.lastID;
                db.run('INSERT INTO federated_credentials (user_id, provider, subject) VALUES (?, ?, ?)', [
                    id,
                    issuer,
                    profile.id
                ], (err) => {
                    if (err) { return cb(err); }
                    const user = {
                        id: id,
                        name: profile.displayName
                    };
                    return cb(null, user);
                });
            });
        } else {
            db.get('SELECT rowid AS id, * FROM users WHERE rowid = ?', [row.user_id], (err, row) => {
                if (err) { return cb(err); }
                if (!row) { return cb(null, false); }
                return cb(null, row);
            });
        }
    });
}));

passport.serializeUser((user, cb) => {
    process.nextTick(() => {
        cb(null, { id: user.id, username: user.username, name: user.name });
    });
});

passport.deserializeUser((user, cb) => {
    process.nextTick(() => {
        return cb(null, user);
    });
});

router.get('/login', (req, res, next) => {
    res.render('login');
});

router.get('/login/federated/google', passport.authenticate('google'));

router.get('/oauth2/redirect/google', passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

router.post('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
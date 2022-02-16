const http = require('http');
const cookie = require('cookie');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// const cookie = require('cookie');
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.set('view engine', 'pug');


app.get('/', (req, res) => {
    // const cookies = cookie.parse(req.headers.cookie);
    res.cookie('user', 'byungwook');
    res.cookie('password', 'qwe123');
    console.log(req.cookies);

    res.render('login');
});

app.post('/login', (req, res) => {
    console.log("login router");
    console.log(req.cookies);
    if(req.cookies && req.cookies.user == 'byungwook') {
        if(req.cookies.password == 'qwe123') {
            res.render('index', { username: req.cookies.user});
            return
        }
    }

    res.redirect('/');
});
app.listen(3000, () => {
    console.log(`Example app listening on port 3000`)
  })
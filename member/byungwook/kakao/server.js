// const cookie = require('cookie');
// const cookieParser = require('cookie-parser');
// const cookie = require('cookie');

const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use('/images', express.static('images'));
app.use('/static', express.static('static'));
app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'pug');


app.get('/', (req, res) => {
    res.render('index');
});


app.get('/me', (req, res) => {

    console.log(req.query);
    console.log("Log in success")
    res.render('me');
});

app.listen(3000, () => {
    console.log(`Example app listening on port 3000`)
})
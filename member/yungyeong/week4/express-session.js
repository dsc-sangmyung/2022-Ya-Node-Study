
var express = require('express')
var parseurl = require('parseurl')
var session = require('express-session')

var app = express()

app.use(session({
  secret: 'abc',
  resave: false,
  saveUninitialized: true,
  store:new FileStore()
})) //세션 미들웨어는 session이라는 객체를 추가해준다.


app.get('/', function (req, res, next) {
    console.log(req.session);
    if(req.session.num == undefined){
        req.session.num = req.session.num + 1;
    }
  res.send(`Views : ${req.session.num}`);  //휘발성
})

app.listen(3000, function(){
    console.log('3000!')
})

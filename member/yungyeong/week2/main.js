const express = require('express')
const app = express()
const fs = require('fs');
const qs = require('querystring');
const bodyParser = require('body-parser');
const compression = require('compression');
const template = require('./lib/template.js');
const topicRouter = require('./routes/topic');

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.get('*',function(request, response, next){
  fs.readdir('./data', function(error, filelist){
    request.list = filelist;
    next();
  });
  });

  app.use('/topic', topicRouter);

app.get('/', function (request, response) {
    let title = 'Welcome';
    let description = 'Hello, Node.js';
    let list = template.list(request.list);
     html = template.HTML(title, list,
      `<h2>${title}</h2>${description}
      <img src="/images/hello.jpg" style="width:300px; display:block; margin:10px;">
      `,
      `<a href="/topic/create">create</a>`
    );
 
    response.send(html);

});

app.use(function(req, res, next){
  res.status(404).send('Sorry cant find that!');
});

app.use(function(req, res, next){
  console.error(err.stack)
  res.status(500).send('Something broke!');
});

app.listen(3000, function(){
  console.log('Example app listening on port 3000!')
});


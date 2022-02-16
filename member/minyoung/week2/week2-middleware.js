const { request, response } = require('express');
const express = require('express')
const app = express()
const port = 3000
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const bodyParser = require('body-parser');
const sanitizeHtml = require('sanitize-html');
const compression = require('compression')
const template = require('./lib/template.js');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(compression());
app.get('*',function(request, response, next) {
  fs.readdir('./data', function(error, filelist) {
    request.list = filelist;
    next();
  });
});


// route, routing
// app.get('/', (req, res) => (res.send('Hello World!')))
app.get('/', function(request, response) {
  let title = 'Welcome';
  let description = 'Hello, Node.js';
  let list = template.list(request.list);
  let html = template.HTML(title, list,
    `<h2>${title}</h2>${description}
    <img src='/images/rabbit.png' style='width:300px; display:block; margin-top:10px'>`,
    `<a href="/create">create</a>`
  );
  response.send(html);
});

app.get('/page/:pageId', function(request, response, next) {
  let filteredId = path.parse(request.params.pageId).base;
  fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
    if(err) {
      next(err);
    } else {
      let title = request.params.pageId;
      let sanitizedTitle = sanitizeHtml(title);
      let sanitizedDescription = sanitizeHtml(description, {
        allowedTags:['h1']
      });
      let list = template.list(request.list);
      let html = template.HTML(sanitizedTitle, list,
        `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
        ` <a href="/create">create</a>
          <a href="/update/${sanitizedTitle}">update</a>
          <form action="/delete_process" method="post">
            <input type="hidden" name="id" value="${sanitizedTitle}">
            <input type="submit" value="delete">
          </form>`
      );
      response.send(html);
    }
  });
});

app.get('/create', (request, response) => {
  let title = 'WEB - create';
  let list = template.list(request.list);
  let html = template.HTML(title, list, `
    <form action="/create_process" method="post">
      <p><input type="text" name="title" placeholder="title"></p>
      <p>
        <textarea name="description" placeholder="description"></textarea>
      </p>
      <p>
        <input type="submit">
      </p>
    </form>
  `, '');
  response.send(html);
})

app.get('/update/:pageId', (request, response) => {
  let filteredId = path.parse(request.params.pageId).base;
  fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
    let title = request.params.pageId;
    let list = template.list(request.list);
    let html = template.HTML(title, list,
      `
      <form action="/update_process" method="post">
        <input type="hidden" name="id" value="${title}">
        <p><input type="text" name="title" placeholder="title" value="${title}"></p>
        <p>
          <textarea name="description" placeholder="description">${description}</textarea>
        </p>
        <p>
          <input type="submit">
        </p>
      </form>
      `,
      `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
    );
    response.send(html);
    });
})

app.post('/create_process', (request, response) => {
  /* let body = '';
  request.on('data', function(data){
      body = body + data;
  });
  request.on('end', function(){
      let post = qs.parse(body);
      let title = post.title;
      let description = post.description;
      fs.writeFile(`data/${title}`, description, 'utf8', function(err){
        response.redirect(`/?id=${title}`);
      })
  }); */

  let post = request.body;
  let title = post.title;
  let description = post.description;
  fs.writeFile(`data/${title}`, description, 'utf8', function(err){
    response.redirect(`/?id=${title}`);
  })

})

app.post('/update_process', (request, response) => {

  let post = request.body;
  let id = post.id;
  let title = post.title;
  let description = post.description;
  fs.rename(`data/${id}`, `data/${title}`, function(error){
    fs.writeFile(`data/${title}`, description, 'utf8', function(err){
      response.redirect(`/?id=${title}`);
    })
  });
})

app.post('/delete_process', (request, response) => {

  let post = request.body;
  let id = post.id;
  let filteredId = path.parse(id).base;
  fs.unlink(`data/${filteredId}`, function(error){
    response.redirect('/');
  })
})

app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

app.use(function(err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

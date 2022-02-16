const express = require("express");
const fs = require('fs');
const path = require('path');
const sanitizeHtml = require('sanitize-html');
const template = require('../lib/template.js');
const bodyParser = require('body-parser');
const router = express.Router();

router.use(bodyParser.urlencoded({extended: false}));

router.get('/create', (request, response) => {
    fs.readdir('data', function(error, filelist){
      let title = 'WEB - create';
      let list = template.list(filelist);
      let html = template.HTML(title, list, `
        <form action="/page/create_process" method="post">
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
    });
  })

router.get('/:pageId', function(request, response) {
    fs.readdir('data', function(error, filelist){
      let filteredId = path.parse(request.params.pageId).base;
      fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
        let title = request.params.pageId;
        let sanitizedTitle = sanitizeHtml(title);
        let sanitizedDescription = sanitizeHtml(description, {
          allowedTags:['h1']
        });
        let list = template.list(filelist);
        let html = template.HTML(sanitizedTitle, list,
          `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
          ` <a href="/page/create">create</a>
            <a href="/page/update/${sanitizedTitle}">update</a>
            <form action="/page/delete_process" method="post">
              <input type="hidden" name="id" value="${sanitizedTitle}">
              <input type="submit" value="delete">
            </form>`
        );
        response.send(html);
      });
    });
  });

  router.get('/update/:pageId', (request, response) => {
    fs.readdir('data', function(error, filelist){
      let filteredId = path.parse(request.params.pageId).base;
      fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
        let title = request.params.pageId;
        let list = template.list(filelist);
        let html = template.HTML(title, list,
          `
          <form action="/page/update_process" method="post">
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
          `<a href="/page/create">create</a> <a href="/page/update?id=${title}">update</a>`
        );
        response.send(html);
      });
    });
  })
  
  router.post('/create_process', (request, response) => {
    const post = request.body;
    const title = post.title;
    const description = post.description;
    fs.writeFile(`data/${title}`, description, 'utf8', function(err){
      response.redirect(`/page/${title}`);
    });
  
  })
  
  router.post('/update_process', (request, response) => {
    
    let post = request.body;
    let id = post.id;
    let title = post.title;
    let description = post.description;
    fs.rename(`data/${id}`, `data/${title}`, function(error){
      fs.writeFile(`data/${title}`, description, 'utf8', function(err){
        response.redirect(`/page/${title}`);
      })
    });
  })
  
  router.post('/delete_process', (request, response) => {
    let post = request.body;
    let id = post.id;
    let filteredId = path.parse(id).base;
    fs.unlink(`data/${filteredId}`, function(error){
      response.redirect('/');
    })
  })

  module.exports = router;
  
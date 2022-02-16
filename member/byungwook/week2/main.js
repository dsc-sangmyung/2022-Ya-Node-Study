
const express = require('express')
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const sanitizeHtml = require('sanitize-html');
const template = require('./lib/template.js');
const bodyParser = require('body-parser');
const pageRouter = require("./routes/pageRoute");
const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(request, response) {
  fs.readdir('data', function(error, filelist){
    let title = 'Welcome';
    let description = 'Hello, Node.js';
    let list = template.list(filelist);
    let html = template.HTML(title, list,
      `<h2>${title}</h2>${description}`,
      `<a href="/page/create">create</a>`
    );
    response.send(html);
  });
});

app.use("/page", pageRouter);

app.listen(3000, () => {
  console.log(`Example app listening on port 3000`)
})

# Back-end - [week1]

## 😎 실행환경

- `pm2 start main.js --watch` : `main.js` 재실행을 통해 소스코드의 변화를 반영하는 기능

- `npm install express --save` : express 설치



## 🙃 HelloWorld

- 기본 뼈대
- 주요 메서드

  - app.get : 서버 자원을 가져오려고 할 때 사용
  - app.post : 서버에 자원을 새로 등록하고자 할 때 사용
  - app.listen : 특정 포트에 연결



```javascript
const express = require('express')
const app = express()

// route, routing
// app.get('/', (req, res) => (res.send('Hello World!')))
app.get('/', function(req, res) {
  return res.send('/')
});
app.get('/page', function(req, res) {
  return res.send('/page')
});

app.listen(3000, function() {}
  console.log(`Example app listening on port 3000`)
});
```




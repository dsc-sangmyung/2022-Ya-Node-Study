# Back-end - [week1]

## π μ€ννκ²½

- `pm2 start main.js --watch` : `main.js` μ¬μ€νμ ν΅ν΄ μμ€μ½λμ λ³νλ₯Ό λ°μνλ κΈ°λ₯

- `npm install express --save` : express μ€μΉ



## π HelloWorld

- κΈ°λ³Έ λΌλ
- μ£Όμ λ©μλ

  - app.get : μλ² μμμ κ°μ Έμ€λ €κ³  ν  λ μ¬μ©
  - app.post : μλ²μ μμμ μλ‘ λ±λ‘νκ³ μ ν  λ μ¬μ©
  - app.listen : νΉμ  ν¬νΈμ μ°κ²°



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




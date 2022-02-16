# Back-end - [week2]



## middleware

- 다른사람이 만든 sw를 부품으로 해서 자신의 sw를 만든다
- 덕분에 생산성 높음!

-  Third-party middleware

​		↳ official하지 않은, 즉 express가 만들지 않은 미들웨어



## body-parser

- npm install body-parser --save
- body : 웹브라우저 쪽에서 요청한 정보의 본체
- header : body를 설명하는 데이터
- body-parser : body를 분석해서 필요한 형태로 가공해주는 프로그램



- `app.use(bodyParser.urlencoded({extended: false}));`

- `bodyParser.urlencoded({extended: false})` 이 부분에 의해서 미들웨어가 만들어짐

- 만들어진 미들웨어: 사용자가 전송한 post 데이터를 내부적으로 분석해서 콜백을 호출하면서 

  콜백함수의 첫번째 인자인 req 변수의 body라는 프로퍼티를 만듦



## Compression

- npm install compression
- gzip 압축
- app.use(compression());





## 정리

- body-parser 

  - 내부적으로 body-parser가 동작
  - 라우트를 사용할 때 req객체의 바디 프로터티에 접근하는 것을 통해 간결하게 코드를 만들 수 있음
- compression
  - compression 미들웨어를 통해 데이터를 압축
  - 데이터의 양이나 접속하는 사용자의 수가 많을경우 매우 큰 장점
  - 압축된 데이터를 보내면 웹브라우저는 압축된 방식으로 해제해서 그를 사용함


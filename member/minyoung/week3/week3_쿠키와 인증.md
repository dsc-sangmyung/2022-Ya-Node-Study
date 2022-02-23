# 쿠키와 인증



## HTTP cookies

### 목적
1. **세션 관리(인증)**
   서버에 저장해야 할 로그인, 장바구니, 게임 스코어 등의 정보 관리

2. **개인화**
   사용자 선호, 테마 등의 세팅

3. **트래킹**
   사용자 행동을 기록하고 분석



### 쿠키 생성
- HTTP 요청을 수신할 때, 서버는 응답과 함께 `Set-Cookie` 헤더를 전송
- http의 메세지에 `Set-Cookie` 세팅
- `Set-Cookie: <cookie-name>=<cookie-value>`
- 브라우저는 `Cookie` 헤더를 사용하여 서버로 이전에 저장했던 모든 쿠키들을 response



### 쿠키 라이프타임
**permanent cookies**
- 영구적(페이지 나가도 계속 존재)
- Max-Age : 상대적인 유효기간(기간 명시)
- Expires : 절대적인 유효기간(날짜 명시)

**session cookies**
- 현재 세션 끝날 때 삭제
- 브라우저는 "현재 세션"이 끝나는 시점을 정의



### Secure and HttpOnly
**Secure**
- https 프로토콜을 사용할 때만 동작
- 안전하지 않은 사이트(`http:`) 는 쿠키에 `Secure` 설정 불가능

**HttpOnly**
- 웹서버가 통신할 때만 쿠키 발행
- XSS 공격을 방지하기 위해, JS로 쿠키 값에 접근 불가능





## npm cookie

**Installation**
- npm install cookie

**API**
```javascript
let cookie = require('cookie');

let cookies = cookie.parse('foo=bar; equation=E%3Dmc%5E2');
// { foo: 'bar', equation: 'E=mc^2' }
```
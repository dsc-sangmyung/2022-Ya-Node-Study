# HTTP vs HTTPS



## http

- 하이퍼 텍스트 전송 프로토콜(Hypertext Transfer Protocol )의 약자
- **서로 다른 시스템들 사이에서 통신을 주고받게 해주는 가장 기초적인 프로토콜**
- 암호화되지 않은 평문 데이터를 전송
- **정보 노출**의 위험성 존재



## https

-  하이퍼 텍스트 전송 프로토콜 보안(Hypertext Transfer Protocol Secure)의 약자
- http에서 'Secure' 만 추가됨
- SSL(보안 소켓 계층)을 사용함으로써 서버에서부터 브라우저로 전송되는 정보가 암호화됨
- **http에 보안성을 강화**



## SSL

- HTTP와 HTTPS의 가장 큰 차이는 **SSL 인증서**
- SSL(Secure Socket Layer) = TLS(Transport Layer Security)

- 표준에 명시된 정식 명칭은 TLS이지만 아직 SSL 용어가 많이 사용됨

- 국제 인터넷 표준화 기구에서 표준으로 인정받은 프로토콜
- 대칭키, 비대칭키 방식 모두 존재



## SSL 인증서

- 클라이언트와 서버간의 통신을 제3자가 보증해주는 전자화된 문서
- 역할
  - 클라이언트가 접속한 서버가 신뢰할 수 있는지를 보장
  - SSL 통신에 사용할 공개키를 클라이언트에게 제공

- 내용
  - 인증서를 발급한 CA, 서비스의 도메인 등의 정보
  - 서버 측의 공개키



## https 적용

- Node.js에 https적용시키기

- 주로 사용하는 인증서의 파일 포맷에는 여러 종류 존재

  - **.pem (Privacy Enhanced Mail)**
    개인키, 서버인증서, 루트인증서, 체인인증서 및 SSL 발급 요청시 생성하는 CSR 등에 사용되는 포맷
    거의 대부분의 시스템에 호환되는 표준 포맷이며 Base64로 인코딩된 ASCII 텍스트
  - **.crt**
    주로 유닉스/리눅스 기반 시스템에서 인증서 파일로 사용하기 위한 확장자
    대부분 PEM 포맷으로 구성
  - **.cer**
    주로 Windows 기반 시스템에서 인증서 파일로 사용하기 위한 확장자
    대부분 PEM 포맷으로 구성
  - **.csr (Certificate Signing Request)**
    SSL 발급 신청을 위해 CA에 제출하는 요청서 파일로 사용하기 위한 확장자
    대부분 PEM 포맷으로 구성
  - **.der (Distinguished Encoding Representation)**
    사설, 금융 등의 특수 분야 및 구형 시스템 등에서 사용되는 포맷
    바이너리 포맷으로 구성
  - **.pfx / .p12 (Personal Information Exchange Format)**
    주로 Windows IIS 기반 시스템에서 인증서 파일로 사용하기 위한 확장자
    개인키, 서버인증서, 루트인증서, 체인인증서를 모두 담을 수 있어서 SSL 인증서로 사용시 상당히 유용
    PKCS#12 바이너리 포맷으로 구성
  - **.jks (Java Key Store)**
    .pfx처럼 개인키, 서버인증서, 루트인증서, 체인인증서를 모두 담을 수 있어서 SSL 인증서로 사용시 상당히 유용
    Java 기반의 바이너리 포맷으로 구성



### 1. SSL 인증서 발급

- 대표적으로 많이 사용되는 openssl과 mkcert를 이용한 방법
- openssl

1. Homebrew를 이용하여 openssl을 설치

```
brew install openssl
```

2. 설치가 완료되면 CA(Certificate Authority) key 파일을 생성

```
openssl ecparam -out rootca.key -name prime256v1 -genkey
```

3. CSR(Certificate Signing Request) 파일을 생성. 인증서 발급에 필요한 정보를 담고 있음


```
openssl req -new -sha256 -key rootca.key -out rootca.csr
```

4. SSL 인증서로 사용할 crt 파일을 생성. days 뒤에 오는 날짜가 인증 유효 기간


```
openssl x509 -req -sha256 -days 999999 -in rootca.csr -signkey rootca.key -out rootca.crt
```



### 2. SSL 인증서 적용

- .key 파일과 .crt 파일은 아래 작성한 파일과 같은 경로에 위치

```javascript
// server.js

const express = require('express');
const http = require('http');
const https = require('https');
const fs = require('fs');

const HTTP_PORT = 8080;
const HTTPS_PORT = 8443;

const options = {
    key: fs.readFileSync('./rootca.key'),
    cert: fs.readFileSync('./rootca.crt')
}; 

const app = express(); 

// Default route for server status 
app.get('/', (req, res) => {
    res.json({ message: `Server is running on port ${req.secure ? HTTPS_PORT : HTTP_PORT}` }); 
}); 

// Create an HTTP server. 
http.createServer(app).listen(HTTP_PORT); 

// Create an HTTPS server. 
https.createServer(options, app).listen(HTTPS_PORT);
```

- 작성한 파일 실행

```javascript
node server.js
```


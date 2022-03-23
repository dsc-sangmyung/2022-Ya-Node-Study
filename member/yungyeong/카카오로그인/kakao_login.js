<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <meta name = "viewport" />
    <title>Kakao JavaScript SDK</title>
</head>
<body>
    <script src="YOUR_SDK_FILE_PATH"></script>
    <script>
        // SDK를 초기화 합니다. 사용할 앱의 JavaScript 키를 설정해 주세요.
        Kakao.init('JAVASCRIPT_KEY');

        // SDK 초기화 여부를 판단합니다.
        console.log(Kakao.isInitialized());
    </script>
    <a href = "javascript:kakaoLogin();"><img src = "https://www.baekjecc.com/image/login/kakao_login_btn.png"></img></a>
    <script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
    <script>
    window.Kakao.init("자신의 카카오로그인 자바스크립트 키입력");

    function kakaoLogin(){ 
        window.Kakao.Auth.login({
          scope:'profile, account_email',
          success: function(authObj){
              console.log(authObj);
              window.Kakao.API.request({
                  url:'/v2/user/me', 
                  success: res => {
                      const kakao_accunt = res.kakao_account;
                      console.log(kakao_account);
                  }
              });

          }
        })
    }
</script>
</body>
</html>

//잘 모르겠어서 로그인 API가져와서하는 예제로 해보았습니다!ㅠ

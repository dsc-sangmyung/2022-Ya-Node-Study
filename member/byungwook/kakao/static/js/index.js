Kakao.init('dd68af0c4527d18d1995576afa0a6f94');
console.log(Kakao.isInitialized());

function kakaoLogin() {
    console.log("kakao login button-");
    const scope = "profile_nickname, profile_image, account_email";
    Kakao.Auth.login({
        scope,
        success: (res) => {
            window.Kakao.Auth.setAccessToken(res.access_token);
            console.log(`is set?: ${window.Kakao.Auth.getAccessToken()}`);

            const ACCESS_TOKEN = window.Kakao.Auth.getAccessToken();
            console.log("ACCESS_TOKEN:", ACCESS_TOKEN);
        },
        fail: error => {
            console.log("Error: ", error);
        },
    });
}

function kakaoAuthorize() {
    console.log("kakao authorize button");
    Kakao.Auth.authorize({
        redirectUri: "http://localhost:3000/me"
    });
}

function logout() {
    if (!Kakao.Auth.getAccessToken()) {
        console.log("Not logged in.");
        return;
    }
    console.log(Kakao.Auth.getAccessToken());
    Kakao.Auth.logout(function() {
        alert("logOut");
    })
}

function getUser() {
    Kakao.API.request({
        url: '/v2/user/me',
        success: function(res) {
            console.log(res);
        },
        fail: function(error) {
            console.log(error);
        }
    });
}
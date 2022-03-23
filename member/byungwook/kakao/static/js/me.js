Kakao.Auth.setAccessToken()

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
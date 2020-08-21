$.ajaxPrefilter(function (option) {
    // 1.url统一配置
    option.url = 'http://ajax.frontend.itheima.net' + option.url;

    if (option.url.includes('/my/')) {
        option.headers = {
            Authorization: localStorage.getItem('token'),
        }

        //ajax请求完成后触发
        option.complete = function (xhr) {
            if (xhr.responseJSON && xhr.responseJSON.status == 1 && xhr.responseJSON.message == '身份认证失败！') {
                // 1.删除假token
                localStorage.removeItem('token');
                // 2.跳转到登录页面
                location.href = '/login.html';
            }
        }
        // 2.headers,请求头加token(是以/my开头的接口,需要这个配置)
        // 3.ajax请求完成后,判断token的真假(是以/my开头的接口,需要这个配置)
    }
})
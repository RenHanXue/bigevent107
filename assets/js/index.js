//***********1.到达index页面,渲染头像和欢迎语 */
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        success: function (res) {
            if (res.status == 0) {
                //1.设置欢迎语
                var name = res.data.nickname || res.data.username;
                $('.myname').text(name);
                //2.设置头像
                if (res.data.user_pic) {
                    //设置img的src属性
                    //让img显示
                    $('.layui-nav-img').attr('src', res.data.user_pic).show();
                    $('.text-avater').hide();
                } else {
                    //获取名字首字符,变为大写,设置
                    var first = name.substr(0, 1).toUpperCase();
                    $('.text-avater').text(first).css('display', 'inline-block');
                    $('.layui-nav-img').hide();

                }
            }
        },
    });
}

getUserInfo();
//ajax请求完成后触发
// complete: function (xhr) {
//     if (xhr.responseJSON && xhr.responseJSON.status == 1 && xhr.responseJSON.message == '身份认证失败！') {
//         // 1.删除假token
//         localStorage.removeItem('token');
//         // 2.跳转到登录页面
//         location.href = '/login.html';
//     }
// },
// headers: {
//     Authorization: localStorage.getItem('token'),
// }



//*****************2.退出功能********************* */
//确定退出(1.清除本地存储的token 2.退回到登录页面)
$('#logout').click(function () {
    // 弹出层，询问是否要退出
    layer.confirm('你确定退出吗?', function (index) {
        //do something
        // 如果点击了确定，删除token，页面跳转
        localStorage.removeItem('token');
        location.href = '/login.html';
        layer.close(index); // 关闭当前弹出层
    });

});
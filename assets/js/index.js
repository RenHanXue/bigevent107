//***********1.到达index页面,渲染头像和欢迎语 */
function getUserInfo() {
    $.ajax({
        url: 'http://ajax.frontend.itheima.net/my/userinfo',
        success: function (res) {
            if (res.status == 0) {
                //1.设置欢迎语
                var name = res.data.nickname || res.data.username;
                $('.username').text(name);
                //2.设置头像
                if (res.data.user_pic) {
                    //设置img的src属性
                    //让img显示
                    $('.layui-nav-img').attr('src', res.data.user_pic).show();
                }
                //获取名字首字符,变为大写,设置
                var first = name.substr(0, 1).toUpperCase();
                $('.text-avater').text(first).css('display', 'inline-block');

            }
        },
        headers: {
            Authorization: localStorage.getItem('token'),
        }
    })
}
getUserInfo();




//*****************2.退出功能********************* */
//确定退出(1.清除本地存储的token 2.退回到登录页面)
$('#logout').on('click', function () {
    layer.confirm('确定要删除吗', {
            icon: 3,
            title: '提示'
        },
        function (index) {
            //do something
            localStorage.removeItem('token'),
                location.href = '/login.html'
            layer.close(index);
        });
})
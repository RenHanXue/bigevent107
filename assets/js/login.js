//***********切换登录和注册************** */
$('.login a').click(function () {
    $('.register').show().prev().hide();
})
$('.register a').click(function () {
    $('.login').show().next().hide();
})
//**************登录功能******************
$('.login form').on('submit', function (e) {
    e.preventDefault();
    var data = $(this).serialize();
    $.ajax({
        type: 'POST',
        url: 'http://ajax.frontend.itheima.net/api/login',
        data: data,
        success: function (res) {
            layer.msg(res.message);
            if (res.status == 0) {
                localStorage.setItem('token', res.token);
                location.href = '/index.html';
            }
        }
    })
})
//**************注册功能******************
$('.register form').on('submit', function (e) {
    e.preventDefault();
    var data = $(this).serialize();
    $.ajax({
        type: 'POST',
        url: 'http://ajax.frontend.itheima.net/api/reguser',
        data: data,
        success: function (res) {
            layer.msg(res.message);
            if (res.status == 0) {
                $('.login').show().next().hide();
                $('.register form')[0].reset();
            }
        }
    })
})
//**************注册表单验证******************
// 1.用户名密码 重复密码不能为空
// 2.密码、重复密码长度为6~12位,且不能出现空格
// 3.密码和重复密码必须保持一致

// layui自定义验证规则使用步骤
// 1.加载form模块
// var 变量=layui.模块名
var form = layui.form;
// 2.调用form.verify()编写验证规则
form.verify({

    //使用数组
    // changdu: ['正则表达式', '验证失败时的提示信息']
    changdu: [/^\S{6,12}$/, '长度6~12位，不能有空格'],

    //使用函数
    same: function (val) {
        //形参val,表示使用验证规则的输入框的值
        var pwd = $('.pwd').val();
        //比较
        if (pwd != val) {
            return '两次密码不一致';
        }
    }
});
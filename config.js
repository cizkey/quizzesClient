/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'http://192.168.1.30:5757';
// var host = 'http://weapp.ytx.com';
var config = {

  // 下面的地址配合云端 Demo 工作
  imgPath: 'http://img.quizzes.com',
  service: {
    host,

    // 登录地址，用于建立会话
    // loginUrl: `http://192.168.1.29:8180/wx/auth/authorization.html`,

    loginUrl: `${host}/weapp/login`,

    userInfoUrl: 'https://question-zh.hortor.net/question/player/login',

    // 测试的请求地址，用于测试会话
    // requestUrl: `http://192.168.1.29:8180/wx/auth/validation.html`,
    requestUrl: `${host}/weapp/user`,
    // 测试的信道服务地址
    tunnelUrl: `${host}/weapp/tunnel`,

    // 上传图片接口
    uploadUrl: `${host}/weapp/upload`
  }
};

module.exports = config;

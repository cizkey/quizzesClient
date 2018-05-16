//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')
var util = require('./utils/util.js');
App({
  onLaunch: function (options) {
    this.globalData.scene = options.scene;
    qcloud.setLoginUrl(config.service.loginUrl);
  },
  globalData: {
    userInfo: {}
  },
  openTunnel: function () {
    // 创建信道，需要给定后台服务地址
    var tunnel = this.tunnel = new qcloud.Tunnel(config.service.tunnelUrl)

    // 监听信道内置消息，包括 connect/close/reconnecting/reconnect/error
    tunnel.on('connect', () => {
      console.log('WebSocket 信道已连接')
      this.tunnelStatus = 'connected';
    })

    tunnel.on('close', () => {
      console.log('WebSocket 信道已断开')
      this.tunnelStatus = 'closed';
    })

    tunnel.on('reconnecting', () => {
      console.log('WebSocket 信道正在重连...')
    })

    tunnel.on('reconnect', () => {
      console.log('WebSocket 信道重连成功')
    })

    tunnel.on('error', error => {
      console.error('信道发生错误：', error)
    })
    tunnel.on('error', error => {
      console.error('信道发生错误：', error)
    })
    // 打开信道
    tunnel.open()
    this.tunnelStatus = 'connecting';
  },
  onShow: function () {
    console.log("app onShow");
  },
  onHide: function () {
    console.log("app onHide")
  },
  onUnlaunch: function () {
    console.log("app onUnlaunch")
  }
})
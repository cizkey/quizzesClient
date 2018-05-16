// pages/start/index.js
var config = require('../../config')
var qcloud = require('../../vendor/wafer2-client-sdk/index')
const appInstance = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgPath: config.imgPath,
    userInfo: appInstance.globalData.userInfo,
    rank: true,
    phone:0,//0 未填手机号 1 已填手机号
    dialogType:'',//弹框类型 setting 设置  join 加入战队
    logged: false,
    animate: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let _this=this;
    this.setData({
      userInfo: appInstance.globalData.userInfo,
      dialogType:'join'
    });
    if (appInstance.tunnel && appInstance.tunnel.isActive()){
      appInstance.tunnel.on('speak', msg => {
        console.log('收到speak消息', msg)
      })
    }
    // _this.dialog.show();
    // setTimeout(function(){
    //   _this.dialog.close();
    // },2000)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  agreeJoin() {
    let _this = this;
    _this.dialog.close();
    this.toast.show({
      img: config.imgPath + '/images/skin/popup/suc.png',
      title: '成功加入战队',
      duration: 2000
    })
  },
  refuseJoin() {
    let _this = this;
    this.toast.show({
      img: config.imgPath + '/images/skin/popup/fail.png',
      title: '战队已满先去欢乐答题吧',
      duration:2000
    })
  },
  settingEvent(){
    let _this = this;
    _this.setData({
      dialogType: 'setting'
    });
    _this.dialog.show();
  }
})
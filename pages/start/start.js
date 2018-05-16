// pages/start/start.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js');
const appInstance = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgPath: config.imgPath,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.login();
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
  // 用户登录
  login: function () {
    var that = this
    // 调用登录接口
    wx.showLoading({
      title: '加载中',
    })
    qcloud.login({
      success(result) {
        if (result) {
          wx.hideLoading()
          appInstance.openTunnel();
          appInstance.globalData.userInfo = result;
          wx.redirectTo({
            url: '/pages/index/index',
          })
            
        } else {
          // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
          qcloud.request({
            url: config.service.requestUrl,
            login: true,
            success(result) {
              wx.hideLoading()
              if (result.statusCode == 200) {
                appInstance.openTunnel();
                appInstance.globalData.userInfo = result.data.data;
                // console.log(appInstance)
                wx.redirectTo({
                  url: '/pages/index/index',
                })
              } else {
                util.showModel('请求失败', { message: "网络错误" })
              }
            },

            fail(error) {
              util.showModel('请求失败', error)
            }
          })
        }
      },

      fail(error) {
        util.showModel('登录失败', error)
      }
    })
  },
})
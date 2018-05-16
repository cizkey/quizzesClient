// pages/history/detail.js
const appInstance = getApp();
const config = require('../../config');
const WxParse = require('../../libs/wxParse/wxParse.js');
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
    let _this = this;
    WxParse.wxParse('question', 'html', '<p>如图所示，虚线a,b,c,d表示匀强电场中的4个等势面,两个带电粒子M、N(中立忽略不计）以平行于等势面的初速度摄入电场运动轨迹分别如图MPN和NQM所示。已知M是带电的正电粒子，M是带电的正电粒子知M是带电的正电粒子知M是带电的正电粒子，知M是带电的正电粒子，则( )</p>', _this, 5);
    // WxParse.wxParse('answer', 'html', '<p>如图所示，虚线a,b,</p>', _this, 5);
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

  }
})
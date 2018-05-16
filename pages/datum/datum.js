// pages/packet/packet.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
const appInstance = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgPath: config.imgPath,
        tips:'您的手机号填写有误',
        tipBok:false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
    },
    formSubmit: function(e) {
        var phone = e.detail.value.phone;
        var wechat = e.detail.value.wechat;
        //手机号正则
        if(!util.reg.phone(phone)){
            this.setData({
                tipBok:true,
                tips:'您的手机号填写有误'
            });
        }
        // 微信号验证
        if(!util.reg.wx(wechat)){
            this.setData({
                tipBok:true,
                tips:'您的微信号填写有误'
            });
        }
        this.setData({
            tipBok:false
        });
        //请求后台数据，然后跳转到下个界面
        wx.navigateTo({
            url: '/pages/datumSuccess/datumSuccess'
        })

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
    onShareAppMessage: function () {

    }
})
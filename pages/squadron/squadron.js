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
      popBok:false,
      headerImage:'http://192.168.1.25:3002/quizzes/images/skin/squadron/header.png'
  },
    editorName:function () {
        this.setData({
            popBok:true
        })
    },
    closePop:function () {
        this.setData({
            popBok:false
        })
    },
    formSubmit: function(e) {
        console.log('form发生了submit事件，携带数据为：', e.detail.value)
        var captain = e.detail.value.captain;
        if(!util.reg.empty(captain)){
            util.showNormal('队名不能为空或空格');
            return false;
        }

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
    changeImage:function () {
      console.log(1);
        var self = this;
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                var tempFilePaths = res.tempFilePaths;
                self.setData({
                    headerImage:tempFilePaths[0]
                });
                console.log(tempFilePaths);
                wx.uploadFile({
                    url: 'https://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
                    filePath: tempFilePaths[0],
                    name: 'file',
                    formData:{
                        'user': 'test'
                    },
                    success: function(res){
                        var data = res.data
                        //do something
                    }
                })
            }
        })
    },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
      if (res.from === 'button') {
          // 来自页面内转发按钮
          console.log(res.target);
      }
      return {
          title: '自定义转发标题111222',
          path: '/pages/packetSuccess/packetSuccess?id=123',
          success: function(res) {
              // 转发成功
          },
          fail: function(res) {
              // 转发失败
          }
      }
  }
})
// pages/rank/rank.js
const appInstance = getApp();
const config = require('../../config');
const WxParse = require('../../libs/wxParse/wxParse.js');
let matchTimer = null;
let subjectTimer = null;
let circleTimer = null;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgPath: config.imgPath,
    userInfo: {},
    matchCode: 0,//0:匹配对手 1：邀请对战
    matchStatus: 0,//0匹配中 1 匹配成功进入启动页   2 进入对战  3 开始答题  4 结束对战 5 匹配失败
    matchCount: 600,
    matchCountFormat: '10:00',
    pkResult: 'fail',//pk结果  suc  挑战成功  fail 跳转失败
    startAnimate: true,//启动页动画
    titleAnimate: true,//标题动画
    subjectAnimate: true,//答题区域动画
    answerAnimate: false,//错题动画
    leftCircleAnimate: "",//环形倒计时动画
    rightCircleAnimate: "",//环形倒计时动画
    subjectCount: 10,
    subjectTotalTime: 10,
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
    // this.setData({
    //   userInfo: appInstance.globalData.userInfo,
    //   scene: appInstance.globalData.scene,
    // });
    // if (appInstance.globalData.scene) {

    // }
    let _this = this;
    _this.friendMatch();
    _this.setMatchStatus(1, 3000, function () {
      _this.setMatchStatus(2, 4000, function () {
        _this.setMatchStatus(3, 500, function () {
          setTimeout(function () {
            _this.errorAnswer();
          }, 5000)
          _this.setMatchStatus(2, 6000, function () {
            _this.setMatchStatus(3, 3000, function () {
              _this.setMatchStatus(4, 6000);
              _this.setData({
                pkResult: ['suc', 'fail'][Math.round(Math.random())]
              })
            })
          })
        })
      })
    })

    // this.initCircleRing();
    // circleTimer=setTimeout(function () {
    //   _this.subjectCountDown();
    // }, 2000)
    WxParse.wxParse('article', 'html', '<p>如图所示，虚线a,b,c,d表示匀强电场中的4个等势面,两个带电粒子M、N(中立忽略不计）以平行于等势面的初速度摄入电场运动轨迹分别如图MPN和NQM所示。已知M是带电的正电粒子，M是带电的正电粒子知M是带电的正电粒子知M是带电的正电粒子，知M是带电的正电粒子，则( )</p>', _this, 5);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      userInfo: appInstance.globalData.userInfo,
    });
    this.sendMessage("match")
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
    subjectTimer && clearInterval(subjectTimer);
    subjectTimer = null;
    matchTimer && clearInterval(matchTimer);
    matchTimer = null;
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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '还在看书刷题吗?来CPA答题联赛跟我较量一下吧',
      path: '/pages/rank/rank?id=123',
      imageUrl: config.imgPath + '/images/skin/home/btn_home_livematch.png',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  friendMatch() {
    let _this = this;
    matchTimer = setInterval(function () {
      if (_this.data.matchCount > 0) {
        let count = _this.data.matchCount;
        count--;
        _this.setData({
          matchCount: count,
          matchCountFormat: _this.formatCount(count)
        })
      } else {
        clearInterval(matchTimer);
        _this.setData({
          matchStatus: 5
        });
        wx.showModal({
          title: '',
          content: '本次对战已过期',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        })
      }
    }, 1000);
  },
  /**
   * 格式化倒计时
   */
  formatCount(s) {
    var t;
    if (s > -1) {
      var hour = Math.floor(s / 3600);
      var min = Math.floor(s / 60) % 60;
      var sec = s % 60;
      if (min < 10) {
        t = '0' + min + ":";
      } else {
        t = min + ":";
      }
      // if (min < 10) { t += "0"; }
      // t += min + ":";
      if (sec < 10) { t += "0"; }
      t += sec;
    }
    return t;
  },
  /**
   * 放弃PK
   */
  giveUpPk() {
    wx.navigateBack({})
  },
  randomMatch() {
    matchTimer && clearInterval(matchTimer);
    this.setData({
      matchCode: 0
    })
  },
  subjectCountDown() {
    let _this = this;
    _this.setData({
      subjectComplate: false,
      subjectStatus: 1,
    });
    _this.setCirCleRingDeg();
    subjectTimer = setInterval(function () {
      if (_this.data.subjectCount > 0) {
        let count = _this.data.subjectCount;
        count--;
        _this.setData({
          subjectCount: count,
        });
        _this.setCirCleRingDeg();
      } else {
        clearInterval(subjectTimer);
        subjectTimer = null;
        _this.initCircleRing();
      }
    }, 1000)
  },
  initCircleRing() {
    this.setData({
      leftCircleAnimate: "transform:rotateX(0) rotateY(0) rotateZ(0);transition: all 0.3s linear",
      rightCircleAnimate: "transform:rotateX(0) rotateY(0) rotateZ(0);transition: all 0.3s linear 0.3s;",
    })
  },
  setCirCleRingDeg() {
    let _this = this;
    let deg = (_this.data.subjectCount - 1) * 360 / _this.data.subjectTotalTime;
    if (deg >= 180) {
      deg = 360 - deg;
      _this.setData({
        rightCircleAnimate: "transform:rotateX(0) rotateY(0) rotateZ(" + deg + "deg)",
      })
    } else {
      deg = deg < 0 ? 180 : 180 - deg;
      _this.setData({
        leftCircleAnimate: "transform:rotateX(0) rotateY(0) rotateZ(" + deg + "deg)",
      })
    }
  },

  setMatchStatus(code, time, callback) {
    let _this = this;
    setTimeout(function () {
      _this.setData({
        matchStatus: code
      });
      callback && callback();
    }, time)
  },
  errorAnswer() {
    let _this = this;
    _this.setData({
      answerAnimate: true
    });
    setTimeout(function () {
      _this.setData({
        answerAnimate: false
      });
    }, 1300)
  },

  sendMessage(msgType) {
    if (!appInstance.tunnelStatus || !appInstance.tunnelStatus === 'connected') return
    // 使用 tunnel.isActive() 来检测当前信道是否处于可用状态
    if (appInstance.tunnel && appInstance.tunnel.isActive()) {
      // 使用信道给服务器推送「speak」消息
      let message = Object.assign(this.data.userInfo, { 'roomId': 12345, })
      appInstance.tunnel.emit(msgType, message);
    }
  }
  // drawCanvas(val) {
  //   if (!cxt_arc) {
  //     cxt_arc = wx.createCanvasContext('canvasArc');//创建并返回绘图上下文context对象.
  //   }
  //   this.drawReverse(cxt_arc, val);
  // },


  // drawCircle(cxt_arc, val) {
  //   let _this = this;
  //   let mW = _this.PX2RPX(132);
  //   let mH = _this.PX2RPX(132);;
  //   cxt_arc.clearRect(0, 0, mW, mH);
  //   cxt_arc.setLineWidth(_this.PX2RPX(10));
  //   cxt_arc.setStrokeStyle('#EFEFEF');
  //   cxt_arc.setLineCap('round')
  //   cxt_arc.beginPath();//开始一个新的路径  
  //   cxt_arc.arc(_this.PX2RPX(66), _this.PX2RPX(66), _this.PX2RPX(60), 0, 2 * Math.PI, true);//
  //   cxt_arc.stroke();//对当前路径进行描边  

  //   cxt_arc.setLineWidth(_this.PX2RPX(10));
  //   // if (val > -Math.PI * 1 / 2) {
  //   //   cxt_arc.setStrokeStyle('#ffd800');
  //   // }
  //   cxt_arc.setStrokeStyle('#ffd800');
  //   cxt_arc.setLineCap('round')
  //   cxt_arc.beginPath();//开始一个新的路径  
  //   cxt_arc.arc(_this.PX2RPX(66), _this.PX2RPX(66), _this.PX2RPX(60), Math.PI * 1.5, val, true);
  //   cxt_arc.stroke();//对当前路径进行描边  
  //   cxt_arc.draw();
  // },



  // drawForward(cxt_arc, val) {
  //   let _this = this;
  //   speed = 2 * Math.PI * FPS / 1000;
  //   val -= speed;
  //   if (val > -0.5 * Math.PI) {
  //     _this.drawCircle(cxt_arc, val);
  //     drawTimer = setTimeout(function () {
  //       _this.drawForward(cxt_arc, val);
  //     }, FPS);
  //   } else {
  //     _this.setData({
  //       subjectCount: 20,
  //       subjectTotalTime: 20,
  //     })
  //     _this.subjectCountDown();
  //   }
  // },
  // drawReverse(cxt_arc, val) {
  //   let _this = this;
  //   val += speed;
  //   if (val < 1.5 * Math.PI) {
  //     _this.drawCircle(cxt_arc, val);
  //     drawTimer = setTimeout(function () {
  //       _this.drawReverse(cxt_arc, val);
  //     }, FPS)
  //   } else {
  //     _this.drawForward(cxt_arc, val);
  //   }
  // },
  // PX2RPX(px) {
  //   return px / 750 * windowWidth;
  // },
  // clearPage(){
  //   subjectTimer && clearInterval(subjectTimer);
  //   subjectTimer=null;
  //   matchTimer && clearInterval(matchTimer)
  //   matchTimer=null;
  //   drawTimer && clearTimeout(drawTimer);
  //   drawTimer=null;
  // },
})
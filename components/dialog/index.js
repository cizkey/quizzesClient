// components/dialog/index.js
let config = require('../../config')
Component({
  /**
   * 组件的属性列表
   */
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    title: {
         type:String,
         value:"",
         obsever:function(newVal,oldVal){
         }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    imgPath: config.imgPath,
    show: false,
  },
  attached: function () {
    let pages = getCurrentPages()
    let curPage = pages[pages.length - 1]
    curPage.dialog = this;
  },
  ready: function () {

  },
  /**
   * 组件的方法列表
   */
  methods: {
    show() {
      let _this = this;
      _this.setData({
        show: true
      })
    },
    close() {
      let _this = this;
      _this.setData({
        show: false
      })
    }
  }
})

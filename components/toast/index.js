// components/toast/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    timeout: null,
    toastParam:{
      reveal: false,
    }
  },
  attached: function () {
    let pages = getCurrentPages()
    let curPage = pages[pages.length - 1]
    curPage.toast = this;
  },
  /**
   * 组件的方法列表
   */
  methods: {
    toggle(data) {
      try {
        if (!data) {
          this.hide()
        } else {
          this.show(data)
        }
      } catch (err) {
        console.error(err)

        // fail callback
        data && typeof data.fail === 'function' && data.fail(data)
      } finally {
        // complete callback
        data && typeof data.complete === 'function' && data.complete(data)
      }
    },
    show(data) {
      let _this = this;
      clearTimeout(_this.timeout);
      _this.setData({
        'toastParam.reveal': true,
      });
      setTimeout(function () {
        let animation = wx.createAnimation()
        animation.opacity(1).step()
        data.animationData = animation.export()
        data.reveal = true
        _this.setData({
          toastParam: data
        })
      }, 30);
      if (data.duration === 0) {
        // success callback after toast showed
        setTimeout(() => {
          typeof data.success === 'function' && data.success(data)
        }, 430)
      } else {
        _this.timeout = setTimeout(() => {
          _this.toggle()

          // success callback
          typeof data.success === 'function' && data.success(data)
        }, (data.duration || 1500) + 400)
      }
    },
    hide(){
      clearTimeout(this.timeout);
      if (!this.data.toastParam.reveal) {
        return
      }

      let animation = wx.createAnimation()
      animation.opacity(0).step()
      this.setData({
        'toastParam.animationData': animation.export()
      })

      setTimeout(() => {
        this.setData({
          toastParam: { 'reveal': false }
        })
      }, 400)
    }
  }
})

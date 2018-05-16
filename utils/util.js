const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

var reg = {
    // 电话号码校验
    phone:function (phone) {
        var phoneReg = /(^1\d{10}$)/;
        if (!phoneReg.test(phone)) {
            return false;
        }else{
            return true;
        }
    },
    // 微信账号校验
    wx:function (wx) {
        var wxreg=/^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/;
        if (!wxreg.test(wx)) {
            return false;
        }else{
            return true;
        }
    },
    // 字符串非空校验
    empty:function (str) {
        var strings = str.replace(/(^\s+)|(\s+$)/g,"");
        if (strings.length ==0) {
            return false;
        }else{
            return true;
        }
    }
};

// 显示繁忙提示
var showBusy = text => wx.showToast({
    title: text,
    icon: 'loading',
    duration: 10000
})

// 显示成功提示
var showSuccess = text => wx.showToast({
    title: text,
    icon: 'success'
})

// 显示失败提示
var showModel = (title, content) => {
    wx.hideToast();

    wx.showModal({
        title,
        content: JSON.stringify(content),
        showCancel: false
    })
}

// 显示正常提示
var showNormal = text => wx.showToast({
    title: text,
    icon: 'none'
})

module.exports = { formatTime, showBusy, showSuccess,showNormal, showModel,reg }

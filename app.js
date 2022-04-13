// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
    wx.login({
      success: res => {
        if(res.code){
          wx.request({
            url: 'http://localhost:8080/login/getSessionId',
            data:{
              code: res.code
            },
          success:function(res2){
            console.log(res2.data.data.sessionId)
            wx.setStorageSync('sessionId', res2.data.data.sessionId)
          }
        })
        if(wx.getStorageSync('token')!=''){
          wx.request({
          url: 'http://localhost:8080/login/authToken',
          header:{
            'Authorization': wx.getStorageSync('token')
          },
          success:function(res){
            if(res.data.code==0){
             wx.setStorageSync('tokenFlag', 1)
             wx.showToast({
               title: '已自动登录！',
             })
            }
            else{
              wx.setStorageSync('tokenFlag', 0)
              wx.showToast({
                title: '身份过期！',
              })
            }
          },
        })
        }else{
        wx.setStorageSync('tokenFlag', 1)
        wx.showToast({
          title: '当前为游客身份',
        })
      }
  }},
})
  },
  globalData: {
    userInfo: null,
    token: null,
  }
})

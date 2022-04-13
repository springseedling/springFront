// pages/sign/sign.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    password: '',
    code: '',
    role: '',
  },
  login:function(res){
    wx.request({
      url: 'http://localhost:8080/role/signUp',
      data:{
        username: this.data.phone,
        password: this.data.password,
        code: this.data.code,
        role: this.data.role
      },
      success:function(res){
        if(res.data.code==0){
        wx.showToast({
          title: '注册成功！',
        })
        setTimeout(function(){
          wx.navigateBack({
            delta: 1,
          })
        },1000)}
        else{
          wx.showToast({
            title: '注册失败！',
          })
        }
      }
    })
  },
  send:function(res){
    wx.request({
      url: 'http://localhost:8080/sendSms/code',
      data:{
        number: this.data.phone
      },
      success:function(res){
        if(res.data.code==0){
          wx.showToast({
            title: '发送成功！',
          })
        }
      }
    })
  }
})
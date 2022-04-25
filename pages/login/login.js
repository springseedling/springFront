import {request} from '../request/index'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listJoin:[],
    user: '',
    username: '',
    password: ''
  },
  onShow: function(e){
    // const userinfo = wx.getStorageSync('user')
    // if(userinfo.id){
    //   this.setData({
    //     user: userinfo
    //   })
    // }else{
    //   wx.switchTab({
    //     url: '../login/login',
    //   })
    // }
    if(wx.getStorageSync('tokenFlag')==1){
          this.setData({
      user: wx.getStorageSync('user')
    })
    wx.switchTab({
      url: '../login/login',
    })
    }
  },
  login(){
    var that = this
    let data = {
      username: this.data.username,
      password: this.data.password
    }
    // request({
    //   url: '/user/login',
    //   data: data
    // }).then(res =>{
    //   if(res){
    //     wx.showToast({
    //       title: '登录成功',
    //       icon: 'success'
    //     })
    //     wx.setStorageSync('user', res)
    //     setTimeout(() =>
    //     this.onShow(
    //       wx.switchTab({
    //         url: './login',
    //       })
    //     ),1000)
    //   }else{
    //     wx.showToast({
    //       title: '账号或密码错误',
    //       icon: 'error'
    //     })
    //   }
    // })
    wx.request({
      url: 'http://localhost:8080/role/signIn',
      data:{
        username: this.data.username,
        password: this.data.password
      },
      success:function(res){
        var a = res.data.data
        console.log("uid: "+a.uid)
        console.log("role: "+a.role)
        wx.setStorageSync('role', a.role)
        wx.setStorageSync('uid', a.uid)
        if(res.data.code==0){
        wx.getUserInfo({
          desc: '用于信息完善',
          success(res){
          wx.request({
            url: 'http://localhost:8080/login/authLogin',
            data:{
              encryptedData: res.encryptedData,
              iv: res.iv,
              sessionId: wx.getStorageSync('sessionId')
            },
            success:function(res2){
              console.log("token: "+res2.data.data.token)
              // app.globalData.token=res2.data.data.token
              wx.setStorageSync('token', res2.data.data.token)
            }
        })
      }
    })
        wx.showToast({
          title: '登录成功！',
        })
        setTimeout(function(){
          wx.setStorageSync('user', res.data.data)
          that.onShow(
            that.setData({
              user: res.data.data
            })
          )},1000)
      }
        else{
          wx.showToast({
            title: '账号或密码错误！',
          })
        }
      },
      fail:function(s){
        wx.showToast({
          title: '连接错误！',
        })
      }
      }
    )
  },
  sign(){
    wx.navigateTo({
      url: '../sign/sign',
    })
  },
  inputs:function(res){
  },
  out(){
    var that = this
    wx.showToast({
      title: '已退出登录！',
    })
    setTimeout(function(){
      wx.setStorageSync('tokenFlag', 0)
      wx.setStorageSync('token', '')
      wx.setStorageSync('user', '')
      that.setData({
        username: '',
        password: '',
         user: ''
      })
    that.onShow()
    },1000)
  }
})
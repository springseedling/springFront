import {request} from '../request/index'

const app = getApp()
Page({
  data: {
    show: false,
    region: []
},
  getUserProvince:function(e)
  {
     this.setData({
         region:e.detail.value     //将用户选择的省市区赋值给region
     })
     console.log(e.detail.value)
  },

  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },
  content(){
    wx.navigateTo({
      url: '../desc/desc'
    })
  },

    bindRegionChange: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        region: e.detail.value
      })
    },
  // login(){
  //   var that = this
  //   wx.getUserProfile({
  //     desc: '用于信息完善',
  //     success(res){
  //       wx.request({
  //         url: 'http://localhost:8080/login/authLogin',
  //         data:{
  //           encryptedData: res.encryptedData,
  //           iv: res.iv,
  //           sessionId: wx.getStorageSync('sessionId')
  //         },
  //     })
  //     }
  //   })
  // },
  login(){
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
          console.log(res2.data.data.token)
          wx.setStorageSync('token', res2.data.data.token)
        }
    })
    setTimeout(()=>
    wx.request({
      url: 'http://localhost:8080/login/loginInfo',
      data:{
        refresh: false
      },
      header:{
        'Authorization': wx.getStorageSync('token')
      },
      success:function(res3){
        console.log(res3.data.data.token)
        wx.setStorageSync('token', res3.data.data.token)
      }
    })
    ,3000)
      }
    })
  },


})

import {request} from '../request/index'

const app = getApp()
Page({
  data: {
    value: '',
    swiperItems: [{imageUrl: 'https://images.unsplash.com/photo-1650035418821-77ee35531a6b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3NHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60'},
    {imageUrl: 'https://images.unsplash.com/photo-1649943752014-50b5fd4d126d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMTd8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60'},{imageUrl: 'https://images.unsplash.com/photo-1649986444214-d03f25b37699?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMjB8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60'},
    {imageUrl: 'https://images.unsplash.com/photo-1649946583796-8c3bb656c8ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80'}],
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
  bindDateChange1: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date1: e.detail.value
    })
  },
  bindDateChange2: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date2: e.detail.value
    })
    console.log(this.data.date1<this.data.date2)
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
  onChange(){
    console.log("评分为："+this.data.value+'星')
  }
})

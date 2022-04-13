import {request} from '../request/index'
Page({
  data: {
    joins:[],
  },
  onShow: function () {
  // this.setData({
  //   joins: wx.getStorageSync('join'),
  // })
  request({
    url: '/join/showAllJoin'
  }).then(res=>{
    this.setData({
      joins: res
    })
  })
  },
  oper:function (options) {
    console.log(options)
    wx.setStorageSync('id', options.currentTarget.dataset.id);
    wx.setStorageSync('name', options.currentTarget.dataset.name);
    wx.setStorageSync('phone', options.currentTarget.dataset.phone);
    wx.setStorageSync('number', options.currentTarget.dataset.number);
    if(options.currentTarget.dataset.oper=="del"){
      request({
        url: '/join/delJoin',
        data: {id: options.currentTarget.dataset.id}
      }).then(res=>{ 
        if(res=="ok"){
            wx.showToast({
              title: '删除成功！',
            })
            setTimeout(() =>
            this.onShow(
            ),1000)
          }})  
        }else{
          wx.navigateTo({
            url: '../modify/modify',
          })
        }
      }
    }
)
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
    }
 })
// pages/actDesc/actDesc.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    onelist:''

  },
  onShow(){
    var that = this
    wx.request({
      url: 'http://localhost:8080/org/getALById',
      data:{
        id: wx.getStorageSync('id')
      },
      header:{
        'Authorization': wx.getStorageSync('token')
      },
      success:function(res){
        that.setData({
          onelist:res.data
        })
      }

    })
  }
})
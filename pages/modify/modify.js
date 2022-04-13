import {request} from '../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    joins: '',
    id: '',
    name: '',
    phone: '',
    number: ''
  },
  onShow: function(e){
    this.setData({
    id: wx.getStorageSync('id'),
    name: wx.getStorageSync('name'),
    phone: wx.getStorageSync('phone'),
    number: wx.getStorageSync('number'),
    })
    request({
      url: '/join/showAllJoin'
    }).then(res=>{
      this.setData({
        joins: res
      })
    })
  },
  update(){
    let data={
      id: this.data.id,
      name: this.data.name,
      phone: this.data.phone,
      number: this.data.number
    }
    request({
      url: '/join/updateJoinById',
      data: data,
      header:{'content-type':'application/x-www-form-urlencoded;charset=utf-8'}
    }).then(res=>{
      if(res="yes"){
        wx.showToast({
          title: '提交成功',
          icon: 'success'
        })
        setTimeout(() =>
        this.onShow(
          wx.navigateBack({
            delta: 1,
          })
        ),1000)}
      }
    )
    
  }

})
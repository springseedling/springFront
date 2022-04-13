import {request} from '../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    join: '',
    user: '',
    name: '',
    phone: '',
    number: '',
  },
  onShow: function(e){
    const userinfo = wx.getStorageSync('user')
      this.setData({
        user: userinfo,
      })
  },
  join(){
    const userinfo = wx.getStorageSync('user')
    let data={
      id: userinfo.id,
      name: this.data.name,
      phone: this.data.phone,
      number: this.data.number
    }
    request({
      url: '/join/addJoin',
      data: data,
      header:{'content-type':'application/x-www-form-urlencoded;charset=utf-8'}
    }).then(res=>{
      if(res="yes"){
        wx.showToast({
          title: '提交成功',
          icon: 'success'
        })
        if(wx.getStorageSync('flag'==1)){
        setTimeout(() =>
        this.onShow(
          wx.navigateBack({
            delta: 2,
          })
        ),1000)}else{
          setTimeout(() =>
          this.onShow(
            wx.navigateBack({
              delta: 1,
            })
          ),1000)
        }
      }
    })
    
  }

})
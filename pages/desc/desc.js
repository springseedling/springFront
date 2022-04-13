import {request} from '../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:""
  },
  join(){
    const user= wx.getStorageSync('user')
    if(user){
       wx.navigateTo({
         url: '../join_info/join_info',
       })
    }else{
      wx.navigateTo({
        url: '../join/join',
      })
    }
  },
})
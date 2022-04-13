import {request} from '../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: '',
    username: '',
    password: ''
  },
  login(){
    let data = {
      username: this.data.username,
      password: this.data.password
    }
    request({
      url: '/user/login',
      data: data
    }).then(res =>{
      if(res){
        wx.showToast({
          title: '登录成功',
          icon: 'success'
        })
        wx.setStorageSync('flag', 1)
        wx.setStorageSync('user', res)
        setTimeout(() =>
          wx.navigateTo({
            url: '../join_info/join_info',
          })
        ,1000)
      }else{
        wx.showToast({
          title: '账号或密码错误',
          icon: 'error'
        })
      }
    })
  }
})
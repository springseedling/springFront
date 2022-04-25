Page({

  data: {

  },
  onShow(){
    console.log(this.options)
    var that = this
    wx.request({
      url: 'http://localhost:8080/stu/getStuById/'+wx.getStorageSync('uid'),
      method: "GET",
      header:{
        'Authorization': wx.getStorageSync('token')
      },
      success:function(res){
         that.setData({
           stuInfo: res.data.data
         })
      }
    })
    this.setData({
      actInfo: this.options
    })
  },
  enter(){
    if(wx.getStorageSync('role')=='学生'){
      wx.request({
        url: 'http://localhost:8080/stu/enterAct',
        method: "GET",
        header:{
          "Authorization": wx.getStorageSync('token')
        },
        data:{
          user_id: wx.getStorageSync('uid'),
          item_id: this.options.item_id,
          org_id: this.options.org_id,
          org_check: this.options.org_id
        },
        success:function(res){
          console.log(res)
          if(res.data.code==0){
            wx.showToast({
              title: '报名成功！',
            })
          }else if(res.data.code==20006){
            wx.showToast({
              title: '请勿重复报名！',
            })
          }else{
            wx.showToast({
              title: '报名失败！',
            })
          }
        }
      })
    }else{
      wx.showModal({
        title: '您没有权限报名！',
        showCancel: false
      })
    }
  }
})
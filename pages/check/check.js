Page({

  data: {
    percentage: 0,
    index: 0,
    autoplay: false,
    swiperItems: []
  },
  go(){
    if(this.data.index<=this.data.swiperItems.length-1){
      wx.request({
        url: 'http://localhost:8080/org/checkRecord',
        method: "GET",
        header:{
          "Authorization": wx.getStorageSync('token')
        },
        data:{
            record_id: this.data.swiperItems[this.data.index].record_id,
            check: 1
        },
        success:function(res){
          console.log(res.data.data)
        }
      })
    }
    var that = this
    wx.showToast({
      title: '已通过！',
    })
    if(this.data.index<this.data.swiperItems.length-1){
      this.setData({
        index: this.data.index+1,
      })
      var p = this.data.index/this.data.swiperItems.length*100
      var p1=p.toFixed(0)
    setTimeout(function(){
      that.setData({
        autoplay: true
      })
    },100)
    setTimeout(function(){
        that.setData({
          autoplay: false,
          percentage: p1
        })
    },250)
  }else{
    if(this.data.index==this.data.swiperItems.length-1){
    this.setData({
      index: this.data.index+1
    })
    var p = this.data.index/this.data.swiperItems.length*100
    this.setData({
      percentage: p
    })
    wx.showToast({
      title: '已通过！',
    })
    }else{
    wx.showToast({
      title: '没有更多了！',
      icon: 'none'
    })
  }
  }
  },
  back(){
    if(this.data.index<=this.data.swiperItems.length-1){
      wx.request({
        url: 'http://localhost:8080/org/checkRecord',
        method: "GET",
        header:{
          "Authorization": wx.getStorageSync('token')
        },
        data:{
            record_id: this.data.swiperItems[this.data.index].record_id,
            check: -1
        },
        success:function(res){
          console.log(res.data.data)
        }
      })
    }
    var that = this
    wx.showToast({
      title: '已驳回！',
      icon: 'error'
    })
    if(this.data.index<this.data.swiperItems.length-1){
      this.setData({
        index: this.data.index+1
      })
      var p = this.data.index/this.data.swiperItems.length*100
      var p1=p.toFixed(0)
    setTimeout(function(){
      that.setData({
        autoplay: true
      })
    },100)
    setTimeout(function(){
        that.setData({
          autoplay: false,
          percentage: p1
        })
    },250)
  }else{
    if(this.data.index==this.data.swiperItems.length-1){
    this.setData({
      index: this.data.index+1
    })
    var p = this.data.index/this.data.swiperItems.length*100
    this.setData({
      percentage: p
    })
    wx.showToast({
      title: '已驳回！',
      icon: 'error'
    })
    }else{
    wx.showToast({
      title: '没有更多了！',
      icon: 'none'
    })
  }
  }
  },
  onShow(){
    var that = this
    wx.request({
      url: 'http://localhost:8080/org/getChecking',
      method: 'GET',
      data:{
        org_id: wx.getStorageSync('uid')
      },
      success:function(res){
         that.setData({
           list1: res.data.data
         })
         for (let index=0; index < that.data.list1.length; index++) {
          var a=that.data.list1[index].activity.join_time;
          var a1=a.replaceAll('"','')
          var a2=a1.replaceAll('[','')
          var a3=a2.replaceAll(']','')
          var b =a3.split(',')
          var c = b[0]+' - '+b[1]
          that.data.list1[index].activity.join_time = c
          var d2 = that.data.list1[index].activity.address;
          var e2 = d2.replaceAll('[','').replaceAll(']','').replaceAll('"','')
          var f2 = e2.split(",")
          that.data.list1[index].activity.address = f2[0]+' '+f2[1]+' '+f2[2]
         }
         that.setData({
             swiperItems: that.data.list1
         })
      }
    })
  }
})
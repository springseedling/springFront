// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    keystr: '',
    flag: 0,
    num: 1,
  },
  onShow(){
    var that = this
    if(that.data.flag!=1){
    wx.request({
      url: 'http://localhost:8080/org/page',
      data:{
        item_name: this.data.keystr,
        page: 1,
        size: 2
      },
      success:function(res){
        that.setData({
          list: res.data.data.current_data
        })
      }
    })}
  },
  click:function(e){
    wx.navigateTo({
      url: '../actDesc/actDesc',
    })
    wx.setStorageSync('id', e.currentTarget.dataset.id)
  },
  keyinput: function(t) {
    this.setData({
        keystr: t.detail.value
    });
   },
   search(){ 
     var that = this
    wx.request({
      url: 'http://localhost:8080/org/page',
      data: {
        item_name: this.data.keystr,
        page: 1,
        size: 2
      },
      success:function(res){
        that.setData({
          list: res.data.data.current_data,
          flag: 1,
          num: 1
        })
        that.onShow()
      }
    })
   },
   onReachBottom: function() {
     var that = this
    wx.showToast({
        title: "数据加载中",
        icon: "loading",
        duration: 500
    })
    this.data.num++;
    wx.request({
      url: 'http://localhost:8080/org/page',
      data:{
        item_name: this.data.keystr,
        page: this.data.num,
        size: 2,
      },
      success:function(res){
        console.log(res)
        that.setData({
          list: that.data.list.concat(res.data.data.current_data)
        })
        if(res.data.data.current_data==''){
          wx.showToast({
            title: '没有更多数据了',
            icon: 'error',
            duration: 500
          })
        }
      }
    })
},
})
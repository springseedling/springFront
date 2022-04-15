// 引入SDK核心类
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
 
// 实例化API核心类
var qqmapsdk = new QQMapWX({
    key: 'OM3BZ-2UE6K-5FKJK-A7XSP-OFT2J-GWFWO' // 必填
});  
     
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list1: [],
    array: ['全部', '即将进行', '招募中', '已结束'],
    objectArray: [
      {
        id: 0,
        name: '全部'
      },
      {
        id: 1,
        name: '即将进行'
      },
      {
        id: 2,
        name: '招募中'
      },
      {
        id: 3,
        name: '已结束'
      }
    ],
    index: 0,
    region: [],
    p2: '活动状态',
    list:[],
    keystr: '',
    flag: 0,
    num: 1,
  },
  onLoad(){
    this.getLocation()
    var that = this
    wx.request({
      url: 'http://localhost:8080/org/page',
      data:{
        item_name: this.data.keystr,
        page: 1,
        size: 5
      },
      success:function(res){
        that.setData({
          list1: res.data.data.current_data
        })
        for (let index=0; index < that.data.list1.length; index++) {
          var a=that.data.list1[index].join_time;
          var a1=a.replaceAll('"','')
          var a2=a1.replaceAll('[','')
          var a3=a2.replaceAll(']','')
          var b =a3.split(',')
          var c = b[0]+' - '+b[1]
          that.data.list1[index].join_time = c
         }
         that.setData({
           list: that.data.list1
         })
        // var a=res.data.data.current_data[10].join_time;
        // var a1=a.replaceAll('"','')
        // var a2=a1.replaceAll('[','')
        // var a3=a2.replaceAll(']','')
        // var b =a3.split(',')
        // console.log(b[0]+' - '+b[1])
        // console.log(res.data.data.current_data[10].join_time.replaceAll('"','').replaceAll('[','').replaceAll(']','').split(',')[0]+ ' - '+res.data.data.current_data[10].join_time.replaceAll('"','').replaceAll('[','').replaceAll(']','').split(',')[1])
      },
    })
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
    // wx.request({
    //   url: 'http://localhost:8080/org/page',
    //   data: {
    //     item_name: this.data.keystr,
    //     page: 1,
    //     size: 2
    //   },
    //   success:function(res){
    //     that.setData({
    //       list: res.data.data.current_data,
    //       flag: 1,
    //       num: 1
    //     })
    //     that.onShow()
    //   }
    // })
    this.setData({
      num: 1
    })
    this.onLoad();
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
        size: 5,
      },
      success:function(res){
        that.setData({
          list1: res.data.data.current_data
        })
        for (let index=0; index < that.data.list1.length; index++) {
          var a=that.data.list1[index].join_time;
          var a1=a.replaceAll('"','')
          var a2=a1.replaceAll('[','')
          var a3=a2.replaceAll(']','')
          var b =a3.split(',')
          var c = b[0]+' - '+b[1]
          that.data.list1[index].join_time = c
         }
        that.setData({
          list: that.data.list.concat(that.data.list1)
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
   bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  getLocation(e) {
    var _this = this;
    wx.getLocation({
      success:function(res){
        _this.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
      }
    })
    qqmapsdk.reverseGeocoder({
      success: function(res) {//成功后的回调
        console.log(res.result);
        _this.setData({
          'region[0]': res.result.address_component.province,
          'region[1]': res.result.address_component.city,
          'region[2]': res.result.address_component.district
        })
      },
      fail: function(error) {
        console.error(error);
      },
    })
    },
    bindPickerChange: function(e) {
      console.log('picker发送选择改变，携带值为:', this.data.array[e.detail.value])
      this.setData({
        index: e.detail.value
      })
    },

})
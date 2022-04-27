Page({
  data: {
    height: 881.8,
  },
  onChange0(e){
    this.setData({
      search: e.detail
    })
  },
  edit(e){
    wx.navigateTo({
      url: '../formDesc/formDesc?item_id='+e.currentTarget.dataset.id,
    })
  },
  onShow(){
    var that =this
    wx.request({
      url: 'http://localhost:8080/org/getActList',
      method: "GET",
      data:{
        org_id: wx.getStorageSync('uid')
      },
      success:function(res){
        if(res.data.length<9){
          var a = 881.8/9*res.data.length+10
        }
        that.setData({
          list: res.data,
          height: a
        })
      }
    })
  },
  onClick(){
    var that = this
    wx.request({
      url: 'http://localhost:8080/org/getALByName',
      method: "GET",
      data:{
        item_name: this.data.search
      },
      success:function(res){
        console.log(res)
        that.setData({
          list:res.data
        })
      }
    })
  }
})

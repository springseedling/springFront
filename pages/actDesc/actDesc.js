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
        console.log(res)
        that.setData({
          onelist1:res.data
        })
        var a = that.data.onelist1.join_time;
        var b = a.replaceAll('[','').replaceAll(']','').replaceAll('"','')
        var c = b.split(",")
        that.data.onelist1.join_time =c[0]+' - '+c[1]
        var a1 = that.data.onelist1.act_time;
        var b1 = a1.replaceAll('[','').replaceAll(']','').replaceAll('"','')
        var c1 = b1.split(",")
        that.data.onelist1.act_time = c1[0]+' - '+c1[1]
        var a2 = that.data.onelist1.address;
        var b2 = a2.replaceAll('[','').replaceAll(']','').replaceAll('"','')
        var c2 = b2.split(",")
        that.data.onelist1.address = c2[0]+' '+c2[1]+' '+c2[2]
        that.setData({
          onelist: that.data.onelist1
        })
      }

    })
  },
  enter(){
    wx.navigateTo({
      url: '../enter/enter?'+'item_name='+this.data.onelist.item_name
      +'&address='+this.data.onelist.address+'&join_time='+
      this.data.onelist.join_time+'&act_profile='+this.data.onelist.act_profile
      +'&item_id='+this.data.onelist.item_id+'&org_id='+this.data.onelist.org_id
    })
  }
})
Page({
  data: {
    list1:[],
    list:[],
    check: 0
  },
    onClick(e) {
     if(e.detail.name==2){
       e.detail.name = -1
     }
     this.setData({
       check: e.detail.name
     })
     this.onShow()
   },

   onShow(){
     var that = this
     wx.request({
       url: 'http://localhost:8080/stu/getMyAct',
       method: "GET",
       data:{
         user_id: wx.getStorageSync('uid'),
         record_check: this.data.check
       },
       success:function(res){
         that.setData({
          list1: res.data.data
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
       }
     })
   }
});
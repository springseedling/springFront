Page({

  data: {
    date1: '',
    date2: '',
    show1: false,
    show2: false,
    i: 0,
    //传参
    orgId: '',
    orgName: '',
    time: '',
    img: '',
    //用户输入
    name: '',
    address: '',
    course: '',
    grade: '',
    number: '',
    numberd: '',
    org_profile:  '',
    act_profile: '',
    joinTime: '',
    actTime: ''
  },
  commit(){
    var that = this
    if(wx.getStorageSync('token')==''){
      wx.showToast({
        title: '未登录！',
      })
    }else{
    wx.request({
      url: 'http://localhost:8080/org/updateActivity',
      data:{
        item_id: this.options.item_id,
        address: this.data.region,
        course: this.data.course,
        grade: this.data.grade,
        need_num: this.data.number,
        act_profile: this.data.act_profile,
        join_time: this.data.day1,
        act_time: this.data.day2,
      },
      header:{
        'Authorization': wx.getStorageSync('token')
      },
      success:function(res){
        if(res.data.code==0){
          wx.showToast({
            title: '修改成功！',
          })
          setTimeout(function() {
            wx.navigateBack({
              delta: 1,
            })
          }, 1500);
        }
      }
    })}
  },
  list(){
    wx.request({
      url: 'http://localhost:8080/org/removeActivity',
      method: "GET",
      header:{
        'Authorization': wx.getStorageSync('token')
      },
      data:{
        item_id: this.options.item_id
      },
      success:function(res){
        wx.showToast({
          title: '删除成功！',
        })
        setTimeout(function() {
          wx.navigateBack({
            delta: 2,
          })
        }, 1500);
      }
    })
  },
  onDisplay1() {
    this.setData({ show1: true });
  },
  onClose1() {
    this.setData({ show1: false });
  },
  formatDate(date) {
    date = new Date(date);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  },
  onConfirm1(event) {
    var that = this
    const [start, end] = event.detail;
    this.setData({
      show1: false,
      date1: `${this.formatDate(start)} - ${this.formatDate(end)}`,
    });
    const a=this.data.date1;
    const s = a.replaceAll('/','')
    const z = s.split(' ')
    z.splice(1,1)
    if(z[0].length==2){
        var d1 = z[0].slice(0,0) + "0" + z[0].slice(0)
        var d2 = d1.slice(0,2) + "0" + d1.slice(2)
        that.data.join_start = d2
    }
    if(z[0].length==3){
       if(z[0][0]==1){
        var d1 = z[0].slice(0,2) + "0" + z[0].slice(2)
        that.data.join_start = d1
       }else{
        var d1 = z[0].slice(0,0) + "0" + z[0].slice(0)
        that.data.join_start = d1
       }
    }
    if(z[0].length==4){
      that.data.join_start = z[0]
    }
    
    if(z[1].length==2){
      var d1 = z[1].slice(0,0) + "0" + z[1].slice(0)
      var d2 = d1.slice(0,2) + "0" + d1.slice(2)
      that.data.join_end = d2
  }
  if(z[1].length==3){
     if(z[1][0]==1){
      var d1 = z[1].slice(0,2) + "0" + z[1].slice(2)
      that.data.join_end = d1
     }else{
      var d1 = z[1].slice(0,0) + "0" + z[1].slice(0)
      that.data.join_end = d1
     }
  }
  if(z[1].length==4){
    that.data.join_end = z[1]
  }

    const b= a.replaceAll('/','月')
    var b1 = b.split(' ');
    var b2 = b1[0].slice(0,10) + "日" + b1[0].slice(10)
    var b3 = b1[2].slice(0,10) + "日" + b1[2].slice(10)
    var c = [b2,b3]
    console.log(c)
    this.setData({
      date1: b2+' - '+b3,
      day1: c
    })
  },
  
  onDisplay2() {
    this.setData({ show2: true });
  },
  onClose2() {
    this.setData({ show2: false });
  },

  onConfirm2(event) {
    const [start, end] = event.detail;
    this.setData({
      show2: false,
      date2: `${this.formatDate(start)} - ${this.formatDate(end)}`,
    });
    const a=this.data.date2;
    const b= a.replaceAll('/','月')
    var b1 = b.split(' ');
    var b2 = b1[0].slice(0,10) + "日" + b1[0].slice(10)
    var b3 = b1[2].slice(0,10) + "日" + b1[2].slice(10)
    var c = [b2,b3]
    console.log(c)
    this.setData({
      date2: b2+' - '+b3,
      day2: c
    })
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value,
      region1: e.detail.value
    })
  },
  onShow(){
    console.log(this.options)
    var a = this.options.address0
    var b = a.replaceAll('[','').replaceAll(']','').replaceAll('"','')
    this.setData({
      course: this.options.course,
      grade: this.options.grade,
      number: this.options.need_num,
      act_profile: this.options.act_profile,
      date1: this.options.join_time,
      date2: this.options.act_time,
      region1: b,
      region: this.options.address0,
      day1: this.options.join_time0,
      day2: this.options.act_time0
    })
  }
})
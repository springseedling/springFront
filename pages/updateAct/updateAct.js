Page({

  data: {
    date1: '',
    date2: '',
    show1: false,
    show2: false,
    i: 0,
    image1: 'https://spring-1309139497.cos.ap-beijing.myqcloud.com/%E4%B8%8A%E4%BC%A0%E5%9B%BE%E7%89%87.png',
    image: ['https://spring-1309139497.cos.ap-beijing.myqcloud.com/%E4%B8%8A%E4%BC%A0%E5%9B%BE%E7%89%87.png','https://spring-1309139497.cos.ap-beijing.myqcloud.com/%E4%B8%8A%E4%BC%A0%E5%9B%BE%E7%89%87.png','https://spring-1309139497.cos.ap-beijing.myqcloud.com/%E4%B8%8A%E4%BC%A0%E5%9B%BE%E7%89%87.png'],
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
  upload:function(res){
    console.log(res.currentTarget.dataset.id)
    var that = this
    wx.chooseImage({
      count: 1,
      success(res){
        console.log(res.tempFiles[0].path)
        wx.uploadFile({
          filePath: res.tempFiles[0].path,
          name: 'file',
          url: 'https://alexmisko.top/uploadFile',
          success:function(res){
            console.log(res)
            that.setData({
              ['image['+that.data.i+']']: res.data,
              i: that.data.i+1
            })
            console.log(that.data.i)
          },
          fail:function(res){
            console.log(res)
          }
        })
      }
    })

  },
  commit(){
    var that = this
    if(wx.getStorageSync('token')==''){
      wx.showToast({
        title: '未登录！',
      })
    }else{
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    //获取当前时间
    var n = timestamp * 1000;
    var date = new Date(n);
    //年
    var Y = date.getFullYear();
    //月
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //日
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    //时
    var h = date.getHours();
    //分
    var m = date.getMinutes();
    //秒
    var s = date.getSeconds();
    console.log(Y+'-'+M+'-'+D+' '+h+':'+m)
    console.log(Y+M+D)
    wx.setStorageSync('time', Y+'-'+M+'-'+D+' '+h+':'+m)
    var a = this.data.image
    var b = a.join(",")
    var c = b.split(",")
    wx.request({
      url: 'http://localhost:8080/org/uploadActivity',
      data:{
        org_name: this.data.orgName,
        org_id: this.data.orgId,
        item_name: this.data.name,
        address: this.data.region,
        course: this.data.course,
        grade: this.data.grade,
        need_num: this.data.number,
        present_num: this.data.numberd,
        release_time: wx.getStorageSync('time'),
        img: c[0],
        org_profile: this.data.org_profile,
        act_profile: this.data.act_profile,
        join_time: this.data.day1,
        act_time: this.data.day2,
        join_start: this.data.join_start,
        join_end: this.data.join_end
      },
      header:{
        'Authorization': wx.getStorageSync('token')
      },
    })}
  },
  list(){
    wx.navigateTo({
      url: '../list/list',
    })
  },
  onShow(){
    // var a = ["https://alexmisko.top/static/20220405153048.png","https://alexmisko.top/static/20220405153052.png","https://alexmisko.top/static/20220405153057.png"]
    // var b = a.join(",")
    // var c = b.split(",")
    // console.log(c[0])
    // this.setData({
    //   c: c[0]
    // })
   
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
      region: e.detail.value
    })
  }
})
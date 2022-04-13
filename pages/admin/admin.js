Page({

  data: {
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
        address: this.data.address,
        course: this.data.course,
        grade: this.data.grade,
        need_num: this.data.number,
        present_num: this.data.numberd,
        release_time: wx.getStorageSync('time'),
        img: c[0],
        org_profile: this.data.org_profile,
        act_profile: this.data.act_profile,
        join_time: this.data.joinTime,
        act_time: this.data.actTime
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
  }

    
})
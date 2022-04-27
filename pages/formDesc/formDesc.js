Page({

  data: {
    onelist1:[],
    origin:[],
    radio: '1',
    signTimeActive: '',
    showView: true,
    option1: [
      { text: '已通过', value: '1' },
      { text: '待审核', value: '0' },
      { text: '已驳回', value: '-1' },
    ],
    option2: [
      { text: '时间正序', value: '0' },
      { text: '时间倒序', value: '1' },
    ],
    value1: '1',
    value2: '1'
  },
  onChange(event) {
    this.setData({
      radio: event.detail,
    });
  },
  onChange1(e){
    this.setData({
      value1: e.detail,
      radio: e.detail
    })
    this.onShow()
  },
  onChange2(e){
    this.setData({
      value2: e.detail
    })
    this.onShow()
  },
       //打开规则提示
       showRule: function (e) {
        this.setData({
          isRuleTrue: true,
          record: e.currentTarget.dataset.id
        })
      },
      //关闭规则提示
      hideRule: function () {
        this.setData({
          isRuleTrue: false
        })
      },
      onShow(){
        var that = this
        //活动管理的请求
        wx.request({
          url: 'http://localhost:8080/org/getALById',
          method: 'GET',
          header:{
            'Authorization': wx.getStorageSync('token')
          },
          data:{
            id: this.options.item_id
          },
          success:function(res){
            that.setData({
              origin0:{
                join_time: res.data.join_time,
                act_time: res.data.act_time,
                address: res.data.address
              }
            })
            that.setData({
              onelist1: res.data,
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
              listone: that.data.onelist1,
              origin: that.data.onelist1
            })
          }
        })
        //学生管理的请求
        if(this.data.value1==0){
          this.setData({
            signTimeActive: true
          })
        }else{
          this.setData({
            signTimeActive: false
          })
        }
        wx.request({
          url: 'http://localhost:8080/org/getAllRecord',
          method: "GET",
          data:{
            org_id: wx.getStorageSync('uid'),
            item_id: that.options.item_id,
            check_status: that.data.value1,
            record_order: that.data.value2
          },
          success:function(res){
            that.setData({
              list:res.data.data
            })
          }
        })
      },
      orgEdit(){
        wx.navigateTo({
          url: '../updateAct/updateAct?item_id='+this.options.item_id
          +'&course='+this.data.origin.course
          +'&address='+this.data.origin.address+
          '&grade='+this.data.origin.grade+
          '&act_time='+this.data.origin.act_time+
          '&join_time='+this.data.origin.join_time+
          '&need_num='+this.data.origin.need_num+
          '&act_profile='+this.data.origin.act_profile+
          '&act_time0='+this.data.origin0.act_time+
          '&join_time0='+this.data.origin0.join_time+
          '&address0='+this.data.origin0.address
        })
      },
      stuEdit(){
        var that = this
        wx.request({
          url: 'http://localhost:8080/org/checkRecord',
          method: "GET",
          header:{
            'Authorization': wx.getStorageSync('token')
          },
          data:{
            record_id: this.data.record,
            check: this.data.radio
          },
          success:function(res){
            that.onShow()
          }
        })
        this.setData({
          isRuleTrue: false
        })
      }
})
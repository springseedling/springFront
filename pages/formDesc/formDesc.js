Page({

  data: {
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
              listone: res.data
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
              list: res.data.data
            })
          }
        })
      },
      orgEdit(){
        wx.navigateTo({
          url: '../updateAct/updateAct',
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
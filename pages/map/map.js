Page({

  data: {
    value: '',
    isClearable: false,
   markers: [
     {latitude:34.720482, longitude:113.621643, iconPath: '../pic/group.png', width:25, height:25}
   ]
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
  },
  onShow(){
    this.getLocation()
  },
  onCurrentLocationClick(){
    this.mapCtx.moveToLocation();
  },
  onReady(){
    this.mapCtx=wx.createMapContext('myMap')
  },
  onInput(e){
    let isClearable = false
    if(e.detail.value!=''){
        isClearable =  true
    }
    this.setData({
      isClearable: isClearable
    })
  },
  onClear(){
    this.setData({
      isClearable: false,
      value: ''
    })
  }
  
})
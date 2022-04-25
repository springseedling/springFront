Page({

  data: {
    value: '',
    isClearable: false,
   markers: [
     {latitude:34.720482, longitude:113.621643, iconPath: '../pic/group.png', width:25, height:25, title:'支教组织'},
     {latitude:34.782502, longitude:113.664864, iconPath: '../pic/group.png', width:25, height:25, title:'支教组织'},
     {latitude:34.745113, longitude:113.625333, iconPath: '../pic/group.png', width:25, height:25, title:'支教组织'},
     {latitude:34.747355, longitude:113.623786, iconPath: '../pic/group.png', width:25, height:25, title:'支教组织'},
     {latitude:34.744508, longitude:113.623223, iconPath: '../pic/group.png', width:25, height:25, title:'支教组织'}
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
  },
  markertap(){
    console.log(1)
  }
  
})
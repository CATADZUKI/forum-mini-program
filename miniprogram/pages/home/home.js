// pages/home/home.js
var that
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalCount:0,
    topics:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    wx.cloud.init({
      env:app.globalData.evn
    })
  },

  /**
 * 生命周期函数--监听页面显示
 */
  onShow: function () {
    that.getData();
  },

// 获取列表数据

getData:function(){
  const db = wx.cloud.database();
  db.collection('topic')
  .orderBy('date','desc')
  .get({
    success: function(res){
      console.log("数据"+res.data);
      that.data.topics = res.data;
      that.setData({
        topics:that.data.topics,
      })
      console.log("123" + that.data.topics);
      wx.hideNavigationBarLoading(); //隐藏加载
      wx.stopPullDownRefresh();
    },
    fail: function (event) {
      wx.hideNavigationBarLoading(); //隐藏加载
      wx.stopPullDownRefresh();
    }
  })
},


onItemClick:function(event){
  var id =event.currentTarget.dataset.topicid;
  var openid = event.currentTarget.dataset.openid;
  console.log(id);
  console.log(openid);
  wx.navigateTo({
    url:"../homeDetail/homeDetail?id="+id+"&openid="+openid
  })
},


onPublishClick:function(){
  wx.navigateTo({
    url:"../publish/publish"
  })
},









  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },



  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
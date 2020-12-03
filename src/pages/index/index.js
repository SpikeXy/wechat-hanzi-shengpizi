const retry = 0;
const maxReTry = 3;
const innerAudioContext = null;
const db = wx.cloud.database();


const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showBackWords: false,
    backWords: null,
    inputWords: '',
    showDetailView: false,
    inputWordsLength: 0,
    showDetailContent: null,
    ossUrl:"",
    suffix:"",
    descriptionText:"",
  },
  changeInputLengthDisplay: function(e) {
    var length = e.detail.value.length
    this.setData({
      inputWordsLength: length
    })
  },
  clickHanZiImage: function(e) {

  },
  valiteInput: function(str) {
    if (/^.*?[\d]+.*$/.test(str) || /^.*?[A-Za-z]/.test(str) || /^.*?[~`!@#$%^&*()_+|{}?;:><\-\]\\[\/].*$/.test(str)) {
      //如果包含特殊字符、数字、字母
      return true;
    }
    //如果不包含特殊字符、数字、字母
    return false;
  },
  bindFormSubmit: function(e) {
    var textarea = e.detail.value.textarea
    if (textarea == '' || this.valiteInput(textarea)) {
      wx.showModal({
        title: '请输入汉字',
        // content: '这里是内容',
        showCancel: false, //不显示取消按钮
        confirmText: '确定'
      })
    } else {
      wx.showLoading({
        title: '加载中'
      })
      //最多有7s的请求时间，否则弹出框消失
      // setTimeout(function () {
      //   wx.hideLoading()
      // }, 7000)
      this.setData({
        inputWords: textarea
      })
      this.actionIndexView();
    }
  },
  onLoad: function(options) {

    var that = this;
    wx.cloud.callFunction({
      name: 'GetConfig',
      data: {},
      success: res2 => {
        var configData = res2.result;
        if (configData != null) {
          that.setData({
            ossUrl: configData.JpgOss,
            suffix: configData.JpgSuffix,
            descriptionText: configData.DescriptionText
          })
        }
      }
    });
  },

  actionIndexView: function() {
    var that = this;
    wx.cloud.callFunction({
      name: 'GetHanZi',
      data: {
        input: that.data.inputWords
      },
      success: res => {
        var backData = res.result.data;
        if (backData.length > 0) {
            that.setData({
              showBackWords: true,
              backWords: backData
            })
          }
      },
      fail: res => {
        wx.showModal({
          title: '请输入汉字',
          // content: '这里是内容',
          showCancel: false, //不显示取消按钮
          confirmText: '确定'
        })
      },
      complete: res => {
        wx.hideLoading()
      }
    })

  },
  showDetail: function(event) {
    
    // const topic = event.currentTarget.dataset.topic;
    // topic.ImagePath = encodeURIComponent(topic.ImagePath)
    // topic.JiBenJieShi = encodeURIComponent(topic.JiBenJieShi)
    // const entity = JSON.stringify(topic);
    // wx.navigateTo({
    //   url: `../post/post?entity=${entity}`,
    //   fail: function(res) {
    //     console.log(res)
    //   },
    // })

    const hanziId = event.currentTarget.dataset.topic.Id;
     wx.navigateTo({
       url: `../post/post?Id=${hanziId}`,
      fail: function(res) {
        console.log(res)
      },
    })

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
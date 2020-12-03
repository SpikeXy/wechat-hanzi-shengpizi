// pages/question/question.js
// import { breandData } from '../../base/config.js';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    inputWordsLength: 0,
    alertWord : "",
  },
  onLoad: function (options) {

  },
  bindFormSubmit: function (e) {
    wx.showLoading({
      title: '正在提交',
    })
    var textarea = e.detail.value.textarea
    var that = this


    wx.cloud.callFunction({
      name: 'SubmitOpinions',
      data: {
        input: textarea
      },
      success: res => {
        if(res){
          this.setData({
            inputWords: ""
          })

          wx.showToast({
            title: '感谢您的反馈',
            icon: 'success',
            duration: 2000
          })
        }
      
      },
      fail: res => {
 
      },
      complete: res => {
        wx.hideLoading()
      }
    })

  },
  changeInputLengthDisplay: function (e) {
    var length = e.detail.value.length
    this.setData({
      inputWordsLength: length
    })
  },
});
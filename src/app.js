
App({
  onLaunch: function () {
    wx.cloud.init({
      env: 'test-37bb0d',
      traceUser: true
    });

  },
})
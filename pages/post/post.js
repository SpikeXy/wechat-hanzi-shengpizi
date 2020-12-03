// import { breandData } from '../../base/config.js';


Page({
  /**
   * 页面的初始数据
   */
  data: {
    item: {},
    showUploadButton: false,
    uploadFilePaths: [],
    ossUrl: "",
    jpgOssUrl: "",
    btnDisabled:"",
    qrShow: true,
    qrImageUrl: "",
    screenWidth: 0,
    littleRectWidth: 0,
    suffix: "",
    jpgSuffix: "",
    colorOne: "#f2ecde",
    colorTwo: "#c0ebd7",
    bar_00_color: "",
    bar_01_color: "",
    bar_02_color: "",
    bar_03_color: "",
    bar_04_color: "",
    bar_05_color: "",
    bar_06_color: "",
    bar_07_color: "",
    bar_08_color: "",
    bar_09_color: "",
    bar_10_color: "",
    bar_11_color: "",
    bar_12_color: "",
    bar_13_color: "",
    bar_14_color: "",
    bar_15_color: "",
    bar_16_color: "",
    bar_17_color: "",
    bar_18_color: "",
    bar_19_color: "",
    bar_20_color: "",
    bar_21_color: "",
    bar_22_color: "",
    bar_23_color: "",
    bar_24_color: "",
    bar_25_color: "",
    bar_26_color: "",
    waitImageCss: "",
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;

    //获取用户设备信息，屏幕宽度
    wx.getSystemInfo({
      success: res => {
        that.setData({
          screenWidth: res.screenWidth,
          littleRectWidth: res.screenWidth / 4,
        })
      }
    })

    const hanziId = options.Id;
    //设置url前缀
    wx.cloud.callFunction({
      name: 'GetConfig',
      data: {},
      success: res2 => {
        var configData = res2.result;
        if (configData != null) {
          that.setData({
            ossUrl: configData.Oss,
            suffix: configData.Suffix,
            jpgSuffix: configData.JpgSuffix,
            jpgOssUrl: configData.JpgOss,
            qrImageUrl: configData.QrImageUrl
          })
        }
        var thatthat = that;
        wx.cloud.callFunction({
          name: 'GetHanziById',
          data: {
            id: parseInt(hanziId)
          },
          success: res => {
            var contantData = res.result;
            if (contantData != null) {
              contantData.BuJianXuImage = that.transferStrToArr(contantData.BuJianXuImage);
              contantData.BuJianXuImage2 = that.transferStrToArr(contantData.BuJianXuImage2);
              contantData.ZiGenXuImage = that.transferStrToArr(contantData.ZiGenXuImage);
              contantData.ZiGenXuImage2 = that.transferStrToArr(contantData.ZiGenXuImage2);
              contantData.ZiGenZuImage = that.transferStrToArr(contantData.ZiGenZuImage);
              contantData.ZiGenZuImage2 = that.transferStrToArr(contantData.ZiGenZuImage2);
            }

            var colorCount = 0;
            var bar_00_color_temp = "";
            var bar_01_color_temp = "";
            var bar_02_color_temp = "";
            var bar_03_color_temp = "";
            var bar_04_color_temp = "";
            var bar_05_color_temp = "";
            var bar_06_color_temp = "";
            var bar_07_color_temp = "";
            var bar_08_color_temp = "";
            var bar_09_color_temp = "";
            var bar_10_color_temp = "";
            var bar_11_color_temp = "";
            var bar_12_color_temp = "";
            var bar_13_color_temp = "";
            var bar_14_color_temp = "";
            var bar_15_color_temp = "";
            var bar_16_color_temp = "";
            var bar_17_color_temp = "";
            var bar_18_color_temp = "";
            var bar_19_color_temp = "";
            var bar_20_color_temp = "";
            var bar_21_color_temp = "";
            var bar_22_color_temp = "";
            var bar_23_color_temp = "";



            if (contantData.ImageFileKey.length > 0) {
              colorCount++;
              bar_00_color_temp = that.chooseCustomColor(colorCount);
            }
            if (contantData.BiHuaOriginal.length > 0) {
              colorCount++;
              bar_01_color_temp = that.chooseCustomColor(colorCount);
            }
            if (contantData.JiBenJieShi.length > 0) {
              colorCount++;
              bar_02_color_temp = that.chooseCustomColor(colorCount);
            }
            if (contantData.FanQie.length > 0) {
              colorCount++;
              bar_03_color_temp = that.chooseCustomColor(colorCount);
            }

            if (contantData.KangXiZiDian.length > 0) {
              colorCount++;
              bar_04_color_temp = that.chooseCustomColor(colorCount);
            }

            if (contantData.ShuoWenJieZi.length > 0) {
              colorCount++;
              bar_05_color_temp = that.chooseCustomColor(colorCount);
            }
            if (contantData.SongBenGuangYun.length > 0) {
              colorCount++;
              bar_06_color_temp = that.chooseCustomColor(colorCount);
            }
            if (contantData.ZiDianChuChu.length > 0) {
              colorCount++;
              bar_07_color_temp = that.chooseCustomColor(colorCount);
            }
            if (contantData.ZiYuan.length > 0) {
              colorCount++;
              bar_08_color_temp = that.chooseCustomColor(colorCount);
            }
            if (contantData.ChuXiWenZiImage.length > 0) {
              colorCount++;
              bar_09_color_temp = that.chooseCustomColor(colorCount);
            }

            if (contantData.XiaoZhuanLeiBie.length > 0) {
              colorCount++;
              bar_10_color_temp = that.chooseCustomColor(colorCount);
            }
            if (contantData.XiaoZhuanImage.length > 0) {
              colorCount++;
              bar_11_color_temp = that.chooseCustomColor(colorCount);

            }
            if (contantData.JinWenImage.length > 0) {
              colorCount++;
              bar_12_color_temp = that.chooseCustomColor(colorCount);
            }

            if (contantData.JinWenQiMingImage.length > 0) {
              colorCount++;
              bar_13_color_temp = that.chooseCustomColor(colorCount);
            }
            if (contantData.JiaGuWenImage.length > 0) {
              colorCount++;
              bar_14_color_temp = that.chooseCustomColor(colorCount);
            }
            if (contantData.YiXieZiImage.length > 0) {
              colorCount++;
              bar_15_color_temp = that.chooseCustomColor(colorCount);
            }

            if (contantData.YiTiZiImage.length > 0) {
              colorCount++;
              bar_16_color_temp = that.chooseCustomColor(colorCount);
            }

            if (contantData.BuJianXuImage.length > 0) {
              colorCount++;
              bar_17_color_temp = that.chooseCustomColor(colorCount);
            }
            if (contantData.ZiGenXuImage.length > 0) {
              colorCount++;
              bar_18_color_temp = that.chooseCustomColor(colorCount);
            }
            // if (contantData.ZiGenZuImage.length > 0) {
            //   colorCount++;
            //   bar_19_color_temp = that.chooseCustomColor(colorCount);
            // }
            if (contantData.ZhongWenDaCiDianSuoYin.length > 0 || contantData.ZhongWenDaCiDianBuShou.length > 0 ||
              contantData.CangJie.length > 0 || contantData.KangXiZiDianSuoYin.length > 0 ||
              contantData.JianHongHanYuDaZiDian.length > 0 || contantData.HanYuDaZiDian.length > 0 ||
              contantData.GuangYunSuoYin.length > 0 || contantData.YuDongHanYuDaZiDian.length > 0

            ) {
              colorCount++;
              bar_19_color_temp = that.chooseCustomColor(colorCount);
            }
            if (true) {
              colorCount++;
              bar_20_color_temp = that.chooseCustomColor(colorCount);
            }
            thatthat.setData({
              item: contantData,
              showUploadButton: false,
              bar_00_color: bar_00_color_temp,
              bar_01_color: bar_01_color_temp,
              bar_02_color: bar_02_color_temp,
              bar_03_color: bar_03_color_temp,
              bar_04_color: bar_04_color_temp,
              bar_05_color: bar_05_color_temp,
              bar_06_color: bar_06_color_temp,
              bar_07_color: bar_07_color_temp,
              bar_08_color: bar_08_color_temp,
              bar_09_color: bar_09_color_temp,
              bar_10_color: bar_10_color_temp,
              bar_11_color: bar_11_color_temp,
              bar_12_color: bar_12_color_temp,
              bar_13_color: bar_13_color_temp,
              bar_14_color: bar_14_color_temp,
              bar_15_color: bar_15_color_temp,
              bar_16_color: bar_16_color_temp,
              bar_17_color: bar_17_color_temp,
              bar_18_color: bar_18_color_temp,
              bar_19_color: bar_19_color_temp,
              bar_20_color: bar_20_color_temp,
              // bar_21_color: bar_21_color_temp,
              waitImageCss: "none",
            })
          },
          fail: res => {
            wx.showModal({
              title: '  请输入汉字',
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
      fail: res => {
        wx.showModal({
          title: '无法获取配置文件',
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {


  },

  shareToFriends: function(e) {
    this.setData({
      btnDisabled:"disabled"
    })
    wx.showLoading({
      title: '生成中'
    })
    var that = this;
    var canvasContext = wx.createCanvasContext('shareCanvasId');
    canvasContext.fillStyle = "#f9f7f9";
    canvasContext.fillRect(0, 0, 600, 900);
    var unit = this.data.screenWidth / 375;
    var str01 = "拼音：" + e.currentTarget.dataset.pinyin;
    var str02 = "部首：" + e.currentTarget.dataset.bushou;
    var str03 = this.data.jpgOssUrl + e.currentTarget.dataset.fonturl + this.data.jpgSuffix;
    var str04 = e.currentTarget.dataset.jibenjieshi;
    var str05 = this.data.qrImageUrl;
    // canvasContext.font = 'italic bold 20px cursive'
    canvasContext.setFontSize(22);
    canvasContext.setFillStyle("#000");
    canvasContext.fillText(str01, unit * 48, unit * 120, unit * 280, unit * 178);
    canvasContext.fillText(str02, unit * 48, unit * 160, unit * 280, unit * 178);

    wx.downloadFile({
      url: str03,
      success: function(res) {
        canvasContext.drawImage(res.tempFilePath, unit * 178, unit * 70, unit * 145, unit * 125);

        var temp = "";
        var row = [];
        var chr = str04.split(""); //这个方法是将一个字符串分割成字符串数组
        for (var a = 0; a < chr.length; a++) {
          if (canvasContext.measureText(temp).width < 200) {
            temp += chr[a];
          } else {
            a--; //这里添加了a-- 是为了防止字符丢失，效果图中有对比
            row.push(temp);
            temp = "";
          }
        }
        row.push(temp);

        //如果数组长度大于2 则截取前两个
        if (row.length > 8) {
          var rowCut = row.slice(0, 8);
          var rowPart = rowCut[1];
          var test = "";
          var empty = [];
          for (var a = 0; a < rowPart.length; a++) {
            if (canvasContext.measureText(test).width < 220) {
              test += rowPart[a];
            } else {
              break;
            }
          }
          empty.push(test);
          var group = empty[0] + "..." //这里只显示两行，超出的用...表示
          rowCut.splice(1, 1, group);
          row = rowCut;
        }
        for (var b = 0; b < row.length; b++) {
          canvasContext.fillText(row[b], unit * 48, unit * 220 + b * 30, 300);
        }

    

        // 绘制二维码
        wx.downloadFile({
          url: str05,
          success: function(res) {
            canvasContext.drawImage(res.tempFilePath, unit * 75, unit * 480, unit * 200, unit * 178);
            canvasContext.draw();

            setTimeout(() => {
              wx.canvasToTempFilePath({
                canvasId: 'shareCanvasId',
                fileType: 'jpg',
                success: function (res) {
                  var filePathTemp = res.tempFilePath;
                  wx.saveImageToPhotosAlbum({
                    filePath: filePathTemp,
                    success(res) {
                      wx.hideLoading();
                      wx.showToast({
                        title: '保存到相册成功',
                      });
                    },
                    fail(er) {
                      wx.hideLoading()
                    }
                  })
                }
              })
            }, 500);

          }
        })




      }
    })




  },

  chooseCustomColor: function(count) {
    if (count % 2 > 0) {
      //如果是奇数
      return this.data.colorOne;
    } else {
      //如果是偶数
      return this.data.colorTwo;
    }
  },
  /*
   *
   */
  chooseImageTap: function() {
    let _this = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        _this.setData({
          uploadFilePaths: tempFilePaths
        })
        _this.uploadFunction()
      }
    })
  },

  transferStrToArr: function(str) {
    var arr = [];
    if (str == null || str == "" || str == undefined) {
      return arr;
    }
    if (str.toString().indexOf(';') > 0) {
      var tempArr = str.split(';');
      for (var j = 0; j < tempArr.length; j++) {
        if (tempArr[j] == "" || tempArr[j] == null || tempArr[j] === undefined) {
          continue;
        } else {
          arr.push(tempArr[j])
        }
      }
      return arr;
    } else {
      arr.push(str.split(';')[0]);
      return arr;
    }
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
  onPullDownRefresh: function(e) {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(res) {
    return {
      title: "发现一个好的作品，快来看看吧！",
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败

      },
      complete: function(res) {

      }
    }
  }
})
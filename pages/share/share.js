Page({
  data: {
    show1: false,
    show2: false,

    date: '2019-08-19',
  },
  onLoad () {
    this.setData({
      actions: [
        { name: '选项' },
        { name: '分享', subname: '描述信息', openType: 'share' },
        { loading: true },
        { name: '禁用选项', disabled: true }
      ]
    });

    console.log(wx)
  },
  toggle (type) {
    this.setData({
      [type]: !this.data[type]
    });
  },
  toggleActionSheet1 () {
    this.toggle('show1');
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  //朋友圈
  onPopupShow () {
    this.setData({
      show2: true,
      show1: false
    });

    wx.showLoading({
      title: '分享图片生成中...',
      icon: 'loading',
      duration: 1000
    })
    // 下载海报图
    wx.downloadFile({
      url: 'https://dummyimage.com/200x400/50B347/FFF&text=pyq',
      success: res => {
        this.setData({
          downloadPosterBg: res.tempFilePath
        })
        let promise1 = new Promise((resolve, reject) => {
          wx.getImageInfo({
            src: this.data.downloadPosterBg,
            success: res => {
              resolve(res);
            }
          })
        });
        promise1.then(res => {
          this.draw(res)
        })
      },
      fail: () => {
        console.log('fail')
      }
    })

    //this.draw();

  },
  draw (res) {
    var canvas = wx.createCanvasContext('myCanvas')
    // 绘制背景图
    canvas.drawImage(res.path, 0, 0, 632, 970);
    // 绘制头像
    canvas.save()
    canvas.beginPath()
    // canvas.arc(50, 740, 30, 0, 2 * Math.PI)
    canvas.arc(68, 708, 30, 0, 2 * Math.PI)
    canvas.clip()
    // canvas.drawImage(res[1].path, 20, 710, 60, 60);
    canvas.restore()

    //绘制微信昵称文本
    canvas.setFontSize(23)
    canvas.setFillStyle("#424E75")
    canvas.setStrokeStyle('#424E75')
    // canvas.fillText(this.data.posterNickName, 100, 745, 350)
    canvas.fillText('【天鸟学堂】科创板：周一买到的不能算赚到', 110, 700, 350)

    // 绘制打卡昵称
    canvas.setFontSize(18)
    canvas.setFillStyle("#424E75")
    canvas.setStrokeStyle('#424E75')
    canvas.fillText('2019-07-23  08:56  天鸟烈火投顾团队', 110, 740)

    // 绘制坚持天数
    canvas.setFontSize(50)
    canvas.setFillStyle("#424E75")
    canvas.setStrokeStyle('#424E75')
    if (this.data.posterDakaCount <= 9) {
      canvas.fillText(this.data.posterDakaCount, 520, 750)
    } else if (this.data.posterDakaCount > 9 && this.data.posterDakaCount < 99) {
      canvas.fillText(this.data.posterDakaCount, 510, 750)
    } else if (this.data.posterDakaCount > 99 && this.data.posterDakaCount < 999) {
      canvas.fillText(this.data.posterDakaCount, 500, 750)
    }

    canvas.draw()

    // setTimeout(() => {
    //   wx.canvasToTempFilePath({
    //     x: 0,
    //     y: 0,
    //     width: 632,
    //     height: 970,
    //     destWidth: 632,
    //     destHeight: 970,
    //     canvasId: 'myCanvas',
    //     success: res => {
    //       this.setData({
    //         postUrl: res.tempFilePath,
    //       })
    //       this.saveImageToAlbum();
    //       wx.hideLoading()
    //     },
    //     fail: res => { }
    //   })
    // }, 500)

  },
  saveImageToAlbum () {
    //将图片保存到相册       
    wx.saveImageToPhotosAlbum({
      filePath: this.data.postUrl,
      success(res) {
        wx.showModal({
          title: '保存成功',
          content: '图片成功保存到相册了，快去分享朋友圈吧',
          showCancel: false,
          confirmText: '好的',
          confirmColor: '#818FFB',
          success: res => {
            if (res.confirm) {
              this.setData({
                showPosterImage: true
              })
            }
            this.hideShareImg()
          }
        })
      }
    })
  },
  onPopupClose() {
    this.setData({
      show2: false
    })
  },
  

  
});
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    width: 0,
    height: 0
  },
  onLoad () {
    const res = wx.getSystemInfoSync();
    this.setData({
      width: res.windowWidth,
      height: res.windowHeight
    });
    this.draw();
    //this.downloadFile();
  },
  downloadFile () {
    wx.showLoading({
      title: '分享图片生成中...',
      icon: 'loading',
      duration: 1000
    })
    // 下载海报图
    wx.downloadFile({
      url: 'https://dummyimage.com/120x100/50B347/FFF&text=pyq',
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
  },
  draw (res) {
    var canvas = wx.createCanvasContext('myCanvas')
    console.log(res)

    let width = this.data.width,
      height = this.data.height
    // w = res.width,
    // h = res.height,
    // scale = h/w
    // if(scale == 1){
    // }else if(scale > 1){
    // }else{
    // }

    // 绘制背景图
    // canvas.drawImage(res.path, 0, 0, 100, 200);
    // 绘制头像
    // canvas.save()
    // canvas.beginPath()
    // canvas.arc(150, 150, 50, 0, 2*Math.PI)
    // canvas.clip()
    // canvas.drawImage(res.path, 0, 0)
    // canvas.restore()

    canvas.font = 'normal bold 20px sans-serif';
    canvas.fillText('【天鸟学堂】科创板：周一买到的不能算赚到', 0, 20);

    canvas.setFontSize(12);
    // canvas.setFillStyle("#424E75")
    // canvas.setStrokeStyle('#424E75')
    canvas.setTextAlign('right');
    canvas.fillText('2019-07-23  08:56  天鸟烈火投顾团队', width, 20);

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


  drawText (obj) {
    this.ctx.save();
    this.ctx.setFillStyle(obj.color);
    this.ctx.setFontSize(obj.size);
    this.ctx.setTextAlign(obj.align);
    this.ctx.setTextBaseline(obj.baseline);
    if (obj.bold) {
      this.ctx.fillText(obj.text, obj.x, obj.y - 0.5);
      this.ctx.fillText(obj.text, obj.x - 0.5, obj.y);
    }
    this.ctx.fillText(obj.text, obj.x, obj.y);
    if (obj.bold) {
      this.ctx.fillText(obj.text, obj.x, obj.y + 0.5); this.ctx.fillText(obj.text, obj.x + 0.5, obj.y);
    }
    this.ctx.restore();
  },
  textWrap (obj) {
    let tr = this.getTextLine(obj);
    for (let i = 0; i < tr.length; i++) {
      if (i < obj.line) {
        let txt = {
          x: obj.x,
          y: obj.y + (i * obj.height),
          color: obj.color, size: obj.size,
          align: obj.align,
          baseline: obj.baseline,
          text: tr[i],
          bold: obj.bold
        }; if (i == obj.line - 1) {
          txt.text = txt.text.substring(0, txt.text.length - 3) + '......';
        }
        this.drawText(txt);
      }
    }
  },
  getTextLine (obj) {
    this.ctx.setFontSize(obj.size);
    let arrText = obj.text.split('');
    let line = '';
    let arrTr = [];
    for (let i = 0; i < arrText.length; i++) {
      var testLine = line + arrText[i];
      var metrics = this.ctx.measureText(testLine);
      var width = metrics.width;
      if (width > obj.width && i > 0) {
        arrTr.push(line);
        line = arrText[i];
      } else {
        line = testLine;
      } if (i == arrText.length - 1) {
        arrTr.push(line);
      }
    } return arrTr;
  },



  saveImageToAlbum () {
    //将图片保存到相册       
    wx.saveImageToPhotosAlbum({
      filePath: this.data.postUrl,
      success (res) {
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
})

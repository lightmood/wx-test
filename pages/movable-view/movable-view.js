// pages/movable-view/movable-view.js
Page({
  data: {
    windowHeight: 0,
    windowWidth: 0,
    moveableClassName: 'none',
    list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],


    scrollY: true,
    movableViewPosition: {
      X: 0,
      Y: 0
    },
    distY: 0,
    scrollTop: 0
  },
  onLoad: function (options) {
    wx.getSystemInfo({
      success: res => {
        this.setData({
          windowHeight: res.windowHeight - 100,
          windowWidth: res.windowWidth
        })
      },
      fail(err) {
        console.log(err);
      }
    })
  },
  longpressfunc(e) {
    this.data.distY = e.touches[0].pageY - e.currentTarget.offsetTop + this.data.scrollTop
    this.setData({
      scrollY: false,
      moveableClassName: '',
      'movableViewPosition.Y': e.currentTarget.offsetTop - this.data.scrollTop,
    })
  },
  touchendfunc(e) {
    this.setData({
      moveableClassName: 'none',
      scrollY: true
    })
  },
  touchmovefunc(e) {
    console.log(e)

    if (e.touches[0].pageY - this.data.distY < 0 && this.data.scrollTop > 0) {
      var scrollTop = this.data.scrollTop - 50 < 0 ? 0 : this.data.scrollTop - 50
      this.setData({
        scrollTop: scrollTop
      })
    } else if (e.touches[0].pageY - this.data.distY > this.data.windowHeight && this.data.scrollTop > 0) {
      var scrollTop = this.data.scrollTop + 50 < 0 ? 0 : this.data.scrollTop + 50
      this.setData({
        scrollTop: scrollTop
      })
    }
    // console.log(e)
    this.setData({
      'movableViewPosition.Y': e.touches[0].pageY - this.data.distY,
      // 'movableViewPosition.Y': e.currentTarget.offsetTop,
    })
  },
  // touchstartfunc(e) {
  //   console.log(e)
  // },
  scrollfunc(e) {
    // console.log(e.detail.scrollTop)
    // this.data.scrollTop = e.detail.scrollTop

    this.setData({
      scrollTop: e.detail.scrollTop
    })
  }
})
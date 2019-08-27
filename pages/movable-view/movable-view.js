// pages/movable-view/movable-view.js
Page({
  data: {
    windowHeight: 0,
    windowWidth: 0,
    moveableClassName: 'none',
    list: [{
      text: 'text1'
    }, {
      text: 'text2'
    }, {
      text: 'text3'
    }, {
      text: 'text4'
    }, {
      text: 'text5'
    }, {
      text: 'text6'
    }, {
      text: 'text7'
    }, {
      text: 'text8'
    }, {
      text: 'text9'
    }, {
      text: 'text10'
    }, {
      text: 'text11'
    }, {
      text: 'text12'
    }, {
      text: 'text13'
    }, {
      text: 'text14'
    }, {
      text: 'text15'
    }],

    selectIndex: -1,
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
    this.data.distY = e.touches[0].pageY - e.currentTarget.offsetTop + this.data.scrollTop;
    this.setData({
      scrollY: false,
      moveableClassName: '',
      'movableViewPosition.Y': e.currentTarget.offsetTop - this.data.scrollTop,
      selectIndex: e.currentTarget.dataset.index,
      selectData: e.currentTarget.dataset.text + '选中值'
    })

    this.data.firstY = e.touches[0].pageY;


    console.log(this.data.selectIndex);
    this.data.longpress = true;
    wx.vibrateShort();
  },
  touchendfunc(e) {
    this.setData({
      moveableClassName: 'none',
      scrollY: true,
      selectIndex: -1,
      longpress: false
    })
  },
  touchmovefunc(e) {

    if (this.data.longpress) {
      //替换位置
      var list = this.data.list;
      var index = this.data.selectIndex;
      var data = this.data.list[this.data.selectIndex];

      if (!data) {
        console.log(list, data, index)
      }

      if (e.touches[0].pageY - this.data.firstY < -25) {
        list.splice(index, 1);
        list.splice(--index, 0, data);
        this.setData({
          list: list,
          selectIndex: index
        })
        this.data.firstY -= 50
        wx.vibrateShort();
      } else if (e.touches[0].pageY - this.data.firstY > 25) {
        list.splice(index, 1);
        list.splice(++index, 0, data);
        this.setData({
          list: list,
          selectIndex: index
        })
        this.data.firstY += 50
        wx.vibrateShort();
      }

      this.setData({
        'movableViewPosition.Y': e.touches[0].pageY - this.data.distY,
      })
    }
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
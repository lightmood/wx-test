// pages/2019.08.28/2019.08.28.js
Page({
  data: {
    show: false,
  },
  toggleActionSheet() {
    this.setData({
      show: !this.data.show
    })
  },
  onPopupClose() {
    this.setData({
      show: false
    })
  },
})
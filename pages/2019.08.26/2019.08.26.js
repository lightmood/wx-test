// pages/2019.08.26/2019.08.26.js
Page({
  data: {
    disabled: true,
  },
  change () {
    this.setData({
      disabled: !this.data.disabled
    })
  }
})
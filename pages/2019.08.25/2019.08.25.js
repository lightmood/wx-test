// pages/2019.08.25/2019.08.25.js
Page({
  data: {
    navData: ['访客', '分享', '分发', '沟通'],
    currentTab: 0,
  },
  switchNav(event) {
    var cur = event.currentTarget.dataset.current;
    if (this.data.currentTab == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
    }
  },
  switchTab(event) {
    var cur = event.detail.current;
    var singleNavWidth = this.data.windowWidth / 5;
    this.setData({
      currentTab: cur
    });
  }
  
})
// custom-tab-bar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    page: null,

    theme: wx.getStorageSync('toastStyle'),

    selected: -1,
    centerIndex: 2,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [{
      pagePath: "/pages/search/search",
      iconPath: "/images/tabBar/search.svg",
      selectedIconPath: "/images/tabBar/search_s.svg",
      text: "搜索"
    }, {
      pagePath: "/pages/mine/mine",
      iconPath: "/images/tabBar/mine2.svg",
      selectedIconPath: "/images/tabBar/mine2_s.svg",
      text: "我的"
    }],
  },

  lifetimes: {
    attached: () => {}
  },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show() { 
      
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {

    switchTab(e) {

      const data = e.currentTarget.dataset
      const url = data.path

      if (this.data.selected != data.index) {
        wx.switchTab({url})
        this.setData({
          selected: data.index
        });
      }
    },

    /**
     * 点击添加按钮
     */
    add() {
      let page = this.data.page;
      let component = null;
      if (page == null || (component = page.selectComponent("#add")) == null) {
        return ;
      }

      let show = component.data.show;
      if (show) {
        component.hide();
      } else {
        component.show();
      }
    }
  }
})

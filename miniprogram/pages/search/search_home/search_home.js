const app = getApp();
Page({
    // 页面数据
    data : {
        // 搜索相关的data
        inputFocus: false, // 聚焦
        inputConfirm: false, // 输入确认
        inputValue: '', // 输入值
        allSearchResult: [
            {iconPath: "/images/search/defaultAvatar.svg", name: "Bill Gates"}, 
            {iconPath: "/images/search/defaultAvatar.svg", name: "周鸿伟"}, 
            {iconPath: "/images/search/defaultAvatar.svg", name: "Xiaoping (Bob) Xu"},
            {iconPath: "/images/search/defaultAvatar.svg", name: "张三"},
            {iconPath: "/images/search/defaultAvatar.svg", name: "欧阳娜娜"},
            {iconPath: "/images/search/defaultAvatar.svg", name: "Harper Seven Becklyxxxx"},
        ], // 大家都在搜
        // Swiper相关的data
        swiperHidden: false,
        information: [
            {image: "/images/search/swiperGraph.svg"},
            {image: "/images/search/swiperGraph.svg"},
            {image: "/images/search/swiperGraph.svg"}
        ]
    },
    
    // onLoad函数
    onLoad: function (options) {
        var that = this
        // 登录态
        if (app.globalData.userInfo == null || app.globalData.userInfo == "") {
          wx.redirectTo({
            url: '../../login/login',
          });
          return ;
        }
        // 用户信息
        that.setData({
          userInfo: app.globalData.userInfo,
        });
    },

    // onShow函数
    onShow: function() {
        if (typeof this.getTabBar === 'function' && this.getTabBar()) {
            this.getTabBar().setData({
                selected: 0,
                page: this
            });
        }
        
        this.setData({
            page: 0,
            inputConfirm: false,
            inputFocus: false
          });
    },

    // 当点击伪搜索框时触发
    bindInputFocus: function(e) {
        this.setData({
            inputFocus: true,
        });
    },
})
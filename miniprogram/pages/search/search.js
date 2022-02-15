Page({
    // 页面数据
    data : {
        // Swiper相关的data
        swiperHidden: false,
        information: [1, 2, 3]

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
          });
    },


})
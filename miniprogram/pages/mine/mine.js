Page({
    // onShow函数
    onShow: function() {

        if (typeof this.getTabBar === 'function' && this.getTabBar()) {
            this.getTabBar().setData({
                selected: 1,
                page: this
            });
        }
        
        this.setData({
            page: 1,
          });
    },
})
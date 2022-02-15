Page({
    // 页面数据
    data : {

    },
    
    // onShow函数
    onShow: function() {

        if (typeof this.getTabBar === 'function' && this.getTabBar()) {
            this.getTabBar().setData({
                selected: 0,
            });
        }

    },


})
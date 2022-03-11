Page({
    // 页面数据
    data : {
        // 搜索相关的data
        inputFocus: false, // 聚焦
        inputValue: '', // 输入值
        allSearchResult: [
            {iconPath: "/images/search/defaultAvatar.svg", name: "Bill Gates"}, 
            {iconPath: "/images/search/defaultAvatar.svg", name: "周鸿祎"}, 
            {iconPath: "/images/search/defaultAvatar.svg", name: "Xiaoping (Bob) Xu"},
            {iconPath: "/images/search/defaultAvatar.svg", name: "张三"},
            {iconPath: "/images/search/defaultAvatar.svg", name: "欧阳娜娜"},
            {iconPath: "/images/search/defaultAvatar.svg", name: "Harper Seven Becklyxxxx"},
        ], // 大家都在搜
 
        searchNum: "4", // 搜索结果个数
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

    // 当点击伪搜索框时触发
    bindInputFocus: function(e) {
        this.setData({
            inputFocus: true,
        });
    },

    // 当真搜索框失去焦点时触发
    bindInputBlur: function(e) {
        this.setData({
            inputFocus:false,
        });
    },

    // 输入完成触发
    bindInput: function(e) {
        var val = e.detail.value;
        this.setData({
            inputValue: val
        });
    }
})
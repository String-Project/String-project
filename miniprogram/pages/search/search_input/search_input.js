Page({
    // 页面数据
    data : {
        // 搜索相关的data
        inputFocus: false, // 聚焦
        inputConfirm: false, // 输入确认
        inputValue: '', // 输入值
        historyResult: [
            "阿里巴巴+王华", "腾讯+张客人+PM"
        ], // 历史记录
        searchNum: "4", // 搜索结果个数
        searchResult: [
            {name:"李华", job:"武侯分社-签证专员", location:"四川省 成都", company:"成都中港国际旅行社", companyIcon:"/images/search/defaultCompany.svg"},
            {name:"李华", job:"--", location:"", company:"", companyIcon:""},
            {name:"李华", job:"PCG - 视觉设计师", location:"", company:"腾讯", companyIcon:"/images/search/Tencent.png"},
            {name:"李华", job:"运营部 - 产品运营", location:"中国", company:"", companyIcon:""},
        ]
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

    // 输入完成触发
    bindInput: function(e) {
        var val = e.detail.value;
        this.setData({
            inputValue: val
        });
    },

    // 输入完成触发
    bindConfirm: function(e) {
        wx.switchTab({
            url: '/pages/search/search_result/search_result'
        });
        this.setData({
            inputConfirm : true
        });
    }
})
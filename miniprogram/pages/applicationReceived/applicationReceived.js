Page({
  // 页面数据
  data: {
    // 搜索相关的data
    inputFocus: false, // 聚焦
    inputValue: "", // 输入值
    allSearchResult: [
      { iconPath: "/images/search/defaultAvatar.svg", name: "Bill Gates" },
      { iconPath: "/images/search/defaultAvatar.svg", name: "周鸿祎" },
      {
        iconPath: "/images/search/defaultAvatar.svg",
        name: "Xiaoping (Bob) Xu",
      },
      { iconPath: "/images/search/defaultAvatar.svg", name: "张三" },
      { iconPath: "/images/search/defaultAvatar.svg", name: "欧阳娜娜" },
      {
        iconPath: "/images/search/defaultAvatar.svg",
        name: "Harper Seven Becklyxxxx",
      },
    ], // 大家都在搜
    historyResult: ["阿里巴巴+王华", "腾讯+张客人+PM"], // 历史记录
    searchNum: "4", // 搜索结果个数
    searchResult: [
      {
        name: "李华",
        job: "武侯分社-签证专员",
        location: "四川省 成都",
        company: "成都中港国际旅行社",
        companyIcon: "/images/search/defaultCompany.svg",
      },
      { name: "李华", job: "--", location: "", company: "", companyIcon: "" },
      {
        name: "李华",
        job: "PCG - 视觉设计师",
        location: "",
        company: "腾讯",
        companyIcon: "/images/search/Tencent.png",
      },
      {
        name: "李华",
        job: "运营部 - 产品运营",
        location: "中国",
        company: "",
        companyIcon: "",
      },
    ],
    // Swiper相关的data
    swiperHidden: false,
    information: [1, 2, 3],
  },

  // onShow函数
  // onShow: function() {

  //     if (typeof this.getTabBar === 'function' && this.getTabBar()) {
  //         this.getTabBar().setData({
  //             selected: 0,
  //             page: this
  //         });
  //     }

  //     this.setData({
  //         page: 0,
  //       });
  // },

  // // 当点击伪搜索框时触发
  // bindInputFocus: function(e) {
  //     this.setData({
  //         inputFocus: true,
  //     });
  // },

  // // 当真搜索框失去焦点时触发
  // bindInputBlur: function(e) {
  //     this.setData({
  //         inputFocus:false,
  //     });
  // },

  // // 输入完成触发
  // bindInput: function(e) {
  //     var val = e.detail.value;
  //     this.setData({
  //         inputValue: val
  //     });
  // }
});

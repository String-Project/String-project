//const { userInfo } = require("os");

var App = getApp();
const db = wx.cloud.database();
Page({
  // 页面数据
  data: {
    userInfo: null,

    // 搜索相关的data
    inputFocus: false, // 聚焦
    inputValue: "", // 输入值

    searchWorkNum: "4", // 搜索结果个数
    searchEduNum: null,
    // Swiper相关的data
    swiperHidden: false,
    information: [1, 2, 3],
    searchResultWork: [
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
    searchResultEdu: [],
  },
  // onLoad:function(options){
  //     var that=this
  //     //调用应用实例的方法获取全局数据
  //     App.getUserInfo(function(userInfo){
  //         console.log(userInfo);
  //         //更新数据
  //         that.setData({
  //         userInfo:userInfo
  //         })
  //     })
  // },
  onLoad: function (options) {
    var that = this;
    // 用户信息
    that.setData({
      userInfo: App.globalData.userInfo,
    });

    //获取searchResultWork
    db.collection("Info")
      .where({
        _openid: App.globalData.userInfo._openid, //是同一用户的信息才会被查询，这里为啥直接用userInfo会出问题？
        ExperienceType: "WorkingExperience",
      })
      .get({
        success: (res) => {
          that.setData({
            searchResultWork: res.data,
            searchWorkNum: res.data.length,
          });
          console.log(res.data);
        },
      });

    //获取searchResultEdu
    db.collection("Info")
      .where({
        _openid: App.globalData.userInfo._openid, //是同一用户的信息才会被查询，这里为啥直接用userInfo会出问题？
        ExperienceType: "EducationalExperience",
      })
      .get({
        success: (res) => {
          that.setData({
            searchResultEdu: res.data,
            searchEduNum: res.data.length,
          });
          console.log(res.data);
        },
      });

    //获取searchResult完毕
  },
  // onShow函数
  onShow: function () {
    if (typeof this.getTabBar === "function" && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1,
        page: this,
      });
    }

    this.setData({
      page: 1,
    });
  },
  gotoBasic: function () {
    wx.navigateTo({
      url: "/pages/information/basicInformation/basicInformation",
    });
  },
  gotoWork: function () {
    var toupdate = false;
    console.log(toupdate);
    wx.navigateTo({
      url:
        "/pages/information/workingExperience/workingExperience?toupdate=" +
        toupdate,
    });
  },
  _gotoWork: function (e) {
    var toupdate = true;
    var toid = e.target.id;
    console.log(toupdate);
    console.log(toid);
    wx.navigateTo({
      url:
        "/pages/information/workingExperience/workingExperience?toupdate=" +
        toupdate +
        "&toid=" +
        toid,
    });
  },
  gotoEducation: function () {
    wx.navigateTo({
      url: "/pages/information/educationExperience/educationExperience",
    });
  },
});

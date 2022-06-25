
var App=getApp()
const db = wx.cloud.database(); 
Page({
    // 页面数据
    data : {

        userInfo:null,

        // 搜索相关的data
        inputFocus: false, // 聚焦
        inputValue: '', // 输入值
        
        searchNum: "4", // 搜索结果个数
        // Swiper相关的data
        swiperHidden: false,
        information: [1, 2, 3],
        searchResult: [
            {name:"李华", job:"武侯分社-签证专员", location:"四川省 成都", company:"成都中港国际旅行社", companyIcon:"/images/search/defaultCompany.svg"},
            {name:"李华", job:"--", location:"", company:"", companyIcon:""},
            {name:"李华", job:"PCG - 视觉设计师", location:"", company:"腾讯", companyIcon:"/images/search/Tencent.png"},
            {name:"李华", job:"运营部 - 产品运营", location:"中国", company:"", companyIcon:""},
        ],

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
    onLoad:function(options){
        var that=this
        // 用户信息
        that.setData({
            userInfo: App.globalData.userInfo,
        });
    },
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
    gotoBasic:function(){
        wx.navigateTo({
            url: '/pages/information/basicInformation/basicInformation',
          })
    },
    gotoWork:function(){
        var toupdate = false;
        console.log(toupdate)
      wx.navigateTo({
          url: '/pages/information/workingExperience/workingExperience?toupdate=' + toupdate,
        })
  },
    _gotoWork:function(){
        var toupdate = true;
        console.log(toupdate)
        wx.navigateTo({
            url: '/pages/information/workingExperience/workingExperience?toupdate=' + toupdate,
        })
    },
    gotoEducation:function(){
        wx.navigateTo({
            url: '/pages/information/educationExperience/educationExperience',
          })
    }
    



})




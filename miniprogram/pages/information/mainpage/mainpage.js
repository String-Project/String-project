
var App=getApp()

Page({
    // 页面数据
    data : {

        userInfo:{
            nickname: "山行"
        },        

        // 搜索相关的data
        inputFocus: false, // 聚焦
        inputValue: '', // 输入值
        
        searchNum: "4", // 搜索结果个数
        // Swiper相关的data
        swiperHidden: false,
        information: [1, 2, 3]

    },
    onLoad:function(options){
        var that=this
        //调用应用实例的方法获取全局数据
        App.getUserInfo(function(userInfo){
            console.log(userInfo);
            //更新数据
            that.setData({
            userInfo:userInfo
            })
        })
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
      wx.navigateTo({
          url: '/pages/information/workingExperience/workingExperience',
        })
  },
    gotoEducation:function(){
        wx.navigateTo({
            url: '/pages/information/educationExperience/educationExperience',
          })
    }
    



})




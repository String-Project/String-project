const app=getApp()

Page({
    // 页面数据
    data : {

        userInfo:null, 
        hasUserInfo: false,
        canIUseGetUserProfile: false,
        userImage:"",     

        // 搜索相关的data
        inputFocus: false, // 聚焦
        inputValue: '', // 输入值
        
        searchNum: "4", // 搜索结果个数
        // Swiper相关的data
        swiperHidden: false,
        information: [1, 2, 3]

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

    onLoad:function(options){
        var that=this
        // 用户信息
        that.setData({
            userInfo: app.globalData.userInfo,
        });
    },
    gotoEdit:function(){
        wx.navigateTo({
            url: '/pages/information/mainpage/mainpage',
          })
    },
    gotoFriend:function(){
        wx.navigateTo({
            url: '/pages/myFriend/myFriend',
          })
    },
    gotoApplication:function(){
        wx.navigateTo({
            url: '/pages/myApplication/myApplication',
          })
    },
    gotoReceive : function () {
        wx.navigateTo({
          url: '/pages/applicationReceived/applicationReceived',
        })
    }


})




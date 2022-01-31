// pages/add/add.js
/*
by DeepZheng
*/
import Info from "../../manager/Info.js"

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerHeight: app.globalData.navHeight + 20,
    iPhoneX: false,
    icon: [],
    weekday: ["一", "二", "三", "四", "五", "六", "日"],
    weekday_bool: [true, true, true, true, true, true, true],
    date: null,

    title: "",
    selected_icon: 1,
    selected_weekday: 0,
    end_time: null,
    share: false,
    //userAge: "dfs",
    //userCareer: "fsf",
    //userName: "dfs",
    //userSchool: "",

    // 编辑
    edit_id: null,
    text: app.text.add,
  },


  onShow: function() {

    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 3,
        page: this
      });
    }

    this.setData({
      page: 0,
    });

    this.loadData();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.toast = this.selectComponent("#toast");
    console.log("shasda")
    if (options.id != null) {
      this.setData({
        edit_id: options.id
      });

      this.loadInfo();

      return ;  
    }

    //this.habitAmount();
  },
 
 /**
   * 加载数据
   */
  loadData : function() {
    this.toast.showLoading();
    Info.loadInfo(app.globalData.userInfo._openid).then(res => {
      this.toast.hideLoading();
     // wx.stopPullDownRefresh();

      console.log(res);
     let Name = res[0].name.length > 0 ? res[0].name : ""
      let Age = res[0].age.length > 0 ? res[0].age : " "
      let School = res[0].school.length > 0 ? res[0].school : " "
      let Career = res[0].career.length > 0 ? res[0].career : " "
      this.setData({
        userName : Name,
        userAge : Age,
        userSchool : School,
        userCareer : Career
      });
    });
  },

  /**
   * 是否共享
   */
  shareChange: function(e) {
    this.setData({
      share: e.detail.value
    });
  },



  /**
   * save
   */
  save: function() {

    if (this.data.title.length == 0 || this.data.selected_weekday == 0) {
      this.toast.showWarning(this.data.text.saveError);
      return ;
    }

    let data = {
      name: this.data.name,
      age: this.data.age,
      school: this.data.school,
      career: this.data.career,
      share: this.data.share
    };

    //this.toast.showLoading();
    if (this.data.edit_id) {
      data.end_time = (data.end_time == null ? null : new Date(data.end_time));
      Info.update(this.data.edit_id, data).then(res => {
        this.toast.showSuccess();
        
        app.globalData.needReloadData = true;
  
        wx.switchTab({
          url: '/pages/mineV2/mine',
        });
      }).catch(err => {
        this.toast.showFailure(err)
      });
    } else {
      Info.add(data).then(res => {
        this.toast.showSuccess();
        
        app.globalData.needReloadData = true;
        app.globalData.habitAmount = app.globalData.habitAmount + 1;
  
        wx.switchTab({
          url: '/pages/mineV2/mine',
        });
      }).catch(err => {
        this.toast.showFailure(err);
      });
    }

  },

})
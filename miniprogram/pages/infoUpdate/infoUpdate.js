/*
by DeepZheng
*/
import Info from "../../manager/Info.js";

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

    // 编辑
    edit_id: null,
    text: app.text.add,
  },

  onShow: function () {
    if (typeof this.getTabBar === "function" && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 3,
        page: this,
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

    //this.habitAmount();
  },

  /**
   * 加载数据
   */
  loadData: function () {
    this.toast.showLoading();
    console.log("load");
    Info.loadInfo(app.globalData.userInfo._openid).then((res) => {
      this.toast.hideLoading();
      // wx.stopPullDownRefresh();
      console.log("hhh");
      console.log(res);
      let edit_id = res[0]._id.length > 0 ? res[0]._id : null;
      let Name = res[0].name.length > 0 ? res[0].name : "";
      let Age = res[0].age.length > 0 ? res[0].age : " ";
      let School = res[0].school.length > 0 ? res[0].school : " ";
      let Career = res[0].career.length > 0 ? res[0].career : " ";
      console.log("set");
      this.setData({
        userName: Name,
        userAge: Age,
        userSchool: School,
        userCareer: Career,
        edit_id: edit_id,
      });
      console.log(this.data.userCareer);
      console.log("career");
    });
  },
  /**
   * 名字
   */
  nameInput: function (e) {
    let value = e.detail.value;

    if (value.length >= 10) {
      wx.showToast({
        title: this.data.text.nameLength,
        icon: "none",
      });
    }

    this.setData({
      name: value,
    });
  },
  /**
   * 学校
   */
  schoolInput: function (e) {
    let value = e.detail.value;

    if (value.length >= 20) {
      wx.showToast({
        title: this.data.text.schoolLength,
        icon: "none",
      });
    }

    this.setData({
      school: value,
    });
  },
  /**
   * 年龄
   */
  ageInput: function (e) {
    let value = e.detail.value;
    console.log(value);
    if (value.length >= 5) {
      wx.showToast({
        title: this.data.text.ageLength,
        icon: "none",
      });
    }

    this.setData({
      age: value,
    });
  },
  /**
   * 职业
   */
  careerInput: function (e) {
    let value = e.detail.value;

    if (value.length >= 20) {
      wx.showToast({
        title: this.data.text.careerLength,
        icon: "none",
      });
    }

    this.setData({
      career: value,
    });
  },

  /**
   * 是否共享
   */
  shareChange: function (e) {
    this.setData({
      share: e.detail.value,
    });
  },

  /**
   * save
   */
  save: function () {
    let data = {
      name: this.data.name,
      age: this.data.age,
      school: this.data.school,
      career: this.data.career,
      share: this.data.share,
    };

    this.toast.showLoading();
    if (this.data.edit_id != null) {
      data.end_time = data.end_time == null ? null : new Date(data.end_time);
      Info.update(this.data.edit_id, data)
        .then((res) => {
          this.toast.showSuccess();

          app.globalData.needReloadData = true;

          wx.switchTab({
            url: "/pages/info/index",
          });
        })
        .catch((err) => {
          this.toast.showFailure(err);
        });
    } else {
      Info.add(data)
        .then((res) => {
          this.toast.showSuccess();

          app.globalData.needReloadData = true;

          wx.switchTab({
            url: "/pages/mineV2/mine",
          });
        })
        .catch((err) => {
          this.toast.showFailure(err);
        });
    }
  },
});

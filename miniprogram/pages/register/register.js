const defaultAvatarUrl =
  "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0";

Page({
  data: {
    avatarFlag: false,
    phoneFlag: false,
    code: null,

    avatarUrl: defaultAvatarUrl,
    nickname: null,
    phoneNumber: null,

    loading: false,
  },

  register: function () {
    wx.cloud
      .database()
      .collection("users")
      .add({
        data: {
          avatarUrl: this.data.avatarUrl,
          nickname: this.data.nickname,
        },
      })
      .then((res) => {
        wx.showModal({
          title: "注册成功",
          content: "是否继续完善信息？",
          success: (res) => {
            if (res.confirm) {
              wx.redirectTo({
                url: "../information/educationExperience/educationExperience",
              });
            } else if (res.cancel) {
              wx.switchTab({
                url: "../search/search_home/search_home",
              });
            }
          },
        });
      })
      .catch((err) => {
        console.log(err);
        wx.showToast({
          icon: "none",
          title: "注册失败",
        });
      });
  },

  next: function () {
    this.setData({
      phoneFlag: true,
    });
  },

  getPhoneNumber(e) {
    // 用户拒绝授权
    if (e.detail.errMsg == "getPhoneNumber:fail user deny") {
      wx.showToast({
        icon: "none",
        title: "请允许获取手机号，否则功能不可用！",
      });
      return;
    }
    console.log(e);
    if (e.detail.code) {
      console.log(e.detail.code);
      wx.cloud
        .callFunction({
          name: "getPhoneNumber",
          data: {
            code: e.detail.code,
          },
        })
        .then((res) => {
          console.log(res);
          if (res.errMsg == "cloud.callFunction:ok") {
            let phoneNumber = res.result.phoneNumber;
            this.setData({
              phoneNumber: phoneNumber,
              phoneFlag: true,
            });
          } else {
            wx.showToast({
              icon: "none",
              title: "获取失败",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          wx.showToast({
            icon: "none",
            title: "获取失败",
          });
        });
    }
  },

  getUserProfile(e) {
    wx.getUserProfile({
      desc: "获取你的昵称和头像",
      lang: "zh_CN",
      success: (result) => {
        console.log(result);
        this.setData({
          avatarUrl: result.userInfo.avatarUrl,
          nickname: result.userInfo.nickName,
          avatarFlag: true,
        });
      },
      fail: (res) => {
        console.log(res);
        wx.showToast({
          title: "获取失败",
          icon: "none",
        });
      },
    });
  },
});

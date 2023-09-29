//app.js

App({
  util: require("./util/util"),

  // 文案
  text: require("./util/global"),

  onLaunch: function () {
    if (!wx.cloud) {
      console.error("请使用 2.2.3 或以上的基础库以使用云能力");
    } else {
      wx.cloud.init({
        traceUser: true,
        env: "string-project-1gzuomj8360b6ac3",
      });
    }

    let that = this;
    wx.cloud.callFunction({
      name: "login",
      success: (res) => {
        that.globalData.openId = res.result.openid;

        // 数据库中查询
        wx.cloud
          .database()
          .collection("users")
          .where({
            _openid: that.globalData.openId,
          })
          .get()
          .then((res) => {
            if (res.data.length != 0) {
              that.globalData.userInfo = res.data[0];
            }
            that.globalData.needReloadData = true;
            if (that.globalData.reloadCallback) {
              that.globalData.reloadCallback();
            }
          })
          .catch((err) => {
            console.log(err);
            wx.showModal({
              title: "登录失败",
              content: "请检查网络连接",
            });
          });
      },
      fail: (err) => {
        console.log(err);
        wx.showModal({
          title: "登录失败",
          content: "请检查网络连接",
        });
        return;
      },
    });

    // iPhoneX 判断
    wx.getSystemInfo({
      success: function (res) {
        //model中包含着设备信息
        var model = res.model;
        if (model.search("iPhone X") != -1) {
          that.globalData.iPhoneX = true;
          that.globalData.navHeight = 90; /* iPhoneX 44 + 46 */
          that.globalData.headerHeight = 210; /* iPhoneX 44 + 46 + 120 */
          that.globalData.tabBarHeight = 83; /* iPhoneX 34 + 49 */
        } else {
          that.globalData.iPhoneX = false;
          that.globalData.navHeight = 66; /* 普通手机 20 + 46 */
          that.globalData.headerHeight = 166; /* 普通手机 20 + 46 + 100 */
          that.globalData.tabBarHeight = 49; /* 普通手机 49 */
        }

        that.globalData.statusBarHeight = res.statusBarHeight;
      },
    });
  },

  globalData: {
    iPhoneX: false,
    navHeight: 0,
    headerHeight: 0,
    tabBarHeight: 0,
    openId: null,
    userInfo: null,
    // partnerInfo: null,
    needReloadData: false, // 新添加数据之后做一个标示，方便首页刷新
    reloadCallback: null,
    // needReloadPartner: true, // 需要刷新小伙伴信息
    // habitAmount: -1, // 已经添加习惯数量
    theme: "default", // 主题
    // formIds: [], // 表单ID,
    // habits: [], // habits _id <=> habit
  },
});

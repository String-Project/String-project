const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0';

Page({
    data: {
        avatarFlag: false,
        phoneFlag: false,
        code: null,

        avatarUrl: defaultAvatarUrl,
        phoneNumber: null
    },

    startFunction: function () {
        wx.redirectTo({
            url: '../information/educationExperience/educationExperience',
        });
    },

    getPhoneNumber(e) {
        // 用户拒绝授权
        if (e.detail.errMsg == "getPhoneNumber:fail user deny") {
            wx.showToast({
                icon: "none",
                title: '请允许获取手机号，否则功能不可用！',
            })
            return;
        }
        this.setData({
            code: e.detail.code,
            phoneFlag: true
        });
        console.log(this.data.code);
    },

    onChooseAvatar(e) {
        this.setData({
            avatarUrl: e.detail,
            avatarFlag: true
        });
        console.log(this.data.avatarUrl);
    }
})
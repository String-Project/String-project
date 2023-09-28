Page({
  // 页面数据
  data: {
    // 搜索相关的data
    inputFocus: false, // 聚焦
    inputConfirm: false, // 输入确认
    inputValue: "", // 输入值
    // iplut:"-1",
    searchName: [],
    searchCompany: [],
    rr: [],

    historyResult: ["阿里巴巴+王华", "腾讯+张客人+PM"], // 历史记录
    searchNum: "4", // 搜索结果个数
    searchResult: [
      // {name:"李华", job:"武侯分社-签证专员", location:"四川省 成都", company:"成都中港国际旅行社", companyIcon:"/images/search/defaultCompany.svg"},
      // // {name:"李华", job:"--", location:"", company:"", companyIcon:""},
      // // {name:"李华", job:"PCG - 视觉设计师", location:"", company:"腾讯", companyIcon:"/images/search/Tencent.png"},
      // // {name:"李华", job:"运营部 - 产品运营", location:"中国", company:"", companyIcon:""},
    ],
  },

  // onShow函数
  onShow: function () {
    if (typeof this.getTabBar === "function" && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0,
        page: this,
      });
    }

    this.setData({
      page: 0,
      inputConfirm: false,
      inputFocus: false,
    });
  },

  // 输入完成触发
  bindInput: function (e) {
    var val = e.detail.value;

    this.setData({
      inputValue: val,
    });
  },

  // 输入完成触发
  bindConfirm: function (e) {
    var ss = e.detail.value;
    var searchName = ss.substring(0, ss.indexOf("+"));
    var searchCompany = ss.substring(ss.indexOf("+") + 1, ss.length);
    // const db = wx.cloud.database();
    const db = wx.cloud.database({ env: "cloud1-5gldj56g181f734e" });
    const collection1 = "Major";
    var X = db
      .collection(collection1)
      .where({
        SubjectCategories: RegExp(searchCompany),
        subject: RegExp(searchName),
      })
      .field({
        _id: false,
        subject: true,
        SubjectCategories: true,
      })
      .count()
      .then((res) => {
        console.log(res.total);
      });
    // console.log("done!")
    var that = this;
    db.collection(collection1)
      .where({
        SubjectCategories: RegExp(searchCompany),
        subject: RegExp(searchName),
      })
      .get()
      .then((res) => {
        that.setData({
          searchResult: res.data,
          searchNum: res.data.length,
        });
        console.log(res.data);
      });
    //  searchNum = db.collection(collection1).where({
    // 'SubjectCategories': RegExp(searchCompany),
    // 'subject': RegExp(searchName)
    // }).field(
    //     {
    //         _id : false,
    //         subject:true,SubjectCategories:true
    //     }
    //     ).count().then(res =>{console.log(res.total)})
    console.log(X + 1);
    this.setData({
      searchName: searchName,
      searchCompany: searchCompany,

      inputConfirm: true,
      ss: ss,
      searchNum: X,

      // searchResult : db.collection(collection1).where({
      //     'SubjectCategories': RegExp(searchCompany),
      //     'subject': RegExp(searchName)
      //     }).field(
      //         {
      //             _id : false,
      //             subject:true,SubjectCategories:true
      //         }
      //         ).get().then(res =>{console.log(res.data)})

      // searchResult : console.log(res.data)
      // const collection1 : 'Major',
      // db.collection(collection1).where({
      // 'SubjectCategories': db.RegExp({regexp:searchName,option:(1)}),
      // 'subject': db.Regexp({regexp:searchCompany,option:(1)})
      //     }).field({subject:true},{SubjectCategories:true}).get()
      // })
      // searchname : ss.substring(0,iplut)
    });
    return ss;
  },
});

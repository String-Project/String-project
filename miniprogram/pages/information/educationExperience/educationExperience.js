/**
 * 用户表
 * @param nickname      昵称
 * @param avatar        头像
 * @param sex           性别 (男1女2)
 * @param register_time 注册时间
 * @param job           工作
 * @param major         专业
 * @param institution       会社
 * @param university    大学
 */

//import db from "../util/db.js";
const db = wx.cloud.database(); //暂时使用微信自带云开发数据库
const collection = "Info"; //工作经历上传到云开发数据库Info集合中

// pages/publish/publish.js，发布快递信息
// INFORM workingExperience, 工作经历添加
const app = getApp()
//const pay = require('../../services/pay.js')
Page({

  data:{
    ExperienceType: "EducationExperience",
    duration: null,
    EducationType: null, 
    institution: null,
    major: null,
    description: null,
  },

  duration1: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  EducationType1: function (e) {
    this.setData({
      EducationType: e.detail.value
    })
  },
  institution1: function (e) {
    this.setData({
      institution: e.detail.value
    })
  },
  major1: function (e) {
    this.setData({
      major: e.detail.value
    })
  },
  description1: function (e) {
    this.setData({
      description: e.detail.value
    })
  },
  //上传按钮
  upData: function (e) {
    db.collection('Info').add({
      data:{
        ExperienceType: this.data.ExperienceType,
        duration: this.data.duration,
        EducationType: this.data.EducationType,
        institution: this.data.institution,
        major: this.data.major,
        description: this.data.description,
      },
      success:res=>{
        console.log(res);
      },
      fail:err=>{
        console.log(err);
      }
    })
  },

  /**
   * 页面的初始数据
   */
  // data: {
  //   img_url: [],
  //   content: '',
  //   clould_img_id_list: [],
  //   maxContentLength: 1000,
  //   minContentLength: 1,
  //   address: {
  //     id: 0,
  //     province_id: 0,
  //     city_id: 0,
  //     district_id: 0,
  //     address: '',
  //     full_region: '',
  //     author_parcel_name: '',
  //     Pickup_code:'',
  //     mobile: '',
  //     note:'',
  //     is_default: 0,
  //     blockNum:'',
  //     deliverer_id:''  //增加记录deliverer_id
  //   },
  // },
  // /**
  //  * 生命周期函数--监听页面加载
  //  */
  // onLoad: function (options) {
  //   console.log(getApp().globalData);
  //   // 本页面要传数据到服务器，要对是否拿到这些数据做校验

  //   // 这一段作为测试，已经验证可以成功向云端数据库中加入数据
  //   // db.collection("Info").add({
  //   //   // data 传入需要局部更新的数据
  //   //   data: {
  //   //     // 表示将 done 字段置为 true
  //   //     nickname: "Dingzhen Zhenzhu", 
  //   //     sex: "Male",
  //   //     register_time: new Date(),
  //   //     job: "Idol:Smoker", 
  //   //     major: "Cheating",
  //   //     institution: "Ellin Gu Cotd.",
  //   //     university: "Ellin Gu University of China", 
  //   //   },
  //   //   success: function(res) {
  //   //     console.log(res.data)
  //   //   }
  //   // })

  // },
  // input: function (e) {
  //   if (e.detail.value.length >= this.data.maxContentLength) {
  //     wx.showToast({
  //   major: '已达到最大字数限制',
  //     })
  //   }
  //   this.setData({
  //     content: e.detail.value
  //   })
  // },
  // ///Pickup_code
  // bindinputPickup_code(event) {
  //   let address = this.data.address;
  //   address.Pickup_code = event.detail.value;
  //   this.setData({
  //     address: address
  //   });
  // },
  // bindinputMobile(event) {
  //   let address = this.data.address;
  //   address.mobile = event.detail.value;
  //   this.setData({
  //     address: address
  //   });
  // },
  // bindinputName(event) {
  //   let address = this.data.address;
  //   address.author_parcel_name = event.detail.value;
  //   this.setData({
  //     address: address
  //   });
  // },
  // bindinputBlockNum(event) {
  //   let address = this.data.address;
  //   address.blockNum = event.detail.value;
  //   this.setData({
  //     address: address
  //   });
  // },
  // bindinputAddress(event) {
  //   let address = this.data.address;
  //   address.address = event.detail.value;
  //   this.setData({
  //     address: address
  //   });
  // },
  // bindinputNote(event) {
  //   let address = this.data.address;
  //   address.note = event.detail.value;
  //   this.setData({
  //     address: address
  //   });
  // },
  ///
  // chooseimage: function () {
  //   var that = this;
  //   wx.chooseImage({
  //     count: 9, // 默认9 
  //     sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有 
  //     sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有 
  //     success: function (res) {
  //       if (res.tempFilePaths.length > 0) {
  //         //图如果满了9张，不显示加图
  //         if (res.tempFilePaths.length == 9) {
  //           that.setData({
  //             hideAdd: 1
  //           })
  //         } else {
  //           that.setData({
  //             hideAdd: 0
  //           })
  //         }
  //         //把每次选择的图push进数组
  //         let img_url = that.data.img_url;
  //         for (let i = 0; i < res.tempFilePaths.length; i++) {
  //           if (img_url.length >= 9) {
  //             wx.showToast({
  //               image: '../../images/warn1.png',
  //           major: '图片过多'
  //             })
  //             that.setData({
  //               hideAdd: 1
  //             })
  //             break
  //           }
  //           img_url.push(res.tempFilePaths[i])
  //         }
  //         that.setData({
  //           img_url: img_url
  //         })
  //       }
  //     }
  //   })
  // },
  // /**
  //  * 执行发布时图片已经上传完成，写入数据库的是图片的fileId
  //  */
  
  // publish: function(img_url_ok) {
  //   var that = this
  //   wx.cloud.callFunction({
  //     name: 'publish_post',
  //     data: {
  //       openid: app.globalData.openId,// 不是直接含在 event 里的？这个云端其实能直接拿到
  //       author_name: app.globalData.wechatNickName,
  //       author_avatar_url: app.globalData.wechatAvatarUrl,
  //       //调用这两个都是用全局变量的
  //       content: this.data.content,
  //       image_url: img_url_ok,//本地要显示图像，图像是一个链接的形式，链接是可以直接得到的，不用 event 之类的来装
  //       x:'2',
  //       pickup_code: this.data.address.Pickup_code,
  //       id: this.data.address.id,
  //       deliverer_id: this.data.address.deliverer_id,  //增加记录送货者的id
  //       // city_id: this.data.address.city_id,
  //       address: this.data.address.address,
  //       //两个 address 不歧义，第二个 address 是在第一个address 包里面的，外面看不到
  //       // full_region: this.data.address.full_region,
  //       //full_region: this.data.address.blockNum,
  //       blockNum: this.data.address.blockNum,
  //       author_parcel_name: that.data.address.author_parcel_name,
  //       mobile: this.data.address.mobile,
  //       //is_default: this.data.address.is_default,
  //       note: this.data.address.note,
  //       publish_time: "",
  //       update_time: ""//目前让服务器自己生成这两个时间
  //     },
  //     success: function (res) {
  //       let data = {
  //         openId: app.globalData.openId,
  //       }
  //       pay.payOrder(data)

  //       /// console.log("flag2")
  //       // 强制刷新，这个传参很粗暴
  //       var pages = getCurrentPages();             //  获取页面栈
  //       var prevPage = pages[pages.length - 2];    // 上一个页面
  //       prevPage.setData({
  //         update: true
  //       })
  //       wx.hideLoading()
  //       wx.navigateBack({
  //         delta: 1
  //       })
  //     },
  //     fail: function(res) {
  //       console.log(res)
  //       that.publishFail('发布失败')
  //     }
  //   })
  // },
  
  // send: function () {

  //   db.collection("Info").add({
  //     // data 传入需要局部更新的数据
  //     data: {
  //       // 表示将 done 字段置为 true
  //       nickname: "Dingzhen Zhenzhu", 
  //       sex: "Male",
  //       register_time: new Date(),
  //       job: "Idol:Smoker", 
  //       major: "Cheating",
  //       institution: "Ellin Gu Cotd.",
  //       university: "Ellin Gu University of China", 
  //     },
  //     success: function(res) {
  //       console.log(res.data)
  //     }
  //   })

    // if (this.data.content.length < this.data.minContentLength) {
    //   wx.showToast({
    //     image: '../../images/warn1.png',
    // major: '内容太短!',
    //   })
    //   return
    // }
    // if (this.data.address.address.length < this.data.minContentLength) {
    //   wx.showToast({
    //     image: '../../images/warn.png',
    // major: '地址太短!',
    //   })
    //   return
    // }
    // var that = this;

    // wx.showModal({
    //major: '提示',
    //   content: '是否确认发布并抵押1积分？',
    //   success(res) {
    //     if (res.confirm) {
    //       console.log('用户点击确定')

    //       wx.showLoading({
    //     major: '发布中',
    //         mask: true
    //       })

    //       // let img_url = that.data.img_url;
    //       // let img_url_ok = [];
    //       // //由于图片只能一张一张地上传，所以用循环
    //       // if (img_url.length == 0) {
    //       //   that.publish([])
    //       //   return
    //       // }
    //       // for (let i = 0; i < img_url.length; i++) {
    //       //   var str = img_url[i];
    //       //   var obj = str.lastIndexOf("/");
    //       //   var fileName = str.substr(obj + 1)
    //       //   console.log(fileName)
    //       //   wx.cloud.uploadFile({
    //       //     cloudPath: 'post_images/' + fileName,//必须指定文件名，否则返回的文件id不对
    //       //     filePath: img_url[i], // 小程序临时文件路径
    //       //     success: res => {
    //       //       // get resource ID: 
    //       //       console.log(res)
    //       //       //把上传成功的图片的地址放入数组中
    //       //       img_url_ok.push(res.fileID)

    //       //       //如果全部传完，则可以将图片路径保存到数据库

    //       //       if (img_url_ok.length == img_url.length) {
    //       //         console.log(img_url_ok)
    //       //         that.publish(img_url_ok)
    //       //       }

    //       //     },
    //       //     fail: err => {
    //       //       // handle error
    //       //       that.publishFail('图片上传失败')
    //       //       console.log('fail: ' + err.errMsg)
    //       //     }
    //       //   })
    //       // }  
          
    //       wx.showToast({
    //         icon: 'success',
    //     major: '发布成功!',
    //         duration: 2000
    //       })
    //     } else if (res.cancel) {
    //       console.log('用户点击取消')
    //       // wx.navigateTo({
    //       //   url: '../publish/publish?postid=' + e.currentTarget.dataset.postid,
    //       // }) //这里不该有，是用于postlist进detail时、传那一单的id
    //     }
    //   }
    // })

  

    // wx.showLoading({
    //major: '发布中',
    //   mask: true
    // })

    // let img_url = that.data.img_url;
    // let img_url_ok = [];
    // //由于图片只能一张一张地上传，所以用循环
    // if (img_url.length == 0) {
    //   this.publish([])
    //   return
    // }
    // for (let i = 0; i < img_url.length; i++) {
    //   var str = img_url[i];
    //   var obj = str.lastIndexOf("/");
    //   var fileName = str.substr(obj + 1)
    //   console.log(fileName)
    //   wx.cloud.uploadFile({
    //     cloudPath: 'post_images/' + fileName,//必须指定文件名，否则返回的文件id不对
    //     filePath: img_url[i], // 小程序临时文件路径
    //     success: res => {
    //       // get resource ID: 
    //       console.log(res)
    //       //把上传成功的图片的地址放入数组中
    //       img_url_ok.push(res.fileID)

    //       //如果全部传完，则可以将图片路径保存到数据库

    //       if (img_url_ok.length == img_url.length) {
    //         console.log(img_url_ok)
    //         that.publish(img_url_ok)

    //       }

    //     },
    //     fail: err => {
    //       // handle error
    //       that.publishFail('图片上传失败')
    //       console.log('fail: ' + err.errMsg)
    //     }
    //   })
    // }  
    
  // },

  // /**
  //  * 生命周期函数--监听页面初次渲染完成
  //  */
  // onReady: function () {

  // },

  // /**
  //  * 生命周期函数--监听页面显示
  //  */
  // onShow: function () {
    
  // },

  // /**
  //  * 生命周期函数--监听页面隐藏
  //  */
  // onHide: function () {

  // },

  // /**
  //  * 生命周期函数--监听页面卸载
  //  */
  // onUnload: function () {

  // },

  // /**
  //  * 页面相关事件处理函数--监听用户下拉动作
  //  */
  // onPullDownRefresh: function () {

  // },

  // /**
  //  * 页面上拉触底事件的处理函数
  //  */
  // onReachBottom: function () {

  // },

  // /**
  //  * 用户点击右上角分享
  //  */
  // onShareAppMessage: function () {

  // },
  // publishFail(info) {
  //   wx.showToast({
  //     image: '../../images/warn1.png',
  // major: info,
  //     mask: true,
  //     duration: 2500
  //   })
  // }
})
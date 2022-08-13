/**
 * 用户表
 * @param nickname      昵称
 * @param avatar        头像
 * @param sex           性别 (男1女2)
 * @param register_time 注册时间
 * @param job           工作
 * @param major         专业
 * @param company       公司
 * @param university    大学
 */

//import db from "../util/db.js";
const db = wx.cloud.database(); //暂时使用微信自带云开发数据库
//工作经历上传到云开发数据库Info集合中

// pages/publish/publish.js，发布快递信息
// INFORM workingExperience, 工作经历添加
const app = getApp()
//const pay = require('../../services/pay.js')
Page({

  data:{
    toupdate: null,
    toid: null,
    ExperienceType: "WorkingExperience",
    duration: "请输入工作时期",
    location: "请输入工作地点", 
    company: "请输入所在公司",
    title: "请输入职位title",
    description: "请输入详细描述",
    startDate: -1,
    endDate: -1,
  },

  onLoad: function(options){
    var that = this

    //获取是否选择update以及_id
    let list = JSON.parse(options.toupdate)
    that.setData({
      toupdate: list,
      toid: options.toid,  
    })
    console.log(that.data.toupdate);
    console.log(that.data.toid);
    
    

    /*  Reference code
        var X = db.collection(collection1).where({
            'SubjectCategories': RegExp(searchCompany),
            'subject': RegExp(searchName)
            }).field(
                {
                    _id : false,
                    subject:true,SubjectCategories:true
                }
                ).count().then(res =>{console.log(res.total)})


                        db.collection(collection1).where({
            'SubjectCategories': RegExp(searchCompany),
            'subject': RegExp(searchName)
            }).get().then(res =>{that.setData({
                    searchResult: res.data,
                    searchNum:res.data.length
                })
                    console.log(res.data)})
    */
    
    if (that.data.toupdate == true){
      db.collection('Info').doc(that.data.toid).get({
        success:res=>{
          // res.data 包含该记录的数据
          console.log(res.data);
          that.setData({
            duration: res.data.duration,
            location: res.data.location, 
            company: res.data.company, 
            title: res.data.title, 
            description: res.data.description,
          })
        }
      })


      
      // document.getElementById("input").setAttribute("placeholder","新文本内容");
    }
  },

  duration1: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  location1: function (e) {
    this.setData({
      location: e.detail.value
    })
  },
  company1: function (e) {
    this.setData({
      company: e.detail.value
    })
  },
  title1: function (e) {
    this.setData({
      title: e.detail.value
    })
  },
  description1: function (e) {
    this.setData({
      description: e.detail.value
    })
  },
  //上传按钮
  upData: function (e) {
    if (this.data.toupdate == "false"){
        db.collection('Info').add({
        data:{
          ExperienceType: this.data.ExperienceType,
          duration: this.data.duration,
          location: this.data.location,
          company: this.data.company,
          title: this.data.title,
          description: this.data.description,
        },
        success:res=>{
          console.log(res);
        },
        fail:err=>{
          console.log(err);
        }
      })
    }
    else{
      db.collection('Info').doc(this.data.toid).update({
        data:{
          ExperienceType: this.data.ExperienceType,
          duration: this.data.duration,
          location: this.data.location,
          company: this.data.company,
          title: this.data.title,
          description: this.data.description,
        },
        success:res=>{
          console.log(res);
        },
        fail:err=>{
          console.log(err);
        }
      })
      
    }
  },

})
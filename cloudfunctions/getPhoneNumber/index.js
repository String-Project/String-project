// 云函数入口文件
const cloud = require("wx-server-sdk");
const axios = require("axios");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }); // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) =>
  new Promise((resolve, reject) => {
    const {APP_ID} = cloud.getWXContext();
    const APP_SECRET = "todo"

    const { code } = event;
    return new Promise((resolve, reject) => {
      axios
        .get(
          "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" +
            APP_ID +
            "&secret=" +
            APP_SECRET
        )
        .then((res) => {
          // console.log(res);
          let token = res.data.access_token;
          // console.log(token);

          axios
            .post(
              "https://api.weixin.qq.com/wxa/business/getuserphonenumber?access_token=" +
                token,
              {
                code: code,
              }
            )
            .then((res) => {
              resolve(res);
            })
            .catch((err) => {
              reject(err);
            });
        })
        .catch((err) => {
          reject(err);
        });
    });
  });

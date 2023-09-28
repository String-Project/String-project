/**
 * 习惯
 * @param title         习惯名称
 * @param icon          图标
 * @param weekday       每周哪一天需要打卡
 * @param create_time   创建时间
 * @param end_time      结束时间
 * @param share         是否共享
 * @param times         打卡次数
 * @param status        状态(0 正常，-1已删除, 1已完成)
 */

import db from "../util/db.js";

const collection = "Info";

/**
 * 加载全部数据
 */
const loadInfo = (_openid) => {
  return new Promise((resolve, reject) => {
    let map = {
      _openid: _openid,
    };
    db.select(collection, map, 1)
      .then((res) => {
        resolve(res);
      })
      .catch((code, msg) => {
        reject("服务器开小差啦");
      });
  });
};

/**
 * 查找是否存在个人信息
 */
const find = (_openid) => {
  return new Promise((resolve, reject) => {
    let map = {
      _openid: _openid,
    };
    db.select(collection, map, 1)
      .then((res) => {
        resolve(res);
      })
      .catch((code, msg) => {
        reject("服务器开小差啦");
      });
  });
};

/**
 * 添加信息
 */
const add = (data) => {
  return new Promise((resolve, reject) => {
    db.add(collection, {
      name: data.name,
      school: data.school,
      age: data.age,
      career: data.career,
      create_time: new Date(),
      //end_time: (data.end_time == null ? null : new Date(data.end_time)),
      share: data.share,
      times: 0,
      status: 0,
    })
      .then((res) => {
        resolve(res);
      })
      .catch((code, msg) => {
        reject("添加失败");
      });
  });
};

/**
 * 删除习惯
 */
const del = (_openid) => {
  return new Promise((resolve, reject) => {
    db.del(collection, _openid)
      .then((res) => {
        resolve(res);
      })
      .catch((code, msg) => {
        reject("删除失败");
      });
  });
};

/**
 * 更新个人信息
 */
const update = (_openid, data) => {
  return new Promise((resolve, reject) => {
    db.update(collection, _openid, data)
      .then((res) => {
        resolve(res);
      })
      .catch((code, msg) => {
        reject("服务器开小差啦");
      });
  });
};

module.exports = {
  add: add,
  loadInfo: loadInfo,
  del: del,
  find: find,
  update: update,
};

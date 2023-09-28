/**
 * 申请查看个人信息相关
 * @param _apply_id     申请者id
 * @param _apply_type   申请查看信息类别
 * @param icon          图标
 */

import { promises } from "fs";
import db from "../util/db.js";

const collection_ing = "Applying";
const collection_ed = "Applied";

/**
 * 加载申请中数据
 */
const loadApplyingInfo = (_openid) => {
  return new Promise((resolve, reject) => {
    let map = {
      _openid: _openid,
    };
    db.select(collection_ing, map, 1)
      .then((res) => {
        resolve(res);
      })
      .catch((code, msg) => {
        reject("服务器开小差啦");
      });
  });
};

/**
 * 加载已申请数据
 */
const loadAppliedInfo = (_openid) => {
  return new Promise((resolve, reject) => {
    let map = {
      _openid: _openid,
    };
    db.select(collection_ed, map, 1)
      .then((res) => {
        resolve(res);
      })
      .catch((code, msg) => {
        reject("服务器开小差啦");
      });
  });
};

/**
 * 添加申请
 */
const add = () => {
  return new Promise((resolve, reject) => {
    db.add(collection_ing, {
      _openid: _openid,
      _apply_info: data,
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
 * 删除所有申请（后期或许可以增加一键清除按钮）
 */
const delAll = (_openid) => {
  return new Promise((resolve, reject) => {
    db.del(collection_ing, _openid)
      .then((res) => {
        resolve(res);
      })
      .catch((code, msg) => {
        reject("删除失败");
      });
  });
};

/**
 * 删除单个申请
 * @param   _apply_info 封装后单条数据，包含_apply_id, _apply_type
 * @param   _data       申请中总数居
 */
const del = (_openid, _apply_info, data) => {
  for (let i = 0; i < data.length(); i++) {
    if (data[i] == _apply_info) {
      delete data[i];
    }
  }
  //删除后更新
  return new Promise((resolve, reject) => {
    update(_openid, data, collection_ing)
      .then((res) => {
        resolve(res);
      })
      .catch((code, msg) => {
        reject("更新失败");
      });
  });
};

/**
 * 申请通过
 * @param   _apply_info 封装后单条数据，包含_apply_id, _apply_type
 * @param   data_ing       申请已通过总数居
 * @param   data_ed       申请中总数居
 */
const pass = (_openid, _apply_info, data_ing, data_ed) => {
  data_ing.push(_apply_info);
  return new Promise((reslove, reject) => {
    update(_openid, data_ing, collection_ing)
      .then((res) => {
        //删除申请中数据，del函数自带更新表
        del(_openid, data_ed, collection_ed)
          .then((res) => {
            reslove(res);
          })
          .catch((code, msg) => {
            reject("服务器开小差啦");
          });
      })
      .catch((code, msg) => {
        reject("服务器开小差啦");
      });
  });
};

/**
 * 更新申请信息
 */
const update = (_openid, data, collection) => {
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
  loadApplyingInfo: loadApplyingInfo,
  loadAppliedInfo: loadAppliedInfo,
  del: del,
  delAll: delAll,
  update: update,
  pass: pass,
};

/**
 * @description: 缓存封装
 * @param {type} 同异步：  异步 1 || 无   同步：2
 * @param {logoutClear} 退出不清除的信息：清除：1 || 无    不清除：2
 * @param {handleClear} 手动不清除的信息：清除：1 || 无    不清除：2
 * @return:
 */
const prefix = "BC_LOCAL"; // 前缀
let storage = {};
const storeTypes = {
  UserInfo: {
    type: 2,
  },
  Token: {
    type: 2,
  }
};
/**
 * @description: 退出清除不清除不能清除的变量
 * @param {type}
 * @return:
 */
storage.logoutClear = () => {
  for (const funName in storeTypes) {
    if (storeTypes.hasOwnProperty(funName)) {
      const element = storeTypes[funName];
      let isStr = typeof element === "srting";
      let logoutClear =
        typeof storeTypes[funName] === "object" &&
        ((storeTypes[funName].logoutClear &&
          storeTypes[funName].logoutClear === 1) ||
          !storeTypes[funName].logoutClear);

      let isYb =
        typeof storeTypes[funName] === "string" ||
        (typeof storeTypes[funName] === "object" &&
          ((storeTypes[funName].type && storeTypes[funName].type === 1) ||
            !storeTypes[funName].type));

      let isTb =
        typeof storeTypes[funName] === "object" &&
        storeTypes[funName].type &&
        storeTypes[funName].type === 2;

      // 异步&&手动可清除 || 字符串
      if ((logoutClear && isYb) || isStr) {
        uni.removeStorage({
          key: prefix + funName,
        });
        // 同步&&手动可清除
      } else if (logoutClear && isTb) {
        uni.removeStorageSync(prefix + funName);
      }
    }
  }
};
/**
 * @description: 手动清除不清除不能清除的变量
 * @param {type}
 * @return:
 */
storage.handleClear = () => {
  for (const funName in storeTypes) {
    if (storeTypes.hasOwnProperty(funName)) {
      const element = storeTypes[funName];
      let isStr = typeof element === "srting";
      let isHandleClear =
        typeof storeTypes[funName] === "object" &&
        ((storeTypes[funName].handleClear &&
          storeTypes[funName].handleClear === 1) ||
          !storeTypes[funName].handleClear);

      let isYb =
        typeof storeTypes[funName] === "string" ||
        (typeof storeTypes[funName] === "object" &&
          ((storeTypes[funName].type && storeTypes[funName].type === 1) ||
            !storeTypes[funName].type));

      let isTb =
        typeof storeTypes[funName] === "object" &&
        storeTypes[funName].type &&
        storeTypes[funName].type === 2;

      // 异步&&手动可清除 || 字符串
      if ((isHandleClear && isYb) || isStr) {
        uni.removeStorage({
          key: prefix + funName,
        });
        // 同步&&手动可清除
      } else if (isHandleClear && isTb) {
        uni.removeStorageSync({
          key: prefix + funName,
        });
      }
    }
  }
};

// get set remove clear
const storeFactory = (funName, newFunName) => {
  storage[`set${funName}`] = (data) => {
    data = JSON.stringify(data);
    return new Promise((resolve, reject) => {
      uni.setStorage({
        key: newFunName,
        data: data,
        success: () => {
          resolve("success");
        },
        fail: () => {
          reject("fail");
        },
        complete: () => {
          resolve("exec");
        },
      });
    });
  };

  storage[`get${funName}`] = () => {
    return new Promise((resolve, reject) => {
      uni.getStorage({
        key: newFunName,
        success: (res) => {
          resolve(JSON.parse(res.data));
        },
        fail: () => {
          reject("fail");
        },
        complete: () => {
          resolve("exec");
        },
      });
    });
  };

  storage[`remove${funName}`] = () => {
    return new Promise((resolve, reject) => {
      uni.removeStorage({
        key: newFunName,
        success: () => {
          resolve("success");
        },
        fail: () => {
          reject("fail");
        },
        complete: () => {
          resolve("exec");
        },
      });
    });
  };
};

const storeSyncFactory = (funName, newFunName) => {
  storage[`set${funName}`] = (data) => {
    uni.setStorageSync(newFunName, data);
  };

  storage[`get${funName}`] = () => {
    return uni.getStorageSync(newFunName);
  };

  storage[`remove${funName}`] = () => {
    return uni.removeStorageSync(newFunName);
  };
};
// 循环添加存储方法(包括local session)
for (let funName in storeTypes) {
  let isYb =
    typeof storeTypes[funName] === "string" ||
    (typeof storeTypes[funName] === "object" &&
      ((storeTypes[funName].type && storeTypes[funName].type === 1) ||
        !storeTypes[funName].type));

  // 异步
  if (isYb) {
    storeFactory(funName, prefix + funName);
  } else {
    //   同步
    storeSyncFactory(funName, prefix + funName);
  }

  console.log(funName);
  //   storeFactory(funName, prefix + storeTypes[funName]);
}
console.log(storage, "storage");
export default storage;

/*
 * @Author: your name
 * @Date: 2021-07-26 20:18:36
 * @LastEditTime: 2021-07-26 21:43:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /starch-qa/common/commonFunc.js
 */
exports.install = function (Vue, options) {
  Vue.prototype.$debounce = function (methods, info, time) {
    // 防止处理多次点击
    // methods是需要点击后需要执行的函数， info是点击需要传的参数
    let that = this;
    if (that.noClick) {
      // 第一次点击
      that.noClick = false;
      if (info && info !== "") {
        // info是执行函数需要传的参数
        methods(info);
      } else {
        methods();
      }
      setTimeout(() => {
        that.noClick = true;
      }, time);
    } else {
      // 这里是重复点击的判断
    }
  };

  Vue.prototype.$throttle = function (func, delay) {
    // 节流
    var prev = Date.now();
    return function () {
      var context = this;
      var args = arguments;
      var now = Date.now();
      if (now - prev >= delay) {
        func.apply(context, args);
        prev = Date.now();
      }
    };
  };

  Vue.prototype.$transform = function (value) {
    var param = {};
    var k = 10000,
      sizes = ["", "万", "亿", "万亿"],
      i;
    if (value < k) {
      param.value = value;
      param.unit = "";
    } else {
      i = Math.floor(Math.log(value) / Math.log(k));

      param.value = (value / Math.pow(k, i)).toFixed(1);
      param.unit = sizes[i];
    }
    return param.value + param.unit;
  };
};

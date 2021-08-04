/*
 * @Author: your name
 * @Date: 2021-07-19 16:00:15
 * @LastEditTime: 2021-07-19 16:02:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /starch-qa/main.js
 */
import Vue from "vue";
import App from "./App";
import uView from "uview-ui";
// 缓存简单封装，注意是为了统一管理
import storage from "@/common/localStorage";
// 接口拦截封装
import httpInterceptor from "@/common/api/http.interceptor.js";
import httpApi from "@/common/api/http.api.js";
// 挂载到vue上的全局方法
import commonFunc from "@/common/commonFunc.js";
// vuex
import store from "./store";
// uview 分享
let mpShare = require("uview-ui/libs/mixin/mpShare.js");
// 所有自定义分享拦截
let mpShareOwn = require("@/mixins/mpShare.js");


Vue.mixin(mpShare);
Vue.mixin(mpShareOwn);
Vue.use(uView);
Vue.use(commonFunc);
Vue.config.productionTip = false;
App.mpType = "app";

const app = new Vue({
  ...App,
  store,
});
Vue.use(httpInterceptor, app);
Vue.use(httpApi, app);
app.$mount();

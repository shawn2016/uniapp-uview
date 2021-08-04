/*
 * @Author: your name
 * @Date: 2021-07-17 17:09:30
 * @LastEditTime: 2021-07-26 18:04:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /aq-uniapp/store/index.js
 */
//引用Vuex
import Vue from "vue";
import Vuex from "vuex";
import localStorageObj from "../common/localStorage";
Vue.use(Vuex);

//实例store对象
const store = new Vuex.Store({
	state: {
		token: localStorageObj.getToken() || "",
		userInfo: localStorageObj.getUserInfo() || {},
	},
	mutations: {
		setToken(state, payload) {
			state.token = payload.token;
		},
		setUserInfo(state, payload) {
			state.userInfo = payload.userInfo;
		},

	},
});

//导出store对象
export default store;

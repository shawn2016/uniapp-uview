/*
 * @Author: your name
 * @Date: 2020-11-25 14:59:12
 * @LastEditTime: 2021-07-17 16:18:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /uview-uniapp/common/http.api.js
 */
// /common/http.api.js

// 如果没有通过拦截器配置域名的话，可以在这里写上完整的URL(加上域名部分)
// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
// https://uviewui.com/js/http.html#%E4%BD%95%E8%B0%93%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%EF%BC%9F
const prefix = "/v1";
const install = (Vue, vm) => {
	// 此处没有使用传入的params参数
	// 访问小程序
	let login_log = (params = {}, options) => {
		return vm.$u.post(`${prefix}/login/log`, params, options);
	};




	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	vm.$u.api = {
		login_log,
	};
};

export default {
	install,
};

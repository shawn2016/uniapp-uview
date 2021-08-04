/*
 * @Author: your name
 * @Date: 2020-11-25 11:12:17
 * @LastEditTime: 2021-07-27 23:23:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /uview-uniapp/fecth/index.js
 */
// /common/http.interceptor.js
import localStorageObj from "@/common/localStorage";
import config from '@/config'
// 这里的vm，就是我们在vue文件里面的this，所以我们能在这里获取vuex的变量，比如存放在里面的token变量
const install = (Vue, vm) => {
	// 此为自定义配置参数，具体参数见上方说明
	Vue.prototype.$u.http.setConfig({
		// #ifdef  H5
		baseUrl: "/starch-api",
		// #endif
		// #ifdef MP-WEIXIN
		// baseUrl: "https://er-gw.vbillbank.com/starch-api",
		baseUrl: config.apiUrl,
		// #endif

		loadingText: "loading...",
		// 设置为json，返回后会对数据进行一次JSON.parse()
		dataType: "json",
		timeout: 1,
		showLoading: false, // 是否显示请求中的loading
		loadingTime: 800, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
		originalData: false, // 是否在拦截器中返回服务端的原始数据
		loadingMask: true, // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
		// 配置请求头信息
		header: {
			"content-type": "application/json;charset=UTF-8",
		},
		// ......
	});

	// 请求拦截，配置Token等参数
	Vue.prototype.$u.http.interceptor.request = (config) => {
		config.header.token = localStorageObj.getToken() || '';
		console.log(config, "拦截");
		// 最后需要将config进行return
		return config;
		// 如果return一个false值，则会取消本次请求
		// if(config.url == '/user/rest') return false; // 取消某次请求
	};

	// 响应拦截，判断状态码是否通过
	Vue.prototype.$u.http.interceptor.response = (res) => {
		console.log(res, '00000000000000')

		//    SUCCESS("0000", name + "成功"),
		// ERROR("9999", name + "系统异常"),
		// VALID("9998", name + "参数不合法"),
		// REPEAT("9997", name + "重复提交"),
		// UPDATE_ERROR("9901", name + "更新异常"),
		// UNFIND_ERROR("9902", name + "未找到数据"),
		// UNIQUE_ERROR("9903", name + "数据已经存在"),
		// DATA_OUTDATED_ERROR("9904", name + "请获取最新数据"),
		// HTTP_ERROR("9905", name + "网络异常"),
		// AUTH_ERROR("9904", name + "权限异常"),
		// UNFIND_GROUP_ERROR("9906", name + "未找到群数据"),

		switch (res.code) {
			case '9999':
			case '9998':
			case '9997':
			case '9901':
			case '9902':
			case '9903':
			case '9904':
			case '9905':
			case '9906':
				vm.$u.toast(res.msg);
				return false;
			case '1007':
				// 切群
				break;
			case '1008':
				// 加群
				vm.$u.route({
					url: "/pages/home/addGroup/index",
					type: "redirectTo",
				});
				break;
			case '9908':
				uni.login({
					provider: "weixin",
					success: async (codeRes) => {
						let res2 = await vm.$u.api.login_wxlogin({
							jsCode: codeRes.code,
						});
						if (res2.code === "0000" && res2.result && res2.result.token) {
							// 缓存token
							localStorageObj.setToken(res2.result.token);
							vm.$store.commit("setLogin", {
								login: true
							});
							vm.$store.commit("setToken", {
								token: res2.result.token
							});
							if (localStorageObj.getCurrentChat() &&
								localStorageObj.getCurrentChat().id) {
								await vm.$u.api.login_selectChat({
									chatId: localStorageObj.getCurrentChat().id,
								});
								wx.reLaunch({
									url: "/pages/home/home/index",
								})
							} else {
								vm.$u.route({
									url: "/pages/home/addGroup/index",
									type: "redirectTo",
								})

							}


						}
					}
				});
				return false;
			default:
				return res;
		}



	};
};

export default {
	install,
};

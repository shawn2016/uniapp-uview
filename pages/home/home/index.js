/*
 * @Author: your name
 * @Date: 2020-08-18 21:45:54
 * @LastEditTime: 2021-07-26 17:34:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /aq-uniapp/pages/home/home/index.js
 */
export default {
	name: "home",
	components: {},
	data() {
		return {
			show: true,
			demoList: [1, 2, 3, 4, 5],
			loading: true,
			page: 1,
			content: [],
			status: "loadmore",
			pullUpOn: false,
			loadText: {
				loadmore: "上拉加载更多",
				loading: "数据加载中",
				nomore: "没有更多了~",
			},
		};
	},
	onLoad(options) {},

	methods: {
		async getChatNum() {
			const {
				code,
				result
			} = await this.$u.api.login_chat()
			if (result.chats.length > 1) {
				this.showChangeGroup = true
			} else {
				this.showChangeGroup = false
			}
		},
		goDesc() {
			this.$u.route({
				url: '/pages/home/homeDesc/index'
			})
		},
		getUserProfile(e) {
			const {
				errMsg
			} = e.detail;
			const _uni = uni;
			const _this = this;
			_this.visible = true;
			uni.getUserProfile({
				lang: "zh_CN",
				desc: "用于淀粉问答用户信息",
				success: async (res) => {
					console.log(res);
					const {
						msg,
						code
					} = await this.$u.api.login_uploadInfo(
						res.userInfo
					);
					if (code === "0000") {
						this.$store.commit("setUserInfo", {
							userInfo: res.userInfo,
						});
						localStorageObj.setUserInfo(res.userInfo);
					} else {
						this.$u.toast(msg);
					}
				},
				fail: (err) => {
					console.log(err, "------------------");
					uni.showModal({
						confirmColor: "#395DF0",
						title: "温馨提示",
						showCancel: false,
						content: "您已拒绝授权，请重新点击并授权！",
						confirmText: "确定",
					});
				},
			});
		},

		async getList() {
			this.status = "loading";
			let obj = {
				page: this.page,
				size: 20,
			};
			if (
				localStorageObj.getCurrentChat() &&
				localStorageObj.getCurrentChat().id
			) {
				obj.chatId = localStorageObj.getCurrentChat().id;
			}
			let {
				code,
				result
			} = await this.$u.api
				.question_list(obj, {
					showLoading: false,
				})
				.catch(() => {
					uni.hideLoading();
					uni.stopPullDownRefresh();
				});
			uni.hideLoading();
			uni.stopPullDownRefresh();
			console.log(code, result);
			if (code === "0000") {
				this.chatName = result.chatName;
				this.ownList =
					(result && result.ownQuestionList && result.ownQuestionList) || [];
				const data =
					(result &&
						result.groupQuestionList &&
						result.groupQuestionList.list) || [];
				if (data.length > 0) {
					this.loading = false;
					if (this.page === 1) {
						this.content = data;
						console.log(this.content);
					} else if (data.length > 0) {
						this.content = [...this.content, ...data];
					}
					this.pullUpOn = false;
					this.status = "loadmore";
				} else {
					this.pullUpOn = true;
					this.status = "nomore";
				}
			}
		},
	},

	// 刷新页面
	onPullDownRefresh() {
		this.page = 1;
		this.content = []
		this.ownList = []
		setTimeout(() => {
			this.getList();
		})

	},
	// 触发底部
	onReachBottom() {
		console.log("12133");
		if (this.pullUpOn) return;
		this.loading = true;
		this.page++;
		setTimeout(() => {
			this.getList();
		});
	},
};

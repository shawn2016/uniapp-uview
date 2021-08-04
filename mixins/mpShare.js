module.exports = {
	onLoad() {},
	onShareAppMessage(options) {
		var that = this;
		// 设置菜单中的转发按钮触发转发事件时的转发内容
		let path = '/pages/home/home/index'
		let shareObj = {
			title: "uniapp-uview", // 默认是小程序的名称(可以写slogan等)
			path, // 默认是当前页面，必须是以‘/’开头的完整路径
			imageUrl: '', //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
			success: function(res) {
				// 转发成功之后的回调
				console.log('分享成功')

			},
			fail: function(res) {
				console.log('分享失败')

			},

		};
		// 来自页面内的按钮的转发
		if (options.from == 'button') {
			var eData = options.target.dataset;
			let objectId = ''
			let type = ''
			switch (eData.type) {
				case 'getAnswer':
					shareObj.imageUrl = '/static/images/getAnswer.png'
					shareObj.title = eData.title;
					objectId = eData.id;
					type = 4
					shareObj.path = eData.path;
					break;
					break;
				default:
					break;
			}
		} else {
			let chatsId = ''
			if (this.$store.state.CurrentChat.id) {
				chatsId = chatsId = this.$store.state.CurrentChat.id
			}
			shareObj.imageUrl = '/static/images/share.png'
			shareObj.path = (path + (chatsId ? `?chatsId=${chatsId}` : ''))
		}
		// 返回shareObj
		return shareObj;
	},
	// #ifdef MP-WEIXIN
	onShareTimeline() {
		return this.$u.mpShare
	}
	// #endif
}

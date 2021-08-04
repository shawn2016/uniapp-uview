<!--
 * @Author: your name
 * @Date: 2021-07-15 16:50:39
 * @LastEditTime: 2021-07-27 16:01:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /aq-uniapp/components/comp-MainCard/index.vue
-->
<style lang="scss">
	@import "./index.scss";
</style>
<template>
	<view class="comp-popup" v-if="configAttr">
		<u-popup safeAreaInsetBottom v-model="show" width="577" :mask-close-able="false" mode="center">
			<view class="content-box">
				<image v-if="configAttr&&configAttr.type==='success'" class="tips" mode="widthFix"
					src="/static/images/getsuccess.png">
				</image>
				<image v-else class="tips" mode="widthFix" src="/static/images/tips.png"></image>
				<view class="title">
					{{configAttr&&configAttr.title || ' '}}
				</view>
				<view class="subtitle" :style="{fontSize:configAttr&&configAttr.type==='success'?'30rpx':'26rpx'}">
					<u-parse :html="configAttr&&configAttr.subtitle"></u-parse>
				</view>
				<image v-if="configAttr&&configAttr.type==='ios'" show-menu-by-longpress class="qrocde-img"
					mode="widthFix" src="/static/images/ios.png">
				</image>
				<image v-if="configAttr&&configAttr.type==='android'" show-menu-by-longpress class="qrocde-img"
					mode="widthFix" src="/static/images/android.png">
				</image>
				<image v-if="configAttr&&configAttr.type==='wx'" show-menu-by-longpress class="qrocde-img"
					mode="widthFix" src="/static/images/wx.png">
				</image>
				<image v-if="configAttr&&configAttr.type==='success'" @tap="goDownload" class="success-btn"
					mode="widthFix" src="/static/images/btn.png">
				</image>
			</view>
			<view class="close-box" @tap="close" v-show="showClose">
				<image src="/static/images/popup_close@2x.png" mode="widthFix" class="popup_close"></image>
			</view>
		</u-popup>

	</view>
</template>

<script>
	import config from '@/config'
	export default {
		name: "comp-popup",
		props: {
			configAttr: {
				default: () => {},
				type: Object
			},

			show: {
				default: false,
				type: Boolean
			}
		},
		data() {
			return {
				customStyle: {
					backgroundColor: 'red'
				},
				config,
				isIos: uni.getSystemInfoSync().platform == 'ios',
				showClose: false
			};
		},
		mounted() { // 必须写在 mounted 里面
		},
		watch: {
			show(val) {
				setTimeout(() => {
					console.log(val, this.config)
					this.showClose = val
				}, 300)
			}
		},
		methods: {
			goDownload() {
				let url = ''

				url = encodeURIComponent(this.config.androidUrl)
				this.$u.route({
					url: '/pages/webView/download/index?url=' + url
				})
			},
			close() {
				this.$emit('close')
			}
		},
	};
</script>

<script>
	import Vue from 'vue'
	export default {
		onLaunch: function() {
			//获取系统的基本信息
			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif
					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif		

					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			});
			let url = self.location.href;
			let index = url.indexOf("/");
			let head = url.substring(index + 2, -1);
			let domain = head + window.location.host;
	if (window.innerWidth <= 720) {
		//移动端        
	
	} else {
		//pc端 
		 window.location.href = domain + "/index.html";
	}
	

		},
		onShow: function() {

			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}

	}
</script>

<style>
	@import "colorui/animation.css";
	@import "colorui/main.css";
	@import "colorui/icon.css";

	.page {
		width: 100vw;
		height: 100vh;
		background-color: #398563;
		color: white;
	}

	.boxes {
		height: 70vh;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		display: flex;
		flex-direction: row;
		justify-content: center;
		position: relative;
		z-index: 0;

	}

	.box {
		width: 88.8vw;
		height: 100%;
		position: relative;

	}

	.bar {
		width: 1.5vw;
		height: 100%;
		position: absolute;
	}

	.left_bar {
		left: 0;
	}

	.right_bar {
		float: right;
		right: 0;
	}

	.barImg {
		max-width: 100%;
		max-height: 100%;
	}

	.barBox {

		width: 100%;
		height: 35%;
	}

	.topBar {
		position: absolute;
		top: 4.3%;
	}

	.bottomBar {
		position: absolute;
		bottom: 0;
	}

	.clickEffict:active {
		transform: scale(0.9);
	}

	.buttomImg {
		width: 40vw;
		height: 25vh;
		position: absolute;
		bottom: 0;
		float: right;
		right: 0;
		z-index: 0;

	}

	.topImg {
		width: 20vw;
		height: 12vh;
		position: absolute;
		top: 2vh;
		z-index: 0;

	}
</style>

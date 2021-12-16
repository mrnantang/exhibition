<template>
	<view class="page">
		
			<image  @click="clickBack" class="backImg animation-scale-top clickEffict" src="../../static/img/fanhui2.png" mode="scaleToFill"></image>
		
		 <scroll-view scroll-y="true" class="boxesB">
			<view class="boxesB">
				<web-view src="../../static/word/desc.html"></web-view>

			</view>
		</scroll-view>

	</view>
</template>

<script>
	import Heade from '../Com/Head.vue'
	export default {
		components: {
			Heade,
		},

		data() {
			return {
				url: '',
				title: this.CON.CON.title,
				PopType: 0,
				hackReset: true,
				item: [],
				status: false,
				uploadStatus: false,
				showUpload: false,
				language: '',
			}

		},
		onShow() {
			this.hackReset = false;
			this.$nextTick(() => {
				this.hackReset = true;
			});

		},
		mounted() {

			window.addEventListener('message', (e) => {
				console.log(e.data.data);
				// this.upload();
				switch (e.data.data.type) {
					case 'close':
						this.upload();
						break;
				}

			}, false);
			var lan = '';
			uni.getStorage({
				key: 'language',
				success: (res) => {
					this.language = res.data;
					console.log();

				},
				fail() {

					uni.setStorage({
						key: 'language',
						data: 'china',
						success: () => {
							this.language = 'china';

						}
					});
				}
			});
			this.$nextTick(() => {

				this.item = this.CON.CON.index.item;

			})


		},
		methods: {

			clickBack() {
			
			
			uni.navigateTo({
				url:"/pages/index/happy",
				animationType:'slide-in-left'
			})
				
			
			
			
			}

		}




	}
</script>

<style scoped>
	.boxesB {
		width: 100%;
		height: 100vh;
		position: absolute;
		top: 0;
		
		background-color: white;


	}
	.backImg{
		width: 10vw;
		height: 10vw;
		position: absolute;
		z-index: 99;
		top: 0;
	
		
	}
</style>

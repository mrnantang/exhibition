<template>
	<view class="header">
		<view class="head_item head_back">
			<view class="back" v-if="isShow">
				<image @click="clickBack" class="backImg animation-scale-top clickEffict" src="../../static/img/fanhui2.png" mode="scaleToFill"></image>
			</view>
		</view>
		<view class="head_item head_top">
			<view class="english_but" @click="clickLanguage()">
				<view class="lan_color" :class="{'language':language=='china'}">
					中文
				</view>
				/
				<view class="lan_color" :class="{'language':language=='english'}">
					English
				</view>

			</view>
		</view>
		<view class="head_item head_bottom" >
			<image class="titleImg" :src='imgUrl' mode="aspectFit"></image>
		</view>
	</view>


</template>

<script>
	export default {
		name: "Header",
		props: ['url', 'isBack', 'type', 'showType'],
		data() {
			return {
				showT:this.showType,
				showBj: "../../static/img/header.png",
				language: "",
				imgUrl: this.url,
				isShow: this.isBack,
				pageType: this.type
			}

		},
		mounted() {
			uni.getStorage({
				key: 'language',
				success: (res) => {
					this.language = res.data;
				},
				fail() {
					console.log("dx");
					uni.setStorage({
						key: 'language',
						data: 'china',
						success: function() {
							console.log('success');
						}
					});

				}
			});
			console.log("x"+this.showT);
			if(this.showT!=undefined){
				this.showBj="";
			}

		},
		methods: {
			clickLanguage() {
				console.log("切换");
				if (this.language != 'china') {
					this.language = 'china';
				} else {
					this.language = 'english';
				}
				uni.setStorage({
					key: 'language',
					data: this.language,
					success: function() {
						console.log('success');
					}
				});
				this.CON.CON.language = this.language;
				this.$emit('language', this.language);
			},
			BackMethod(){
					console.log("点击返回");
					
			},
			clickBack() {
			
				if (this.pageType != '') {
					uni.navigateTo({
						url: this.pageType,
						animationType: 'pop-in',
						animationDuration: 500,
						refresh: true,

					});

				} else {
					uni.navigateBack({
						animationType: 'pop-out',
						delta: 2,
						animationDuration: 200,
						refresh: true,
						success: function() {
							beforePage.onLoad();
						}
					});
				}



			}



		}



	}
</script>

<style scoped>
	.header {
		height: 18vh;
		width: 100vw;
		z-index: 1;
		/* 		background-image: url(../../static/img/header.png); */
		background-repeat: no-repeat;
		background-size: 100% 100%;

		display: flex;
		align-items: center;
		position: relative;
		flex-direction: column;
	}

	.lan_color {
		font-size: 24rpx;
		color: white;
	}

	.language {
		color: red;
	}

	.head_top {
		height: 3.4vh;
		z-index: 1;
		position: relative;
		

	}

	.head_back {
		height: 5vh;
		position: relative;
		z-index: 99;
		margin-top: 0.5vh;

	}

	.head_item {

		width: 88.8vw;
		display: flex;



	}

	.english_but {
		width: 24vw;
		height: 100%;
		border: 1px solid white;
		position: absolute;
		float: right;
		right: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 2vw;
	}

	.head_bottom {
		height: 9.2vh;
		z-index: 0;
		position: absolute;
		bottom: -2vh;
		
	}

	.titleImg {
		margin-left: 4vw;
		max-width: 100%;
		max-height: 100%;
	}

	.back {
		width: 9.6vw;
		position: absolute;
		float: right;
		right: 0;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;


	}

	.backImg {

		height: 100%;
	}
</style>

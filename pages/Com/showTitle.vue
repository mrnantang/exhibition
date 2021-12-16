<template>
	<view class="videoBox">
		<view class="mask">

		</view>
		<view :class="{'titleBox':coloseT1==0,'titleBox1':coloseT1==1}">
			<scroll-view class="title" scroll-y="true">
				<view class="titleDsc" v-html="content">

				</view>
			</scroll-view>
			<image @click="close()" class="close clickEffict" src="../../static/img/close2.png" mode=""></image>
			<image @click="download" class="download clickEffict" v-if="type!='0'" src="../../static/img/download.png" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'titlePlay',
		props: ['wenzi', 'type1','coloseType'],
		data() {
			return {
				type: this.type1,
				content: this.wenzi,
				coloseT1:this.coloseType,
				language: 'china'
			}
		},
		mounted() {
			console.log(this.coloseType);
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
							this.language = 'china';

						}
					});
				}
			});
			this.xuanzhe();
		},
		methods: {
			close() {

				this.$emit("Vclose", 'title');



			},
			xuanzhe() {

				this.content = this.wenzi;
				this.type = this.type1;


			},
			download() {
				//this.desc=this.CON.CON.wenzi.download[this.language];
				window.location.href = this.CON.CON.wenzi.download.url;
			}

		}

	}
</script>

<style scoped>
	.videoBox {
		width: 100vw;
		height: 100vh;
		position: absolute;
		z-index: 99;
		display: flex;
		align-items: center;
		justify-content: center;

	}

	.mask {
		width: 100vw;
		height: 100vh;
		background-color: #000000;
		opacity: 0.2;
		position: absolute;
		z-index: 0;
	}

	.titleBox {
		z-index: 1;
		width: 88%;
		height: 75%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-size: 100% 100%;
		position: relative;
		background-image: url(../../static/img/alert3.png);
	 	box-shadow: 0em 0em 20px gray;
		border-radius: 18rpx;
		text-align: justify;
	
	}
	

	.titleBox1 {
		z-index: 1;
		width: 66%;
		height: 51.6%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-size: 100% 100%;
		position: relative;

		background-color: white;
		border-radius: 18rpx;

		text-align: justify;

	}


	.close {
		position: absolute;
		float: right;
		right: 0;
		top: 0;
		width: 100rpx;
		height: 100rpx;
		z-index: 999;

	}


	.download {
		margin-top: 5%;
		width: 10vw;
		height: 10vw;
		z-index: 999;
	}

	.title {
		
		color: black;
		width: 80%;
		height: 70%;
			font-size: 4vw;

	}

	.titleDsc {
		text-align: justify;

		/* WORD-WRAP: break-word; */
		/* TABLE-LAYOUT: fixed; */
		/* word-break: break-all; */
		/* 	text-align: */
	}
</style>

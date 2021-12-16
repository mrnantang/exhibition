<template>

	<view class="lunboBox">
		<view class="box">
			<view class="right" @click="click_right()">
				<image class="icon clickEffict" src="../../static/img/rightl.png" mode=""></image>
			</view>
			<view class="left clickEffict" @click="click_left()">
				<image class="icon" src="../../static/img/left1.png" mode=""></image>
			</view>

			<scroll-view class="content" scroll-x="true" :scroll-left="left" show-scrollbar=false scroll-with-animation=true
			 @scrolltolower="maxLeft()">
				<view v-for="(item,index) in item" class="item clickEffict" @click="xuanzhe(item,index)">

					<view class="item-box">
						<view class="item-box-box" v-if="selectI!=index" :style="{backgroundImage:'url('+item.url1+')'}" :class="{'fontColr':selectI==index}">
							<view class="title-box-box">
								{{item.name[language]}}
							</view>

						</view>
						<view class="item-box-box" v-if="selectI==index" :style="{backgroundImage:'url('+item.url1+')'}" :class="{'fontColr':selectI==index}">

							<view class="title-box-box">
								{{item.name[language]}}
							</view>

						</view>
						<view class="item-arrow" v-if="selectI==index">
							<view class="item-arrow-box">

							</view>
						</view>

					</view>
				</view>
			</scroll-view>





		</view>

		<view class="box11">

			<view class="box-contaner">
				<scroll-view class="desc" scroll-y="true" :class="{'desc1':videoN==0}">
					<web-view :src="contaner.desc[language]" @message="message"></web-view>

				</scroll-view>

			<!-- 	<scroll-view class="videoLisrt" scroll-x="true">
					<view class="video-item clickEffict" v-for="(video,index) in contaner.video" @click="playVideo(video.videoUrl)"
					 :class="{'cover-item':index!=0}">
						<view class="video-cover">
							<image class="icon1" :src="video.cover" mode="widthFix"></image>
						</view>
						<view class="video-name">
							{{video.name[language]}}
						</view>
					</view>

				</scroll-view>

 -->


			</view>

		</view>








	</view>

</template>

<script>
	export default {
		name: 'LunBo',
		props: ['imgArr','itemData'],
		data() {

			return {
				left: 0,
				status: true,
				contaner: "",
				selectI: 0,
				language: this.CON.CON.language,
				videoN: 0,
				item: this.itemData
			}



		},
		mounted() {
			
			window.addEventListener('message', (e)=> {           
			   
				this.playVideo(e.data.data);
			},false);
			console.log("xx"+JSON.stringify(this.item));
			this.xuanzhe(this.item[0], 0);
		},
		methods: {
			click_left() {
				if (this.left >= 100) {
					this.left = this.left - 150;
				}
				this.status = true;
			},
			xuanzhe(data, index) {
				this.selectI = index;
				this.contaner = data;
				this.videoN = data.video.length;


			},
			click_right() {

				if (this.status) {
					this.left = this.left + 150;

				}

			},
			maxLeft(e) {
				this.status = false;

			},
			fangdaImg() { //放大图片
				uni.showToast({
					image: '../../static/img/i.png',
					title: '暂只支持中文',
					duration: 2000
				});

			},
			message(event) {
				console.log('接收到消息' + event.detail.data);
			},
			playVideo(data) {

				this.$emit('VplayVideo', data);


			}


		}




	}
</script>

<style scoped>
	.box {
		width: 100%;
		height: 22%;
		display: flex;
		flex-direction: row;
		position: relative;

		z-index: 99;
	}

	.left,
	.right {
		width: 8%;
		height: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 999;
	}

	.right {
		position: absolute;
		float: right;
		right: 0;
	}

	.content {
		width: 84%;
		height: 100%;
		overflow-x: hidden;
		display: block;
		white-space: nowrap;



	}
	.icon {
		max-width: 80%;
		max-height: 80%;
	}

	.icon1 {
		max-width: 100%;
		max-height: 100%;
	}

	.item {

		width: 48%;
		height: 100%;
		margin-left: 2%;
		display: inline-block;
		vertical-align: middle;
	}

	.item-box {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;


	}

	.cover-img1 {
		position: absolute;
		top: 0;
	}

	.item-box-box {
		position: relative;
		width: 100%;
		height: 57%;
		font-size: 2.5vw;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #03FAFB;
		background-size: 100% 100%;
		white-space: normal;


	}

	.fontColr {
		color: white;
	}

	.item-img {
		max-width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		position: absolute;
	}

	.lunboBox {
		margin-top: 1%;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;

	}

	.box11 {
		height: 82%;
		display: flex;
		flex-direction: column;
		background-color: white;
		margin-top: -3%;


	}

	.item-arrow {
		margin-top: 5%;
		height: 28%;
		width: 100%;
		display: flex;

	}


	.item-arrow-box {
		margin: auto;
		width: 0;
		height: 0;
		border-left: 50rpx solid transparent;
		border-right: 50rpx solid transparent;
		border-bottom: 80rpx solid white;
	}

	.box-contaner {
		width: 96%;
		height: 94%;
		margin: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		border: 1px solid blue;


	}

	.biaoti {
		width: 96%;
		margin-top: 2%;
		font-size: 4vw;
		font-weight: 600;
		color: #1C6984;
	}

	.desc {

		margin-top: 1%;
		width: 96%;
		height: 62%;
		color: black;

	}

	.desc1 {
		margin-top: 1%;
		width: 96%;
		height: 98%;
		color: black;
	}

	.videoLisrt {
		margin-top: 1%;
		width: 96%;
		height: 34%;
		white-space: nowrap;

	}

	.video-item {
		width: 48%;
		height: 100%;
		display: inline-block;


	}

	.video-cover {
		width: 100%;
		height: 80%;
		display: flex;
		align-items: center;
		justify-content: center;

	}

	.video-name {
		margin-top: 1%;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 18%;
		color: #1C6984;
	}

	.cover-item {
		margin-left: 4%;
	}

	.title-box-box {
		display: flex;
		text-align: center;
		align-items: center;
		justify-content: center;
		width: 80%;
		height: 80%;
		font-size: 3vw;
	}
</style>

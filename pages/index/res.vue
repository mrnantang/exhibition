<template>
	<view class="page">
		<ShowTitle @Vclose="closePop" v-if="status" :wenzi='desc' :type1='type1'></ShowTitle>
		<PlayVideo v-if='showVideo' @Vclose="closePop" class="playVideo" :url='videoUrl'></PlayVideo>
		<PlayImage v-if='showImage' @Vclose="closePop" class="playVideo" :url='imgUrl'></PlayImage>

		<image class="topImg" src="../../static/img/topImg.png" mode="heightFix"></image>

		<Heade :url='url' :isBack='true' :type='pageType' @language='changeLangae'> </Heade>
		<view class="boxMask">

		</view>
		<view class="boxes">
			<view class="box1">
				<view class="left_bar bar">
					<view class="barBox topBar">
						<!--<image class="barImg" src="../../static/img/left-bar.png" mode=""></image> -->
					</view>
				</view>

				<view class="middle-box">
					<view class="box-content">

						<view class="box-box animation-scale-up"  v-for="(item,index) in item" :style="{'width':item.p.w+'vw','height':item.p.h+'vw','left':item.p.x+'rpx','top':item.p.y+'rpx','z-index':item.p.index}"
						 @click="get_into(item.videoUrl,item.path)">
							<image class="box-img1" :src="item.url" mode="aspectFit" :style="{'height':item.p.h+'vw'}"></image>
						</view>

						<view class="itemT" :style="{'top':item[2].p.y+'rpx','z-index':item[0].p.index}" >
							<scroll-view scroll-y="true" :style="{'height':item[0].p.h-4+'vw'}" show-scrollbar='true'>
								<view v-html="res[0].title[language]"></view>
							</scroll-view>
						
						</view>
						<view class="itemT" :style="{'top':item[0].p.y+'rpx','z-index':item[1].p.index}">
							<scroll-view scroll-y="true" :style="{'height':item[0].p.h-4+'vw'}" show-scrollbar='true'>
								<view v-html="res[1].title[language]"></view>
							</scroll-view>
						</view>
						<view class="itemT" :style="{'top':item[1].p.y+'rpx','z-index':item[2].p.index}">
							<scroll-view scroll-y="true" :style="{'height':item[0].p.h-4+'vw'}" show-scrollbar='true'>
								<view v-html="res[2].title[language]"></view>
							</scroll-view>
						</view>
						<!-- 	</view> -->
					</view>
				</view>
				<view class="right_bar bar">
					<view class="barBox bottomBar">
						<!-- <image class="barImg " src="../../static/img/left-bar.png" mode=""></image> -->
					</view>
				</view>
			</view>

		</view>
		<image class="buttomImg" src="../../static/img/xiongmao.png" mode="heightFix"></image>

	</view>

</template>

<script>
	import Heade from '../Com/Head.vue'
	import Foot from '../Com/foot.vue'
	import LunBo from '../Com/lunBo.vue'
	import PlayVideo from '../Com/playVideo.vue'
	import PlayImage from '../Com/Image.vue'
	import ShowTitle from '../Com/showTitle.vue'
	export default {
		components: {
			Heade,
			Foot,
			LunBo,
			PlayVideo,
			PlayImage,
			ShowTitle
		},

		data() {
			return {
				url: '../../static/img/res.png',
				title: this.CON.CON.title,
				showVideo: false,
				showImage: false,
				imgUrl: '',
				status: false,
				type1: 0,
				language: this.CON.CON.language,
				res: this.CON.CON.wenzi.res,
				pageType: '/pages/index/index',
				item: this.CON.CON.res.item,
				status: false,
				videoUrl: '',
				desc: this.CON.CON.wenzi,
				imgArr: this.CON.CON.res.imgArr,

			}

		},
		mounted() {
			uni.getStorage({
				key: 'language',
				success: (res) => {
					this.language = res.data;
				},
				fail() {
					uni.setStorage({
						key: 'language',
						data: 'china',
						success: function() {
							this.language = "china";
							console.log('success');
						}
					});
				}
			});
			this.$nextTick(() => {
				this.item = this.CON.CON.res.item;
				this.res = this.CON.CON.wenzi.res;

			})
			// this.item=this.CON.CON.res.item;
			// this.res=this.CON.CON.wenzi.res;
		},
		methods: {
			click_span() {
				if (!this.status) {
					this.status = true;
				} else {
					this.status = false;
				}
			},
			closePop(type) {
				this.type1 = 0;
				switch (type) {
					case 'video':
						this.showVideo = false;
						this.videoUrl = false;

						break;
					case 'img':
						this.showImage = false;
						this.imgUrl = false;
						break;
					case 'title':
						this.status = false;
						break;

				}


			},
			get_into(videoUrl, path) {
				console.log("path " + videoUrl);
				switch (path) {
					case 1:
						this.type1 = path;
						this.showDownload();

						break;
					case 2:
						this.showVideo = true;
						this.videoUrl = videoUrl;
						break;
					case 3:
						console.log("ddd" + videoUrl);
						uni.navigateTo({
							url: videoUrl,
							animationType: 'pop-in',
							animationDuration: 500,
							refresh: true,

						});
						break;




				}


			},
			showImg(url) {
				this.imgUrl = url;
				this.showImage = true;

				console.log("url" + this.imgUrl);

			},
			changeLangae(lan) { //切换语言
				console.log("dd" + lan);
				this.language = lan;

			},
			showTitle(type) {

				this.desc = type.desc[this.language];
				if (this.status) {
					this.status = false
				} else {
					this.status = true;
				}


			},
			showDownload() {
				console.log(this.language);
				this.desc = this.CON.CON.wenzi.download[this.language];
				if (this.status) {
					this.status = false
				} else {
					this.status = true;
				}

			}


		}




	}
</script>


<style scoped>
	@import "../../static/css/index.css";

	.box1 {
		width: 100vw;
		height: 100%;
		position: relative;
	}

	.box-box {
		text-align: center;

		position: absolute;

	}

	.itemT {
		position: absolute;

		background-color: #e3e3e3;

		margin: 0.5vh auto;
		padding: 1vw 1.5vw;
		box-sizing: border-box;
		border-radius: 2vw;
		font-size: 12px;
		width: 47vw;
		float: right;
		right: 3vw;
		color: black;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-webkit-flex-direction: column;
		flex-direction: column;

	}

	.boxMask {
		width: 100vw;
		height: 82vh;
		position: absolute;
		background-color: white;

	}

	.titleBox {
		width: 47vw;
		height: 40vh;
		position: absolute;
		/* float: right; */
		right: 3vw;
		top: 3vh;
		color: black;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-webkit-flex-direction: column;
		flex-direction: column;

	}


	.middle-box {
		width: 100vw;
		margin-top: 10%;
	}

	.box-cover {
		width: 100%;
		height: 100%;
	}
	.box-img1 {
		position: relative;
		float: right;
		right: 0;
		top: 0;

	}

	.playImg {
		top: -60%;
		width: 20%;
		height: 20%;
	}

	.item-title-box {
		width: 6vw;
		height: 80%;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: absolute;
		float: right;
		right: 3vw;
		top: 8%;
	}

	.item-title-box1 {

		right: 12vw;

	}

	.item-title {



		writing-mode: vertical-rl;
		writing-mode: tb-rl;
		margin-top: 1vh;
		font-size: 3vw;
		font-family: Source Han Serif CN;
		font-weight: 800;
		color: #03FAFB;

	}

	.ietm-icon {

		width: 80%;
		height: 80%;

	}

	.lunBox {
		position: absolute;
		bottom: 0;

	}

	.playVideo {
		position: absolute;
		z-index: 99;
	}

	.item {
		width: 100%;
		background-color: #e3e3e3;
		height: 12vh;
		margin: 0.5vh auto;
		padding: 1vw 1.5vw;
		box-sizing: border-box;
		border-radius: 2vw;
		font-size: 12px;
		/* line-height: 45px; */
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		overflow: scroll;
	}
</style>

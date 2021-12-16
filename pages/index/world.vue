<template>
	<view class="page">
		<PlayVideo v-if='showVideo' @Vclose="closePop" class="playVideo" :url='videoUrl' ></PlayVideo>
		<PlayImage v-if='showImage' @Vclose="closePop" class="playVideo" :url='imgUrl'></PlayImage>
		<Heade :url='url' :isBack='true' :type='pageType' @language='changeLangae' :showType='showBj'> </Heade>
		<image class="topImg" src="../../static/img/topImg.png" mode="heightFix"></image>

		<!-- 	<Card class="cardBox" v-if="LunBo" @VplayVideo="palyVideo" :itemData="item"></Card> -->

		<scroll-view class="resBox" scroll-y="true">
		<web-view :src="content[language]"></web-view>
		</scroll-view>

		<image class="buttomImg" style="opacity: 0.5;" src="../../static/img/xiongmao.png" mode="heightFix"></image>

	</view>


</template>

<script>
	import Heade from '../Com/Head.vue'
	import Foot from '../Com/foot.vue'
	import Card from '../Com/Card.vue'
	import PlayVideo from '../Com/playVideo.vue'
	import PlayImage from '../Com/Image.vue'
	export default {
		components: {
			Heade,
			Foot,
			Card,
			PlayVideo,
			PlayImage
		},
		data() {
			return {
				content:this.CON.CON.wenzi.world.content  ,
				showBj: '',
				showVideo: false,
				showImage: false,
				LunBo: true,
				videoUrl: '',
				pageType: '/pages/index/res',
				url: '../../static/img/res.png',
				language: '',
				item: [],
				title: '',


			}

		},
		mounted() {
			
			//监听视频 图片的播放
			window.addEventListener('message', (e) => {
			     this.ceshi(e.data.data);
				
			}, false);
			
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
							this.language = "china";
							console.log('success');
						}
					});
				}
			});
			this.$nextTick(() => {
				let res = this.CON.CON.music;
				this.LunBo = true;
				this.title = res.title;
				this.item = res.item;
				this.changeLangae(this.language);

			})
		},
		methods: {
			ceshi(data){
				
				switch (data.type) {
					case "img":
						this.showImage = true;
						this.imgUrl = data.src;
				
						break;
					case "video":
						this.showVideo = true;
						this.videoUrl = data.src;
						break;
				}
				
			},
			
			
			palyVideo(data) {
				console.log("url " + data.type);
				switch (data.type) {
					case "img":
						this.showImage = true;
						this.imgUrl = data.src;

						break;
					case "video":
						this.showVideo = true;
						this.videoUrl = data.src;
						break;
				}
			},
			changeLangae(type) {

				this.LunBo = false;
				this.language = type;
				this.$nextTick(() => {
					this.LunBo = true;
				})

			},

			closePop(type) {
				switch (type) {
					case 'video':
						this.showVideo = false;
						this.videoUrl = false;

						break;
					case 'img':
						this.showImage = false;
						this.imgUrl = false;
						break;


				}


			},

		}



	}
</script>

<style scoped>
	@import "../../static/css/index.css";

	.resBox {
		width: 100vw;
		background-color: white;
		height: 82vh;
	}
	.content{
		color: #000000;
	}
	.playVideo {
		position: absolute;
		top: 0;
		z-index: 999;
	}
</style>

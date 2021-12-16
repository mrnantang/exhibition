<template>
	<view class="page">
		<PlayVideo v-if='showVideo' @Vclose="closePop" class="playVideo" :url='videoUrl' ></PlayVideo>
		<PlayImage v-if='showImage' @Vclose="closePop" class="playVideo" :url='imgUrl'></PlayImage>
		<Heade :url='url' :isBack='true' :type='pageType' @language='changeLangae' :showType='showBj'> </Heade>
		<image class="topImg" src="../../static/img/topImg.png" mode="heightFix"></image>
		
		<Card class="cardBox" v-if="LunBo" @VplayVideo="palyVideo" :itemData="item"></Card>
	
	   <image class="buttomImg" style="opacity: 0.5;" src="../../static/img/buttom.png" mode="heightFix"></image>
	
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
				showBj:'',
				showVideo: false,
				showImage: false,
				LunBo: true,
				videoUrl: '',
				pageType: '/pages/index/index',
				url: '../../static/img/music.png',
				language: '',
				item: [],
				title: '',
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

    .cardBox{
		height: 82vh;
		z-index: 5;
	}

	.box1-titile {
		padding-top: ;
		margin-left: 2%;
		background-color: 100% 100%;
		background-repeat: no-repeat;
		font-size: 2.5vw;
	}

	.playVideo {
		position: absolute;
		top: 0;
		z-index: 999;
	}
</style>

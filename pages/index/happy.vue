<template>
	<view class="page">
		<swiper class="swiper" :vertical="true" @change="changePage" v-if="div001==0" :current="pageIndex">

			<swiper-item>
				<view class="tiyan" @click="tiyanM">
				{{tiyan[language]}} <text class="lg text-yellow cuIcon-playfill"></text></view>
				<image class="close" src="../../static/img/close1.png" mode="scaleToFill" @click="closeBack()"></image>
				<image class="imgYun" src="../../static/img/1.jpg" mode="scaleToFill"></image>


				<view class="huadong">
					<image src="../../static/img/jiantou2.png" class="jiantou" mode="aspectFit"></image>
					<image src="../../static/img/shou2.png" class="shou bounceInUp" mode="aspectFit"></image>
				</view>
			</swiper-item>

			<swiper-item class="divVideo">
				<image class="close" src="../../static/img/close1.png" mode="scaleToFill" @click="closeBack()"></image>
				<scroll-view class="videoBox" scroll-y="true" id="videoBox">
					<view class="videoDiv" v-for="(item,index) in list" >
						<view class="title">
							<view class="titleMask"></view>
							<view class="title-title" @click="playVideo(index)">{{item.name}}</view>
						</view>
						<view class="cover">
							<image class="coverImg" @click="playVideo(index)" :src="item.cover" mode="widthFix"></image>
						</view>
					</view>
					<view class="divTooo">
					
					</view>
					
				</scroll-view>

			</swiper-item>

		</swiper>
		<swiper class="swiper videoS" :circular="circular" :vertical="true" @change="onSwiperChange" v-if="div001==1"
		 :current="currentIndex">
			<swiper-item v-for="(item,index) in videoList">
				<view class="videoClose">
					<image class="closeImg" src="../../static/img/close1.png" mode="widthFix" @click="closeVideo()"></image>
				</view>
				<view class="videoBox1">
					<video class="video" :id="item.id" :ref="item.id" :src="item.src" controls="auto" :loop="true" webkit-playsinline="true"
					 playsinline="true" x5-video-player-type="h5-page" x5-video-orientation="portrait" :show-center-play-btn="false"></video>


				</view>
				<view class="coverVideo">
					<view class="videoTop">
						<view class="videoTitle">
							{{item.name}}
						</view>
						<view class="videoDian">
							<text class="lg text-blue cuIcon-share" style="font-size: 6vw;margin-right: 3vw;" @click="share"></text>
							<image class="dainImg" src="../../static/img/dianzhan2.png" mode="widthFix" v-if="item.x===1"></image>
							<image @click="dianzhan(item.src,index)" class="dainImg" src="../../static/img/dianzhan1.png" mode="widthFix"
							 v-if="item.x!=1"></image>

							<view class="number">
								{{item.up_num}}
							</view>
						</view>

					</view>
					<scroll-view class="videoButtom">
						<view class="">
							{{item.desc}}
						</view>
					</scroll-view>
				</view>
			</swiper-item>
		</swiper>

	</view>
</template>
<script>
	import VideoBox from '../Com/VideoBox.vue'
	let videoData = [];
	export default {
		components: {
			VideoBox
		},
		data() {
			return {
				div001: 0,
				isShare: false,
				pageIndex: 0,
				isDianzhan: false,
				currentIndex: 0,
				circular: true,
				videoList: [],
				swiperStatus: false,
				language: '',
				list: [],
				len: 0,
				tiyan: {
					china: "立即体验",
					english: "Experiencing immediately"
				}
			}
		},
		onLoad(e) {
			//请求数据
			if (e.videoID != undefined) {
				setTimeout(() => {
					this.playVideo(e.videoID);
				}, 1000);
			}
		},
		onReady() {

			uni.request({
				url: "./static/js/data.json", //仅为示例，并非真实接口地址。
				dataType: 'json',
				method: 'GET',
				header: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},

				success: (res) => {
					console.log(res);

					this.list = res.data.page[0].layer[1].thing;

					for (let i in this.list) {
						let id = "video" + i;
						this.videoList.push({
							id: id,
							src: "",
							img: "",
							name: "",
							up_num: 0,
							path: this.list[i].src,
							desc: "",
							x: 0,

						});
						this.len++;
					}
					getDian((data) => {
						let shuju = data;
						for (let i in this.videoList) {
							for (let j in shuju) {
								if (this.videoList[i].path == shuju[j].url) {
									let dianzhan = (localStorage.getItem("indexx" + i) == null) ? 0 : 1;
									this.videoList[i].up_num = shuju[j].up_num;
									this.videoList[i].x = dianzhan;
									break;
								}
							}
						}


					});

				},

			});

		//获取点赞数
		this.isDianzhan = (localStorage.getItem("dian1") == null) ? -1 : localStorage.getItem("dian1");
		let id=this.CON.CON.projectId;
		function getDian(callBack) {
			uni.request({
				url: 'http://api.ec.lz06.com/sing/api/media.php',
				dataType: "json",
				method: 'POST',
				header: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data: {
					"action": "getMediaByProject",
					"projectId": id
				},
				success: (res) => {
					// console.log("获取到的数据： "+JSON.stringify(res.data.mediaList));
					callBack(res.data.mediaList);
				},
				fail: (res) => {
					alert("数据请求失败");
					console.log();
				}
			})
		
		
		}


		},
		mounted() {

			uni.getStorage({
				key: 'language',
				success: (res) => {
					this.language = res.data;
				},
				fail() {
					this.language = "china";
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


			let vh = window.innerHeight * 0.01
			// Then we set the value in the --vh custom property to the root of the document
			document.documentElement.style.setProperty('--vh', `${vh}px`)

			window.addEventListener('resize', () => {
				// We execute the same script as before
				let vh = window.innerHeight * 0.01
				console.log(vh);
				document.documentElement.style.setProperty('--vh', `${vh}px`)
			});


		},

		methods: {
			share() {


				let shareUrl = this.GetUrlRelativePath() + "happy?videoID=" + this._videoDataIndex;
				console.log("xx" + shareUrl);

				this.$copyText(shareUrl).then(
					res => {
						uni.showToast({
							title: '复制分享链接成功'
						})
					}
				)

			},
			closeBack() {
				// uni.navigateTo({
				// 	url: "/pages/index/res",
				// 	animationType: 'pop-in',
				// 	animationDuration: 500,
				// 	refresh: true,

				// });
				let shareUrl = this.GetUrlRelativePath() + "index";
						
				window.location.href = shareUrl;


			},
			tiyanM() {
				uni.navigateTo({
					url: "/pages/index/text",
					animationType: 'pop-in',
					animationDuration: 500,
					refresh: true,

				});


			},
			changePage() {
				// 	console.log("切换");
				// this.$nextTick(function(){
				// 	this.div001=2;
				// })

			},
			GetUrlRelativePath() {
				var url = self.location.href;
			
				let index = url.lastIndexOf("/");
				let urll = url.substring(index + 1, -1);
				return urll;
			},
			//视频点赞
			dianzhan(url, index) {
				let api = "http://api.ec.lz06.com/sing/api/media.php";
				if (this.videoList[index].x != 1) {

					uni.request({
						url: api,
						dataType: "json",
						method: 'POST',
						header: {
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						data: {
							action: "upMedia",
							  "projectId": this.CON.CON.projectId,
							url: url
						},
						success: (res) => {
							// console.log("获取到的数据： "+JSON.stringify(res));
							console.log(res);
							if (res.data.code == 0) {
								console.log("dian" + this.videoList[index].up_num);
								this.videoList[index].x = 1;
								this.videoList[index].up_num = parseInt(this.videoList[index].up_num) + 1;
								localStorage.setItem("index" + index, this.videoList[index].x);
								//this.updateDian();
								console.log("dian1121: " + this.videoList[index].up_num);
							} else {
								uni.showToast({
									image: false,
									title: "点赞失败",
									duration: 1000
								})
							}
						},
						fail: (res) => {
							uni.showToast({
								image: false,
								title: "点赞失败",
								duration: 1000
							})
						}
					})

				}

			},

			playVideo(index) {
				if (index == 0) {
					this.swiperStatus = false;
				} else {
					this.swiperStatus = true;
				}
				this.div001 = 1;
				this.init(index);
				videoData = this.list;
				this.videoDataList = videoData;

				console.log("name " + JSON.stringify(this.videoDataList) + " index " + this._videoDataIndex);
				this.$set(this.videoList[this._videoIndex], 'src', this.videoDataList[this._videoDataIndex].src);
				this.$set(this.videoList[this._videoIndex], 'name', this.videoDataList[this._videoDataIndex].name);
				this.$set(this.videoList[this._videoIndex], 'desc', this.videoDataList[this._videoDataIndex].desc);

				this.currentIndex = index;
				// this.$set(this.videoList[this._videoIndex], 'src', this.videoDataList[this._videoDataIndex].src);
				setTimeout(() => {

					this._videoContextList[this._videoIndex].play();
					this.swiperStatus = true;
				}, 200);


			},
			closeVideo() {
				this.div001 = 0;
				this.pageIndex = 1;

			},
			init(index) {
				this._videoIndex = index;
				this._videoContextList = [];
				for (var i = 0; i < this.videoList.length; i++) {
					this._videoContextList.push(uni.createVideoContext('video' + i, this));
				}
				this._videoDataIndex = index;
			},
			getData(e) {
				videoData = this.list;
				this.videoDataList = videoData;
				setTimeout(() => {
					this.updateVideo(true);
				}, 200);
			},
			onSwiperChange(e) {
				if (!this.swiperStatus) {
					return false;
				}
				let currentIndex = e.detail.current;
				if (currentIndex === this._videoIndex) {
					return;
				}
				let isNext = false;
				if (currentIndex === 0 && this._videoIndex === this.videoList.length - 1) {
					isNext = true;
				} else if (currentIndex === this.videoList.length - 1 && this._videoIndex === 0) {
					isNext = false;
				} else if (currentIndex > this._videoIndex) {
					isNext = true;
				}

				if (isNext) {
					this._videoDataIndex++;
				} else {
					this._videoDataIndex--;
				}

				if (this._videoDataIndex < 0) {
					this._videoDataIndex = this.videoDataList.length - 1;
				} else if (this._videoDataIndex >= this.videoDataList.length) {
					this._videoDataIndex = 0;
				}

				this.circular = (this._videoDataIndex != 0);

				if (this._videoIndex >= 0) {
					this._videoContextList[this._videoIndex].pause();
					this._videoContextList[this._videoIndex].seek(0);
				}

				this._videoIndex = currentIndex;

				setTimeout(() => {
					this.updateVideo(isNext);
				}, 200);
			},
			getNextIndex(isNext) {
				let index = this._videoIndex + (isNext ? 1 : -1);
				if (index < 0) {
					return this.len - 1;
				} else if (index >= this.len) {
					return 0;
				}
				return index;
			},
			getNextDataIndex(isNext) {

				let index = parseInt(this._videoDataIndex) + parseInt((isNext ? 1 : -1));
				if (index < 0 || index == this.len) {
					return this.len - 1;
				} else if (index >= this.videoDataList.length) {
					return 0;
				}
				return index;
			},
			updateVideo(isNext) {

				this._videoDataIndex = this._videoIndex;

				this.$set(this.videoList[this._videoIndex], 'src', this.videoDataList[this._videoDataIndex].src);
				this.$set(this.videoList[this._videoIndex], 'name', this.videoDataList[this._videoDataIndex].name);
				this.$set(this.videoList[this._videoIndex], 'desc', this.videoDataList[this._videoDataIndex].desc);

				this.$set(this.videoList[this.getNextIndex(isNext)], 'src', this.videoDataList[this.getNextDataIndex(isNext)].src);
				setTimeout(() => {
					this._videoContextList[this._videoIndex].play();
				}, 200);
			}


		}

	}
</script>

<style>
	@import "../../colorui/animation.css";

	.imgYun {
		width: 100vw;
		height: 100%;
	}

	.swiper {
		height: 100vh;
		/* 为不支持自定义属性的浏览器做降级处理 */
		height: calc(var(--vh, 1vh) * 100);
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
	}


	.video {
		object-fit: cover !important;
		z-index: 999;
		width: 100%;
		height: 100%;
	}

	.cover {
		width: 100%;
		height: 10%;
		border: 1px solid black;
		position: absolute;
		z-index: 1;
		top: 0;
		opacity: 1;
		background-color: #27365F;
	}

	.huadong {

		width: 50vw;
		bottom: 0vh;
		left: 25vw;
		height: 50vh;
		position: absolute;
		z-index: 99;
		display: flex;
		text-align: center;
		align-items: center;
		justify-content: center;
	}

	
	.jiantou {
		
		bottom: -2vh;
		width: 6vw;
		position: absolute;
	}
	
	.shou {
		position: absolute;
		width: 12vw;
		bottom: 5vh;
		max-height: 20vw;
		right: 10vw;
		animation: bounceInUp 3s infinite;
	}
	
	@-webkit-keyframes bounceInUp {
		0% {
			bottom: 5vh;
			opacity: 0;
			-webkit-transform: translateY(2000px);
			transform: translateY(2000px)
		}
	
		60% {
			opacity: 1;
			-webkit-transform: translateY(-30px);
			transform: translateY(-30px)
		}
	
		80% {
			-webkit-transform: translateY(10px);
			transform: translateY(10px)
		}
	
		100% {
			bottom: 22vh;
			-webkit-transform: translateY(0);
			transform: translateY(0)
		}
	}
	
	@keyframes bounceInUp {
		0% {
			opacity: 0;
			bottom: 2vh;
			-webkit-transform: translateY(2000px);
			-ms-transform: translateY(2000px);
			transform: translateY(2000px)
		}
	
		60% {
			opacity: 1;
			-webkit-transform: translateY(-30px);
			-ms-transform: translateY(-30px);
			transform: translateY(-30px)
		}
	
		80% {
			-webkit-transform: translateY(10px);
			-ms-transform: translateY(10px);
			transform: translateY(10px)
		}
	
		100% {
			bottom: 15vh;
			-webkit-transform: translateY(0);
			-ms-transform: translateY(0);
			transform: translateY(0)
		}
	}
	

	.close {
		width: 6vw;
		height: 6vw;
		position: absolute;
		top: 20px;
		right: 20px;
		float: right;
		z-index: 9999;
	}

	.videoBox {
		width: 96vw;
		height: 96vh;
		margin-left: 2vw;
		margin-top: 2vh;
		display: inline-block;

	}

	.videoDiv {
		display: inline-block;
		width: 30vw;
		margin-left: 1vw;
		height: 40vw;
		border: 1px gray solid;
		position: relative;
	}

	.title {
		width: 100%;
		height: 10vw;
		color: white;
		position: absolute;
		bottom: 0;
		z-index: 12;

	}

	.cover {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		display: flex;
		align-items: center;
		justify-content: center;

	}

	.titleMask {
		width: 100%;
		height: 100%;
		position: absolute;
		z-index: 0;
		opacity: 0.5;
		background-color: black;
	}

	.title-title {
		width: 90%;
		height: 100%;
		text-align: center;
		position: absolute;
		z-index: 1;
		font-size: 3vw;
		display: flex;
		justify-content: center;
		align-items: center;

	}

	.coverImg {

		max-width: 100%;
		max-height: 100%;
	}

.videoBox1 {
		width: 100vw;
		height: 75%;

		margin-top: 4vw;

	}

	.videoClose {
		height: 6vw;
		width: 100vw;

	}

	.coverVideo {
		width: 100vw;
		height: 15%;
		margin-top: 1%;
		display: flex;
		flex-direction: column;
		position: relative;
	}

	.closeImg {
		width: 6vw;
		height: 6vw;
		position: absolute;
		float: right;
		right: 1vh;
		top: 1vh;
		z-index: 9999;
	}
	.videoS {
		background-color: black;
	}

	.videoTop {
		width: 100vw;
		height: 30%;
		display: flex;
		flex-direction: row;

	}

	.videoTitle {
		height: 100%;
		width: 70vw;
		display: flex;
		align-items: center;
		padding-left: 1vw;
		color: white;
	}

	.videoDian {
		width: 30vw;
		height: 100%;

		margin-right: 1vw;
		position: relative;
		text-align: right;



	}


	.dainImg {

		display: inline-block;
		width: 3vh;
		height: 4vh;
		margin-top: 0.2vh;

	}

	.number {
		height: 100%;
		margin-left: 1vw;

		display: inline-block;

	}

	.videoButtom {
		width: 100vw;
		height: 70%;
		opacity: 0.7;
		padding: 0.4vh 1vw 0.4vh 1vw;
	}

	.tiyan {
		height: 40upx;
		 display: flex;
		align-items: center;
		padding-left: 1vw;
		border-radius: 1vw;
         background-color: #942D21;
		position: fixed;
		float: right;
		right: 5vw;
		bottom: 5vh;
		z-index: 9999;
	}
	.divVideo{
		background-image: url(../../static/img/videoBj.jpg);
		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-position: center;
	}
	
	.divTooo {
		width: 100%;
		height: 20vh;
	
	}
	
</style>

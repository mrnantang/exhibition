<template>
	<view class="page">
		<PlayVideo v-if='showVideo' @Vclose="closePop" class="playVideo" :url='videoUrl'></PlayVideo>
		<PlayImage v-if='showImage' @Vclose="closePop" class="playVideo" :url='imgUrl'></PlayImage>
		<Heade :url='url' :isBack='true' :type='pageType' @language='changeLangae' :showType='showBj'> </Heade>
		<image class="topImg" src="../../static/img/topImg.png" mode="heightFix"></image>

		<view class="videoBox">

			<view class="videoBox-B">

				<view class="videoMask" v-if="status==0">
					<image :src="v.videoPng" class="videoPng" mode="widthFix"></image>

				</view>

				<video class="videoDiv" v-show="status==1" id="videoBox" :src="v.url" :controls="true" :loop="true"
				 webkit-playsinline="true" playsinline="true" x5-video-player-type="h5-page" x5-video-orientation="portrait"
				 :show-center-play-btn="true"></video>


				<video v-if="status==2" class="videoDiv" id="video2" :src="v.url" :initial-time='0' :autoplay='false' :controls='true'
				 webkit-playsinline="true" playsinline="true" x5-video-player-type="h5-page" x5-video-orientation="portrait"
				 :show-center-play-btn="false"></video>

			</view>
			<view class="head-jiemu1">

				{{jieshu}}

			</view>

			<scroll-view scroll-y="true" class="videoList">
				<view class="head-jiemu">
					{{jiemuT[language]}}
				</view>
				<view class="body-jiemu" v-if="jiemu.list!=''">
					<view class="jiemu-item" v-for="(item,index) in jiemu.list">
						
						<view class=""  style="width: 20%;height: 100%;display: flex;align-items: center;">
							{{parseInt(index) +1}} .
						</view>
						
						<view class=""  style="width: 80%;height: 100%;display: flex;align-items: center;">
							{{item[language]}}
						</view>
						
					</view>
				</view>
				<view class="body-jiemu1" v-if="jiemu.list==''">
					{{timeD.qidai[language]}}
				</view>
			</scroll-view>
		</view>
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
				showBj: '',
				showVideo: false,
				showImage: false,
				LunBo: true,
				status: 0,
				jieshu: '',
				v: {
					controls: false,
					loop: false,
					initial: 0,
					url: 'http://192.168.3.227/images/shouji/1.mp4',
					autoplay: true,
					startT: '',
					end: '',
					duration: '',
					videoPng: ''
				},
				yuTime: '',
				videoUrl: '',
				pageType: '/pages/index/index',
				url: '../../static/img/chunwang.png',
				language: '',
				item: [],
				language: '',
				title: '',
				jiemuT: '',
				jiemu: [],
				videoContext: '',
				timeD: {
					qidai: {
						china: '敬请期待',
						english: 'Coming soon'
					},
					zhibo: {
						china: '魅力云春晚直播中',
						english: 'Cloud-based Charming Spring Festival Gala on live'

					},
					jieshu: {
						china: '魅力云春晚回放',
						english: 'Cloud-based Carming Spring Festival Gala replay'
					},
					title: {
						china: '春晚开始时间 北京时间',
						english: 'Start time of Spring Festival Gala Beijing Time'
					},
					y: {
						china: '年',
						english: ' / '
					},
					m: {
						china: '月',
						english: ' / '
					},
					tt: {
						china: '日',
						english: '  '
					}
				}
			}

		},
		onReady() {

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
				this.changeLangae(this.language);
			});

			let domain = "http://api.ec.lz06.com/sing/api/project.php";
			let dat = {
				action: 'getProject',
				projectId: this.CON.CON.projectId
			};
			this.Reques.payment(domain, 'GET', dat).then((res) => {
				console.log(res);
				if (res.data.code == 0) {

					this.v.startT = res.data.project.startTime;
					this.v.end = res.data.project.endTime;
					this.v.url = res.data.project.videoUrl;
					this.duration = parseInt(this.v.end) - parseInt(this.v.startT);
					this.jieshu = this.timeD.title[this.language] + " ： " + this.to_date(this.v.startT);
					this.v.videoPng = res.data.project.videoPng;
					this.playvideo();

				} else {
					this.CON.CON.tishi();
				}

			}, (err) => {
				console.log(err);
				this.CON.CON.tishi();

			});

			this.Reques.payment('./static/jiemu.json', 'get', {}).then((res) => {
				if (res.statusCode == 200) {
					this.jiemu = res.data;
					this.jiemuData();

				}
			}, (err) => {
				console.log(err);
			});


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

		},
		methods: {
			jiemuData() {
				console.log("dd" + this.jiemu);
				this.jiemuT = this.jiemu.name;
			},
			playvideo() {
				let isplay = false;
				this.videoContext = uni.createVideoContext('videoBox');
				let timer1 = setInterval(() => {
					let currentTime = (new Date()).getTime();
					let shengyu = currentTime - parseInt(this.v.startT);
					if (currentTime >= this.v.startT && currentTime < this.v.end && !isplay) { //在播放时间内
						this.status = 1;
						this.jieshu = this.timeD.zhibo[this.language];
						this.v.initial = parseInt(shengyu / 1000);
						isplay = true;
						this.videoContext = uni.createVideoContext('videoBox');
						this.videoContext.seek(this.v.initial);
						console.log("initaial " + this.v.initial + " shengyu / 1000 " + shengyu);
						this.videoContext.play();
					}
					if (currentTime > this.v.end) { //直播已经结束

						this.status = 2;
						this.jieshu = this.timeD.jieshu[this.language];
						this.v.controls = true;
						this.v.initial = 0;
						this.videoContext.pause();

					}
					if (currentTime < this.v.startT) {
						this.jieshu = this.timeD.title[this.language] + " ： " + this.to_date(this.v.startT);

					}
				});



			},
			to_date(phpstr) {
				let str = parseInt(phpstr); //将php时间戳转化为整形并乘以1000
				var newDate = new Date(str);
				var year = newDate.getUTCFullYear(); //取年份
				var month = newDate.getUTCMonth() + 1; //取月份
				var nowday = newDate.getUTCDate(); //取天数
				var hours = newDate.getHours(); //取小时
				var minutes = newDate.getMinutes(); //取分钟
				var seconds = newDate.getSeconds(); //取秒
				hours = (hours < 10) ? "0" + hours : hours;
				minutes = (minutes < 10) ? "0" + minutes : minutes;
				return year + this.timeD.y[this.language] + month + this.timeD.m[this.language] + nowday + this.timeD.tt[this.language] +
					" " + hours + " : " + minutes; //拼接 2017-2-21 12:23:43    }

			},
			changeTime(time) { //时间的格式转换
				var d = new Date(time);
				let year = (d.getFullYear() - 1970) == 0 ? "" : (d.getFullYear() - 1970) + "年";
				let html = "<view class='box'>s</view>";
				var month = parseInt((time / 1000 / 60 / 60 / 24 / 30) % 12); //月
				let mon = month < 10 ? "0" + month + "月" : month + "月";
				var day1 = parseInt((time / 1000 / 60 / 60 / 24) % 30); //天数
				let day = day1 < 10 ? "0" + day1 + "天" : day1 + "天";
				var hour = parseInt((time / 1000 / 60 / 60) % 24); //小时
				let hours = hour < 10 ? "0" + hour : hour;
				var minute = parseInt((time / 1000 / 60) % 60); //  分钟
				let min = minute < 10 ? "0" + minute : minute;
				let sec = parseInt((time / 1000) % 60) < 10 ? "0" + parseInt((time / 1000) % 60) : parseInt((time / 1000) % 60); //秒
				if (day1 == 0) {
					day = "00";
				}
				if (month == 0) {
					mon = "00";
				}
				if (hour == 0) {
					hours = "00";
				}
				if (minute == 0) {
					min = "00";
				}
				return hours + "小时" + min + "分" + sec + "秒";
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

				console.log(type);
				this.$nextTick(() => {

					this.language = type;
					this.jieshu = this.timeD.title[this.language] + " ： " + this.to_date(this.v.startT);
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



	.videoBox {
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: white;
		height: 82vh;
		z-index: 0;
	}

	.videoMask {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.videoBox-B {
		width: 90%;
		margin-top: 20rpx;
		height: 450rpx;
		background-color: black;

	}

	.videoDiv {
		width: 100%;
		height: 100%;
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

	.videoList {
		width: 90%;
		margin-top: 40rpx;
		height: 35vh;

		color: #26355F;
		display: flex;
		flex-direction: column;


	}

	.head-jiemu {
		width: 100%;
		height: 60rpx;
		text-align: center;
		line-height: 60rpx;
		color: #F7B545;
		font-size: 5vw;
		font-weight: 600;
		border-bottom: 1px solid #F7B545;
	}

	.body-jiemu {
		width: 100%;
		height: 70rpx;
		display: flex;
		flex-wrap: wrap;
	}

	.body-jiemu1 {
		width: 100%;
		text-align: center;
		padding-top: 3vh;
		color: #B5B5B5;
		font-size: 8vw;
		font-weight: 700;

	}

	.jiemu-item {
		width: 32%;
		margin-left: 1%;
		height: 100%;
		display: flex;
		align-items: center;
		text-overflow: ellipsis;
		white-space: nowrap;
		color: black;
		overflow: hidden;
	}

	.head-jiemu1 {
		margin-top: 2vh;
		width: 100%;
		height: 60rpx;
		text-align: center;
		line-height: 60rpx;
		color: black;
		font-size: 3vw;
		font-weight: 600;
		color: gray;

	}

	.videoPng {
		width: 100%;
		max-height: 100%;
	}
</style>

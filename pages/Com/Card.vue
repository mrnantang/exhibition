<template>
	<view class="lunboBox">
		<view class="card-Box">
			<view class="box-top clickEffict" v-for="(item,index) in item" @click="xuanzhe(item,index)" :class="{'fontColr':selectI==index}">
			
				<view class="box-title" v-html="item.name[language]">
				
					<!-- {{item.name[language]}}	 -->
				</view>
			
				<view class="line"  v-if="index!=length-1">

				</view>
			</view>
			

		</view>


			<view class="box-contaner">
				<scroll-view class="desc" scroll-y="true"  show-scrollbar="true">
					<web-view :src="contaner.desc[language]" @message="message"></web-view>

				</scroll-view>


			</view>

		








	</view>

</template>

<script>
	export default {
		name: 'Card',
		props: ['imgArr', 'itemData'],
		data() {

			return {
				left: 0,
				status: true,
				contaner: "",
				selectI: 0,
				language: this.CON.CON.language,
				videoN: 0,
				length:this.itemData.length,
				item: this.itemData
			}



		},
		mounted() {

			window.addEventListener('message', (e) => {

				this.playVideo(e.data.data);
			}, false);
			console.log("xx" + JSON.stringify(this.item));
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
	.card-Box {
		width: 90%;
		height: 20%;
		display: flex;
		flex-direction: row;
		position: relative;
		z-index: 99;
		margin-left: 5%;

		border-bottom: 1px solid #a89eb1;
	}

	.box-top {
		margin-top: 5%;
		width: 33.3%;
		height: 45%;
		display: flex;
		text-align: center;
		flex-direction: row;
		font-weight: 700;
		font-size: 15rpx;
		align-items: center;
		justify-content: center;
	}
	.box-title{
		margin: auto;
		text-align: center;
		width:90%;
		font-size: 3.5vw;
		font-weight: 1000;
	}

	.line {
		width: 1%;
		height:50%;
		border-right: 1px solid #a89eb1;
	}
		
	.line_h{
	border-right: 1px solid #F5A418;
	}





	.fontColr {
		
		color: #F5A418;
	}



	.lunboBox {
		margin-top: 1%;
		width: 100%;
		height: 100%;
		display: flex;
		background-color: white;
		flex-direction: column;
		color: black;

	}


	.box-contaner {
		width: 90%;
		height:78%;
		margin: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		
	}

	.desc {
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

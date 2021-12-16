<template>
	<view class="">
		<view class="uploadMask">

		</view>
		<!-- <view class="uploadBox animation-slide-bottom" style="border: 1px solid white;">
			<web-view src="../../static/word/upload.html" class="webView" style="border: 1px solid white;"></web-view>
		</view> -->
			<view class="uploadBox animation-slide-bottom">
			<view class="uploadFrom">
				<image @click="close()" class="close clickEffict" src="../../static/img/close.png" mode=""></image>
				<view class="box-box">
					<view class="desc" v-html="msg">

					</view>
			
		         <view class="input1">
						<view class="titlebox">作品名称:</view>
						<view class="inputBox">
							<input class="inout-box" placeholder="" v-model="msgData.title" name="title"></input>
						</view>
					</view>
					<view class="input1">
						<view class="titlebox">作&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;者:</view>
						<view class="inputBox">
							<input class="inout-box" placeholder="" v-model="msgData.author" name="author"></input>
						</view>
					</view>
					<view class="input1">
						<view class="titlebox">学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;校:</view>
						<view class="inputBox">
							<input class="inout-box" placeholder="" v-model="msgData.school" name="school"></input>
						</view>
					</view>
					<view class="input1">
						<view class="titlebox">邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱:</view>
						<view class="inputBox">
							<input class="inout-box" placeholder="" v-model="msgData.email" name="email"></input>
						</view>
					</view>
					<view class="but-Box flex flex-direction">
						<!-- <web-view src="../../static/word/upload.html" style="position: fixed;top:0 ;"></web-view> -->
						<button class="cu-btn bg-orange lg butBox" @click="upload" v-if="uploadStatus==0">选择文件</button>

						<view class="butBox1" @click="upload" v-if="uploadStatus==1">
							<view class="mask-btn" :style="{width:progressW+'%'}">

							</view>

							<view class="progressT">
								上传进度：{{progressW}}%
							</view>

						</view>

						<view class="butBox2 bg-green" @click="upload" v-if="uploadStatus==2">

							<view class="progressT">
								<text class="cuIcon-roundcheck"></text>上传成功

							</view>

						</view>
						<view class="butBox3" @click="upload" v-if="uploadStatus==3">
							{{produceName}}

							<button class="cu-btn bg-green   reUpload" @click="upload()">重新上传</button>
						</view>

						<button class="cu-btn bg-orange margin-tb-sm lg butBox" @click="sumbit()">提交</button>
					</view>





					<view class="input1">
					</view>

				</view>

			</view>
		</view> 

	</view>
</template>

<script>

	// import getSignature from '@/js_sdk/tencentcloud-plugin-vod/get-upload-signature.js';
	// import chooseFile from '@/js_sdk/tencentcloud-plugin-vod/choose-file.js';
	export default {
		name: "upload",
		data() {
			return {


				msg: this.CON.CON.uploadTitle,
				loading: false,
				progressW: 0,
				uploadStatus: "",
				produceName: "",
				msgData: {
					action: 'uploadVideo',
					title: "", //
					author: "", //
					email: "", //
					videoUrl: "", //邀请码
					school: "", //手机号
					userId: "", //
				},
				checkbox: [{
					value: '0',
					checked: false
				}],



			}


		},
		methods: {
			close() {
				this.$emit('UpClose');

			},

			changeTo(url) {
				uni.navigateTo({
					url: url,
					animationType: 'pop-in'

				});
			},
			upload() {

				const tcVod = new TcVod.default({
					getSignature: ""
				});

				uni.chooseFile({
					success: (chooseFile) => {
						const tempFilePaths = chooseFile.tempFilePaths;
						const uploadTask = uni.uploadFile({
							url: this.Reques.Domain + "sing/api/sign.php", //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0],
							name: 'file',
							formData: {
								'Action': 'GetUgcUploadSign'
							},
							success: (uploadFileRes) => {
								this.uploadStatus = 2;
								let dat = JSON.parse(uploadFileRes.data);

								console.log(dat);
							}
						});

						uploadTask.onProgressUpdate((res) => {
							this.uploadStatus = 1;
							this.progressW = res.progress;



							// console.log('上传进度' + res.progress);
							// console.log('已经上传的数据长度' + res.totalBytesSent);
							// console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);

							// 测试条件，取消上传任务。
							// if (res.progress > 50) {
							// 	uploadTask.abort();
							// }
						});
					}
				});

			},
			sumbit() {
				let showMsg = (msg) => {
					uni.showModal({
						title: "提 示",
						content: msg,
						showCancel: false
					});
				}
				let msg = "",
					ePattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/; //Email正则
				for (let i in this.msgData) { //对表单进行验证
					console.log(i + ":" + this.msgData[i]);
					if (this.msgData[i].length == 0) {
						switch (i) {
							case "title":
								msg = "作品名称还未填写";
								showMsg(msg);
								return false;
								break;
							case "author":
								msg = "作者还未填写";
								showMsg(msg);
								return false;
								break;
							case "school":
								msg = "学校未填写";
								showMsg(msg);
								return false;
								break;
						}


					}

				}
				if (!ePattern.test(this.msgData.email)) {
					msg = "邮箱格式不正确";
					showMsg(msg);
					return false;
				}
				if (this.msgData.videoUrl == "") {
					msg = "还未上传作品，请选择文件上传";
					showMsg(msg);
					return false;
				}




			}
		}



	}
</script>

<style scoped>
	.uploadMask {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		z-index: 999;
		opacity: 0.3;
		background-color: #000000;
	}

	.close {
		position: relative;
		float: right;
		right: 0;
		top: 0;
		width: 61rpx;
		height: 63rpx;
		z-index: 999;

	}

	.input1 {
		width: 100%;
		height: 70rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		font-weight: 400;
		color: #454545;
		margin-top: 2vh;
	}

	.inputBox {
		width: 75%;
		height: 100%;



	}

	.inout-box {
		padding-left: 10upx;
		font-size: 30upx;
	}

	.titlebox {
		width: 25%;
		height: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.box-box {

		margin-top: 60rpx;
		width: 82%;
		margin-left: 9%;
		text-align: left;
	}
	.webView{
		width: 80%;
		min-height: 50%;
		z-index: 999999;
		top: 0;
		position: relative;
	}

	.uploadBox {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		z-index: 999;
		display: flex;
		align-items: center;
		justify-content: center;


	}

	.uploadFrom {
		width: 80%;
		min-height: 50%;
		background-color: white;
		border-radius: 14upx;
		color: #000000;
		box-shadow: 0upx 0upx 10upx rgba(0, 0, 0, 0.2);
	}

	.xuzhi {
		display: flex;
		flex-direction: row;
		height: 60rpx;
		line-height: 60rpx;
		width: 100%;
		align-items: center;
		justify-content: center;
		text-align: center;

	}

	.xuzhiTile {
		margin-left: 2vw;
		width: 100%;
		height: 60rpx;
		line-height: 60rpx;
	}

	.inout-box {
		width: 100%;
		height: 100%;
		border-radius: 12rpx;
		background-color: #DBDBDB;
	}

	.butBox {
		width: 100%;
		box-shadow: 0upx 0upx 10upx rgba(0, 0, 0, 0.2);
		height: 65rpx;
		background-color: #F5A418;
	}

	.butBox1 {
		background-color: #DBDBDB;
		color: white;
		box-shadow: 0upx 0upx 10upx rgba(0, 0, 0, 0.2);
		height: 65rpx;
		text-align: center;
		line-height: 65rpx;
		position: relative;
		border-radius: 12rpx;
	}

	.butBox2 {

		box-shadow: 0upx 0upx 10upx rgba(0, 0, 0, 0.2);
		height: 65rpx;
		text-align: center;
		line-height: 65rpx;
		position: relative;
		border-radius: 12rpx;
	}

	.butBox3 {

		height: 65rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		position: relative;
		border-radius: 12rpx;
	}

	.but-Box {
		margin-top: 5vh;
	}

	.mask-btn {
		position: absolute;
		width: 0%;
		height: 100%;
		border-radius: 12rpx;
		background-color: #025272;
	}

	.progressT {
		width: 100%;
		height: 100%;
		position: absolute;
		z-index: 2;
	}

	.reUpload {
		position: absolute;
		float: right;
		right: 0;

		width: 45%;
		box-shadow: 0upx 0upx 10upx rgba(0, 0, 0, 0.2);
		height: 65rpx;
	}
</style>

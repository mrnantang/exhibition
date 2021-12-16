<template>
	<view class="videoBox">
		<image @click="close()" class="close" src="../../static/img/close1.png" mode=""></image>
		
		<video class="video" :src="videoUrl" controls autoplay="true"></video>
		
		
		
		
		
	</view>
</template>

<script>
	export default{
		name:'videoPlay',
		props:['url'],
		data(){
			return{
				
				videoUrl:this.url	
			}

		},
		methods:{
			close(){
				console.log("xx");		
				this.$emit("Vclose",'video');

			}
		
		}
	
	}
	
	
</script>

<style scoped>
	.videoBox{
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: BLACK;
	}
	.video{
		width: 100%;
	}
	
	.close{
		position: absolute;
		float: right;
		right: 3%;
		top: 2%;
		width: 61rpx;
		height: 63rpx;
		z-index: 999;
		
	}
	
</style>

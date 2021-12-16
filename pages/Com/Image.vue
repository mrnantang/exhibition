<template>
	<view class="videoBox">
		  <image @click="close()" class="close" src="../../static/img/close1.png" mode=""></image>
	
	      <image class="imgBox" :src="ImageUrl" mode="widthFix"></image>
	   
		
		
	</view>
</template>

<script>
	export default{
		name:'ImgPlay',
		props:['url'],
		data(){
			return{
				ImageUrl:this.url,
			}
 
		},
		methods:{
			close(){
				console.log("xx"+this.ImageUrl);
				
				this.$emit("Vclose",'img');
				
				
				
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
		background-color: #142243;
	}
	.imgBox{
		max-width: 100%;
		max-height: ;
		
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

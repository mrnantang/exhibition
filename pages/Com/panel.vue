<template>
	<view class="page">
		<cu-custom bgColor="bg-gradual-red" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">{{title}}</block>
		</cu-custom>
     <scroll-view scroll-y="true" >
     	<view v-html="showData"></view>
     </scroll-view>

	</view>
</template>

<script>
	export default{
		data(){
			return{
				showData:"",
				type:""
				
			}
		},
		onLoad(option){
			
			this.Reques.payment("private.json","GET",{}).then((res)=>{
				console.log(res);
				this.showData=res.data[option.type];
			},(err)=>{
				console.log(res);
				uni.showModal({
					title:"提示",
					content:"网络错误"
				})
				
			})
			
			
		}
		
		
	}
</script>

<style>
</style>

<template>
	<view class="content">
		<view>业精于勤荒于嬉</view>
		<button @click="toHome">进入学习圈</button>
	</view>

</template>

<script>
export default {
	data() {
		return {
		
		}
	},
	onLoad() {

	},
	methods: {
		toHome:function(){
			uni.switchTab({
				url:'/pages/index/home'
			})
		},
		
	}
}
</script>

<style>
	.content {
		background-color: #fff;
		text-align: center;
		height: 760rpx;
		position: relative;
	}
	button{
		position: absolute;
		left: 10%;
		right: 10%;
		bottom: 30%;
		background-color: green;
		width: 80%;
		z-index: 999;
	}

	
</style>

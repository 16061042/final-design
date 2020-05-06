<template>
	<view class="content">
		<swiper indicator-dots autoplay="true" interval='3000' circular>
			<swiper-item>
				<image src="../../static/c.png"></image>
			</swiper-item>
			<swiper-item>
				<image src="../../static/dianlu.jpg"></image>
			</swiper-item>
			<swiper-item>
				<image src="../../static/dianlu.jpg"></image>
			</swiper-item>
		</swiper>
		<myList></myList>
	</view>
	
</template>

<script>
import myList from '../../components/myComponents/my-list'
import toolkit from '../../util/toolkit'
export default{
	components: {myList},
	data(){
		return{

		}
	},
	mounted(){
		toolkit.post("/circle/getCommonList").then(res => {
			console.log(res)
		})
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
	swiper{
		width: 100%;
		height: 150px;
	}
	swiper image{
		width: 100%;
		height: 100%;
	}
</style>

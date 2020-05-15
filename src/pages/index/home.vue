<template>
	<view class="content">
		<swiper indicator-dots autoplay="true" interval='3000' circular>
			<swiper-item @click="toDetail(circleList[0].circleId)">
				<image :src="circleList[0] && circleList[0].imgUrl"></image>
			</swiper-item>
			<swiper-item @click="toDetail(circleList[1].circleId)">
				<image :src="circleList[1] &&circleList[1].imgUrl"></image>
			</swiper-item>
			<swiper-item @click="toDetail(circleList[2].circleId)">
				<image :src="circleList[2] &&circleList[2].imgUrl"></image>
			</swiper-item>
		</swiper>
		<myList :circleList="circleList"></myList>
	</view>
	
</template>

<script>
import myList from '../../components/myComponents/my-list'
import toolkit from '../../util/toolkit'
export default{
	components: {myList},
	data(){
		return{
			circleList: []
		}
	},
	mounted(){
		toolkit.post("/circle/getCommonList").then(res => {
			res = res.data
			if(res.code == 0) {
				this.circleList = res.data
			} else {
				uni.showToast({
					icon: "none",
					title: res.message,
					duration: 2000
				})
			}
		})
	},
	methods: {
		toDetail(id) {
			uni.navigateTo({
                url: '/pages/circle/circle-detail?id=' + id
            })
		}
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

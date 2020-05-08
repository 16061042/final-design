<template>
	<view class="content">
		<view class="mineTop">
            <view class="pic">
                <image src='../../static/c.png'></image>
            </view>
            <view class="message">
                <p>{{info.userName}}</p>
                <p>{{info.userPhone}}</p>
            </view>
            <view class="more">></view>
        </view>
	</view>
	
</template>

<script>
import toolkit from '../../util/toolkit'
export default{
	data(){
		return{
            userId: '',
            info: {},
		}
	},
	onShow(){
        let that = this
        uni.getStorage({
            key: 'userId',
            success(e) {
                this.userId = e.data
                toolkit.post('/user/getInfo',{userId: this.userId}).then(res => {
                    res = res.data
                    if(res.code == 0) {
                        that.info = res.data
                    } else {
                        uni.showToast({
                            icon: 'none',
                            title: res.message,
                            duration: 2000
                        })
                    }
                })
            },
            fail() {
                uni.navigateTo({
                    url: '/pages/mine/login'
                })
            }
        })
    }
}
</script>

<style lang="scss" scoped>
	.content {
		background-color: rgb(235, 235, 235);
		text-align: center;
		height: 760rpx;
		position: relative;
        color: rgb(193, 193, 193);
	}
    .mineTop{
        margin:10px 0px;
        background-color: #fff;
        display: flex;
        padding:10px 8%;
        image{
             width: 50px;
            height: 50px;
            margin:0 10px;
        }
        .more{
            line-height: 50px;
            flex: auto;
            text-align: right;
        }
    }
</style>

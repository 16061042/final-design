<template>
	<view class="content">
		<view class="mineTop">
            <view class="pic">
                <image src='../../static/c.png'></image>
            </view>
            <view class="message">
                <p>{{message.name}}</p>
                <p>{{message.studentID}}</p>
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
            message:{
                name:'lishunxin',
                studentID:'05168956'
            }
		}
	},
	mounted(){
		
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

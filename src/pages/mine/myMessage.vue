<template>
	<view class="content">
		<view class="mineTop" @click="toInfo">
            <view class="pic">
                <image src='../../static/default.jpg' v-if="!info.img"></image>
                <image :src="info.img" v-else></image>
            </view>
            <view class="message">
                <p>{{info.userName}}</p>
                <p>{{info.userPhone}}</p>
            </view>
            <view class="more">></view>
        </view>
        <myList :circleList="circleList" :myTitle="listTitle"></myList>
	</view>
	
</template>

<script>
import myList from '../../components/myComponents/my-list'
import toolkit from '../../util/toolkit'
export default{
    components: {
        myList
    },
	data(){
		return{
            userId: '',
            info: {},
            circleList: [],
            listTitle: '我参与的圈子'
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
                // 我参与的圈子
                toolkit.post('/circle/getMyCircle',{userId: this.userId}).then(res => {
                    res = res.data
                    if(res.code == 0) {
                        that.circleList = res.data
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
    },
    methods: {
        toInfo(){
            uni.navigateTo({
                url: '/pages/mine/info'
            })
        }
    }
}
</script>

<style lang="scss" scoped>
	.content {
        height: 100%;
		text-align: center;
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

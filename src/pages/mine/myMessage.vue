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
        <myList :circleList="circleList" :myTitle="listTitle" :userId="userId" :role="info.role + ''"></myList>
        <div class="bottom1">
             <button @click="logout">退出登录</button>
        </div>
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
            listTitle: '我参与的圈子',
		}
    },
	onShow(){
        let that = this
        uni.getStorage({
            key: 'userId',
            success(e) {
                that.userId = e.data + ''
                toolkit.post('/user/getInfo',{userId: that.userId}).then(res => {
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
                toolkit.post('/circle/getMyCircle',{userId: that.userId}).then(res => {
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
                uni.getStorage({
                    key: 'hasLoad',
                    success() {
                        uni.removeStorage({
                            key: 'hasLoad',
                            success() {
                                uni.switchTab({
                                    url: '/pages/index/home'
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
        })
    },
    methods: {
        toInfo(){
            uni.navigateTo({
                url: '/pages/mine/info'
            })
        },
        logout() {
            uni.removeStorage({
                key: 'userId',
                success() {
                    uni.showToast({
                        icon: 'success',
                        title: '退出成功',
                        duration: 1000
                    })
                    setTimeout(() => {
                        uni.reLaunch({
                            url: '/pages/index/home'
                        })
                    }, 1000)
                }
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
    button {
        background: green;
        width: 80%;
    }
    .bottom1 {
        bottom: 100px;
        position: fixed;
        width: 100%;
        text-align: center;
    }
</style>

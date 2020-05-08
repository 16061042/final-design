<template>
	<view class="content">
		  <view class="topBlock">
                <image :src="circleInfo.imgUrl"></image>
                <div>
                    <p class="title">{{circleInfo.title}}</p>
                    <p>{{circleInfo.memCount}}个成员 | {{circleInfo.questionCount}}题目</p>
                   
                </div>
                <div class="join" @click="join" v-if="!circleInfo.hasJoin">加入</div>
                <div class="join" v-else @click="quit">退出</div>
            </view>
            <view class="introduce">
                <p class="introTitle">简介</p>
                <p style="text-indent: 40px;">{{circleInfo.content}}</p>
	        </view>
            <view class="finished">
                <p class="introTitle">题目</p>
                <ul class="finish">
                    <li v-for="(item,index) of finishList" :key="item.id">
                        <span style="float: left;">{{item.title}}</span>
                        <icon type="success" color="green" size="20" style="float: right;"/>
                    </li>
                </ul>
                 <ul class="todo">
                    <li v-for="(item,index) of todoList" :key="item.id" @click="toQuestion">
                        <span style="float: left;">{{item.title}}</span>
                        <icon type="waiting" color="orange" size="20" style="float: right;"/>
                    </li>
                </ul>
            </view>
	</view>

</template>

<script>
import toolkit from '../../util/toolkit'
export default {
	data() {
		return {
            circleId: '',
            circleInfo: {},
            finishList: [{
                id: 1,
                title: '二进制转换'
            },{
                id: 2,
                title: '二进制转换'
            }],
            todoList:[{
                id:1,
                title:'十六进制转换'
            },{
                 id: 2,
                title: '二进制转换'
            }]
		}
	},
	mounted(){
        this.circleId = this.$route.query.id
        this.circleId && this.getCircle()
    },
	methods: {
        getCircle(){
            let par = {
                circleId: this.circleId
            }
            uni.getStorage({
                key: 'userId',
                success(e) {
                    par.userId = e.data
                }
            })
            toolkit.post('/circle/getCircle', par).then(res => {
                res = res.data
                if(res.code == 0) {
                   this.circleInfo = res.data
                } else {
                    uni.showToast({
                        icon: "none",
                        title: res.message,
                        duration: 2000
                    })
                }
            })
        },
        join(){
            let that = this
            // 先判断用户是否登录
            uni.getStorage({
                key: 'userId',
                success(e) {
                    let userId = e.data
                    uni.showModal({
                        content: '确定加入圈子吗?',
                        success: function (res) {
                            if (res.confirm) {
                                let par = {
                                    circleId: that.circleId,
                                    userId: userId
                                }
                                toolkit.post('/circle/joinCircle', par).then(res => {
                                    res = res.data
                                    if(res.code == 0) {
                                        uni.showToast({
                                            icon: 'success',
                                            title: '加入成功',
                                            duration: 1000
                                        })
                                        that.getCircle()
                                    } else {
                                        uni.showToast({
                                            icon: 'none',
                                            title: res.message,
                                            duration: 1000
                                        })
                                    }
                                })
                            }
                        }
                    })
                },
                fail() {
                    uni.showModal({
                        content: '您未登录，请登录',
                        showCancel: false,
                        confirmText: '登录',
                        success: function (res) {
                            if (res.confirm) {
                                uni.navigateTo({
                                    url: '/pages/mine/login'
                                })
                            }
                        }
                    });
                }
            })
        },
        quit() {
            let that = this
            // 先判断用户是否登录
            uni.getStorage({
                key: 'userId',
                success(e) {
                    let userId = e.data
                    uni.showModal({
                        content: '确定退出圈子吗?',
                        success: function (res) {
                            if (res.confirm) {
                                let par = {
                                    circleId: that.circleId,
                                    userId: userId
                                }
                                toolkit.post('/circle/quitCircle', par).then(res => {
                                    res = res.data
                                    if(res.code == 0) {
                                        uni.showToast({
                                            icon: 'success',
                                            title: '退出成功',
                                            duration: 1000
                                        })
                                        that.getCircle()
                                    } else {
                                        uni.showToast({
                                            icon: 'none',
                                            title: res.message,
                                            duration: 1000
                                        })
                                    }
                                })
                            }
                        }
                    })
                }
            })
        },
        toQuestion(){
             uni.navigateTo({
                url: '/pages/question/question'
            })
        }
		
	}
}
</script>

<style lang="scss" scoped>
	.content {
		background-color: #fff;
		text-align: center;
		height: 760rpx;
		position: relative;
	}
   .topBlock{
        list-style: none;
        margin:20px 10px;
        display: flex;
        align-items: center;
        p{
            text-align: left;
        }
        span{
            color: #666;
            font-size: 18px;
        }
        image{
            width: 50px;
            height: 50px;
            margin:0 10px;
        }
        div{
            border-bottom: 1px solid #ccc;
            width: 66%;
        }
   }
 .introduce{
     text-align: left;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    margin:0 20px;
    .introTitle{
        font-size: 20px;
        font-weight: 600;
    }
    span{
         text-indent: 40px;
    }
 }
 .join{
        width: 50px !important;
        height: 30px;
        background-color: #e0e0e0;
        color: green;
        float: right;
        line-height: 30px;
        text-align: center;
    }
    .finished {
        text-align: left;
        margin-right: 10px;
        margin-top: 10px;
        .introTitle{
            margin-left:20px;
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 10px;
        }
        li {
            margin-bottom: 5px;
            span{
                color:#000;
            }
        }
        .finish{
            li{
                color:green;
            }
        }
        .todo{
            li{
                color:orange;
            }
        }
    }
    .todo li :hover{
        background-color: greenyellow;
    }
</style>

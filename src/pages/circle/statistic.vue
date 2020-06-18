<template>
	<view class="content">
		<view class="topBlock" v-for="(circleInfo, index) of list" :key="index" v-if="circleInfo.role == 1">
            <image :src="circleInfo.imgUrl"></image>
            <div style="margin-left: 10px">
                <p class="title">{{circleInfo.userName}}</p>
                <p>已回答{{circleInfo.answerCount}}道题目</p>
                
            </div>
        </view>
	</view>

</template>

<script>
import toolkit from '../../util/toolkit'
export default {
	data() {
		return {
            circleId: '',
            list: [],
            userId: ''
		}
    },
    onLoad(options){
        this.circleId = options.circleId
    },
	onShow(){
        let that = this
        uni.getStorage({
            key: 'userId',
            success(e) {
                that.userId = e.data
            }
        })
        // this.circleId = this.$route.query.id
        this.circleId && this.getList()
    },
	methods: {
        getList(){
            let par = {
                circleId: this.circleId
            }
            toolkit.post('/circle/statistics', par).then(res => {
                res = res.data
                if(res.code == 0) {
                    this.list = res.data
                    this.list.sort(function(a,b) {
                        return b.answerCount - a.answerCount
                    })
                } else {
                    uni.showToast({
                        icon: 'none',
                        title: res.message,
                        duration: 1000
                    })
                }
            })
        },
	}
}
</script>

<style lang="scss" scoped>
    button{
        width: 30%;
        height: 40px;
        background-color: green;
        line-height: 40px;
        margin-top: 20px;
    }
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

<template>
	<view class="content">
        <view class="title">{{ discussInfo.title }}</view>
        <view v-html="discussInfo.content"></view>
        <view class="discuss-title">讨论区</view>
        <view v-if="comment.length == 0">暂无回复</view>
        <view v-else style="margin-bottom: 65px">
            <view v-for="item of comment" :key="item.replyId" style="margin-bottom: 10px;">
                <view style="display: flex;align-items: center;">
                    <img :src="item.userImg" class="icon"/>
                    <span class="name">{{ item.userName }}</span>
                </view>
                <view class="comment">
                    {{ item.content }}    
                </view>
            </view>
        </view>
        <div class="bottom-block">
            <button class="bottom-btn" @click="toReply">参与讨论</button>
        </div>
	</view>
</template>

<script>
import Myeditor from '../../components/myComponents/editor/editor'
import toolkit from '../../util/toolkit'

export default {
    components:{Myeditor},
	data() {
		return {
            userId: '',
            discussId: '',
            discussInfo: {},
            comment: []
		}
	},
	onLoad(options) {
        this.discussId = options.id
        this.discussId && this.getInfo()
        let that = this
        uni.getStorage({
            key: 'userId',
            success(e){
                that.userId = e.data
            }
        })
    },
    onShow(){
        this.discussId = this.$route.query.id
        this.discussId && this.getReplyList()
    },
	methods: {
        getInfo(){
            let par = {
                discussId: this.discussId
            }
            toolkit.post("/discuss/getDiscuss", par).then(res => {
                res = res.data
                if(res.code == 0) {
                    this.discussInfo = res.data
                } else {
                    uni.showToast({
                        icon: 'none',
                        title: res.message,
                        duration: 1000
                    })
                }
            })
        },
        getReplyList() {
            let par = {
                discussId: this.discussId
            }
            toolkit.post("/discuss/getReplyList", par).then(res => {
                res = res.data
                if(res.code == 0) {
                    this.comment = res.data
                } else {
                    uni.showToast({
                        icon: 'none',
                        title: res.message,
                        duration: 1000
                    })
                }
            })
        },
		toReply() {
            uni.navigateTo({
                url: '/pages/comment/reply?id=' + this.discussId
            })
        }
	}
}
</script>

<style lang="scss" scoped>
	.content {
		background-color: #fff;
		text-align: center;
		height: 100%;
		position: relative;
        width: 100vw;
        .title {
            font-size: 24px;
            font-weight: bold;
            margin: 20px 0px;
            text-align: left;
            margin-left: 20px;
        }
        .discuss-title {
            text-align: left;
            margin: 20px 0px;
            margin-left: 20px;
            color: green;
            font-size: 24px;
            font-weight: 500;
        }
        .bottom-block {
            width: 100%;
            text-align: center;
            bottom: 10px;
            position: fixed;
        }
        .bottom-btn {
            background: green;
            width: 80%;
        }
        .icon {
            width: 40px;
            height: 40px;
            margin-left: 20px;
            margin-right: 20px;
        }
        .name {
            color: #5CACEE;
        }
        .comment {
            text-align: left;
            margin-left: 80px;
            margin-top: 5px
        }
	}
</style>
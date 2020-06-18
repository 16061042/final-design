<template>
	<view class="content">
        <view class="topbar">
            <view class="describe" v-html="questionInfo.content"></view>
            <Myeditor v-if="hasAnswer == 0" @setData="setData"></Myeditor>
            <view v-else>
                <view class="describe" style="color: green">我的答案</view>
                <view class="describe" v-html="answerInfo.content"></view>
                <view class="describe" style="color: green">参考答案</view>
                <view class="describe" v-html="questionInfo.answer"></view>
            </view>
        </view>
		
        <button class="submit"  @click="open" style="margin-bottom: 20px" v-if="hasAnswer == 0">提交</button>
	</view>

</template>

<script>
import Myeditor from '../../components/myComponents/editor/editor'
import toolkit from "../../util/toolkit"
export default {
    components:{Myeditor},
	data() {
		return {
           questionId: '',
           questionInfo: {},
           answerInfo: {},
           hasAnswer: '',
           myAnswer: ''
		}
	},
	onLoad(options) {
        this.questionId = options.id
        this.questionId && this.getQuestion()
        this.hasAnswer = options.hasAnswer
        if(this.hasAnswer == 1) {
            this.getAnswer()
        }
	},
	methods: {
        setData(val) {
            if(typeof(val) != "undefined") {
                this.myAnswer = val
            }
        },
        getQuestion() {
            let par ={
                questionId: this.questionId
            }
            toolkit.post('/question/getQuestion', par).then(res => {
                res = res.data
                if(res.code == 0) {
                    this.questionInfo = res.data
                } else {
                    uni.showToast({
                        icon: 'none',
                        title: res.message,
                        duration: 1000
                    })
                }
            })
        },
        getAnswer(){
            let that = this
            uni.getStorage({
                key: 'userId',
                success(e) {
                    let par = {
                        userId: e.data,
                        questionId: that.questionId
                    }
                    toolkit.post('/question/getAnswer', par).then(res => {
                        res = res.data
                        if(res.code == 0) {
                            that.answerInfo = res.data
                        } else {
                            uni.showToast({
                                icon: 'none',
                                title: res.message,
                                duration: 1000
                            })
                        }
                    })
                }
            })
        },
        open(){
            let that = this
            uni.showModal({
                title: '提示',
                content: '确认提交？',
                success: function (res) {
                    if (res.confirm) {
                        uni.getStorage({
                            key: 'userId',
                            success(e) {
                                let par = {
                                    questionId: that.questionId,
                                    userId: e.data,
                                    circleId: that.questionInfo.circleId,
                                    content: that.myAnswer.replace('img', 'img style="width: 100%25"')
                                }
                                toolkit.post('/question/answerQuestion', par).then(res => {
                                    res = res.data
                                    if(res.code == 0){
                                        uni.showToast({
                                            icon: 'success',
                                            title: '提交成功',
                                            duration: 1000
                                        })
                                        that.hasAnswer = "1"
                                        that.getAnswer()
                                    } else {
                                        uni.showToast({
                                            icon: 'none',
                                            title: res.message,
                                            duration: 1000
                                        })
                                    }
                                })
                            }
                        })
                    } else if (res.cancel) {
                    }
                }
            });
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
       
	}
   .answer .uni-textarea-compute{
        min-height: 150px !important;
    }
    .topbar{
        display: flex;
        flex-direction: column;
         .describe{
            word-wrap:break-all;
            text-align: left;
        }
        .describe{
            margin: 10px 5%;
        }
    }
  
   .submit{
       width:30%;
       height: 40px;
       background-color: green;
       line-height: 40px;
   }
</style>

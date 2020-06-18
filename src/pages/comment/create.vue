<template>
	<view class="content">
        <view class="topbar">
            <view class="input input1" style="margin-top: 50px;">
                <label>讨论标题</label>
                <input placeholder="请输入题目简介" v-model="title">    
            </view>
            <view class="input input1" style="margin-top: 10px;">
                <label>讨论内容</label>
            </view>
            <Myeditor @setData="setData"></Myeditor> 
        </view>	 
        <button class="submit"  @click="open" style="margin-bottom: 20px">提交</button>
	</view>

</template>

<script>
import uniIcons from '../../components/uni-icons/uni-icons'
import Myeditor from '../../components/myComponents/editor/editor'
import Myeditor1 from '../../components/myComponents/editor/editor-answer'
import toolkit from "../../util/toolkit"
export default {
    components: {uniIcons, Myeditor, Myeditor1},
	data() {
		return {
           userId: '',
           title: '',
           content: ''
		}
	},
	onLoad() {
        let that = this
        uni.getStorage({
            key: 'userId',
            success(e) {
                that.userId = e.data
            }
        })
	},
	methods: {
        setData(val) {
            if(typeof(val) != "undefined") {
                this.content = val
            }
        },
        open(){
            let that = this
            uni.showModal({
                title: '提示',
                content: '确认提交？',
                success: function (res) {
                    if (res.confirm) {
                        if(!that.title) {
                            uni.showToast({
                                icon: 'none',
                                title: '请输入讨论标题',
                                duration: 1000
                            })
                        } else if (!that.content) {
                            uni.showToast({
                                icon: 'none',
                                title: '请输入讨论内容',
                                duration: 1000
                            })
                        } else {
                            that.content = that.content.replace('img', 'img style="width: 100%25"')
                            let par = {
                                userId: that.userId,
                                title: that.title,
                                content: that.content
                            }
                            toolkit.post('/discuss/createDiscuss', par).then(res => {
                                res = res.data
                                if(res.code == 0) {
                                    uni.showToast({
                                        icon: 'success',
                                        title: '创建成功',
                                        duration: 1000
                                    })
                                    setTimeout(() => {
                                        uni.navigateTo({
                                            url: '/pages/comment/detail?id=' + res.data.discussId
                                        })
                                    },1000)
                                } else {
                                    uni.showToast({
                                        icon: 'none',
                                        title: res.message,
                                        duration: 1000
                                    })
                                }
                            })
                        }
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
        .answer{
            margin: 10px 0;
            text-align: left;
            flex: auto;
            border: 1px solid #000;
            min-height: 150px;
        }
        .input{
            display: flex;
            margin-left: 8%;
            input{
                border: 1px solid blue;
                width: 200px;
                height: 30px;
                margin:0 0 15px 10px;
                font-size: 20px;
            }
        }
    }
  
   .submit{
       width:30%;
       height: 40px;
       background-color: green;
       line-height: 40px;
   }
</style>

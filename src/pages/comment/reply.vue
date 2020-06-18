<template>
	<view class="content">
        <view class="topbar">
            <view style="margin-top: 50px;">
                <label>回复讨论内容</label>
            </view>
            <view style="display: flex;justify-content: center;">
                <textarea placeholder="请输入回复内容" v-model="content"></textarea>
            </view>
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
           content: '',
           discussId: ''
		}
	},
	onLoad(options) {
        this.discussId = options.id
        let that = this
        uni.getStorage({
            key: 'userId',
            success(e) {
                that.userId = e.data
            }
        })
	},
	methods: {
        open(){
            let that = this
            uni.showModal({
                title: '提示',
                content: '确认提交？',
                success: function (res) {
                    if (res.confirm) {
                        if (!that.content) {
                            uni.showToast({
                                icon: 'none',
                                title: '请输入回复内容',
                                duration: 1000
                            })
                        } else {
                            let par = {
                                userId: that.userId,
                                discussId: that.discussId,
                                content: that.content
                            }
                            toolkit.post('/discuss/replyDiscuss', par).then(res => {
                                res = res.data
                                if(res.code == 0) {
                                    uni.showToast({
                                        icon: 'success',
                                        title: '回复成功',
                                        duration: 1000
                                    })
                                    setTimeout(() => {
                                        uni.navigateBack()
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
        }
        textarea{
            border: 1px solid blue;
            // width: 200px;
            // height: 30px;
            margin-bottom: 40px;
            margin-top: 40px;
            font-size: 20px;
            text-align: left;
            padding: 5px;
        }
    }
  
   .submit{
       width:30%;
       height: 40px;
       background-color: green;
       line-height: 40px;
   }
</style>

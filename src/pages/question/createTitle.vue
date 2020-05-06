<template>
	<view class="content">
        <view class="topbar">     
            <Myeditor></Myeditor>   
        </view>	 
        <button class="submit"  @click="open">提交</button>
	</view>

</template>

<script>
import uniIcons from '../../components/uni-icons/uni-icons'
import Myeditor from '../../components/myComponents/editor/editor'
export default {
    components: {uniIcons,  Myeditor},
	data() {
		return {
           
		}
	},
	onLoad() {
	},
	methods: {
       open(){
         uni.showModal({
            title: '提示',
            content: '确认提交？',
            success: function (res) {
                if (res.confirm) {
                    console.log('用户点击确定');
                } else if (res.cancel) {
                    console.log('用户点击取消');
                }
            }
        });
      },
       onEditorReady() {
                uni.createSelectorQuery().select('#editor').context((res) => {
                    this.editorCtx = res.context
                }).exec()
            },
		
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
    }
  
   .submit{
       width:30%;
       height: 40px;
       background-color: green;
       line-height: 40px;
   }
</style>

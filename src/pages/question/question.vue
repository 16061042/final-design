<template>
	<view class="content">
        <view class="topbar">
            <view class="describe">
           {{ question }}
             </view>
            <Myeditor></Myeditor>
        </view>
		
        <button class="submit"  @click="open">提交</button>
	</view>

</template>

<script>
import Myeditor from '../../components/myComponents/editor/editor'

export default {
    components:{Myeditor},
	data() {
		return {
           question:'请填写bool , float,  指针变量 与“零值”比较的if  语句。'
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

<template>
	<view class="content">
        <ul v-for='item of discussList' :key='item.discussId'>
            <li>
                <p>· {{item.title}}</p>
                <div class="join" @click="toDetail(item.discussId)">详情</div>
            </li>
        </ul>
        <div class="bottom-block">
            <button class="bottom-btn" @click="toCreate">创建讨论</button>
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
           question:'请填写bool , float,  指针变量 与“零值”比较的if  语句。',
           userId: '',
           discussList: []
		}
	},
	onLoad() {
        let that = this
        uni.getStorage({
            key: 'userId',
            success(e){
                that.userId = e.data
            }
        })
    },
    onShow() {
        this.getList()
    },
	methods: {
        getList(){
            toolkit.post("/discuss/getDiscussList").then(res => {
                res = res.data
                if(res.code == 0) {
                    this.discussList = res.data
                } else {
                    uni.showToast({
                        icon: 'none',
                        title: res.message,
                        duration: 1000
                    })
                }
            })
        },
        toCreate() {
            uni.navigateTo({
                url: '/pages/comment/create'
            })
        },
		toDetail(id) {
            uni.navigateTo({
                url: '/pages/comment/detail?id=' + id
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
   ul {
       margin-left: -10px;
   }
   li {
       display: flex;
       justify-content: space-between;
       margin: 15px 0px;
   }
    .join{
        width: 60px;
        height: 30px;
        background-color: #e0e0e0;
        color: green;
        // float: right;
        line-height: 30px;
        text-align: center;
        margin-right: 20px;;
    }
    .bottom-block {
        width: 100%;
        text-align: center;
        bottom: 52px;
        position: fixed;
    }
    .bottom-btn {
        background: green;
        width: 80%;
    }
</style>

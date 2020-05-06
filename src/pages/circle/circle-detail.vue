<template>
	<view class="content">
		  <view class="topBlock">
                <image src='../../static/c.png'></image>
                <div>
                    <p class="title">{{item.name}}</p>
                    <p>{{item.memberCount}}个成员 | {{item.questionCount}}题目</p>
                   
                </div>
                 <div class="join" @click="join">加入</div>
                
            </view>
            <view class="introduce">
                <p class="introTitle">简介</p>
                <p style="text-indent: 40px;">{{item.introduce}}</p>
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
export default {
	data() {
		return {
            item: {
                id:3,
                name:'测试3',
                memberCount:999,
                questionCount:8585767,
                introduce:'C语言是一门面向过程的、抽象化的通用程序设计语言，广泛应用于底层开发。C语言能以简易的方式编译、处理低级存储器。C语言是仅产生少量的机器语言以及不需要任何运行环境支持便能运行的高效率程序设计语言。尽管C语言提供了许多低级处理的功能，但仍然保持着跨平台的特性，以一个标准规格写出的C语言程序可在包括类似嵌入式处理器以及超级计算机等作业平台的许多计算机平台上进行编译。'
            },
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
	onLoad() {

	},
	methods: {
        join(){
          uni.showModal({
            title: '提示',
            content: '确定加入吗',
            success: function (res) {
            if (res.confirm) {
                console.log('用户点击确定');
            } else if (res.cancel) {
                console.log('用户点击取消');
            }
            }
});
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

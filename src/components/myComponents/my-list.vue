<template>
	<view class="content">
        <view class="title">
             <span>{{title}}</span>
            <span class="allList">全部 ></span>
        </view>
       
		<ul v-for='item in list' :key='item.id'>
            <li>
                <span>{{item.id}}</span>
                <image src='../../static/c.png'></image>
                <div>
                    <p>{{item.name}}</p>
                    <p>{{item.memberCount}}个成员 | {{item.questionCount}}题目</p>
                </div>
                <div class="join" @click="toDetail">详情</div>
            </li>
           
        </ul>
		
	</view>
	
</template>

<script>
export default{
    data(){
        return{
            title:'热门优选榜',
            list:[
                {
                    id:1,
                    name:'测试1',
                    memberCount:999,
                    questionCount:8888
                },
                {
                    id:2,
                    name:'测试2',
                     memberCount:999,
                     questionCount:99885
                },
                {
                    id:3,
                    name:'测试3',
                    memberCount:999,
                    questionCount:8585767
                }
            ]
        }

    },
    methods: {
        toDetail(){
            uni.navigateTo({
                url: '/pages/circle/circle-detail'
            })
        }
    }
}
</script>

<style scoped>
*{
    margin:0;
    padding: 0;
}
	.content {
        background-color: #fff;
		text-align: center;
		height: 760rpx;
		position: relative;
	}
    ul{
        text-align: left;
    }
	ul li{
        list-style: none;
        margin:20px 10px;
        display: flex;
        align-items: center;
    }
    ul li span{
        color: #666;
        font-size: 18px;
    }
    ul li image{
        width: 50px;
        height: 50px;
        margin:0 10px;
    }
    ul div{
        border-bottom: 1px solid #ccc;
        width: 60%;
    }
    .join{
        width: 60px;
        height: 30px;
        background-color: #e0e0e0;
        color: green;
        float: right;
        line-height: 30px;
        text-align: center;
    }
    .title{
        text-align: left;
        margin:10px 12px;
        font-size: 20px;
        font-weight: 600;
    }
    .allList{
        float: right;
    }
</style>

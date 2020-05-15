<template>
	<view class="content">
        <view class="title">
            <span v-if="myTitle">{{myTitle}}</span>
            <span v-else>{{title}}</span>
            <span class="allList" v-if="!myTitle">全部 ></span>
        </view>
       
		<ul v-for='(item, index) of circleList' :key='item.circleId'>
            <li>
                <span>{{index + 1}}</span>
                <image :src="item.imgUrl"></image>
                <div>
                    <p>{{item.title}}</p>
                    <p>{{item.memCount}}个成员 | {{item.questionCount}}题目</p>
                </div>
                <div class="join" @click="toDetail(item.circleId)">详情</div>
            </li>
           
        </ul>
		
	</view>
	
</template>

<script>
export default{
    props: {
        circleList: {
            type: Array,
            default: []
        },
        myTitle : {
            type: String,
            default: ''
        }
    },
    data(){
        return{
            title: '热门优选榜'
        }
    },
    methods: {
        toDetail(id){
            uni.navigateTo({
                url: '/pages/circle/circle-detail?id=' + id
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

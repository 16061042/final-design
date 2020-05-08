<template>
	<view class="content">
        <view class="input input1">
            <label>学号</label>
		    <input placeholder="请填入学号" v-model="account">
        </view>
        <view class="input">
            <label>密码</label>
		    <input type="password" v-model="password" placeholder="请填入密码">
        </view>
       
        <button @click="login">登录</button>
        <button @click="toredister">注册</button>
	</view>
	
</template>

<script>
import toolkit from '../../util/toolkit'
export default{
	data(){
		return{
            account: '',
            password: ''
		}
    },
    methods:{
        toredister(){
            uni.navigateTo({
                url: '/pages/mine/register'
            })
        },
        login(){
            let par= {
                account: this.account,
                passWord: this.password
            }
            toolkit.post('/user/login', par).then(res => {
                res = res.data
                if(res.code == 0){
                    uni.showToast({
                        icon: "success",
                        title: '登录成功',
                        duration: 1000
                    })
                    setTimeout(() => {
                        uni.setStorage({
                            key: 'userId',
                            data: res.data.userId,
                            success: function () {
                                uni.switchTab({
                                    url: '/pages/index/home'
                                })
                            }
                        })
                    }, 1000)
                } else {
                    uni.showToast({
                        icon: "none",
                        title: res.message,
                        duration: 2000
                    })
                }
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
	.input{
        display: flex;
        margin-left: 15%;
        input{
            border: 1px solid blue;
            width: 200px;
            height: 30px;
            margin:0 0 15px 10px;
            font-size: 20px;

        }
        
    }
    .input1{
            padding-top:30%;
        }
    button{
        display: inline-block;
        width: 30%;
        height: 40px;
        margin:20px;
        background-color: green;
        line-height: 40px;
    }
    </style>

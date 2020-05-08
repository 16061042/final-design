<template>
	<view class="content">
        <view class="input input1">
            <label>学号</label>
		    <input v-model="account" placeholder="请填入学号">
        </view>
        <view class="input input2">
            <label>手机号</label>
		    <input v-model="phone" placeholder="请填入手机号">
        </view>
        <view class="input">
            <label>密码</label>
		    <input type="password" v-model="password" placeholder="请填入密码">
        </view>
         <view class="input input3">
            <label>确认密码</label>
		    <input type="password" v-model="confirm" placeholder="请填入密码">
        </view>
        <button @click="register">注册</button>
	</view>
	
</template>

<script>
import toolkit from '../../util/toolkit'
export default{
	data(){
		return{
            account: '',
            password: '',
            confirm: '',
            phone: ''
		}
    },
    methods: {
        register(){
            if(this.password == this.confirm) {
                let par = {
                    account: this.account,
                    passWord: this.password,
                    phone: this.phone,
                    role: 1
                }
                toolkit.post('/user/register', par).then(res => {
                    res = res.data
                    if(res.code == 0){
                    uni.showToast({
                        icon: "success",
                        title: '注册成功, 自动登录',
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
            } else {
                uni.showToast({
                    icon: 'none',
                    title: '前后密码请一致',
                    duration: 1000
                })
            }
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
    .input3{
        margin-left: 5%;
    }
    .input2{
        margin-left: 10%;
    }
    button{
        width: 30%;
        height: 40px;
        background-color: green;
        line-height: 40px;
    }
    </style>

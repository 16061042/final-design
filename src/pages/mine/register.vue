<template>
	<view class="content">
        <view class="input input1">
            <label>学号</label>
		    <input type="number" maxlength="10" minlength="8" placeholder="请填入学号">
        </view>
        <view class="input">
            <label>密码</label>
		    <input type="text" minlength="6" maxlength="10" placeholder="请填入密码">
        </view>
         <view class="input input3">
            <label>确认密码</label>
		    <input type="text" minlength="6" maxlength="10" placeholder="请填入密码">
        </view>
        <button>注册</button>
	</view>
	
</template>

<script>
export default{
	data(){
		return{

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
    button{
        width: 30%;
        height: 40px;
        background-color: green;
        line-height: 40px;
    }
    </style>

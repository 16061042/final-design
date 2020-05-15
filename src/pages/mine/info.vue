<template>
	<view class="content">
        <view class="input spe" style="margin-top:100px;">
            <label>头像</label>
		    <image src='https://oss.5kong.com/app/test/2020/05/09/42b1e9a989be2a3b4da4605af0a03041.jpg' v-if="!newInfo.img"></image>
            <image :src="newInfo.img" v-else></image>
            <el-upload
                class="upload-demo"
                action="http://account.5kong.com/api/common/uploadOss"
                :on-success="upload"
                :file-list="fileList"
                :show-file-list="false"
                >
                <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
        </view>
        <view class="input input2">
            <label>手机号</label>
		    <input v-model="phone" placeholder="请填入手机号">
        </view>
        <view class="input input2">
            <label>旧密码</label>
		    <input type="password" v-model="oldPwd" placeholder="请填入密码">
        </view>
        <view class="input input2">
            <label>新密码</label>
		    <input type="password" v-model="newPwd" placeholder="请填入密码">
        </view>
         <view class="input input3">
            <label>确认密码</label>
		    <input type="password" v-model="newConfirm" placeholder="请填入密码">
        </view>
        <button @click="update">修改</button>
	</view>
	
</template>

<script>
import toolkit from '../../util/toolkit'
export default{
	data(){
		return{
            fileList: [],
            oldInfo: {},
            newInfo: {},
            oldPwd: '',
            newPwd: '',
            newConfirm: '',
            userId: '',
            phone: ''
		}
    },
     onShow(){
        if(!this.userId){
            let that = this
            uni.getStorage({
                key: 'userId',
                success(e) {
                    that.userId = e.data
                }
            })
        }
        toolkit.post('/user/getInfo', {
            userId: this.userId
        }).then(res => {
            res = res.data
            if (res.code == 0) {
                this.newInfo = res.data
                this.oldInfo = res.data
                this.phone = this.newInfo.userPhone
            } else {
                uni.showToast({
                    icon: 'none',
                    title: res.message,
                    duration: 1000
                })
            }
        })
    },
    methods: {
       upload(response, file, fileList){
           this.fileList = []
           if(response.code == 0){
               uni.showToast({
                    icon: 'success',
                    title: '上传成功',
                    duration: 1000
                })
               this.newInfo.img = response.data.url
           } else {
               uni.showToast({
                   icon: 'none',
                   title: '上传失败',
                   duration: 2000
               })
           }
       },
       update(){
           if(this.newPwd != this.newConfirm) {
               uni.showToast({
                   icon: 'none',
                   title: '前后两次密码不同',
                   duration: 1000
               })
           } else {
               let par = {
                   userId: this.userId,
                   account: this.oldInfo.userName,
                   phone: this.phone,
                   role: this.oldInfo.role,
                   oldPwd: this.oldPwd,
                   newPwd: this.newPwd,
                   img: this.newInfo.img || "https://oss.5kong.com/app/test/2020/05/09/42b1e9a989be2a3b4da4605af0a03041.jpg"
               }
               toolkit.post('/user/update', par).then(res => {
                   res = res.data
                   if(res.code == 0) {
                       uni.showToast({
                           icon: 'success',
                           title: '修改成功',
                           duration: 1000
                       })
                       setTimeout(() => {
                           uni.switchTab({
                               url: '/pages/mine/myMessage'
                           })
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
            width: 250px;
            height: 40px;
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
    uni-label{
        margin-top: 10px;
    }
    uni-image{
        width: 50px;
        height: 50px;
        margin: 0 0 15px 10px;
    }
    .upload-demo{
        margin-left: 10px;
        margin-top: 6px
    }
</style>
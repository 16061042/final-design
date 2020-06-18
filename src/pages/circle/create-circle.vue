<template>
	<view class="content">
        <view class="input spe" style="margin-top:100px;">
            <label>头图</label>
		    <image src='https://oss.5kong.com/app/test/2020/05/09/42b1e9a989be2a3b4da4605af0a03041.jpg' v-if="!img"></image>
            <image :src="img" v-else></image>
            <button @click="upload" class="upload-demo">点击上传</button>
        </view>
        <view class="input input2">
            <label>标题</label>
		    <input v-model="title" placeholder="请填入标题">
        </view>
        <view class="input input2">
            <label>内容</label>
		    <textarea type="password" v-model="content" placeholder="请填入内容"></textarea>
        </view>
        <button @click="create">创建</button>
	</view>
	
</template>

<script>
import toolkit from '../../util/toolkit'
export default{
	data(){
		return{
            userId: '',
            title: '',
            content: '',
            img: ''
		}
    },
     onShow(){
        let that = this
        uni.getStorage({
            key: 'userId',
            success(e) {
                that.userId = e.data
            }
        })
    },
    methods: {
       upload(){
            let that = this
            uni.chooseImage({
                success: function (chooseImageRes) {
                    const tempFilePaths = chooseImageRes.tempFilePaths;
                    uni.uploadFile({
                        url: 'http://account.5kong.com/api/common/uploadOss', 
                        filePath: tempFilePaths[0],
                        name: 'file',
                        success: function (res) {
                            res = JSON.parse(res.data)
                            if(res.code == 0) {
                                that.img = res.data.url
                                uni.showToast({
                                    icon: "success",
                                    title: '上传成功',
                                    duration: 1000
                                })
                            } else {
                                uni.showToast({
                                    icon: "none",
                                    title: '上传失败',
                                    duration: 1000
                                })
                            }
                        }
                    });
                }
            });
       },
       create(){
            if (!this.title) {
                uni.showToast({
                    icon: 'none',
                    title: '请输入标题',
                    duration: 1000
                })
            } else if (!this.content) {
                uni.showToast({
                    icon: 'none',
                    title: '请输入内容',
                    duration: 1000
                })
            } else {
                let par = {
                    userId: this.userId,
                    title: this.title,
                    content: this.content,
                    imgUrl: this.img || "https://oss.5kong.com/app/test/2020/05/09/42b1e9a989be2a3b4da4605af0a03041.jpg"
                }
                toolkit.post('/circle/createCircle', par).then(res => {
                    res = res.data
                    if(res.code == 0) {
                        uni.showToast({
                            icon: 'success',
                            title: '创建成功',
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
        margin-left: 10%;
        margin-bottom: 20px;
        input{
            border: 1px solid blue;
            width: 250px;
            height: 40px;
            margin:0 0 15px 10px;
            font-size: 20px;
            text-align: left;
        }
        textarea{
            border: 1px solid blue;
            width: 250px;
            margin:0 0 15px 10px;
            font-size: 20px;
            text-align: left;
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
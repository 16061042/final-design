<template>
  <div class="home">
    <button @click="handleclick()" v-if="start">语音输入</button>
    <button @click="handleclicks()" v-else>结束录音</button>
  </div>
</template>

<script>
import toolkit from "../../util/toolkit"
import Recorder from 'js-audio-recorder'
let recorder = new Recorder({
    sampleBits: 16,         // 采样位数，支持 8 或 16，默认是16
    sampleRate: 16000,      // 采样率，支持 11025、16000、22050、24000、44100、48000，根据浏览器默认值，我的chrome是48000
    numChannels: 1,         // 声道，支持 1 或 2， 默认是1
    compiling: false
})
export default {
  name: 'home',
  data() {
      return {
          base64: '',
          size: '',
          start: true
      }
  },
    methods: {
        handleclick () {
            this.start = false
            recorder.start()// 开始录音
        },
        handleclicks () {
            recorder.stop() // 结束录音
            this.size = recorder.size
            this.blobToDataURI(recorder.getPCMBlob())
        },
        blobToDataURI(blob) {
            let that = this
            var reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onload = function (e) {  
                that.base64 = e.target.result
                that.base64 = that.base64.split(";base64,")[1]
                let par = {
                    "format": "pcm",
                    "rate": 16000,
                    "dev_pid": 1537,
                    "channel": 1,
                    "token": '24.82e39e674fa7024189ffa1137c404057.2592000.1594294537.282335-20313042',
                    "cuid": "yf_workshop",
                    "len": blob.size,
                    "speech": that.base64
                }
                toolkit.post('/voice/translate', par).then(res => {
                    that.start = true
                    // uni.showToast({
                    //     icon: 'none',
                    //     title: res.data.result[0]
                    // })
                    that.$emit('set', res.data.result[0])
                })
            }
        }
    }
}
</script>
<style scoped>
.home {
    margin-bottom: -20px;
}
button {
    width: 100px;
    height: 40px;
    background-color: green;
    line-height: 40px;
}
</style>
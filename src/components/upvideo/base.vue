<!--
 * @Author: your name
 * @Date: 2020-07-03 10:59:57
 * @LastEditTime: 2020-07-24 13:29:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \mipinshopmall\src\components\videoLoad\videoLoad.vue
-->

<template>
    <div>
        <template v-if="videoUrl !== ''">
            <div class="warpper" @mouseenter="falg=true" @mouseleave="falg=false">
                <div class="box" v-if="falg">
                    <i class="el-icon-delete" @click="del"></i>
                </div>
                <video :src="videoUrl" class="video" preload controls>对不起，你的浏览器暂不支持video播放，请更换浏览器</video>
            </div>
        </template>
        <el-upload
            style="width: 40%"
            ref="upload"
            class="upload-demo"
            drag
            action="https://api.mipinclub.com/file_upload"
            :before-upload="beforeUpload"
            :on-success="uploadSuccess"
            :show-file-list="false"
            v-else
        >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
                将视频拖到此处，或
                <em>点击上传</em>
            </div>
            <div class="el-upload__tip hauto" slot="tip">只能上传mp4文件，且不超过5M</div>
        </el-upload>
    </div>
</template>

<script>
export default {
    name: "upload",
    props: ["url"],
    model: {
        prop: "url",
        event: "change_url",
    },
    data() {
        return {
            videoUrl: "",
            falg: false,
        };
    },
    methods: {
        // 视频上传之前的判断
        beforeUpload(file) {
            if (file.type !== "video/ogg" && file.type !== "video/mp4") {
                this.$message.error("请上传mp4或者ogg格式视频");
                return false;
            } else {
                const url = URL.createObjectURL(file);
                var audioElement = new Audio(url);
                audioElement.addEventListener("loadedmetadata", () => {
                    this.videoTime = audioElement.duration.toFixed(2);
                });
            }
        },
        // 上传成功
        uploadSuccess(res, file, fileList, str) {
            this.videoUrl = res.url;
        },
        del() {
            this.videoUrl = "";
        },
    },
    computed: {
        urls() {
            return this.url;
        },
    },
    watch: {
        urls() {
            this.videoUrl = this.url;
        },
        videoUrl(url) {
            this.$emit("change_url", url);
        },
    },
    created() {
        this.videoUrl = this.url;
    },
};
</script>

<style lang = 'less' scoped>
.video {
    width: 200px;
    height: 200px;
}
.warpper {
    width: 200px;
    height: 200px;
    position: relative;
}
.warpper .box {
    width: 200px;
    height: 120px;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0.7;
    z-index: 900;
}
.warpper .box .el-icon-delete {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* top: 0;
	left: 0; */
    font-size: 30px;
    border-radius: 50%;
    background: rgb(192, 196, 204);
    cursor: pointer;
    opacity: 1;
    z-index: 1000;
    display: block;
}
</style>

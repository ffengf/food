<template>
    <div id="list">
        <div
            class="warpper"
            @mouseenter="falg=index"
            @mouseleave="falg=-1"
            v-for="(ele,index) in list"
            :key="index"
        >
            <div class="box" v-if="falg === index">
                <i class="el-icon-delete" @click="del(index)"></i>
            </div>
            <video :src="ele.url" class="video" preload controls width="200" height="200">对不起，你的浏览器暂不支持video播放，请更换浏览器</video>
        </div>
        <el-upload
            class="upload-demo"
            :action="api"
            :before-upload="beforeUpload"
            :on-success="uploadSuccess"
            :show-file-list="false"
        >
            <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
    </div>
</template>

<script lang="ts">
import {
    Vue,
    Component,
    Watch,
    Prop,
    Model,
    Emit,
} from "vue-property-decorator";

interface cover {
    url: string;
    cover?: string;
}

@Component
export default class extends Vue {

	falg = -1

    @Model("change_list", { type: Array, required: true })
    readonly list!: cover[];

    @Emit("change_list")
    change_list(data: cover[]) {
        return data;
    }

    @Prop({ type: Boolean, default: false })
    useImg!: boolean;

    beforeUpload(file: HTMLFieldSetElement) {
        if (file.type !== "video/ogg" && file.type !== "video/mp4") {
            this.$message.error("请上传mp4或者ogg格式视频");
            return false;
        }
    }

    uploadSuccess({ cover, url, ..._ }: cover) {
        this.change_list([...this.list, { cover, url }]);
    }


    del(index: number) {
        this.change_list(this.list.filter((_, i) => i !== index));
    }

    get api() {
        return `${process.env.VUE_APP_UPLOAD}?cut=1`;
    }
}
</script>

<style lang='less' scoped>
#list{
	display: flex;
	flex-wrap: wrap;
}
.warpper {
	width: 200px;
	height: 200px;
	position: relative;
	margin:10px;
}
.warpper .box{
	width: 200px;
	height: 120px;
	position: absolute;
	top: 0;
	left: 0;
	opacity:0.7;
	z-index: 900;
}
.warpper .box .el-icon-delete{
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%,-50%);
	/* top: 0;
	left: 0; */
	font-size: 30px;
	border-radius: 50%;
	background: rgb(192, 196, 204);
	cursor: pointer;
	opacity:1;
	z-index: 1000;
	display: block;
}
</style>

<template>
    <div>
        <div @click="showKey = true" class="warpper" v-if="list.length !== 1">
            <img :src="list[0]" />
            <span>{{ list.length }}张图片</span>
        </div>
        <span v-else>暂无图片</span>
        <el-dialog
            title="图片列表"
            :visible.sync="showKey"
        >
            <template v-for="(ele, index) in list">
                <el-image
                    :src="ele"
                    :key="index"
                    class="el-image"
                    @click="show(ele)"
                ></el-image>
            </template>
            <el-dialog
                width="30%"
                title="图片"
                :visible.sync="innerVisible"
                append-to-body
            >
                <img width="100%" :src="img" alt />
            </el-dialog>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component
export default class extends Vue {
    @Prop({ type: Array, default: () => [] })
    list!: string[];

	showKey = false;
	innerVisible = false;
	img = ''

	show(e:string){
		this.img = e
		this.innerVisible = true
	}
}
</script>

<style lang="less" scoped>
.warpper {
    cursor: pointer;
    img {
        width: 100px;
    }
}
span {
    font-size: 12px;
}
.el-image {
    width: 100px;
    height: 100px;
    margin-left: 10px;
    cursor: pointer;
}
</style>

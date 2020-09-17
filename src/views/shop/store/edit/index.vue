<template>
    <div>
        <PageHeader />
        <div class="box mt20">

        </div>
		<el-dialog :visible.sync="dialogVisible" :append-to-body="true">
            <Map @sendData="sendData" />
        </el-dialog>
    </div>
</template>

<script lang='ts'>
import { Vue, Component, Watch } from "vue-property-decorator";
import PageHeader from "@/components/pageHeader/index.vue";
import VideoList from "@/components/upvideo/list.vue";
import Map from "@/components/map/index.vue"
import { video } from "@/views/shop/api"
@Component({
    components: {
        PageHeader,
		VideoList,
		Map
    },
})
export default class extends Vue {
    info = {
        arr: [],
	};
	dialogVisible = true

    get id() {
        return this.$route.params.id;
	}

	sendData(e:any){
		console.log(e)
	}
}
</script>

<style lang="less" scoped>
</style>
<style>
</style>

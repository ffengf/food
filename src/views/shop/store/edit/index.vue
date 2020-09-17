<template>
    <div>
        <PageHeader />
        <div class="box mt20">

        </div>
    </div>
</template>

<script lang='ts'>
import { Vue, Component, Watch } from "vue-property-decorator";
import PageHeader from "@/components/pageHeader/index.vue";
import VideoList from "@/components/upvideo/list.vue";
import { video } from "@/views/shop/api"
@Component({
    components: {
        PageHeader,
        VideoList,
    },
})
export default class extends Vue {
    info = {
        arr: [],
	};

    get id() {
        return this.$route.params.id;
    }
}
</script>

<style lang="less" scoped>
</style>
<style>
</style>

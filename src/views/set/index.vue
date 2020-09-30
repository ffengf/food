<template>
    <div>
        <el-menu
            :default-active="defaultActive"
            class="el-menu-demo"
            mode="horizontal"
            router
        >
            <el-menu-item index="/set/default" v-if="root">合同设置</el-menu-item>
        </el-menu>
        <div class="pd20">
            <Rview />
        </div>
    </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import Rview from "@/components/routerView/index.vue";
import { UserModule } from "@/model/user";
import { user_level } from "@/types/global";
@Component({
    components: {
        Rview,
    },
})
export default class extends Vue {
    get defaultActive() {
		const [one,two] = (this.$route.path as string).split('/').filter(x => x !== '')
        return `/${one}/${two}` ;
    }

    get level() {
        return UserModule.user_level;
    }

    get root() {
        return this.level === user_level.root;
    }

    get admin() {
        return this.level === user_level.admin;
    }
}
</script>

<style>
</style>

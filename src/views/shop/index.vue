<template>
    <div>
        <el-menu
            :default-active="defaultActive"
            class="el-menu-demo"
            mode="horizontal"
            router
        >
            <el-menu-item index="/shop/store" v-if="root">店铺管理</el-menu-item>
            <el-menu-item index="/shop/goods" v-if="admin">菜品列表</el-menu-item>
            <el-menu-item index="/shop/vclass" v-if="root">套餐分类</el-menu-item>
            <el-menu-item index="/shop/package" v-if="root">套餐管理</el-menu-item>
            <el-menu-item index="/shop/class" v-if="admin">普通商品分类</el-menu-item>
			<el-menu-item index="/shop/join" v-if="root">店铺入驻</el-menu-item>
            <!-- <el-menu-item index="/shop/remark">评论管理</el-menu-item> -->
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

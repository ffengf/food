<template>
    <div>
        <el-menu
            :default-active="defaultActive"
            class="el-menu-demo"
            mode="horizontal"
			router
        >
			<el-menu-item index="/shop/store" v-if="level === 1">店铺管理</el-menu-item>
			<el-menu-item index="/shop/goods">商品列表</el-menu-item>
			<el-menu-item index="/shop/package" v-if="level === 1">套餐分类</el-menu-item>
			<el-menu-item index="/shop/class" v-if="level === 2">商品分类</el-menu-item>
			<el-menu-item index="/shop/remark">评论管理</el-menu-item>
        </el-menu>
        <div class="pd20">
			<Rview />
		</div>
    </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import Rview from "@/components/routerView/index.vue";
import { UserModule } from '@/model/user';
@Component({
    components: {
        Rview,
    },
})
export default class extends Vue {
	get defaultActive() {
        return this.$route.path;
    }

	get level(){
		return UserModule.user_level
	}
}
</script>

<style>
</style>

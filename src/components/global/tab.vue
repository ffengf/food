<template>
    <div>
        <el-menu class="menu" :router='true' :default-active="defaultActive">
            <el-menu-item index="/home">主页</el-menu-item>
            <el-menu-item index="/order">订单管理</el-menu-item>
			<el-menu-item index="/shop">商品管理</el-menu-item>
			<!-- <el-menu-item index="/user">用户管理</el-menu-item> -->
			<!-- <el-menu-item index="/set">系统设置</el-menu-item> -->
        </el-menu>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
@Component
export default class extends Vue {
    get defaultActive() {
        return '/' + (this.$route.path as string).split('/').filter(x => x !== '')[0];
    }
}
</script>

<style lang='less' scoped>
.menu{
	height: 100%;
}
</style>

<template>
    <el-breadcrumb>
        <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="(item, index) in list" :key="index" :to="item">{{item.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script lang='ts'>
import { Vue, Component, Watch } from "vue-property-decorator";
import { RouteRecord } from 'vue-router';

@Component
export default class extends Vue {
	list: RouteRecord[] = [];


	@Watch('$route')
	getRouterList(){
		this.list = this.$route.matched.slice(1)
	}


	created(){
		this.getRouterList()
	}

}
</script>

<style>
</style>

<template>
	<div class="box">
		<el-page-header @back="$router.go(-1)" :content="contnet"></el-page-header>
	</div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";

@Component
export default class extends Vue{
	get contnet(){
		return this.$route.meta.title
	}
}
</script>

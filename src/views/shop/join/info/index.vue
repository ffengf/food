<template>
	<span>
		hello wolrd
	</span>
</template>

<script lang='ts'>
import { Vue, Component, Watch } from "vue-property-decorator";
import { api_join, apply_type, join_list, join_status } from "@/views/shop/api";


@Component
export default class extends Vue {
	info = {

	}

	async get_info(){
		const info = api_join.get_info(this.id)
		this.info = info
	}

	get id(){
		return this.$route.params.id
	}

	created(){
		this.get_info()
	}
}
</script>

<style>

</style>

<template>
	<div>
		<div class="box bbb" style="margin-bottom: 15px;" v-for="ele in info" :key="ele.id">
            <h1>{{ ele.title }}</h1>
			<br>
			<Editor v-model="ele.contract" />
			<el-button class="btn" type="primary" @click="save(ele)">保存</el-button>
        </div>
	</div>
</template>

<script lang='ts'>
import Editor from "@/components/editor/index.vue";
import { Vue, Component } from "vue-property-decorator";
import { api_set,set_info } from "@/views/set/api"
import { Id } from '@/types/global';
@Component({
	components:{
		Editor
	}
})
export default class extends Vue {
	info:set_info[] = []


	async save(val:set_info){
		await api_set.save(val)
		this.$message.success('保存成功')
		this.get_info()
	}

	async get_info(){
		const info = await api_set.get_info()
		this.info = info
	}


	created(){
		this.get_info()
	}
}
</script>

<style scoped>
.bbb{
	position: relative;
	padding-bottom: 50px;
}
.bbb .btn{
	position: absolute;
	bottom:3px;
	right: 20px;
}
</style>

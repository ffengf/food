<template>
	<div>
		<div class="box bbb" style="margin-bottom: 15px;">
            <h1>合同申明:</h1>
			<br>
			<Editor v-model="info.contract" />
			<el-button class="btn" type="primary" @click="save">保存</el-button>
        </div>
	</div>
</template>

<script lang='ts'>
import Editor from "@/components/editor/index.vue";
import { Vue, Component } from "vue-property-decorator";
import { api_set } from "@/views/set/api"
@Component({
	components:{
		Editor
	}
})
export default class extends Vue {
	info = {
		contract:""
	}


	async save(){
		await api_set.save(this.info)
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

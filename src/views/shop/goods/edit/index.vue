<template>
    <div>
        <PageHeader />
        <div class="box mt20">
			<el-steps :active="stepActive" finish-status="success" simple>
				<el-step title="基本信息"></el-step>
				<el-step title="配置规格"></el-step>
				<el-step title="设置价格"></el-step>
			</el-steps>
		</div>
		<div class="box mt20">
			<template v-if="stepActive === 0">
				<Step0 :info="info" @submit="submit" />
			</template>
			<template v-if="stepActive === 1">
				<Step1 :info="info" @submit="submit" />
			</template>
			<template v-if="stepActive === 2">
				<Step2 :info="info" @submit="submit" />
			</template>
		</div>
    </div>
</template>

<script lang='ts'>
import { Vue, Component, Watch } from "vue-property-decorator";
import { create_spu } from "@/views/shop/api";
import PageHeader from "@/components/pageHeader/index.vue";
import Step0 from "../components/step0.vue"
import Step1 from "../components/step1.vue"
import Step2 from "../components/step2.vue"
@Component({
    components: {
		PageHeader,
		Step0,
		Step1,
		Step2
    },
})
export default class extends Vue {

	stepActive = 0

    info: create_spu = {
        name: "",
        key_word: "",
        goods_desc: "",
        is_real_seal: true,
        goods_sale: 0,
        food_category_id: "",
        img_list: [],
        specification: {
			"规格类1":['']
		},
	};

	submit(){

	}

	async get_info(){

	}

	get id(){
		return this.$route.params.id
	}

	created(){
		if(this.id === undefined) return
		this.get_info()
	}
}
</script>

<style>
</style>

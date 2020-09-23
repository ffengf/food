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
                <Step0 :information="info" @submit="submit" />
            </template>
            <template v-if="stepActive === 1">
                <Step1 v-if="id === undefined" :information="info" @submit="submit" />
                <EditOption v-else :id="id" @submit="submit" />
            </template>
            <template v-if="stepActive === 2">
                <Step2 :id="send_id" />
            </template>
        </div>
    </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { create_spu, api_goods } from "@/views/shop/api";
import PageHeader from "@/components/pageHeader/index.vue";
import Step0 from "./components/step0.vue";
import Step1 from "./components/step1.vue";
import Step2 from "./components/step2.vue";
import EditOption from "./components/editOption.vue";
import { Id } from "@/types/global";

interface submit_arg {
	step: number
	info: create_spu
	go: number
}
@Component({
    components: {
        PageHeader,
        Step0,
        Step1,
        Step2,
        EditOption,
    },
})
export default class extends Vue {
    stepActive = -1;

    create_id: undefined | Id;

    info: create_spu = {
        name: "",
        key_word: "",
        goods_desc: "",
        is_real_seal: true,
        goods_sale: 0,
        food_category_id: "",
        img_list: [],
        specification: {
            规格类1: [""],
        },
    };

    async submit({ step, info, go }: submit_arg) {
        if (step === 0) {
            this.info = { ...this.info, ...info };
        }
        if (step === 0 && this.id !== undefined) {
            await api_goods.put_foods(info);
            this.$message.success("修改成功");
        }
        if (step === 1 && this.id === undefined) {
            this.info = { ...this.info, ...info };
            if (go === 1) {
                const { id } = await api_goods.create(info);
                this.create_id = id;
                this.$message.success("添加成功");
            }
        }
        if (step === 1 && this.id !== undefined) {
        }
        this.stepActive = this.stepActive + go;
    }

    async get_info() {
        const info = await api_goods.get_info(this.id as number);
        this.info = info;
        this.stepActive = this.init_step;
    }

    get id(): undefined | number {
        return this.$route.params.id as any;
	}

	get init_step():number{
		return this.$route.query.init === undefined ? 0 : Number(this.$route.query.init)
	}

	get send_id(){
		return this.create_id === undefined ? this.id : this.create_id
	}

    created() {
        if (this.id === undefined) {
            return (this.stepActive = 0);
        }
        this.get_info();
    }
}
</script>

<style>
</style>

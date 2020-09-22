<template>
    <div>
        <el-form label-width="160px" :rules="rules" ref="form" :model="info">
            <el-form-item label="店铺名称" prop="name">
                <el-input size="medium" v-model="info.name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="关键词" prop="key_word">
                <el-input size="medium" v-model="info.key_word" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="分类" prop="food_category_id">
                <el-select
                    v-model="info.food_category_id"
                    placeholder="请选择分类"
                    size="medium"
                    filterable
                >
                    <template v-for="ele in class_list">
                        <el-option :label="ele.name" :value="ele.id" :key="ele.id"></el-option>
                    </template>
                </el-select>
            </el-form-item>
            <el-form-item label="描述" prop="goods_desc">
                <el-input type="textarea" v-model="info.goods_desc"></el-input>
            </el-form-item>
            <el-form-item label="是否为真实销量" prop="is_real_seal">
                <el-radio-group size="medium" v-model="info.is_real_seal">
                    <el-radio :label="true">真实销量</el-radio>
                    <el-radio :label="false">虚拟销量</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="销量" prop="goods_sale" v-if="info.is_real_seal !== true">
                <el-input size="medium" v-model="info.goods_sale" placeholder="请输入" type="number"></el-input>
            </el-form-item>
            <el-form-item label="菜品图片" prop="img_list">
                <Upimg :limitMax="9" v-model="info.img_list" />
            </el-form-item>
        </el-form>
        <div class="submit">
            <el-button @click="submit" type="primary" size="medium">下一步</el-button>
        </div>
    </div>
</template>

<script lang='ts'>
import { Vue, Component, Emit, Prop, Watch } from "vue-property-decorator";
import { api_class, goods_class, create_spu } from "@/views/shop/api";
import Upimg from "@/components/upimg/index.vue";
import { merge } from "ramda";
import { Id } from "@/types/global";

interface info {
    name: string;
    goods_desc: string;
    key_word: string;
    is_real_seal: boolean;
    goods_sale: number;
    food_category_id: Id;
    img_list: string[];
}

@Component({
    components: {
        Upimg,
    },
})
export default class extends Vue {
    @Prop({ required: true, type: Object })
    readonly information!: create_spu;
    info: info = {
        name: "",
        key_word: "",
        is_real_seal: true,
        food_category_id: "",
        goods_sale: 0,
        img_list: [],
        goods_desc: "",
    };
    rules = {};
    class_list: goods_class[] = [];
    @Emit("submit")
    submit() {
        return {
            info: this.info,
            step: 0,
            go: 1,
        };
    }

    async get_class_list() {
        const { results } = await api_class.get_list({});
        this.class_list = results;
	}

    created() {
        this.get_class_list();
        const { specification, ...information } = this.information;
        this.info = { ...this.info, ...information };
    }
}
</script>

<style>
</style>

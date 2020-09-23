<template>
    <div>
        <PageHeader />
        <div class="box mt20">
            <el-form label-width="160px" :rules="rules" ref="form" :model="info">
                <el-form-item label="套餐名称" prop="name">
                    <el-input size="medium" v-model="info.name" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="关键词" prop="key_word">
                    <el-input size="medium" v-model="info.key_word" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="价格" prop="price">
                    <el-input size="medium" v-model="info.price" placeholder="请输入" type="number"></el-input>
                </el-form-item>
                <el-form-item label="是否为真实销量" prop="is_real_seal">
                    <el-radio-group v-model="info.is_real_seal">
                        <el-radio :label="true">真实销量</el-radio>
                        <el-radio :label="false">虚拟销量</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="销量" prop="goods_sale" v-if="info.is_real_seal !== true">
                    <el-input
                        size="medium"
                        v-model="info.goods_sale"
                        placeholder="请输入"
                        type="number"
                    ></el-input>
                </el-form-item>
                <el-form-item label="关联店铺" prop="food_store_id">
                    <el-select
                        v-model="info.food_store_id"
                        placeholder="请选择关联店铺"
                        size="medium"
                        filterable
                    >
                        <template v-for="ele in store_list">
                            <el-option :label="ele.name" :value="ele.id" :key="ele.id"></el-option>
                        </template>
                    </el-select>
                </el-form-item>
                <el-form-item label="套餐分类" prop="combo_category_id">
                    <el-select
                        v-model="info.combo_category_id"
                        placeholder="请选择套餐分类"
                        size="medium"
                        filterable
                    >
                        <template v-for="ele in vclass_list">
                            <el-option :label="ele.name" :value="ele.id" :key="ele.id"></el-option>
                        </template>
                    </el-select>
                </el-form-item>
                <el-form-item label="库存" prop="stock">
                    <el-input v-model="info.stock" placeholder="请输入库存" size="medium" type="number"></el-input>
                </el-form-item>
                <el-form-item label="积分" prop="points">
                    <el-input v-model="info.points" placeholder="请输入积分" size="medium" type="number"></el-input>
                </el-form-item>
                <el-form-item label="套餐图片" prop="img_list">
                    <Upimg :limitMax="9" v-model="info.img_list" />
                </el-form-item>
                <el-form-item label="套餐详情图片" prop="img_detail">
                    <Upimg :limitMax="9" v-model="info.img_detail" />
                </el-form-item>
                <el-form-item label="套餐视频" prop="video">
                    <Upvideo v-model="info.video" />
                </el-form-item>
                <el-form-item label="套餐内容" prop="combo_content">
                    <Editor v-model="info.combo_content" />
                </el-form-item>
				<el-form-item label="套餐简介" prop="goods_desc">
                    <Editor v-model="info.goods_desc" />
                </el-form-item>
            </el-form>
            <div class="submit">
                <el-button @click="submit" type="primary" size="medium">提交</el-button>
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
import { Vue, Component, Watch } from "vue-property-decorator";
import PageHeader from "@/components/pageHeader/index.vue";
import Upimg from "@/components/upimg/index.vue";
import Upvideo from "@/components/upvideo/base.vue";
import Editor from "@/components/editor/index.vue";
import {
    store,
    api_store,
    vclass,
    api_vclass,
    api_package,
    create_package,
    put_package,
} from "@/views/shop/api";
import { ElForm } from "element-ui/types/form";
@Component({
    components: {
        PageHeader,
        Upimg,
        Upvideo,
        Editor,
    },
})
export default class extends Vue {
    info: create_package | put_package = {
        name: "",
        key_word: "",
        price: 1,
        is_real_seal: true,
        goods_sale: 1,
        points: 1,
        stock: 1,
        combo_category_id: "",
        food_store_id: "",
        img_list: [],
        img_detail: [],
        video: "",
		combo_content: "",
		goods_desc:""
    };
    rules = {
		name: [{required: true,message: "请输入"}],
		key_word: [{required: true,message: "请输入"}],
        price: [{required: true,message: "请输入"}],
        is_real_seal: [{required: true,message: "请输入"}],
        goods_sale: [{required: true,message: "请输入"}],
        points: [{required: true,message: "请输入"}],
        stock: [{required: true,message: "请输入"}],
        combo_category_id: [{required: true,message: "请输入"}],
        food_store_id: [{required: true,message: "请输入"}],
        img_list: [{required: true,message: "请输入"}],
        img_detail: [{required: true,message: "请输入"}],
        video: [{required: true,message: "请输入"}],
		combo_content: [{required: true,message: "请输入"}],
		goods_desc:[{required: true,message: "请输入"}]
	};

    store_list: store[] = [];
    vclass_list: vclass[] = [];

    get id() {
        return this.$route.params.id;
    }

    async get_option() {
        const [store, vclass] = await Promise.all([
            api_store.get_stores_list({}),
            api_vclass.get_list({}),
        ]);
        this.store_list = store.results;
        this.vclass_list = vclass.results;
    }

    async submit() {
        await (this.$refs["form"] as ElForm).validate();
        if (this.id === undefined) {
            await api_package.create(this.info);
            this.$message.success("添加成功");
        } else {
            await api_package.edit(this.info as put_package);
            this.$message.success("修改成功");
        }
        this.$router.go(-1);
    }

    async get_info() {
        this.info = await api_package.get_info(this.id);
    }

    created() {
        this.get_option();
        if (this.id === undefined) return;
        this.get_info();
    }
}
</script>

<style lang="less" scoped>
</style>

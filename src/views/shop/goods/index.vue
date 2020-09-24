<template>
    <div>
        <div class="box">
            <p>
                <el-input
                    v-model="filter.search"
                    placeholder="输入商品名称"
                    prefix-icon="el-icon-search"
                    size="medium"
                ></el-input>
            </p>
            <ul class="businessItem">
                <li>
					<span class="">分类:</span>
					<el-select
						v-model="filter.food_category_id"
						placeholder="请选择项目分类"
						size="medium"
					>
						<el-option value label="全部"></el-option>
						<el-option v-for="ele in goods_category_list" :key="ele.id" :value="ele.id" :label="ele.name"></el-option>
					</el-select>
				</li>
                <li>
                    <span class="">商品状态:</span>
                    <el-select
                        v-model="filter.is_upper"
                        placeholder="请选择商品状态"
                        size="medium"
                    >
                        <el-option value label="全部"></el-option>
                        <el-option :value="1" label="已上架"></el-option>
                        <el-option :value="0" label="未上架"></el-option>
                    </el-select>
                </li>
                <li>
                    <el-button
                        @click="find"
                        type="primary"
                        size="medium"
                        icon="el-icon-search"
                        >查询</el-button
                    >
                </li>
            </ul>
        </div>
        <div class="box mt20 tabPane">
            <h3>
                <el-button
                    type="primary"
                    size="medium"
                    @click="$router.push('/shop/goods/create')"
                    >添加商品</el-button
                >
            </h3>
            <el-table
                :data="list"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="allSelect"
                @sort-change="sort_change"
            >
                <el-table-column label="序号" prop="id"></el-table-column>
                <el-table-column label="商品名称" prop="name"></el-table-column>
                <el-table-column label="价格" prop="price"></el-table-column>
                <el-table-column
                    label="分类"
                    prop="food_category"
                ></el-table-column>
                <el-table-column
                    label="销量"
                    prop="goods_sale"
                ></el-table-column>
                <el-table-column
                    label="所属店铺名称"
                    prop="food_store"
                ></el-table-column>
                <el-table-column
                    label="加入时间"
                    prop="create_time"
                    width="235"
                ></el-table-column>
                <el-table-column label="是否上架" class="is_upper">
                    <template slot-scope="scope">
                        <span class="green" v-if="scope.row.is_upper === true">
                            <b>●</b>
                            是
                        </span>
                        <span v-else>
                            <b>●</b>
                            否
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="255" fixed="right">
                    <template slot-scope="scope">
                        <el-button
                            v-if="scope.row.is_upper === false"
                            size="mini"
                            @click="change_is_upper([scope.row.id], true)"
                            type="success"
                            >上架</el-button
                        >
                        <el-button
                            v-else
                            size="mini"
                            @click="change_is_upper([scope.row.id], false)"
                            type="danger"
                            >下架</el-button
                        >
                        <el-dropdown
                            trigger="click"
                            @command="edit(scope.row.id, $event)"
                        >
                            <el-button size="mini" type="primary">
                                <i class="el-icon-edit-outline"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="edit_base"
                                    >编辑基本信息</el-dropdown-item
                                >
                                <el-dropdown-item command="edit_class"
                                    >编辑商品规格</el-dropdown-item
                                >
                                <el-dropdown-item command="edit_money"
                                    >编辑商品价格</el-dropdown-item
                                >
                            </el-dropdown-menu>
                        </el-dropdown>
                        <el-button
                            size="mini"
                            @click="remove(scope.row.id)"
                            type="warning"
                        >
                            <i class="el-icon-delete"></i>
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <Page
                :total="total"
                :page.sync="page"
                :page_size.sync="page_size"
            />
        </div>
    </div>
</template>

<script lang='ts'>
import { Vue, Component, Watch } from "vue-property-decorator";
import { api_class, api_goods, change_pass, goods_class, spu } from "@/views/shop/api";
import { Mixin_list } from "@/mixin";
import Page from "@/components/page/index.vue";
import { Id } from "@/types/global";
const Base = Mixin_list<spu>(api_goods.get_goods_list);

@Component({
    components: {
        Page,
    },
})
export default class extends Base {
    filter = {
        search: "",
		is_upper: "",
		food_category_id:""
	};

	goods_category_list:goods_class[] = []

    async change_is_upper(id: Id[], is_upper: boolean) {
        await api_goods.change_is_supper({ id, is_upper });
        this.$message.success("修改成功");
        this.get_list();
    }

    async remove(id: Id) {
        await api_goods.remove(id);
        this.get_list();
    }

    edit(id: Id, type: string) {
        switch (type) {
            case "edit_base":
                return this.$router.push(`/shop/goods/edit/${id}?init=0`);
            case "edit_class":
                return this.$router.push(`/shop/goods/edit/${id}?init=1`);
            case "edit_money":
                return this.$router.push(`/shop/goods/edit/${id}?init=2`);
        }
	}

	async get_goods_category(){
		const { results } = await api_class.get_list({})
		this.goods_category_list = results
	}

	created(){
		this.get_goods_category()
	}
}
</script>

<style>
</style>

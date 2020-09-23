<template>
    <div>
        <div class="box">
            <ul class="businessItem">
                <li>
                    <el-button @click="find" type="primary" size="medium" icon="el-icon-search">查询</el-button>
                </li>
            </ul>
        </div>
        <div class="box mt20 tabPane">
            <h3>
                <el-button
                    type="primary"
                    size="medium"
                    @click="$router.push('/shop/package/create')"
                >添加套餐</el-button>
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
                <el-table-column label="分类" prop="combo_category.name"></el-table-column>
                <!-- <el-table-column label="销量" prop="goods_sale"></el-table-column> -->
                <el-table-column label="所属店铺名称" prop="food_store"></el-table-column>
                <el-table-column label="加入时间" prop="create_time" width="235"></el-table-column>
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
				<el-table-column label="是否同城推荐" class="is_homepage_hot">
                    <template slot-scope="scope">
                        <span class="green" v-if="scope.row.is_homepage_hot === true">
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
                            @click="change_is_upper([scope.row.id],true)"
                            type="success"
                        >上架</el-button>
                        <el-button
                            v-else
                            size="mini"
                            @click="change_is_upper([scope.row.id],false)"
                            type="danger"
                        >下架</el-button>
                        <el-dropdown trigger="click" @command="edit(scope.row.id,$event)">
                            <el-button size="mini" type="primary">
                                <i class="el-icon-edit-outline"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="edit_base">编辑</el-dropdown-item>
                                <el-dropdown-item command="not_hot" v-if="scope.row.is_homepage_hot === true">取消同城推荐</el-dropdown-item>
								<el-dropdown-item command="yes_hot" v-if="scope.row.is_homepage_hot === false">设置同城推荐</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                        <el-button size="mini" @click="remove(scope.row.id)" type="warning">
                            <i class="el-icon-delete"></i>
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <Page :total="total" :page.sync="page" :page_size.sync="page_size" />
        </div>
    </div>
</template>

<script lang='ts'>
import { Vue, Component, Watch } from "vue-property-decorator";
import { api_package, package_list, spu } from "@/views/shop/api";
import { Mixin_list } from "@/mixin";
import Page from "@/components/page/index.vue";
import { Id } from "@/types/global";
const Base = Mixin_list<package_list>(api_package.get_list);

@Component({
    components: {
        Page,
    },
})
export default class extends Base {
    filter = {
        search: "",
    };

    async change_is_upper(id: Id[], is_upper: boolean) {
        await api_package.change_upper({ id, is_upper });
        this.$message.success("修改成功");
        this.get_list();
    }

    async remove(id: Id | Id[]) {
        await api_package.remove(id);
        this.get_list();
    }

    async edit(id: Id, type: string) {
        switch (type) {
            case "edit_base":
                return this.$router.push(`/shop/package/edit/${id}`);
            case "not_hot":
				await api_package.change_hot({ id,is_homepage_hot:false })
				this.$message.success('修改成功');
                return this.get_list()
            case "yes_hot":
				await api_package.change_hot({ id,is_homepage_hot:true })
				this.$message.success('修改成功');
                return this.get_list()
        }
    }
}
</script>

<style>
</style>

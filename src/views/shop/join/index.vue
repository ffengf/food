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
            <el-table
                :data="list"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="allSelect"
                @sort-change="sort_change"
            >
                <el-table-column label="Id" prop="id"></el-table-column>
                <el-table-column label="姓名" prop="name"></el-table-column>
                <el-table-column label="联系方式" prop="phone"></el-table-column>
                <el-table-column label="店铺名称" prop="store_name"></el-table-column>
				<!-- <el-table-column label="审核时间" prop="check_time"></el-table-column> -->
                <el-table-column label="申请时间" prop="create_time"></el-table-column>
				<el-table-column label="城市" prop="city"></el-table-column>
                <el-table-column label="会员数量" prop="vip_num"></el-table-column>
				<el-table-column label="申请类型" prop="apply_type">
					<template slot-scope="scope">
                        <span>{{ apply_type(scope.row.apply_type) }}</span>
                    </template>
				</el-table-column>
				<el-table-column label="认证状态" prop="status">
					<template slot-scope="scope">
                        <span>{{ join_status(scope.row.status) }}</span>
                    </template>
				</el-table-column>
                <el-table-column label="操作" width="255" fixed="right">
                    <template slot-scope="scope">
						<!-- <el-button size="mini" @click="get_info(scope.row.id)" type="success">
							查看详情
						</el-button> -->
                        <template v-if="scope.row.status === 1">
							<el-button size="mini" @click="edit(scope.row.id,2)" type="primary">
								审核通过
							</el-button>
							<el-button size="mini" @click="edit(scope.row.id,3)" type="warning">
								拒绝通过
							</el-button>
						</template>
                    </template>
                </el-table-column>
            </el-table>
            <Page :total="total" :page.sync="page" :page_size.sync="page_size" />
        </div>
    </div>
</template>

<script lang='ts'>
import { Vue, Component, Watch } from "vue-property-decorator";
import { api_join, apply_type, join_list, join_status } from "@/views/shop/api";
import { Mixin_list } from "@/mixin";
import Page from "@/components/page/index.vue";
import { Id, isCreate } from "@/types/global";
import { ElForm } from 'element-ui/types/form';
const Base = Mixin_list<join_list>(api_join.get_list);

@Component({
    components: {
        Page,
    },
})
export default class extends Base {
    filter = {
        search: "",
    };

	apply_type(e:apply_type){
		return apply_type[e]
	}

	join_status(e:join_status){
		return join_status[e]
	}

	get_info(id:Id){
		this.$router.push(`/shop/join/info/${id}`)
	}

    async edit(id:Id,status:join_status) {
		await api_join.set_status({ id,status })
		this.$message.success('修改成功')
		this.get_list()
	}
}
</script>

<style>
</style>

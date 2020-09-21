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
                    @click="$router.push('/shop/store/create')"
                >添加店铺</el-button>
            </h3>
            <el-table
                :data="list"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="allSelect"
                @sort-change="sort_change"
            >
                <el-table-column label="序号" prop="id"></el-table-column>
                <el-table-column label="名称" prop="name"></el-table-column>
                <el-table-column label="商品名称" prop="name"></el-table-column>
                <el-table-column label="位置" prop="address"></el-table-column>
                <el-table-column label="M值" prop="m_value" width="60"></el-table-column>
                <el-table-column label="联系方式" prop="phone"></el-table-column>
                <el-table-column label="登录账号/负责人" prop="username" width="255"></el-table-column>
                <el-table-column label="加入时间" prop="create_time" width="175"></el-table-column>
                <el-table-column label="操作" width="255" fixed="right">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="primary"
                            @click="$router.push(`/shop/store/edit/${scope.row.id}`)"
                        >编辑</el-button>
                        <el-button
                            size="mini"
                            type="info"
                            @click="new_password(scope.row.id)"
                        >重置密码</el-button>
                        <el-button size="mini" @click="remove(scope.row.id)" type="warning">
                            <i class="el-icon-delete"></i>
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <Page :total="total" :page.sync="page" :page_size.sync="page_size" />
        </div>
		<el-dialog title="请输入密码" :visible.sync="key">
            <el-form :rules="rules" ref="form" :model="info">
                <el-form-item label="新密码" prop="password">
                    <el-input size="medium" v-model="info.password" placeholder="请输入"></el-input>
                </el-form-item>
            </el-form>
			<span slot="footer" class="dialog-footer">
                <el-button size="medium" @click="key = false">退出编辑</el-button>
				<el-button type="primary" size="medium" @click="submit">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script lang='ts'>
import { Vue, Component, Watch } from "vue-property-decorator";
import { api_store, store, change_pass } from "@/views/shop/api";
import { Mixin_list } from "@/mixin";
import Page from "@/components/page/index.vue";
import { Id } from "@/types/global";
const Base = Mixin_list<store>(api_store.get_stores_list);

@Component({
    components: {
        Page,
    },
})
export default class extends Base {
    filter = {
        search: "",
	};

	key = false

	info:change_pass = {
		id:'',
		password:''
	}
	rules = {
		password: [{required: true,message: "请输入"}],
	}

	new_password(id:Id){
		this.key = true
		this.info = {
			id,
			password:""
		}
	}

	async submit(){
		await (this.$refs["form"] as any).validate();
		await api_store.change_password(this.info)
		this.$message.success('修改成功')
		this.get_list()
	}

    async remove(id: Id) {
        await api_store.remove(id);
        this.get_list();
    }
}
</script>

<style>
</style>

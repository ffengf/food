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
                <el-button type="primary" size="medium" @click="create">添加分类</el-button>
            </h3>
            <el-table
                :data="list"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="allSelect"
                @sort-change="sort_change"
            >
                <el-table-column label="Id" prop="id"></el-table-column>
                <el-table-column label="分类名称" prop="name"></el-table-column>
                <el-table-column label="排序值" prop="order"></el-table-column>
                <el-table-column label="商品数量" prop="food_num"></el-table-column>
                <el-table-column label="操作" width="255" fixed="right">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="edit(scope.row)" type="primary">
                            <i class="el-icon-edit-outline"></i>
                        </el-button>
                        <el-button size="mini" @click="remove(scope.row.id)" type="warning">
                            <i class="el-icon-delete"></i>
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <Page :total="total" :page.sync="page" :page_size.sync="page_size" />
        </div>
		<el-dialog
            title="分类"
            :visible.sync="key"
            width="50%"
        >
            <el-form ref="form" label-width="100px" class="demo-ruleForm" :rules="rules" :model="info">
                <el-form-item label="分类名称">
                    <el-input v-model="info.name" placeholder="请输入分类名称" size="medium"></el-input>
                </el-form-item>
				<el-form-item label="排序值">
                    <el-input v-model="info.order" placeholder="请输入排序值" size="medium" type="number"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="submit" size="medium" type="primary">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script lang='ts'>
import { Vue, Component, Watch } from "vue-property-decorator";
import { api_class, change_pass, goods_class, create_goods_class } from "@/views/shop/api";
import { Mixin_list } from "@/mixin";
import Page from "@/components/page/index.vue";
import { Id, isCreate } from "@/types/global";
import { ElForm } from 'element-ui/types/form';
const Base = Mixin_list<goods_class>(api_class.get_list);

@Component({
    components: {
        Page,
    },
})
export default class extends Base {
    filter = {
        search: "",
    };

    info: create_goods_class | goods_class = {
        name: "",
        order: 0,
	};

	key = false

	rules = {
		name:[{required: true,message: "请输入"}],
		order:[{required: true,message: "请输入"}],
	}

	create(){
		this.key = true
		this.info = {
			name:"",
			order:0
		}
	}

    edit(info:goods_class) {
		this.info = {...info}
		this.key = true

	}

    async submit() {
		await (this.$refs["form"] as ElForm | undefined)?.validate();
		if(isCreate(this.info)){
			await api_class.create(this.info as create_goods_class);
        	this.$message.success("添加成功");
		}else{
			await api_class.edit(this.info as goods_class);
        	this.$message.success("修改成功");
		}
		this.key = false
        this.get_list();
    }

    async remove(id: Id) {
        await api_class.remove(id);
        this.get_list();
    }
}
</script>

<style>
</style>

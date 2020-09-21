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
                <el-table-column label="分类图片">
                    <template slot-scope="scope">
                        <img :src="scope.row.img" alt style="width: 80px" />
                    </template>
                </el-table-column>
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
        <el-dialog title="分类" :visible.sync="key" width="50%">
            <el-form ref="form" label-width="100px" class="demo-ruleForm" :model="info">
                <el-form-item label="分类名称">
                    <el-input v-model="info.name" placeholder="请输入分类名称" size="medium"></el-input>
                </el-form-item>
                <el-form-item label="分类图片">
                    <Upimg :limitMax="1" v-model="info.img" />
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
import { api_vclass, create_vclass, vclass } from "@/views/shop/api";
import { Mixin_list } from "@/mixin";
import Page from "@/components/page/index.vue";
import Upimg from "@/components/upimg/index.vue";
import { Id, isCreate } from "@/types/global";
const Base = Mixin_list<vclass>(api_vclass.get_list);

@Component({
    components: {
        Page,
        Upimg,
    },
})
export default class extends Base {
    filter = {
        search: "",
    };

    info: vclass | create_vclass = {
        name: "",
        img: "",
    };

    key = false;

    create() {
        this.key = true;
        this.info = {
            name: "",
            img: "",
        };
    }

    edit(info: vclass) {
        this.info = { ...info };
        this.key = true;
    }

    async submit() {
        if (isCreate(this.info)) {
            await api_vclass.create(this.info as create_vclass);
            this.$message.success("添加成功");
        } else {
            await api_vclass.edit(this.info as vclass);
            this.$message.success("修改成功");
        }
        this.key = false;
        this.get_list();
    }

    async remove(id: Id) {
        await api_vclass.remove(id);
        this.get_list();
    }
}
</script>

<style>
</style>

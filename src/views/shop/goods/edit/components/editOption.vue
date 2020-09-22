<template>
    <div>
        <el-tabs type="border-card" v-model="tab_index">
            <template v-for="(e) in index">
                <el-tab-pane :label="String(e.id)" :name="String(e.id)" :key="e.id">
                    <span slot="label">
                        <span>{{ e.name }}</span>
                    </span>
                    <div>
                        <el-button type="warning" size="small" @click="add_son(e.id)">添加规格值</el-button>
                        <div v-for="(x) in data[e.id]" :key="x.id" class="inp_box">
							<div>{{x.value}}</div>
                        </div>
                    </div>
                </el-tab-pane>
            </template>
        </el-tabs>
        <div style="display: flex; justify-content: center;margin: 20px 0;">
            <el-button @click="step_submit(-1)" type="primary" size="medium">上一步</el-button>
            <el-button @click="step_submit(1)" type="primary" size="medium">下一步</el-button>
        </div>
        <el-dialog title="请输入名称" :visible.sync="key" width="30%" center>
            <el-input v-model="add_info.value" />
            <span slot="footer" class="dialog-footer">
                <el-button @click="key=false">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { api_goods } from "@/views/shop/api"
import { is } from "ramda";
export default {
    props: ["id"],
    data() {
        return {
            data: {},
            index: [],
            tab_index: "",
            add_info: {
                value: "",
                spec_id: "",
            },
            key: false,
        };
    },
    methods: {
        async get_data() {
			const {specification_list} = await api_goods.get_info(this.id)
			const data = specification_list.reduce((last,x) => ({ ...last,[x.id]:x.options }),{})
			const index = specification_list.map(x => ({ name:x.name,id:x.id }))
			this.tab_index = String(index[0].id)
			this.index = index
			this.data = data
        },
        add_son(e) {
            this.add_info = {
                value: "",
                spec_id: this.tab_index,
            };
            this.key = true;
        },
        async submit() {
            if (this.add_info.value === "") {
                return this.$message.error("请输入名称");
			}
			await api_goods.add_option(this.add_info);
			this.key = false
            this.$message.success("添加成功");
			this.get_data();
        },
        step_submit(go) {
            this.$emit("submit", { info: {}, go,step:1 });
        },
    },
    created() {
        this.get_data();
    },
};
</script>

<style scoped>
.inp_box {
    display: flex;
    margin: 10px 0;
    align-content: center;
}
.inp_box .inp {
    width: 500px !important;
}
.inp_box .del_btn {
    padding: 12px;
    margin-left: 10px;
}
</style>

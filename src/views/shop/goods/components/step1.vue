<template>
    <div>
        <div>
            <el-button type="success" @click="add_class">添加规格类</el-button>
            <el-tabs type="border-card" closable @tab-remove="del_class" v-model="tab_index">
                <template v-for="(e,index) in index">
                    <el-tab-pane :label="e" :name="e" :key="index+e">
                        <span slot="label">
                            <span>{{ e }}</span>
                            <el-button
                                size="mini"
                                type="primary"
                                icon="el-icon-edit"
                                @click="edit_name = {key:true,old_name:e,new_name:e}"
                            ></el-button>
                        </span>
						<div>
							<el-button
                                type="warning"
								size="small"
                                @click="add_son(e)"
                            >添加规格值</el-button>
							<div v-for="(x,j) in data[e]" :key='j' class="inp_box">
								<el-input v-model="data[e][j]" :placeholder="`规格:${j+1} 名称`" class="inp" />
								<el-button size="mini" type="danger" icon="el-icon-delete" circle class="del_btn" @click="del_son(e,j)"></el-button>
							</div>
						</div>
                    </el-tab-pane>
                </template>
            </el-tabs>
        </div>
        <div style="display: flex; justify-content: center;margin: 20px 0;">
            <el-button @click="step_submit(-1)" type="primary" size="medium">上一步</el-button>
            <el-button @click="step_submit(1)" type="primary" size="medium">下一步</el-button>
        </div>
        <el-dialog title="请输入新名称" :visible.sync="edit_name.key" width="30%" center>
			<el-input v-model="edit_name.new_name"/>
            <span slot="footer" class="dialog-footer">
                <el-button @click="edit_name = {key:false,old_name:'',new_name:''}">取 消</el-button>
                <el-button type="primary" @click="edit_class_name">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {dissoc,pick} from "ramda";
export default {
    data() {
        return {
			data: {},
			index:[],
            edit_name: {
                key: false,
                old_name: "",
                new_name: ""
			},
			tab_index:''
        };
	},
	props:['info'],
    methods: {
        step_submit(type) {
			const isSubmit = type === 1
			const information = {
				...this.info,
				specification:this.data
			}
            this.$emit("step_submit", { information, type, isSubmit });
        },
        del_class(key) {
			this.data = dissoc(key, this.data);
			this.index = this.index.filter(name => name !== key)
			this.tab_index = this.index[0]//页面优化
        },
        add_class() {
			const str = `规格类${this.index.length + 1}`
            this.data = {
                ...this.data,
                [str]: ['']
			};
			this.index = [...this.index,str]
			if(this.index.length === 1){//页面优化
				this.tab_index = str
			}
        },
        edit_class_name() {
			const { old_name,new_name } = this.edit_name
			if(this.index.includes(new_name)){
				this.$message.error('姓名重复')
				return
			}
			this.data = { ...dissoc(old_name,this.data),[new_name]:this.data[old_name] }
			this.index = this.index.map(e => e !== old_name ? e : new_name)
			this.edit_name = {key:false,old_name:'',new_name:''}
			this.tab_index = new_name //页面优化
		},
		add_son(key){
			this.data = {...this.data,[key]:[...this.data[key],'']}
		},
		del_son(key,index){
			this.data = { ...this.data,[key]:this.data[key].filter((_,i) => i !== index) }
		}
	},
	created(){
		const {specification} = this.info
		this.index = Object.keys(specification)
		this.data = specification
		this.tab_index = this.index[0]
	}
};
</script>

<style>
.inp_box{
	display: flex;
	margin:10px 0;
	align-content: center;
}
.inp_box .inp{
	width: 500px !important;
}
.inp_box .del_btn{
	padding: 12px;
	margin-left: 10px;
}
</style>

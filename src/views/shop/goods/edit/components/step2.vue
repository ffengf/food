<template>
    <div class="box">
        <h1>已添加</h1>
        <el-table :data="completed">
            <el-table-column label="会员价格" prop="VIP_1_price"></el-table-column>
            <el-table-column label="代言人价格" prop="VIP_2_price"></el-table-column>
            <el-table-column label="合伙人价格" prop="VIP_3_price"></el-table-column>
			<el-table-column label="库存" prop="stock"></el-table-column>
			<el-table-column label="积分" prop="points"></el-table-column>
            <el-table-column label="图片" prop="img" width="150">
                <template slot-scope="scope">
                    <el-image :src="scope.row.img" />
                </template>
            </el-table-column>
            <el-table-column v-for="(ele,index) in title" :key="index" :label="ele">
                <template slot-scope="scope">
                    <span>{{ completed_prop(scope.row.option_list,ele) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="put(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>

        <h1>未添加</h1>
        <el-table :data="uncompleted">
            <el-table-column v-for="(ele,index) in title" :key="index" :label="ele">
                <template slot-scope="scope">
                    <span>{{ name_to_id[scope.row[index]] }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="success" @click="add(scope.row)">添加</el-button>
                </template>
            </el-table-column>
        </el-table>
		<div class="btn_box">
			<el-button class="finish" @click="$router.go(-1)" type="primary" size="medium">完成</el-button>
		</div>
        <el-dialog :title="dialog_title" :visible.sync="key" width="50%">
            <el-form
                ref="form"
                :rules="rules"
                label-width="100px"
                class="demo-ruleForm"
                :model="info"
            >
                <el-form-item label="库存" prop="stock">
                    <el-input v-model="info.stock" placeholder="请输入库存" size="medium" type="number"></el-input>
                </el-form-item>
                <el-form-item label="积分" prop="points">
                    <el-input v-model="info.points" placeholder="请输入积分" size="medium" type="number"></el-input>
                </el-form-item>
                <el-form-item label="会员单价" prop="VIP_1_price">
                    <el-input
                        v-model="info.VIP_1_price"
                        placeholder="请输入会员单价"
                        size="medium"
                        type="number"
                    ></el-input>
                </el-form-item>
                <el-form-item label="图片" prop="img">
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
import Upimg from "@/components/upimg/index.vue";
import { Id } from "@/types/global";
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import {
    create_spu,
    api_goods,
    create_sku,
    base_sku,
    put_sku,
	option_list,
	get_sku
} from "@/views/shop/api";
import { aggregate } from "@/util/array";
import { equals, compose, map, sort } from "ramda";
@Component({
    components: {
        Upimg,
    },
})
export default class extends Vue {
    @Prop({ required: true, type: [Number,String] })
    id!: Id;

    name_to_id: Record<Id, string> = {};

    uncompleted: any[] = [];
    completed: any[] = [];
    title: string[] = [];

    key = false;

    info: base_sku = {
        spu_id: this.id,
        stock: 100,
        points: 1,
        VIP_1_price: 1,
        img: "",
        option_id_list: [],
    };

    rules = {};

    async get_info() {
        const [{ specification_list }, { results }] = await Promise.all([
            api_goods.get_info(this.id),
            api_goods.get_sku(this.id),
        ]);
        const option_arr = specification_list.map((x) =>
            x.options.map((y) => y.id)
        );
        this.title = specification_list.map((x) => x.name);
        this.name_to_id = specification_list.reduce((last, ele) => {
            return {
                ...last,
                ...ele.options.reduce(
                    (l, e) => ({ ...l, [e.id]: e.value }),
                    {}
                ),
            };
		}, {});
        const all_scenario =
			option_arr.length < 2 ? option_arr.flat(1).map(x => [x]) : aggregate<Id>(...option_arr);
        this.completed = results;
        this.uncompleted = all_scenario.filter((x) => {
            const completed_id_arr = results.map((y) =>
                y.option_list.map((z) => z.option_id)
            );
            let ret = completed_id_arr.every((y) => {
				const diff = (a: number, b: number) => a - b;
                return !equals(
                    sort(diff, x as number[]),
                    sort(diff, y as number[])
                );
            });
            return ret;
        });
    }

    add(option_id_list: Id[]) {
        this.key = true;
        this.info = {
            spu_id: this.id,
            stock: 100,
            points: 1,
            VIP_1_price: 1,
            img: "",
            option_id_list,
        };
    }

    put(sku: get_sku) {
		this.key = true
		this.info = {
			img:sku.img,
			points:sku.points,
			id:sku.id,
			VIP_1_price:sku.VIP_1_price,
			stock:sku.stock
		}
    }

    get dialog_title() {
        return this.info.option_id_list !== undefined ? "添加" : "修改";
    }

    async submit() {
        if (this.info.option_id_list !== undefined) {
            await api_goods.create_sku(this.info as create_sku);
            this.$message.success("添加成功");
        } else {
            await api_goods.put_sku(this.info as put_sku);
            this.$message.success("修改成功");
        }
        this.key = false;
        this.get_info();
    }

    completed_prop(option_list: option_list[], name: string) {
        for (let i = 0; i < option_list.length; i++) {
            if (option_list[i].spec === name) {
                return option_list[i].option;
            }
        }
    }

    created() {
        this.get_info();
    }
}
</script>

<style scoped>
h1 {
    text-align: center;
    margin: 20px 0;
    font-weight: 600;
    font-size: 20px;
}
.btn_box{
	margin-top: 20px;
	display: flex;
	justify-content: flex-end;
}
</style>

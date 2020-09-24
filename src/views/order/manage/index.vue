<template>
    <div>
        <div class="box">
			<p>
                <el-input
                    v-model="filter.search"
                    placeholder="输入订单号/用户名/手机号码"
                    prefix-icon="el-icon-search"
                    size="medium"
                ></el-input>
            </p>
            <ul class="businessItem">
				<li>
					<span class="">开始时间:</span>
					<el-date-picker
						v-model="filter.start"
						type="datetime"
						placeholder="请选择日期/时间"
						align="right"
						format="yyyy-MM-dd"
						value-format="yyyy-MM-dd"
						size="medium"
					></el-date-picker>
					<br>
					<span class="">结束时间:</span>
					<el-date-picker
						v-model="filter.end"
						type="datetime"
						placeholder="请选择日期/时间"
						align="right"
						format="yyyy-MM-dd"
						value-format="yyyy-MM-dd"
						size="medium"
					></el-date-picker>
				</li>
				<li>
					<span class="">支付状态:</span>
					<el-select
						v-model="filter.status"
						placeholder="请选择项目分类"
						size="medium"
					>
						<el-option value label="全部"></el-option>
						<el-option :value="0" label="已取消"></el-option>
						<el-option :value="1" label="待支付"></el-option>
						<el-option :value="2" label="待消费"></el-option>
						<el-option :value="4" label="待评价"></el-option>
						<el-option :value="5" label="售后中"></el-option>
						<el-option :value="6" label="完成"></el-option>
					</el-select>
					<span class="">商品类型:</span>
					<el-select
						v-model="filter.type"
						placeholder="请选择项目分类"
						size="medium"
					>
						<el-option value label="全部"></el-option>
						<el-option :value="1" label="套餐"></el-option>
						<el-option :value="2" label="普通菜品"></el-option>
					</el-select>
				</li>
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
                <el-table-column label="订单号" prop="order_id"></el-table-column>
                <el-table-column label="店铺名称" prop="food_store"></el-table-column>
                <el-table-column label="商品类型" prop="order_classify">
                    <template slot-scope="scope">
                        <span>{{ order_classify(scope.row.order_classify) }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="订单内容" prop="goods">
                    <template slot-scope="scope">
                        <span>{{ goods(scope.row.goods) }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="用户手机号" prop="user.phone"></el-table-column>
                <el-table-column label="金额（￥）" prop="total_amount"></el-table-column>
                <el-table-column label="状态" prop="username" width="255">
                    <template slot-scope="scope">
                        <span>{{ status(scope.row.status) }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="下单时间" prop="create_time" width="175" sortable="custom"></el-table-column>
                <el-table-column label="操作" width="255" fixed="right">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="primary"
                            @click="$router.push(`/order/manage/info/${scope.row.order_id}`)"
                        >查看</el-button>
                        <el-button
							v-if="scope.row.order_classify === 1 && scope.row.status === 2"
                            size="mini"
                            type="success"
                            @click="buy(scope.row.order_id)"
                        >买单结算</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <Page :total="total" :page.sync="page" :page_size.sync="page_size" />
        </div>
		<el-dialog title="请输入结算码" :visible.sync="key">
            <el-form :rules="rules" ref="form" :model="info">
                <el-form-item label="结算码" prop="settle_code">
                    <el-input size="medium" v-model="info.settle_code" placeholder="请输入"></el-input>
                </el-form-item>
            </el-form>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" size="medium" @click="submit">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import {
    api_manage,
    manage_list,
    order_classify,
    pay_type,
    order_status,
    goods,
    order_settle,
} from "@/views/order/api";
import { Mixin_list } from "@/mixin";
import Page from "@/components/page/index.vue";
import { Id, user_level } from "@/types/global";
import { UserModule } from '@/model/user';
import { ElForm } from 'element-ui/types/form';

const Base = Mixin_list<any>(api_manage.get_list);

@Component({
    components: {
        Page,
    },
})
export default class extends Base {
    filter = {
		search: "",
		start:"",
		end:"",
		status:"",
		type:""
    };

    info: order_settle = {
        order_id: "",
        settle_code: "",
	};

	key = false
	rules = {
		settle_code: [{required: true,message: "请输入"}],
	}

	buy(order_id:string){
		this.info = {
			order_id,
			settle_code:""
		}
		this.key = true
	}

	async submit(){
		await (this.$refs["form"] as ElForm | undefined)?.validate();
		await api_manage.settle(this.info)
		this.$message.success('结算成功')
		this.key = false
		this.get_list()
	}

    order_classify(e: order_classify) {
        return order_classify[e];
    }

    pay_type(e: pay_type) {
        return pay_type[e];
    }

    goods(e: goods[]) {
        return e.map((x) => x.name).join(", ");
    }

    status(e: order_status) {
        return order_status[e];
	}
}
</script>

<style>
</style>

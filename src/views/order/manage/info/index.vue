<template>
    <div>
        <PageHeader />
        <div class="box mt20">
			<div class="flex">
				<h1>{{ info.food_store }}</h1>
				<h1>{{ info.create_time }}</h1>
			</div>
            <el-table :data="info.goods"  show-summary :summary-method='summary' style="width: 100%">
                <el-table-column prop="img" width="100">
					<template slot-scope="scope">
						<el-image :src="scope.row.img"></el-image>
					</template>
				</el-table-column>
                <el-table-column prop="name"></el-table-column>
                <el-table-column prop="count"></el-table-column>
                <el-table-column prop="price"></el-table-column>
            </el-table>
        </div>
		<div class="box mt20">
			<div class="line">
				<h1>订单编号：</h1>
				<span>{{ info.order_id }}</span>
			</div>
			<div class="line">
				<h1>手机号码：</h1>
				<span>{{ info.user.phone }}</span>
			</div>
			<div class="line">
				<h1>下单时间：</h1>
				<span>{{ info.create_time }}</span>
			</div>
			<div class="line">
				<h1>用餐门店：</h1>
				<span>{{ info.food_store }}</span>
			</div>
		</div>
    </div>
</template>

<script  lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { api_manage, manage_list } from "@/views/order/api";
import PageHeader from "@/components/pageHeader/index.vue";
@Component({
    components: {
        PageHeader,
    },
})
export default class extends Vue {
    info: manage_list = {
        order_id: "",
        order_classify: 0,
        status: 0,
        pay_type: 1,
        total_amount: 0,
        user: {
            id: "",
            username: "",
            phone: "",
        },
        goods: [],
        food_store: "",
        create_time: "",
    };

    async get_info() {
        this.info = await api_manage.info(this.order_id);
    }

    get order_id(): string {
        return this.$route.params.order_id;
    }

	summary(){
		return ['','',`${this.info.goods.length}个商品`,this.info.total_amount]
	}

    created() {
        this.get_info();
    }
}
</script>

<style scoped>
.flex{
	justify-content: space-between;
	margin-top: 5px;
	margin-bottom: -15px;
	z-index: 10000;
}
h1{
	z-index: 10000000;
}
.line{
	margin: 5px 0;
	display: flex;
	align-items: center;
}
.line span {
	color: #909399;
}
</style>

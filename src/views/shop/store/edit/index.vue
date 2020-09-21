<template>
    <div>
        <PageHeader />
        <div class="box mt20">
            <el-form label-width="160px" :rules="rules" ref="form" :model="information">
                <el-form-item label="店铺名称" prop="name">
                    <el-input size="medium" v-model="information.name" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="联系方式" prop="phone">
                    <el-input size="medium" v-model="information.phone" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="登录账号" prop="username">
                    <el-input size="medium" v-model="information.username" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="初始密码" prop="password" v-if="id === undefined">
                    <el-input size="medium" v-model="information.password" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="店铺经纬度（点击选择）" prop="freight">
                    <div @click="key = true" class="cu">
                        <div>经度：{{ information.longitude }}</div>
                        <div>纬度：{{ information.latitude }}</div>
                    </div>
                </el-form-item>
                <el-form-item label="店铺详细地址" prop="address">
                    <el-input v-model="information.address" placeholder="店铺详细地址"></el-input>
                </el-form-item>
                <el-form-item label="营业开始时间" prop="start_time">
                    <el-time-picker v-model="information.start_time" placeholder="营业开始时间" value-format="HH:mm:ss"></el-time-picker>
                </el-form-item>
                <el-form-item label="营业结束时间" prop="end_time">
                    <el-time-picker v-model="information.end_time" placeholder="营业结束时间"  value-format="HH:mm:ss"></el-time-picker>
                </el-form-item>
                <el-form-item label="人均消费" prop="per_cost">
                    <el-input v-model="information.per_cost" placeholder="人均消费"></el-input>
                </el-form-item>
                <el-form-item label="M值" prop="m_value">
                    <el-input
                        size="medium"
                        v-model="information.m_value"
                        placeholder="请输入M值"
                        type="number"
                    ></el-input>
                </el-form-item>
                <el-form-item label="权限级别" prop="auth">
                    <el-radio-group v-model="information.auth">
                        <el-radio :label="0">店铺管理员</el-radio>
                        <el-radio :label="1">超级管理员</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="是否为入驻商家" prop="is_register" v-if="id === undefined">
                    <el-radio-group v-model="information.is_register">
                        <el-radio :label="0">否</el-radio>
                        <el-radio :label="1">是</el-radio>
                    </el-radio-group>
                </el-form-item>
				<el-form-item label="店铺视频" prop="video">
					<VideoList v-model="information.video" />
                </el-form-item>
				<el-form-item label="店铺图片" prop="video">
					<Upimg :limitMax="9" v-model="information.image" />
                </el-form-item>
            </el-form>
            <div class="submit">
                <el-button @click="submit" type="primary" size="medium">提交</el-button>
            </div>

        </div>
        <el-dialog :visible.sync="key" :append-to-body="true">
            <Map @sendData="sendData" />
        </el-dialog>
    </div>
</template>

<script lang='ts'>
import { Vue, Component, Watch } from "vue-property-decorator";
import PageHeader from "@/components/pageHeader/index.vue";
import VideoList from "@/components/upvideo/list.vue";
import Upimg from "@/components/upimg/index.vue";
import Map from "@/components/map/index.vue";
import { store, create_stroe, api_store } from "@/views/shop/api";
@Component({
    components: {
        PageHeader,
        VideoList,
		Map,
		Upimg
    },
})
export default class extends Vue {
    information: create_stroe = {
        name: "",
        image: [],
        video: [],
        phone: "",
        address: "",
        longitude: 0,
        latitude: 0,
        start_time: "",
        end_time: "",
        per_cost: "",
        m_value: "",
        username: "",
        password: "",
        auth: 0,
        is_register: 0,
    };
    rules = {};
    key = false;

    get id() {
        return this.$route.params.id;
    }

    sendData({ name, gpsX, gpsY }: any) {
        this.information.address = name;
        this.information.longitude = gpsX;
        this.information.latitude = gpsY;
        this.key = false;
    }

    async submit() {
        await (this.$refs["form"] as any).validate();
        if(this.id === undefined){
			await api_store.create(this.information);
			this.$message.success("添加成功");
		}else{
			await api_store.change_one(this.information as store)
			this.$message.success("修改成功");
		}
		this.$router.go(-1)
	}

	async get_info(){
		this.information = await api_store.get_info(this.id)
	}

	created(){
		if(this.id === undefined) return
		this.get_info()
	}
}
</script>

<style lang="less" scoped>
</style>

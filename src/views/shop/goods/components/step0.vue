<template>
    <div>
        <el-form label-width="160px" :rules="rules" ref="form" :model="info">
            <el-form-item label="店铺名称" prop="name">
                <el-input size="medium" v-model="info.name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="联系方式" prop="phone">
                <el-input size="medium" v-model="info.phone" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="登录账号" prop="username">
                <el-input size="medium" v-model="info.username" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="初始密码" prop="password" v-if="id === undefined">
                <el-input size="medium" v-model="info.password" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="店铺经纬度（点击选择）" prop="freight">
                <div @click="key = true" class="cu">
                    <div>经度：{{ info.longitude }}</div>
                    <div>纬度：{{ info.latitude }}</div>
                </div>
            </el-form-item>
            <el-form-item label="店铺详细地址" prop="address">
                <el-input v-model="info.address" placeholder="店铺详细地址"></el-input>
            </el-form-item>
            <el-form-item label="营业开始时间" prop="start_time">
                <el-time-picker
                    v-model="info.start_time"
                    placeholder="营业开始时间"
                    value-format="HH:mm:ss"
                ></el-time-picker>
            </el-form-item>
            <el-form-item label="营业结束时间" prop="end_time">
                <el-time-picker
                    v-model="info.end_time"
                    placeholder="营业结束时间"
                    value-format="HH:mm:ss"
                ></el-time-picker>
            </el-form-item>
            <el-form-item label="人均消费" prop="per_cost">
                <el-input v-model="info.per_cost" placeholder="人均消费"></el-input>
            </el-form-item>
            <el-form-item label="M值" prop="m_value">
                <el-input
                    size="medium"
                    v-model="info.m_value"
                    placeholder="请输入M值"
                    type="number"
                ></el-input>
            </el-form-item>
            <el-form-item label="权限级别" prop="auth">
                <el-radio-group v-model="info.auth">
                    <el-radio :label="0">店铺管理员</el-radio>
                    <el-radio :label="1">超级管理员</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="是否为入驻商家" prop="is_register" v-if="id === undefined">
                <el-radio-group v-model="info.is_register">
                    <el-radio :label="0">否</el-radio>
                    <el-radio :label="1">是</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="店铺视频" prop="video">
                <VideoList v-model="info.video" />
            </el-form-item>
            <el-form-item label="店铺图片" prop="video">
                <Upimg :limitMax="9" v-model="info.image" />
            </el-form-item>
        </el-form>
        <div class="submit">
            <el-button @click="submit" type="primary" size="medium">下一步</el-button>
        </div>
    </div>
</template>

<script lang='ts'>
import { Vue, Component, Watch } from "vue-property-decorator";
@Component
export default class extends Vue {
	info = {}
	rules = {}
}
</script>

<style>
</style>

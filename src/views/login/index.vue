<template>
    <div class="main">
        <div class="login">
            <h4>觅品美食圈</h4>
            <div class="loginDiv">
                <el-form :model="info" :rules="rules" ref="form">
                    <el-form-item prop="username">
                        <el-input
                            placeholder="请输入账号"
                            prefix-icon="el-icon-user"
                            v-model="info.username"
							@keyup.enter.native="submit"
                        ></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input
                            placeholder="请输入密码"
                            prefix-icon="el-icon-lock"
                            v-model="info.password"
                            show-password
							@keyup.enter.native="submit"
                        ></el-input>
                    </el-form-item>
                    <div class="btn">
                        <el-button type="primary" @click="submit">登录</el-button>
                    </div>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { UserModule } from "@/model/user";
import { ElForm } from "element-ui/types/form";

@Component
export default class extends Vue {
    rules = {
        username: [
            {
                required: true,
                message: "请输入手机号",
                trigger: "blur",
            },
            { min: 5, message: "长度不少于5个字符", trigger: "blur" },
        ],
        password: [
            { required: true, message: "请输入密码", trigger: "blur" },
            { min: 6, message: "长度不少于6个字符", trigger: "blur" },
        ],
    };
    info = {
        username: "admin",
        password: "admin123",
    };
    async submit() {
        await (this.$refs["form"] as ElForm | undefined)?.validate();
        await UserModule.login(this.info);
        this.$router.push("/");
    }

    created() {
        if (UserModule.token !== null) {
            this.$router.push("/");
        }
    }
}
</script>

<style lang='less' scoped>
.main {
    width: 100%;
    height: 100%;
    background: rgba(51, 202, 5, 0.575);
    .login {
        width: 420px;
        height: 400px;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        margin: auto;
        text-align: center;
        h4 {
            color: #fff;
            font-size: 36px;
            height: 50px;
        }
        .loginDiv {
            background: rgba(255, 255, 255, 0.6);
            box-shadow: rgba(255, 255, 255, 0.9);
            border-radius: 10px;
            margin-top: 20px;
            box-sizing: border-box;
            padding: 30px;
            .btn button {
                width: 100%;
            }
            .forget {
                margin: 5px 0 0 0;
                text-align: left;
                a {
                    color: #fff;
                }
            }
        }
    }
}
#indexLizi {
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    overflow: hidden;
}
</style>

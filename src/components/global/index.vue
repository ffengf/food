<template>
    <div id="page">
        <el-container class="container">
            <el-scrollbar>
                <el-aside width="220px">
                    <div class="logo" @click="$router.push('/')">觅品圈</div>
                    <Tab />
                </el-aside>
            </el-scrollbar>
            <el-container class="body">
                <el-header class="header">
                    <Bread />
                    <div class="rightAdmin">
                        <el-dropdown trigger="click" style="outline:none;">
                            <div class="userInfo">
                                <el-avatar icon="el-icon-user-solid"></el-avatar>
                                <div class="welCome">
                                    <font class="hy">欢迎您！</font>
                                    <font class="name">{{ username }}</font>
                                </div>
                                <span class="iconRight">
                                    <i class="el-icon-caret-bottom"></i>
                                </span>
                            </div>
                            <el-dropdown-menu
                                slot="dropdown"
                                class="ulDropDown"
                            >
                                <el-dropdown-item class="pd20" @click.native="logout">
                                    <font>
                                        <i class="el-icon-switch-button"></i>
                                        退出
                                    </font>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </el-header>
                <el-scrollbar class="main">
                    <el-main style="padding:0">
                        <RView />
                    </el-main>
                </el-scrollbar>
            </el-container>
        </el-container>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";

import Tab from "./tab.vue";
import RView from "@/components/routerView/index.vue";
import Bread from "./bread.vue";
import { UserModule } from '@/model/user';
@Component({
    components: {
        Tab,
        RView,
        Bread,
    },
})
export default class extends Vue {
	logout(){
		UserModule.logout()
		this.$router.push('/login')
	}
	get username(){
		return UserModule.user_info.username
	}
}
</script>

<style lang='less' scoped>
#page {
    height: 100%;
    width: 100%;
    .container {
        height: 100%;
        width: 100%;
        .logo {
            width: 100%;
            height: 60px;
            text-align: center;
            line-height: 60px;
            color: #fff;
            background: rgb(216, 221, 4);
            font-size: 18px;
            font-weight: 550;
            cursor: pointer;
        }
        .body {
            .header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 200px;
                .rightAdmin {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 100%;
                    .userInfo {
                        display: flex;
                        cursor: pointer;
                        .welCome {
                            display: flex;
                            flex-direction: column;
                            margin: 0 5px;
                        }
                        span.iconRight {
                            display: flex;
                            align-items: center;
                        }
                    }
                }
            }
            .main {
                background: rgb(233, 238, 248);
            }
        }
    }
}
</style>
<style lang="less">
#page {
    .el-scrollbar /deep/ {
        .el-scrollbar__wrap {
            overflow-x: hidden !important;
        }
    }
}
</style>

<template>
    <el-menu :default-active="'/admin'" router mode="horizontal" background-color="white" text-color="#222"
        active-text-color="red" style="min-width: 1300px">
        <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name" style="color:#483D8B">
            {{ item.navItem }}
        </el-menu-item>
        <el-menu-item style="float:right" @click="logout">
            <i class="el-icon-close"></i>
            <span>退出登录</span>
        </el-menu-item>
    </el-menu>
</template>

<script>
    export default {
        name: 'NavMenu',
        data() {
            return {
                navList: [{
                        name: '/',
                        navItem: '云笔记 - CloudNote'
                    }
                ]
            }
        },
        methods:{
            logout(){
                localStorage.removeItem("authKey")
                this.$router.replace({path: '/login'})
            }
        }
    }
</script>

<style scoped>
    a {
        text-decoration: none;
    }

    span {
        pointer-events: none;
    }
</style>
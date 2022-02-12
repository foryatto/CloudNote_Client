<template>
    <el-container>
        <el-header>
            <nav-menu></nav-menu>
        </el-header>
        <el-container>
            <el-aside width="200px">
                <div>
                    <el-menu :default-active="this.$route.path " router class="el-menu-vertical-demo">
                        <el-submenu index="1">
                            <template slot="title">
                                <i class="el-icon-notebook-1"></i>
                                <span>笔记管理</span>
                            </template>
                            <el-menu-item index="/note">我的笔记</el-menu-item>
                            <el-menu-item index="/addNote">新增笔记</el-menu-item>
                            <el-menu-item index="/noteTrash">回收站</el-menu-item>
                        </el-submenu>

                        <el-menu-item index="category">
                            <i class="el-icon-folder-opened"></i>
                            <span slot="title">分类管理</span>
                        </el-menu-item>

                        <el-menu-item index="todo">
                            <i class="el-icon-date"></i>
                            <span slot="title">我的待办</span>
                        </el-menu-item>

                        <el-menu-item index="profile">
                            <i class="el-icon-user"></i>
                            <span slot="title">个人资料</span>
                        </el-menu-item>

                    </el-menu>
                </div>
            </el-aside>
            <el-container>
                <el-main>
                    <router-view />
                </el-main>
            </el-container>
        </el-container>
    </el-container>

</template>

<script>
    import NavMenu from '../components/manager/NavMenu'
    export default {
        name: 'Manager',
        components: {
            NavMenu
        },
        data() {
            return {}
        },
        mounted() {}

    }
</script>
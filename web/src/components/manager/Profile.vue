<template>
    <div>
        <el-descriptions class="margin-top" title="我的信息" :column="3" :size="size" border>
            <template slot="extra">
                <el-button type="primary" size="small">操作</el-button>
            </template>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-user"></i>
                    用户名
                </template>
                kooriookami
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-mobile-phone"></i>
                    邮箱
                </template>
                admin@admin.com
            </el-descriptions-item>
        </el-descriptions>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                imgServer: "http://127.0.0.1:8199/img",
            };
        },
        mounted() {

        },
        methods: {

        }
    };
</script>
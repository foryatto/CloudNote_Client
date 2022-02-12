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
                {{ userProfile.fullName }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-mobile-phone"></i>
                    邮箱
                </template>
                {{ userProfile.email }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                    <i class="el-icon-mobile-phone"></i>
                    注册时间
                </template>
                {{ userProfile.createdAt }}
            </el-descriptions-item>
        </el-descriptions>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                imgServer: "http://127.0.0.1:8199/img",
                userProfile:"",
            };
        },
        mounted() {
            this.getUserProfile()
        },
        methods: {
            getUserProfile(){
                this.axios
                        .get('/user/profile', {
                            params: {},
                            headers: {
                                Authorization: "Bearer " + localStorage.getItem("authKey")
                            }
                        })
                        .then(successResponse => {
                            var result = successResponse.data
                            this.userProfile = result.data
                        })
                        .catch(failResponse => {
                            console.log(failResponse)
                        })
            }
        }
    };
</script>
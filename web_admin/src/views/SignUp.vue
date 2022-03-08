<template>

    <body id="paper">
        <el-form :model="form" :rules="rules" class="login-container">
            <h3 class="login_title">用户注册</h3>
            <el-form-item prop="fullName">
                <el-input type="text" v-model="form.fullName" auto-complete="off" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item prop="email">
                <el-input type="text" v-model="form.email" auto-complete="off" placeholder="邮箱"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="form.password" auto-complete="off" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item prop="password2">
                <el-input type="password" v-model="form.password2" auto-complete="off" placeholder="确认密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" style="width: 48%; background: #505458; border: none;"
                    v-on:click="toLogin">返回
                </el-button>
                <el-button type="primary" style="width: 48%; background: #505458; border: none;"
                    v-on:click="signUp">注册
                </el-button>
            </el-form-item>
        </el-form>
    </body>

</template>

<script>
    export default {
        name: 'SignUp',
        data() {
            return {
                checked: true,
                rules: {
                    email: [{
                        required: true,
                        message: '邮箱不能为空',
                        trigger: 'blur'
                    }],
                    password: [{
                        required: true,
                        message: '密码不能为空',
                        trigger: 'blur'
                    }]
                },
                form: {
                    email: '',
                    fullName: '',
                    password: '',
                    password2: '',
                },
            }
        },
        mounted() {
            if (localStorage.getItem("authKey") != null) {
                this.$router.replace({
                    path: '/'
                })
            }
        },
        methods: {
            signUp() {
                if (this.form.password2 != this.form.password) {
                    this.$message.error('两次密码不一致，请重试');
                } else {
                    this.axios
                        .post('/users', {
                            email: this.form.email,
                            password: this.form.password,
                            fullName: this.form.fullName,
                        })
                        .then(successResponse => {
                            var result = successResponse.data
                            if (result.code == 0) {
                                this.$message({
                                    message: '注册成功',
                                    type: 'success'
                                });
                                this.$router.replace({
                                    path: '/login'
                                })
                            } else {
                                this.$message.error('注册失败，请稍后重试');
                            }
                        })
                        .catch(failResponse => {
                            console.log(failResponse)
                        })
                }
            },
            toLogin(){
                this.$router.replace({
                                path: '/'
                            })
            }
        }
    }
</script>

<style scoped>
    #paper {
        /* background: url("../assets/img/bg/bg.jpg") no-repeat; */
        background-position: center;
        height: 100%;
        width: 100%;
        background-size: cover;
        position: fixed;
    }

    body {
        margin: 0;
        background-image: linear-gradient(to right, #f1f3f8, #d6e0f0);
    }

    .login-container {
        border-radius: 15px;
        background-clip: padding-box;
        margin: 0px auto;
        margin-top: 10%;
        width: 350px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }

    .login_title {
        margin: 0px auto 40px auto;
        text-align: center;
        color: #505458;
    }

    .login_remember {
        margin: 0px 0px 35px 0px;
        text-align: left;
    }
</style>
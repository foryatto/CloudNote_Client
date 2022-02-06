<template>

    <body id="paper">
        <el-form :model="loginForm" :rules="rules" class="login-container">
            <h3 class="login_title">系统登录</h3>
            <el-form-item prop="email">
                <el-input type="text" v-model="loginForm.email" auto-complete="off" placeholder="邮箱"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
            </el-form-item>
            <el-checkbox class="login_remember" v-model="checked" label-position="left"><span
                    style="color: #505458">记住账号</span></el-checkbox>
            <el-form-item >
                <el-button type="primary" style="width: 100%; background: #505458; border: none;"
                    v-on:click="login">登录
                </el-button>
            </el-form-item>
        </el-form>
    </body>

</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                checked: true,
                rules: {
                    email: [{
                        required: true,
                        message: '用户名不能为空',
                        trigger: 'blur'
                    }],
                    password: [{
                        required: true,
                        message: '密码不能为空',
                        trigger: 'blur'
                    }]
                },
                loginForm: {
                    email: '',
                    password: '',
                },
            }
        },
        mounted() {
            if (localStorage.getItem("authKey") != null ){
                this.$router.replace({
                                path: '/'
                            })
            }
        },
        methods: {
            login() {
                this.axios
                    .post('/user/login', {
                        email: this.loginForm.email,
                        password: this.loginForm.password,
                    })
                    .then(successResponse => {
                        var result = successResponse.data
                        if (result.code == 0) {
                            this.$message({
                                message: '登陆成功',
                                type: 'success'
                            });
                            localStorage.setItem("authKey", result.data)
                            this.$router.replace({
                                path: '/'
                            })
                        } else {
                            this.$message.error('登陆失败，请检查邮箱和密码');
                        }
                    })
                    .catch(failResponse => {
                        console.log(failResponse)
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
        background-image: linear-gradient(to right , #f1f3f8, #d6e0f0);
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
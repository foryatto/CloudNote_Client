<template>
    <div>
        <div style="margin-top: 20%">
            <van-form @submit="login">
                <van-field v-model="userId" name="username" label="邮箱" placeholder="邮箱"
                    :rules="[{ required: true, message: '请填写邮箱' }]" />
                <van-field v-model="password" type="password" name="password" label="密码" placeholder="密码"
                    :rules="[{ required: true, message: '请填写密码' }]" />
                <div style="margin:16px 0px">
                    <van-button round block type="info" native-type="submit" style="width:80%; margin: 0px auto">
                        登录
                    </van-button>
                </div>
            </van-form>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                userId: '',
                password: '',
            }
        },
        methods: {
            login() {
                this.axios.post("/user/login", {
                    'email': this.userId,
                    'password': this.password,
                    })
                    .then(Response => {
                        this.status = Response.data
                        if (this.status.data != null) {
                            localStorage.setItem("authKey", this.status.data)
                            this.$router.push("/")
                        }
                    })
            }
        }
    }
</script>>

<style scoped>

</style>
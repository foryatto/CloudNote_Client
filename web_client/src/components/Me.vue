<template>
  <div class="userinfo">
    <div class="photo">
      <van-image round width="6rem" height="6rem" fit="fill" src="https://img.yzcdn.cn/vant/cat.jpeg" />
    </div>

    <van-grid :gutter="10" :column-num="2" :clickable="true">
      <van-grid-item icon="star" text="个人资料" @click="showUserProfile=true" color="#68b0ab" />
      <van-grid-item icon="underway" text="创建待办" @click="showAddTodo" color="#68b0ab" />
      <van-grid-item icon="todo-list" text="分类管理" @click="gotoCategory" color="#68b0ab" />
      <van-grid-item icon="award" text="数据统计" @click="gotoAnalyze" color="#68b0ab" />
      <van-grid-item icon="medal" text="退出登录" @click="logOut" color="#68b0ab" />
      <van-grid-item icon="smile-comment" text="关于软件" @click="showAbout=true" color="#68b0ab" />
    </van-grid>

    <van-popup v-model="addTodo" round position="bottom" :style="{ height: '60%' }">

      <div>
        <van-form @submit="addTodoSubmit">
          <van-field v-model="todoForm.title" name="标题" label="标题" placeholder="标题"
            :rules="[{ required: true, message: '请填写待办标题' }]" />

          <van-field v-model="todoForm.content" rows="2" autosize label="内容" type="textarea" maxlength="200"
            placeholder="请输入待办的内容" show-word-limit />

          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">创建</van-button>
          </div>
        </van-form>
      </div>

    </van-popup>


    <van-popup v-model="showAbout" round position="bottom" :style="{ height: '60%' }">

      <div>
        <van-cell title="作者:" label="Foryatto" />
        <van-cell title="官网:" label="www.foryatto.com" />
        <van-cell title="Bug反馈:" label="www.github.com/foryatto" />
      </div>

    </van-popup>

    <van-popup v-model="showUserProfile" round position="bottom" :style="{ height: '60%' }">

      <div>
        <van-cell title="用户名:" :label="userProfile.fullName" />
        <van-cell title="邮箱:" :label="userProfile.email" />
        <van-cell title="注册时间:" :label="userProfile.createdAt" />
      </div>

    </van-popup>

  </div>
</template>

<script>
  import {
    Toast
  } from 'vant';

  export default {
    data() {
      return {
        addTodo: false,
        todoForm: {
          title: "",
          content: ""
        },

        showAbout: false,

        showUserProfile: false,
        userProfile: {}
      }
    },
    mounted(){
      this.getUserProfile()
    },
    methods: {
      logOut() {
        localStorage.removeItem("userInfo");
        localStorage.removeItem("authKey");
        this.$router.push("/login")
      },
      showAddTodo() {
        this.addTodo = true
      },
      addTodoSubmit() {
        console.log(this.todoForm)
        this.axios
          .post("/plans", {
            "title": this.todoForm.title,
            "content": this.todoForm.content,
          }, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("authKey")
            }
          })
          .then(successResponse => {
            var result = successResponse.data
            if (result.code == 0) {
              Toast.success('创建成功');
              this.todoForm.title = ""
              this.todoForm.content = ""
              this.addTodo = false

            } else {
              Toast.fail('创建失败');
            }
          })
          .catch(failResponse => {
            console.log(failResponse)
          })
      },
      gotoCategory() {
        this.$router.replace({
          path: '/category'
        })
      },
      gotoAnalyze(){
        this.$router.replace({
          path: '/analyze'
        })
      },
      getUserProfile() {
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
  }
</script>

<style scoped>
  .userinfo {
    margin: 8px;
    margin-top: 8%;
  }

  .photo {
    margin-bottom: 30px;
  }

  .userinfo .van-grid-item {
    color: #68b0ab;
  }

  .photo {
    width: 99px;
    margin: 18px auto;
  }
</style>
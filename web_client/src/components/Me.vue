<template>
  <div class="userinfo">
    <div class="photo">
      <van-image round width="6rem" height="6rem" fit="fill" src="https://img.yzcdn.cn/vant/cat.jpeg" />
    </div>
    
    <van-grid :gutter="10" :column-num="2" :clickable="true">
      <van-grid-item icon="star" text="个人资料" color="#68b0ab" />
      <van-grid-item icon="underway" text="我的选题" @click="showMyTopic" color="#68b0ab" />
      <van-grid-item icon="todo-list" text="提交论文" color="#68b0ab" />
      <van-grid-item icon="award" text="最终成绩" color="#68b0ab" />
      <van-grid-item icon="medal" text="退出登录" @click="logOut" color="#68b0ab" />
      <van-grid-item icon="smile-comment" text="关于软件" color="#68b0ab" />
    </van-grid>

  </div>
</template>

<script>
import { Toast } from 'vant';
  export default {
    methods:{
      logOut(){
        localStorage.removeItem("userInfo");
        localStorage.removeItem("authKey");
        this.$router.push("/login")
      },
      showMyTopic(){
        var user = JSON.parse(localStorage.getItem("userInfo"))
        if(user.topic == null){
          Toast('当前还未选择题目');
        }
        else{
          this.$router.push("/topicInfo/"+user.topic.topic_id)
        }
      }
    }
  }
</script>

<style scoped>
  .userinfo {
    margin: 8px;
    margin-top: 8%;
  }
  .photo{
    margin-bottom: 30px;
  }
  .userinfo .van-grid-item {
    color: #68b0ab;
  }
  .photo{
    width: 99px;
    margin: 18px auto;
  }
</style>
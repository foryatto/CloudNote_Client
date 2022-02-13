<template>
  <div id="app">
    <van-nav-bar title="云笔记" style="background: #ecf4f3">
      <template #left>
        <van-icon name="wap-nav" size="18" />
      </template>
      <template #right>
        <van-icon name="search" size="18" @click="gotoSearch"/>
      </template>
    </van-nav-bar>

    <router-view />

    <van-tabbar route active-color="#ff7e67" inactive-color="#68b0ab">
      <van-tabbar-item replace to="/home" icon="wap-home">
        笔记
      </van-tabbar-item>
      <van-tabbar-item replace to="/todo" icon="column">
        待办
      </van-tabbar-item>
      <van-tabbar-item replace to="/me" icon="manager">
        我的
      </van-tabbar-item>
    </van-tabbar>

  </div>
</template>

<script>
export default {
  methods:{
    gotoSearch(){
      this.$router.push("/search");
    }
  }
}
</script>>

<style>

</style>
<template>
  <div class="search">
    <van-search
      v-model="value"
      shape="round"
      placeholder="请输入搜索关键词"
      @search="onSearch"
    />
    <van-row id="history_title">
      <van-col span="10">
        <span>历史记录</span>
      </van-col>
      <van-col span="2" offset="12">
        <van-icon name="delete" @click="clearHistory"/>
      </van-col>
    </van-row>

    <div id="history">
      <van-row gutter="20">
        <van-col span="12" v-for="item in historyList" :key="item">
          <p @click="onSearch(item)">{{item}}</p>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      value: "",
      historyList: [] //搜索记录
    }
  },
  created() {
    var history = localStorage.getItem("history");
    if (history != null) {
      this.historyList = history.split(",");
    }
  },
  methods: {
    clearHistory() {
      this.historyList = [];
      localStorage.setItem("history","");
    },
    onSearch(val) {
      for (var i = 0; i < this.historyList.length; i++) {
        if (this.historyList[i] == val) {
          this.historyList.splice(i, 1);
          break;
        }
      }
      this.historyList.splice(0, 0, val);
      localStorage.setItem("history", this.historyList.toString());
      this.$router.push("/searchInfo/" + val);
    },
  }
};
</script>
<style scoped>
.search {
  margin-top: 5%;
}
#history_title{
    margin:8px 18px;
}
#history {
  margin: 5% 5%;
}

.search span {
  font-size: 16px;
  color: rgb(160, 159, 159);
}
</style>

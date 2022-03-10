<template>
  <div class="todo">

    <van-dropdown-menu>
      <van-dropdown-item v-model="value" :options="options" @change="getTodoByStatus" />
    </van-dropdown-menu>

    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-swipe-cell v-for="item in list" :key="item.noteId">
          <template #left>
            <van-button square type="primary" text="更新" @click="updateTodo(item)" />
          </template>
          <van-cell :border="false" :title="item.title" :value="item.createdAt | dateFormat"
            @click="showDetail(item)" />
          <template #right>
            <van-button square type="danger" text="删除" @click="deleteTodo(item)" />
          </template>
        </van-swipe-cell>

      </van-list>
    </van-pull-refresh>


    <van-popup v-model="showDetailContent" round style="width:80%; height:60%">
      <div style="width:80%; height:80%; margin: 0 5%">
        <p style="color:grey">创建时间: {{ todo.createdAt | dateFormat }}</p>
        <van-row justify="center">
          <van-divider :style="{ color: '#68b0ab', borderColor: '#1989fa', padding: '0 16px' }">
            待办事项
          </van-divider>
          <van-col span="24">{{ todo.content }}</van-col>
        </van-row>
      </div>
    </van-popup>


  </div>
</template>

<script>
  // 桌面端配适滑动手势
  import '@vant/touch-emulator';

  import {
    Notify
  } from 'vant';

  export default {
    data() {
      return {
        list: [],
        loading: false,
        finished: false,
        refreshing: false,
        pageSize: 20,
        pageNum: 1,
        options: [{
          text: '未完成',
          value: false
        }, {
          text: '已完成',
          value: true
        }],
        value: false,
        todo: {},
        showDetailContent: false
      }
    },
    methods: {
      onLoad() {
        setTimeout(() => {
          if (this.refreshing) {
            this.list = [];
            this.refreshing = false;
          }
          var param = 0
          if (this.value == true) {
            param = 1
          } else {
            param = 2
          }
          this.axios
            .get('/plans', {
              params: {
                // page: this.pageNum,
                // pageSize: this.pageSize,
                completed: param,
              },
              headers: {
                Authorization: "Bearer " + localStorage.getItem("authKey")
              }
            })
            .then(successResponse => {
              var result = successResponse.data
              this.list = result.data.items
            })
            .catch(failResponse => {
              console.log(failResponse)
            })

          this.loading = false;

          this.finished = true;

          if (this.list.length >= 40) {
            this.finished = true;
          }
        }, 100);
      },
      onRefresh() {
        // 清空列表数据
        this.finished = false;

        // 重新加载数据
        // 将 loading 设置为 true，表示处于加载状态
        this.loading = true;
        this.onLoad();
      },
      getTodoByStatus(value) {
        this.value = value
        this.list = []
        var param = 0
          if (value == true) {
            param = 1
          } else {
            param = 2
          }
        this.axios
          .get('/plans', {
            params: {
              // page: this.pageNum,
              // pageSize: this.pageSize,
              completed: param,
            },
            headers: {
              Authorization: "Bearer " + localStorage.getItem("authKey")
            }
          })
          .then(successResponse => {
            var result = successResponse.data
            this.list = result.data.items
          })
          .catch(failResponse => {
            console.log(failResponse)
          })
        console.log(this.list)
      },
      deleteTodo(row) {
        var batch_id = []
        batch_id.push(row.planId)
        this.axios
          .delete('/plans', {
            params: {
              ids: batch_id
            },
            headers: {
              Authorization: "Bearer " + localStorage.getItem("authKey")
            }
          })
          .then(successResponse => {
            var result = successResponse.data
            // 返回状态200则表示删除成功
            if (result.code == 0) {
              Notify({
                type: 'primary',
                message: '删除成功',
                duration: 500,
              });
              this.onLoad()
            } else {
              Notify({
                type: 'warning',
                message: '删除失败'
              });
            }
          })
          .catch(failResponse => {
            console.log(failResponse)
          })
      },
      updateTodo(row) {
        this.axios.put("/plan", {
            "completed": !row.completed,
            "planId": row.planId
          }, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("authKey")
            }
          }).then(successResponse => {
            var result = successResponse.data
            if (result.code == 0) {
              Notify({
                type: 'primary',
                message: '更新成功',
                duration: 500
              });
              this.onLoad()
            } else {
              Notify({
                type: 'warning',
                message: '更新失败'
              });
            }
          })
          .catch(failResponse => {
            console.log(failResponse)
          })
      },
      showDetail(row) {
        this.showDetailContent = true
        this.todo = row
      }
    }
  }
</script>

<style scoped>

</style>
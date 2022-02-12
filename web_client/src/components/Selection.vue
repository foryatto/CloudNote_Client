<template>
  <div class="selection">

    {{ marjos }}
    <van-tabs v-model="active">
      
      <van-tab v-for="t in majors" :key="t.major_id" :title="t.major_name">
        <div v-for="i in topic" :key="i[0]">
          <van-cell v-if="i.topic_range.includes(t.major_name)" :title="i.topic_name" is-link @click="showMore(i.topic_id)" icon="location-o" />
        </div>
      </van-tab>
      </van-tabs>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        active: '1',
        type: [],
        topic: [],
        u: JSON.parse(localStorage.getItem("userInfo")),
        majors: '',
        departments: '',
      }
    },
    created() {
      this.getTopic();
      this.getMajorByDept();
      this.getDepartment();
    },
    methods: {
      getMajorByDept() {
        this.axios
          .post('/major/getByDeptId',{
            'dept_id': this.u.department.dept_id
          })
          .then(successResponse => {
            var result = successResponse.data
            this.majors = result
          })
          .catch(failResponse => {
            console.log(failResponse)
          })
      },
      getDepartment() {
        this.axios
          .get('/department/getAll')
          .then(successResponse => {
            var result = successResponse.data
            this.departments = result
          })
          .catch(failResponse => {
            console.log(failResponse)
          })
      },
      getTopic() {
        this.axios.post('/topic/getAll', {
            'authKey': localStorage.getItem("authKey")
          })
          .then(Response => {
            this.topic = Response.data
          })
      },
      showMore(id) {
        this.$router.push("/topicInfo/" + id);
      }
    }
  }
</script>

<style scoped>
  .van-card__title {
    margin-top: 20px;
  }
</style>
<template>
    <div class="analyze" style="margin-top:20%">

        <van-divider content-position="left">笔记</van-divider>

        <van-grid :column-num="2" :gutter="20">
            <van-grid-item icon="column" :text="'笔记: '+noteCount" color="#68b0ab" />
            <van-grid-item icon="coupon" :text="'分类: '+categoryCount" color="#68b0ab" />
        </van-grid>

        <van-divider content-position="left">待办</van-divider>


        <van-grid :column-num="2" :gutter="20">
            <van-grid-item icon="checked" :text="'已完成: '+doneCount" color="#68b0ab" />
            <van-grid-item icon="clear" :text="'未完成: '+todoCount" color="#68b0ab" />
        </van-grid>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                noteCount: 0,
                categoryCount: 0,
                doneCount: 0,
                todoCount: 0,
            }
        },
        mounted() {
            this.axios
                .get('/notes', {
                    params: {},
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("authKey")
                    }
                })
                .then(successResponse => {
                    var result = successResponse.data
                    this.noteCount = result.data.total
                })
                .catch(failResponse => {
                    console.log(failResponse)
                })

            this.axios
                .get('/plans', {
                    params: {
                        // page: this.pageNum,
                        // pageSize: this.pageSize,
                        completed: 1,
                    },
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("authKey")
                    }
                })
                .then(successResponse => {
                    var result = successResponse.data
                    this.doneCount = result.data.total
                })
                .catch(failResponse => {
                    console.log(failResponse)
                })

            this.axios
                .get('/plans', {
                    params: {
                        // page: this.pageNum,
                        // pageSize: this.pageSize,
                        completed: 2,
                    },
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("authKey")
                    }
                })
                .then(successResponse => {
                    var result = successResponse.data
                    this.todoCount = result.data.total
                })
                .catch(failResponse => {
                    console.log(failResponse)
                })

            this.axios
                .get('/categories', {
                    params: {},
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("authKey")
                    }
                })
                .then(successResponse => {
                    var result = successResponse.data
                    this.categoryCount = result.data.total

                })
                .catch(failResponse => {
                    console.log(failResponse)
                })



        },
        methods: {

        }
    }
</script>

<style scoped>
    .van-grid-item {
        color: #68b0ab;
    }
</style>
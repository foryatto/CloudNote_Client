<template>
    <div class="selection">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                <van-cell v-for="item in list" :key="item.noteId" :title="item.title" :to="'/viewNote?id='+item.noteId"/>
            </van-list>
        </van-pull-refresh>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                title: this.$route.params.title,
                list: [],
                loading: false,
                finished: false,
                refreshing: false,
            }
        },
        created() {
            // this.getTopic();
        },
        methods: {
            onLoad() {
                setTimeout(() => {
                    if (this.refreshing) {
                        this.list = [];
                        this.refreshing = false;
                    }

                    this.axios
                        .get('/notes', {
                            params: {
                                // page: this.pageNum,
                                // pageSize: this.pageSize,
                                title: this.title
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
        }
    }
</script>

<style scoped>
    .van-card__title {
        margin-top: 20px;
    }
</style>
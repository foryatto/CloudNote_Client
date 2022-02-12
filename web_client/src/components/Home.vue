<template>
    <div id="home">
        <van-dropdown-menu>
            <van-dropdown-item :value="categoryId" :options="options" @change="getNoteByCategory" />
        </van-dropdown-menu>

        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                <van-cell v-for="item in list" :key="item.noteId" :title="item.title" :to="'viewNote?id='+item.noteId"/>
            </van-list>
        </van-pull-refresh>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                list: [],
                loading: false,
                finished: false,
                refreshing: false,
                pageSize: 20,
                pageNum: 1,
                options: [],
                categoryId: "0",

            }
        },
        computed: {

        },
        created() {
            this.getCategories();
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
                                page: this.pageNum,
                                pageSize: this.pageSize,
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
            getCategories() {
                this.axios
                    .get('/categories', {
                        params: {},
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("authKey")
                        }
                    })
                    .then(successResponse => {
                        var result = successResponse.data
                        this.options = [{
                            text: "全部分类",
                            value: "0"
                        }]
                        for (var i in result.data.items) {
                            this.options.push({
                                text: result.data.items[i].title,
                                value: result.data.items[i].categoryId
                            })
                        }
                    })
                    .catch(failResponse => {
                        console.log(failResponse)
                    })
            },
            getNoteByCategory(id) {
                this.categoryId = id
                if (id == "0") {
                    this.onLoad()
                } else {
                    this.axios
                        .get('/notes', {
                            params: {
                                page: this.pageNum,
                                pageSize: this.pageSize,
                                categoryId: this.categoryId
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
                }
            },
            viewNote(id){
                console.log(id)
            }
        }
    }
</script>

<style>
    #home {
        margin-top: 2px;
        /* margin-bottom: 50px; */
    }

    #home .van-icon {
        color: #68b0ab;
    }

    #words {
        font-size: 14px;
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .van-circle {
        margin: 16px auto;
    }

    .van-cell {
        margin: 10px 0px;
    }
</style>
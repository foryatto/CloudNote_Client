<template>
    <div>
        <div>

            <el-form :inline="true" :model="searchForm" class="demo-form-inline">
                <el-form-item label="搜索：">
                    <el-input v-model="searchForm.title" clearable placeholder="按标题搜索"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button icon="el-icon-search" type="primary" @click="searchNotes()"></el-button>
                </el-form-item>

                <el-form-item>
                    <el-button type="danger" @click="batchDelete" icon="el-icon-delete">删除</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div>
            <el-table :data="tableData.items" @selection-change="handleSelectionChange" border style="width: 100%"
                stripe>
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column prop="noteId" label="ID" v-if="tableIdShow">
                </el-table-column>
                <el-table-column prop="title" label="标题">
                </el-table-column>
                <el-table-column prop="updatedAt" sortable label="更新时间">
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        {{ scope.row.updatedAt | dateFormat }}
                    </template>
                </el-table-column>

                <el-table-column prop="category.title" label="标签" :filters="options" :filter-method="filterTag"
                    filter-placement="bottom-end">
                    <template slot-scope="scope" v-if="scope.row.category.title != '' ">
                        <el-tag type="success" disable-transitions>
                            {{scope.row.category.title}}</el-tag>
                    </template>
                </el-table-column>

                <el-table-column fixed="right" label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button @click="updateNote(scope.row)" type="text" size="small">编辑</el-button>
                        <el-button @click="viewNoteDetail(scope.row)" type="text" size="small">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <div style="margin-top:20px">
            <el-pagination v-if="!isSearchMode" @current-change="getNote" background layout="prev, pager, next"
                :total="tableData.total" :current-page="pageNum" :page-size="pageSize">
            </el-pagination>
            <el-pagination v-if="isSearchMode" @current-change="searchNotes" background layout="prev, pager, next"
                :total="searchResult.total" :current-page="searchResult.pageNum" :page-size="searchResult.pageSize">
            </el-pagination>
        </div>

    </div>

</template>

<script>
    export default {
        name: 'NavMenu',
        data() {
            return {
                tableIdShow: false,
                tableData: [],
                pageSize: 15,
                pageNum: 1,
                isSearchMode: false,
                searchForm: {
                    title: ''
                },
                searchResult: [],
                batch_id: [],
                options: [],
            }
        },
        methods: {
            // 批量删除用户笔记 todo
            batchDelete() {
                // 判断要删除的ID数组是否为空
                if (this.batch_id.length == 0) {
                    this.$message.error('请先选择要删除的笔记!');
                } else {
                    // 确认窗口，需要确认才能执行下一步，向服务器发送删除请求
                    this.$confirm('此操作将永久删除该笔记, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        // 向服务器发送删除请求
                        this.axios
                            .delete('/notes', {
                                params: {
                                    ids: this.batch_id
                                },
                                headers: {
                                    Authorization: "Bearer " + localStorage.getItem("authKey")
                                }
                            })
                            .then(successResponse => {
                                var result = successResponse.data
                                // 返回状态200则表示删除成功
                                if (result.code == 0) {
                                    this.$message({
                                        message: '删除成功',
                                        type: 'success'
                                    });
                                    this.getNote(this.pageNum)
                                } else {
                                    this.$message.error('删除失败');
                                }
                            })
                            .catch(failResponse => {
                                console.log(failResponse)
                            })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                }
            },
            // 根据笔记标题搜索笔记
            searchNotes() {
                if (this.searchForm.title == "") {
                    this.getNote(1)
                } else {
                    this.axios
                        .get('/notes', {
                            params: {
                                page: 1,
                                pageSize: this.pageSize,
                                title: this.searchForm.title,
                            },
                            headers: {
                                Authorization: "Bearer " + localStorage.getItem("authKey")
                            }
                        })
                        .then(successResponse => {
                            var result = successResponse.data
                            this.tableData = result.data
                        })
                        .catch(failResponse => {
                            console.log(failResponse)
                        })
                }

            },
            // 获取用户笔记
            getNote(pageNum) {
                this.pageNum = pageNum
                this.axios
                    .get('/notes', {
                        params: {
                            page: pageNum,
                            pageSize: this.pageSize,
                        },
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("authKey")
                        }
                    })
                    .then(successResponse => {
                        var result = successResponse.data
                        this.tableData = result.data
                    })
                    .catch(failResponse => {
                        console.log(failResponse)
                    })
            },
            // 当选中对应行数据时, 执行该函数, 将所有已选择行的ID存在一个数组中
            handleSelectionChange(val) {
                this.batch_id = []
                for (var i = 0; i < val.length; i++) {
                    this.batch_id.push(val[i].noteId)
                }
                console.log(this.batch_id)
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
                        this.options = []
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
            filterTag(value, row) {
                return row.category.categoryId === value;
            },
            filterHandler(value, row, column) {
                const property = column['property'];
                return row[property] === value;
            },
            viewNoteDetail(row) {
                this.$router.push({
                    path: '/viewNote',
                    query: {
                        id: row.noteId
                    }
                })
            },
            updateNote(row){
                this.$router.push({
                    path: '/updateNote',
                    query: {
                        id: row.noteId
                    }
                })
            }
        },
        // vue的生命周期函数
        mounted() {
            // 获取用户笔记
            this.getNote(this.pageNum)
            this.getCategories()
        },

    }
</script>

<style scoped>
</style>
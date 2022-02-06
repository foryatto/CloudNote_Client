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
                    <el-button type="primary" @click="addFormVisible = true">新增分类</el-button>
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
                <el-table-column prop="categoryId" label="ID" v-if="tableIdShow">
                </el-table-column>
                <el-table-column prop="title" label="分类">
                </el-table-column>

                <el-table-column prop="description" label="描述">
                </el-table-column>

                <el-table-column prop="description" label="笔记数量">
                </el-table-column>
 
                <el-table-column fixed="right" label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button @click="showModifyForm(scope.row)" type="text" size="small">编辑</el-button>
                        <el-button @click="viewNoteDetail(scope.row)" type="text" size="small">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <div style="margin-top:20px">
            <el-pagination v-if="!isSearchMode" @current-change="getNote" background layout="prev, pager, next"
                :total="tableData.total" :current-page="pageNum" :page-size="pageSize">
            </el-pagination>
            <el-pagination v-if="isSearchMode" @current-change="searchNotices" background layout="prev, pager, next"
                :total="searchResult.total" :current-page="searchResult.pageNum" :page-size="searchResult.pageSize">
            </el-pagination>
        </div>

        <div>
            <el-dialog title="新增分类" :visible.sync="addFormVisible">
                <el-form :model="addData">
                    <el-form-item label="标题">
                        <el-input v-model="addData.title" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="描述">
                        <el-input type="textarea" rows="5" v-model="addData.content" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="addFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addCategory">提交</el-button>
                </div>
            </el-dialog>
        </div>

        <div>
            <el-dialog title="编辑分类" :visible.sync="modifyFormVisible">
                <el-form :model="modifyData">
                    <el-form-item label="标题">
                        <el-input v-model="modifyData.title" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="描述">
                        <el-input type="textarea" rows="5" v-model="modifyData.content" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="modifyFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="modifyNotice">提交</el-button>
                </div>
            </el-dialog>
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

                addFormVisible: false,
                modifyFormVisible: false,
                addData: {
                    'title': '',
                    'content': '',
                },
                modifyData: {
                    'categoryId': '',
                    'title': '',
                    'content': '',
                },
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
                        this.tableData = result.data
                        console.log(this.tableData)
                    })
                    .catch(failResponse => {
                        console.log(failResponse)
                    })
            },
            viewNoteDetail(row) {
                this.$router.push({
                    path: '/viewNote',
                    query: {
                        id: row.noteId
                    }
                })
            },
            // 显示编辑对话框
            showModifyForm(rowData) {
                this.modifyFormVisible = true
                // 将当前行的数据传入对话框中的表单数据
                this.modifyData = rowData
            },
        },
        // vue的生命周期函数
        mounted() {
            // 获取笔记分类
            this.getCategories()
        },

    }
</script>

<style scoped>
</style>
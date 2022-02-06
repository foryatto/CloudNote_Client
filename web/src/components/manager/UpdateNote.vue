<template>
    <div>
        <div style="margin:10px 0px">
            <el-row :gutter="20">
                <el-col :span="18">
                    <el-input v-model="note.title" placeholder="请输入标题"></el-input>
                </el-col>
                <el-col :span="3">
                    <el-select v-model="note.category.categoryId" placeholder="请选择分类">
                        <el-option v-for="item in options" :key="item.categoryId" :label="item.title"
                            :value="item.categoryId">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="3">
                    <el-button type="primary" @click="updateNote">更新</el-button>
                </el-col>
            </el-row>
        </div>

        <v-md-editor v-model="note.content" height="600px" @upload-image="handleUploadImage" :disabled-menus="[]">
        </v-md-editor>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                imgServer: "http://127.0.0.1:8199/img",
                categoryId: "",
                options: {},
                noteId: this.$route.query.id,
                note: {},
            };
        },
        mounted() {
            this.getCategories()
            this.getNoteDetail()
        },
        methods: {
            updateNote() {
                var updateResult = true
                this.axios
                    .put("/note/title", {
                        "title": this.note.title,
                        "noteId": this.note.noteId,
                    }, {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("authKey")
                        }
                    })
                    .then(successResponse => {
                        var result = successResponse.data
                        if (result.code != 0) {
                            updateResult = false
                        }
                    })
                    .catch(failResponse => {
                        console.log(failResponse)
                    })

                this.axios
                    .put("/note/content", {
                        "content": this.note.content,
                        "noteId": this.note.noteId,
                    }, {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("authKey")
                        }
                    })
                    .then(successResponse => {
                        var result = successResponse.data
                        if (result.code != 0) {
                            updateResult = false
                        }
                    })
                    .catch(failResponse => {
                        console.log(failResponse)
                    })

                if (this.note.category.categoryId != "") {
                    this.axios
                        .put("/note/category", {
                            "categoryId": this.note.category.categoryId,
                            "noteId": this.note.noteId,
                        }, {
                            headers: {
                                Authorization: "Bearer " + localStorage.getItem("authKey")
                            }
                        })
                        .then(successResponse => {
                            var result = successResponse.data
                            if (result.code != 0) {
                                updateResult = false
                            }
                        })
                        .catch(failResponse => {
                            console.log(failResponse)
                        })

                    if (updateResult == true) {
                        this.$message({
                            message: '更新成功',
                            type: 'success'
                        });
                    } else {
                        this.$message.error('更新失败，请稍后重试');
                    }
                }

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
                        this.options = result.data.items
                    })
                    .catch(failResponse => {
                        console.log(failResponse)
                    })
            },
            handleUploadImage(event, insertImage, files) {
                // 拿到 files 之后上传到文件服务器，然后向编辑框中插入对应的内容
                // console.log(files[0]);
                let param = new FormData() // 创建form对象
                param.append('file', files[0])
                let imgInfo = {
                    url: "",
                    desc: ""
                }
                this.axios
                    .post(this.imgServer + "/upload", param)
                    .then(successResponse => {
                        var result = successResponse.data
                        if (result.code == 0) {

                            imgInfo.url = this.imgServer + "/" + result.data
                            // console.log(imgInfo.url)
                            // 此处只做示例
                            insertImage({
                                url: imgInfo.url,
                                desc: "img",
                                // width: 'auto',
                                // height: 'auto',
                            });
                        }
                    })
                    .catch(failResponse => {
                        console.log(failResponse)
                    })
            },
            getNoteDetail() {
                this.axios
                    .get('/note', {
                        params: {
                            noteId: this.noteId,
                        },
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("authKey")
                        }
                    })
                    .then(successResponse => {
                        var result = successResponse.data
                        this.note = result.data
                    })
                    .catch(failResponse => {
                        console.log(failResponse)
                    })
            },
        }
    };
</script>
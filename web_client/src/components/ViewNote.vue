<template>
    <div style="margin:20px 20px">
        <van-nav-bar :title="note.title" left-text="返回" left-arrow @click-left="goBack"/>
        <v-md-editor :value="note.content" mode="preview"></v-md-editor>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                noteId: this.$route.query.id,
                note: {
                    title: "标题",
                    content: "# 内容"
                },
            };
        },
        methods: {
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
            goBack() {
                this.$router.push({
                    path: '/'
                })
            }
        },
        mounted() {
            this.getNoteDetail()
        }
    };
</script>
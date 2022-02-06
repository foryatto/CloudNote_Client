<template>
    <div style="margin:20px 20px">
        <div>
            <el-page-header @back="goBack" :content="note.title"></el-page-header>
        </div>
        <v-md-preview :text="note.content"></v-md-preview>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                noteId: this.$route.query.id,
                note: {title:"标题", content:"# 内容"},
            };
        },
        methods: {
            getNoteDetail(){
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
        mounted(){
            this.getNoteDetail()
        }
    };
</script>
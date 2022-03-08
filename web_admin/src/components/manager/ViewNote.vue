<template>
    <div>
        <div class="head-style">
            <el-page-header @back="goBack" :content="note.title" class="el-page-header"></el-page-header>
        </div>

        <v-md-preview :text="note.content" style="padding-top:40px"></v-md-preview>

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

<style scoped>
.head-style{
    position: fixed;
    width:100%;
    /* height:40px; */
    line-height: 40px;
    background-color:#F5F5F5;

}

.el-page-header{
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
}
</style>
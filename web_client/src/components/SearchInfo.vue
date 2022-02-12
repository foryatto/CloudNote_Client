<template>
    <div class="selection">
        <div v-for="i in allTopic" :key="i[0]">
            <van-cell v-if="i.topic_name.includes(title)" :title="i.topic_name" is-link @click="showMore(i.topic_id)" icon="location-o" />
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                title: this.$route.params.title,
                allTopic: [],
            }
        },
        created() {
            this.getTopic();
        },
        methods: {
            getTopic() {
                this.axios.post('/topic/getAll', {
                        'authKey': localStorage.getItem("authKey")
                    })
                    .then(Response => {
                        this.allTopic = Response.data
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
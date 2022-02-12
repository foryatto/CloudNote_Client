<template>
    <div style="margin-bottom:90px">
        <div style="width:90%; height:50%; margin: 6% auto">
            <van-row>
                <van-col span="24">
                    <p><span style="color:grey">题目: </span>{{ topic.topic_name }}</p>
                    <p><span style="color:grey">发布教师: </span><span style="text-decoration:underline;color:#323233"
                            @click="showNoticeContent=true">{{ teacher.real_name }}</span></p>
                    <p><span style="color:grey">适用专业: </span>{{ topic.topic_range }}</p>
                    <p v-if="topic.can_choose == 0"><span style="color:grey">当前状态: </span>已选</p>
                    <p v-if="topic.can_choose == 1"><span style="color:grey">当前状态: </span>可选</p>
                    <span style="color:grey">课题要求: </span><br /><br />
                    <div id="topicContent">
                        <p style="font-size:16px">{{ topic.content }}</p>
                    </div>
                </van-col>
            </van-row>
            <van-button color=#68b0ab icon="plus" @click="choose">选择</van-button>
        </div>
        <van-popup v-model="showNoticeContent" round style="width:80%; height:60%">
            <div style="width:80%;height:80%;margin: 10% 10%">
                <van-divider :style="{ color: '#68b0ab', borderColor: '#1989fa', padding: '0 16px' }">
                    教师信息
                </van-divider>
                <p><span style="color:grey">姓名: </span>{{ teacher.real_name }}</p>
                <p><span style="color:grey">性别: </span>{{ teacher.sex }}</p>
                <p><span style="color:grey">联系方式: </span>{{ teacher.email }}</p>

            </div>
        </van-popup>
    </div>
</template>

<script>
    import {
        Toast
    } from 'vant';

    export default {
        data() {
            return {
                id: this.$route.params.id,
                topic: '',
                teacher: '',
                showNoticeContent: false,
            }
        },
        created() {
            this.getTopicInfoById();
        },
        methods: {
            getTopicInfoById() {
                this.axios.post('/topic/getById', {
                        'authKey': localStorage.getItem("authKey"),
                        'topic_id': this.id
                    })
                    .then(Response => {
                        this.topic = Response.data
                        this.getTeacherInfoById(this.topic.teacher_id);
                    })
            },
            getTeacherInfoById(id) {
                this.axios
                    .post('/teacher/search', {
                        "authKey": localStorage.getItem("authKey"),
                        "pageNum": 1,
                        "pageSize": 1,
                        "content": id,
                        "searchType": "teacher_id",
                    })
                    .then(successResponse => {
                        var result = successResponse.data
                        this.teacher = result.list[0]
                    })
                    .catch(failResponse => {
                        console.log(failResponse)
                    })
            },
            choose() {
                var user = JSON.parse(localStorage.getItem("userInfo"))
                if (this.topic.topic_range.includes(user.major.major_name)) {
                    if (user.topic != null) {
                        Toast.fail('已选择题目，请勿多选');
                    } else {
                        this.axios.post('/topic/choose', {
                                'authKey': localStorage.getItem("authKey"),
                                'topic_id': this.id,
                                'student_id': user.student_id,
                                'teacher_id': user.teacher_id
                            })
                            .then(Response => {
                                var result = Response.data
                                if (result.student_id != null) {
                                    Toast.success('选择成功');
                                    localStorage.setItem("topicId", this.id)
                                    localStorage.setItem("userInfo", JSON.stringify(result))
                                    this.$router.push("/selection")
                                } else {
                                    Toast.fail(result.msg);
                                }
                            })
                    }

                } else {
                    Toast.fail('本专业不适用该选题');
                }
            }
        }
    }
</script>

<style scoped>
    #topicContent {
        /* border-radius: 25px; */
        border: 2px solid #a1a1a1;
        width: 90%;
        height: 360px;
        margin-bottom: 20px;
        overflow-y: auto;
        padding: 0px 10px;
    }
</style>
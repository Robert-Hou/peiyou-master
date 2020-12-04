<template>
    <div>
        <user-info></user-info>
        <div class="home-page">
            <course-list v-if="hasData" :courses="courseList"></course-list>
            <div v-else class="no-data">
                <img
                    class="image"
                    src="../../public/images/index_nodata.png"
                    alt="暂无数据"
                />
                <router-link to="/CourseShop" class="link-btn"></router-link>
            </div>
        </div>
    </div>
</template>
<script>
import CourseList from "../components/CourseList";
import UserInfo from "../components/UserInfo";
export default {
    name: "Home",
    components: {
        UserInfo,
        CourseList,
    },
    created() {
        console.log("Home created");
    },
    data() {
        return {
            courseList: [
                {
                    id: 10000,
                    name: "三年级英语基础",
                    imgLink: "",
                    lessonCount: 10,
                    finishedCount: 5,
                    subjectFlag: 8,
                    teachers: ["张老师", "李老师", "王老师", "赵老师"],
                    className: "测试班级",
                    classTime: [
                        "周一 12:00~13:00",
                        "周一 12:00~13:00",
                        "周一 12:00~13:00",
                        "周一 12:00~13:00",
                        "周一 12:00~13:00",
                        "周一 12:00~13:00",
                        "周一 12:00~13:00",
                        "周一 12:00~13:00",
                        "周一 12:00~13:00",
                        "周一 12:00~13:00",
                        "周一 12:00~13:00",
                    ],
                    lastStudyTime: "2020-1-1 19:20",
                    lastStudyLessonIndex: 1,
                    lastStudyLessonName: "测试课时",
                },
                {
                    id: 10001,
                    name: "三年级数学运算",
                    imgLink: "",
                    lessonCount: 10,
                    finishedCount: 5,
                    subjectFlag: 1,
                    teachers: ["张老师", "李老师", "王老师", "赵老师"],
                    className: "测试班级",
                    classTime: [
                        "周一 12:00~13:00",
                        "周一 12:00~13:00",
                        "周一 12:00~13:00",
                        "周一 12:00~13:00",
                        "周一 12:00~13:00",
                        "周一 12:00~13:00",
                        "周一 12:00~13:00",
                        "周一 12:00~13:00",
                        "周一 12:00~13:00",
                        "周一 12:00~13:00",
                        "周一 12:00~13:00",
                    ],
                    lastStudyTime: "2020-1-1 19:20",
                    lastStudyLessonIndex: 1,
                    lastStudyLessonName: "测试课时",
                },
            ],
        };
    },
    computed: {
        hasData() {
            return !!this.courseList.length;
        },
    },
};
</script>
<style lang="less" scoped>
.home-page {
    min-height: calc(100% - 126px);
    background: #fff;
    border-radius: 10px;
    padding: 0 22px;
    box-shadow: 0 0 16px rgba(175, 162, 150, 0.2);

    .no-data {
        .image {
            margin: 100px auto 40px;
        }
        .link-btn {
            margin-top: 100px;
            display: block;
            width: 145px;
            height: 42px;
            margin: 16px auto 0;
            background: url(../../public/images/toChooseBtn.png) no-repeat
                center;
        }
    }
}
</style>
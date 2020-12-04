<template>
    <div>
        <div class="finished-page">
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
export default {
    name: "", //组件名称
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
    }, //组件数据
    components: {
        CourseList,
    },
    props: {}, //组件参数
    computed: {
        hasData() {
            return !!this.courseList.length;
        },
    }, //计算属性
    methods: {}, //方法
    watch: {}, //监听属性
};
</script>
<style lang="less" scoped>
.finished-page {
    min-height: 100%;
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
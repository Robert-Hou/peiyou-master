<template>
    <div class="data-list">
        <div class="course-info" v-for="course in courseList" :key="course.id">
            <img
                :src="course.imgLink"
                class="image-box"
                v-if="course.imgLink"
            />
            <img src="../../public/images/prod.png" class="image-box" v-else />
            <div class="course-data">
                <p class="course-basic">
                    <span
                        class="subject-flag"
                        :class="course.subjectClass"
                    ></span>
                    <span class="course-name" v-text="course.name"></span>
                    <span
                        class="lesson-count"
                        v-text="'（共' + course.lessonCount + '课时）'"
                    ></span>
                    <label class="finished-scale">
                        <span
                            class="finished-count"
                            v-text="course.finishedCount"
                        ></span
                        >/<span v-text="course.lessonCount"></span>
                    </label>
                </p>
                <div class="course-class" v-if="course.className">
                    <div class="teachers">
                        <label class="info-title">校区老师</label>
                        <span
                            v-for="teacher in course.teachers"
                            :key="teacher"
                            v-text="teacher"
                        ></span>
                    </div>
                    <div class="class">
                        <label class="info-title">校区班级</label>
                        <span v-text="course.className"></span>
                    </div>
                </div>
                <div
                    class="class-time"
                    v-if="course.classTime && course.classTime.length"
                >
                    <label class="info-title">上课时间</label>
                    <div class="times">
                        <span
                            v-for="time in course.classTime"
                            :key="time.index"
                            v-text="time"
                        ></span>
                    </div>
                </div>
                <div class="course-study">
                    <div class="last-study" v-if="course.lastStudyLessonName">
                        <label class="info-title">上次学习</label>
                        <span
                            v-text="
                                course.lastStudyTime +
                                ' | 第' +
                                course.lastStudyLessonIndex +
                                '课时 ' +
                                course.lastStudyLessonName
                            "
                        ></span>
                    </div>
                    <router-link to="" class="study-btn">开始学习</router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "CourseList", //组件名称
    data() {
        return {};
    }, //组件数据
    props: {
        courses: Array, //课程列表
    }, //组件参数
    computed: {
        courseList() {
            return this.courses.map((s) => {
                let subClass = "";
                switch (s.subjectFlag) {
                    case 1:
                        subClass = "math";
                        break;
                    case 8:
                        subClass = "english";
                        break;
                }
                let obj = Object.assign(
                    {
                        subjectClass: subClass,
                    },
                    s
                );
                return obj;
            });
        },
    }, //计算属性
    methods: {}, //方法
    watch: {}, //监听属性
};
</script>
<style lang="less" scoped>
.data-list {
    .course-info {
        padding: 30px 0;
        border-bottom: 2px solid #fff6eb;
        transition: all 0.2s;
        overflow: hidden;
        .image-box {
            float: left;
            display: block;
            width: 266px;
            height: 150px;
            border-radius: 5px;
        }
        .course-data {
            float: left;
            margin-left: 14px;
            width: calc(100% - 280px);
            height: 150px;
            .course-basic {
                color: #222;
                font-size: 18px;
                .subject-flag {
                    display: inline-block;
                    vertical-align: middle;
                    color: #fff;
                    padding: 0 7px;
                    border-radius: 5px;
                    line-height: 24px;
                    margin-right: 5px;
                    font-size: 14px;
                }
                .english {
                    background-color: #1f5198;
                }
                .english::before {
                    content: "英语";
                }
                .math {
                    background-color: #05984d;
                }
                .math::before {
                    content: "数学";
                }

                .finished-scale {
                    float: right;
                    font-size: 16px;
                    color: #929292;
                    .finished-count {
                        font-size: 22px;
                        color: #222;
                    }
                }
            }
            .course-class {
                font-size: 14px;
                height: 20px;
                line-height: 20px;
                margin-top: 10px;
                .teachers {
                    max-width: 240px;
                    margin-right: 30px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    word-break: normal;
                    display: inline-block;
                    span::after {
                        content: "\3001";
                    }
                    span:last-child::after {
                        content: "";
                    }
                }
                .class {
                    display: inline-block;
                    overflow: hidden;
                }
            }
            .class-time {
                font-size: 14px;
                min-height: 28px;
                line-height: 28px;
                margin-top: 10px;
                .times {
                    display: block;
                    overflow: hidden;
                    span:after {
                        content: "\3001";
                    }
                    span:last-child:after {
                        content: "";
                    }
                }
            }
            .course-study {
                font-size: 14px;
                height: 32px;
                line-height: 32px;
                margin-top: 10px;
                .last-study {
                    display: inline-block;
                }
                .study-btn {
                    //display: inline-block;
                    float: right;
                    width: 110px;
                    height: 32px;
                    line-height: 32px;
                    text-align: center;
                    border-radius: 16px;
                    background-image: linear-gradient(
                        to bottom,
                        #ffb613,
                        #ff9311
                    );
                    color: #fff;
                    font-size: 16px;
                }
            }

            .info-title {
                display: block;
                float: left;
                font-size: 14px;
                color: #a4a4a4;
            }
            .info-title::after {
                content: "：";
            }
        }
    }
    .course-info:hover {
        transform: scale(1.02);
    }
}
</style>

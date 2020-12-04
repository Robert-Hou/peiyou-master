<template>
    <div>
        <user-info></user-info>
        <div class="home-page">
            <div v-if="hasData" class="data-list">
                <div
                    class="course-info"
                    v-for="course in courseList"
                    :key="course.id"
                >
                    <img
                        :src="course.imgLink"
                        class="image-box"
                        v-if="course.imgLink"
                    />
                    <img
                        src="../../public/images/prod.png"
                        class="image-box"
                        v-else
                    />
                    <div class="course-data">
                        <p class="course-basic">
                            <span class="subject-flag english"></span>
                            <span
                                class="course-name"
                                v-text="course.name"
                            ></span>
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
                                    :key="time"
                                    v-text="time"
                                ></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
import UserInfo from "../components/UserInfo";
export default {
    name: "Home",
    components: {
        UserInfo,
    },
    created() {
        console.log("Home created");
    },
    data() {
        return {
            courseList: [
                {
                    name: "三年级语言基础",
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
                    lastStudyTime: "",
                    lastStudyLessonName: "",
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
    margin-top: 18px;
    min-height: calc(100% - 146px);
    background: #fff;
    border-radius: 10px;
    padding: 0 22px;
    box-shadow: 0 0 16px rgba(175, 162, 150, 0.2);
    .data-list {
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
                height: 20px;
                line-height: 20px;
                margin-top: 10px;
                .times {
                    display: block;
                    overflow: hidden;
                    span:after {
                        content: "\3001";
                    }
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
    .data-list:hover {
        transform: scale(1.02);
    }
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
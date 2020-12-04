<template>
    <info-page :name="name" :back-link="backLink">
        <div class="course-info">
            <div class="image-box">
                <img v-if="imgLink" src="imgLink" alt="" />
                <img v-else src="../../public/images/prod.png" alt="" />
            </div>
            <div class="info-data">
                <div class="basic">
                    <subject-tip :subject-flag="subjectFlag"></subject-tip>
                    <span class="course-name" v-text="name"></span>
                    <span
                        class="lesson-count"
                        v-text="'（共' + lessonCount + '课时）'"
                    ></span>
                    <label class="finished-scale">
                        <span
                            class="finished-count"
                            v-text="finishedCount"
                        ></span
                        >/<span v-text="lessonCount"></span>
                    </label>
                </div>

                <div class="course-class" v-if="className">
                    <div class="teachers">
                        <label class="info-title">校区老师</label>
                        <span
                            v-for="teacher in teachers"
                            :key="teacher"
                            v-text="teacher"
                            :title="teachers.join('、')"
                        ></span>
                    </div>
                    <div class="class">
                        <label class="info-title">校区班级</label>
                        <span v-text="className"></span>
                    </div>
                </div>
                <div class="class-time" v-if="classTime && classTime.length">
                    <label class="info-title">上课时间</label>
                    <div class="times">
                        <span
                            v-for="time in classTime"
                            :key="time.index"
                            v-text="time"
                        ></span>
                    </div>
                </div>
                <div class="describe">
                    <label class="info-title">课程描述</label>
                    <p class="describe-info" v-text="describe"></p>
                </div>
                <div class="price" v-if="price">
                    <div class="price-data" v-text="price"></div>
                    <p class="price-remark">
                        <span class="tip">?</span>咨询当地校区购买享更多优惠哦
                    </p>
                </div>
            </div>
        </div>
        <div class="lessons">
            <div class="lessons-header">
                <span>课程安排 ·</span
                ><i v-text="'共' + lessons.length + '课时'"></i>
            </div>
            <ul class="lesson-list">
                <li
                    class="lesson-info"
                    :class="[lesson.isOpen]"
                    v-for="lesson in lessons"
                    :key="lesson.index"
                    @click="showItem(lesson)"
                >
                    <div class="info">
                        <span
                            class="index"
                            v-text="'第' + lesson.index + '课时'"
                        ></span>
                        <span class="name" v-text="lesson.name"></span>
                        <span
                            class="time"
                            :class="{ active: lesson.isLastStudy }"
                            v-if="lesson.studyTime"
                            v-text="
                                '（' +
                                lesson.studyTime +
                                ' ' +
                                (lesson.isLastStudy ? '上次学习' : '已学习') +
                                '）'
                            "
                        ></span>
                        <i></i>
                    </div>
                    <div class="btns">
                        <router-link class="link-btn" to="">看报告</router-link>
                        <router-link class="link-btn" to="">消错题</router-link>
                        <router-link class="link-btn" to="">做作业</router-link>
                        <router-link
                            class="study-btn"
                            :class="{ disabled: !lesson.canStudy }"
                            to=""
                            v-text="lesson.isFinished ? '再次学习' : '开始学习'"
                        ></router-link>
                    </div>
                </li>
            </ul>
        </div>
    </info-page>
</template>
<script>
import InfoPage from "../components/InfoPage";
import SubjectTip from "../components/SubjectTip";
export default {
    name: "Course", //组件名称
    components: {
        InfoPage,
        SubjectTip,
    },
    created() {
        let data = {
            name: "",
            imgLink: "",
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
            lessons: [
                {
                    id: 10001,
                    name: "课时名称",
                    index: 1,
                    studyTime: "",
                    isFinished: false,
                    isLastStudy: false,
                    canStudy: true,
                    isOpen: "",
                },
                {
                    id: 10002,
                    name: "课时名称",
                    index: 2,
                    studyTime: "2020-12-4 17:35",
                    isFinished: true,
                    isLastStudy: false,
                    canStudy: true,
                    isOpen: "",
                },
                {
                    id: 10003,
                    name: "课时名称",
                    index: 3,
                    studyTime: "2020-12-4 17:38",
                    isFinished: true,
                    isLastStudy: true,
                    canStudy: true,
                    isOpen: "down",
                },
                {
                    id: 10004,
                    name: "课时名称",
                    index: 4,
                    studyTime: "",
                    isFinished: false,
                    isLastStudy: false,
                    canStudy: true,
                    isOpen: "",
                },
                {
                    id: 10005,
                    name: "课时名称",
                    index: 5,
                    studyTime: "",
                    isFinished: false,
                    isLastStudy: false,
                    canStudy: true,
                    isOpen: "",
                },
                {
                    id: 10006,
                    name: "课时名称",
                    index: 6,
                    studyTime: "",
                    isFinished: false,
                    isLastStudy: false,
                    canStudy: true,
                    isOpen: "",
                },
                {
                    id: 10007,
                    name: "课时名称",
                    index: 7,
                    studyTime: "",
                    isFinished: false,
                    isLastStudy: false,
                    canStudy: true,
                    isOpen: "",
                },
                {
                    id: 10008,
                    name: "课时名称",
                    index: 8,
                    studyTime: "",
                    isFinished: false,
                    isLastStudy: false,
                    canStudy: true,
                    isOpen: "",
                },
                {
                    id: 10009,
                    name: "课时名称",
                    index: 9,
                    studyTime: "",
                    isFinished: false,
                    isLastStudy: true,
                    canStudy: false,
                    isOpen: "",
                },
            ],
            describe:
                "这是一段描述信息这是一段描述信息这是一段描述信息这是一段描述信息这是一息",
            price: 199.99,
        };
        Object.assign(this.$data, data);
    },
    data() {
        return {
            name: "",
            imgLink: "",
            subjectFlag: 8,
            teachers: [],
            className: "",
            classTime: [],
            lessons: [],
            describe: "",
            price: 0,
        };
    }, //组件数据
    props: {
        id: Number,
    }, //组件参数
    computed: {
        backLink() {
            if (
                this.lessons.length ==
                this.lessons.filter((s) => s.isFinished).length
            ) {
                return { path: "/FinishedCourses" };
            } else {
                return { path: "/" };
            }
        },
        lessonCount() {
            return this.lessons.length;
        },
        finishedCount() {
            return this.lessons.filter((s) => s.isFinished).length;
        },
    }, //计算属性
    methods: {
        showItem(item) {
            this.lessons.forEach((s) => {
                if (s != item && s.isOpen) {
                    s.isOpen = "up";
                }
            });
            item.isOpen =
                item.isOpen == "" || item.isOpen == "up" ? "down" : "up";
        },
    }, //方法
    watch: {}, //监听属性
};
</script>
<style lang="less" scoped>
.course-info {
    overflow: hidden;
    .image-box {
        float: left;
        width: 306px;
        height: 173px;
        img {
            width: 100%;
            height: 100%;
            border-radius: 8px;
        }
    }
    .info-data {
        float: right;
        width: 838px;
        .basic {
            font-size: 18px;
            line-height: 18px;
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
            margin-top: 28px;
            .teachers {
                max-width: 240px;
                margin-right: 30px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                word-break: normal;
                display: inline-block;
                span {
                    display: inline-block;
                }
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
            margin-top: 20px;
            .times {
                display: block;
                overflow: hidden;
                width: 768px;
                span {
                    display: inline-block;
                }
                span:after {
                    content: "\3001";
                }
                span:last-child:after {
                    content: "";
                }
            }
        }
        .describe {
            font-size: 14px;
            line-height: 20px;
            margin-top: 20px;
            overflow: hidden;
            .describe-info {
                float: left;
                width: 768px;
            }
        }
        .price {
            overflow: hidden;
            padding: 20px;
            .price-data {
                font-size: 24px;
                color: #ff8a03;
                font-weight: bolder;
                margin-bottom: 10px;
                text-align: right;
            }
            .price-data::before {
                content: "￥";
            }
            .price-remark {
                text-align: right;
                color: #f00;
                .tip {
                    display: inline-block;
                    width: 17px;
                    height: 17px;
                    border-radius: 50%;
                    color: #fff;
                    background: #fd344f;
                    font-size: 14px;
                    font-weight: bolder;
                    text-align: center;
                    line-height: 17px;
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
.lessons {
    margin-top: 23px;
    border-top: 1px solid #f5f5f5;
    .lessons-header {
        height: 58px;
        line-height: 58px;
        span {
            font-size: 18px;
            padding-left: 13px;
            background: url(../../public/images/hg.png) no-repeat left center;
        }
        i {
            font-size: 14px;
            color: #222;
            padding-left: 5px;
            font-style: normal;
        }
    }
    .lesson-list {
        .lesson-info {
            list-style: none;
            clear: both;
            .info {
                height: 52px;
                padding-left: 19px;
                line-height: 52px;
                cursor: pointer;
                .index {
                    color: #848688;
                    font-size: 14px;
                    display: inline-block;
                    width: 80px;
                    padding-right: 20px;
                }
                .name {
                    color: #222;
                    font-size: 14px;
                    padding-right: 12px;
                    font-style: normal;
                }
                .time {
                    color: #7a7c7e;
                    font-size: 14px;
                    font-style: normal;
                }
                .time.active {
                    color: #ff8a03;
                }
                i {
                    display: block;
                    float: right;
                    margin: 17px 20px;
                    height: 19px;
                    width: 19px;
                    background: url(../../public/images/rt.png) no-repeat center
                        center;
                    cursor: pointer;
                }
            }
            .btns {
                height: 65px;
                line-height: 65px;
                text-align: right;
                display: none;
                overflow: hidden;
                width: 100%;
                box-sizing: border-box;
                padding-right: 24px;
                .link-btn {
                    display: inline-block;
                    font-size: 16px;
                    text-align: center;
                    line-height: 32px;
                    color: #888888;
                    width: 100px;
                    cursor: default;
                }
                .study-btn {
                    display: inline-block;
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
                .study-btn.disabled {
                    background-color: #cfcfcf;
                    background-image: none;
                }
            }
        }
        .lesson-info:nth-child(odd) {
            background-color: #fff5e4;
        }
        .lesson-info.down {
            .info {
                i {
                    animation: rotateDown 0.5s;
                    transform: rotate(90deg);
                }
            }
            .btns {
                display: block;
                animation: sllowDown 0.5s;
                height: 65px;
            }
        }
        .lesson-info.up {
            .info {
                i {
                    animation: rotateUp 0.5s;
                    transform: rotate(0deg);
                }
            }
            .btns {
                display: block;
                animation: sllowUp 0.5s;
                height: 0px;
            }
        }
    }
}
@keyframes sllowDown {
    from {
        display: none;
        height: 0px;
    }
    to {
        display: block;
        height: 65px;
    }
}
@keyframes sllowUp {
    from {
        display: block;
        height: 65px;
    }
    to {
        display: none;
        height: 0px;
    }
}
@keyframes rotateDown {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(90deg);
    }
}

@keyframes rotateUp {
    from {
        transform: rotate(90deg);
    }
    to {
        transform: rotate(0deg);
    }
}
</style>
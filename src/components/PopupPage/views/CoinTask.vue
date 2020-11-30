<template>
    <div class="coin-task">
        <div class="head">
            <div class="close-btn" ref="closeBtn" @click="closeMsg"></div>
        </div>
        <div class="content">
            <div
                class="task-item"
                v-for="item in taskObjList"
                :key="item.index"
            >
                <div class="task-item-img" :class="[item.classObj]"></div>
                <div class="task-item-info">
                    <p>
                        <label v-text="item.name"></label>
                        <span v-text="item.text" class="text"></span>
                        <span class="time" v-if="!item.received"
                            >（任务剩余<i v-text="item.time"></i>）</span
                        >
                    </p>
                    <p>
                        任务奖励:<span
                            class="coins"
                            v-text="item.coins + ' 金币'"
                        ></span>
                    </p>
                </div>
                <div class="task-item-btn">
                    <div class="finished" v-if="item.received">已完成</div>
                    <div class="btnbox" v-else>
                        <div
                            class="btn"
                            v-if="item.progress === item.allProgress"
                        >
                            领取金币
                        </div>
                        <div class="btn" v-else>去完成</div>
                        <p>
                            进度 <span v-text="item.progress"></span> /
                            <span v-text="item.allProgress"></span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
let typeDic = {
    study: "学习任务",
    work: "作业任务",
    practice: "练习任务",
    error: "错题任务",
};
export default {
    name: "CoinTask",
    data() {
        return {
            taskList: [
                {
                    type: "study",
                    text: "学习时长达到10分钟",
                    time: "10天13小时7分钟",
                    coins: 10,
                    progress: 5,
                    allProgress: 5,
                    received: true,
                },
                {
                    type: "work",
                    text: "完成2次课后作业，且作业报告2星以上",
                    time: "6天13小时7分钟",
                    coins: 10,
                    progress: 5,
                    allProgress: 5,
                    received: false,
                },
                {
                    type: "practice",
                    text: "完成3次课后练习，且练习报告2星以上",
                    time: "6天13小时7分钟",
                    coins: 5,
                    progress: 3,
                    allProgress: 5,
                    received: false,
                },
                {
                    type: "error",
                    text: "消除5道错题",
                    time: "6天13小时7分钟",
                    coins: 10,
                    progress: 3,
                    allProgress: 5,
                    received: false,
                },
            ],
        };
    },
    computed: {
        taskObjList() {
            return this.taskList.map((t) => {
                return Object.assign({}, t, {
                    classObj: t.type + "-task",
                    name: typeDic[t.type],
                });
            });
        },
    },
    methods: {
        closeMsg() {
            console.log("点击了x");
            this.$emit("close-page");
        },
    },
};
</script>
<style lang="less" scoped>
.coin-task {
    width: 1026px;
    height: 605px;
    z-index: 2;
    background-color: #fff;
    border-radius: 10px;

    .head {
        height: 70px;
        line-height: 70px;
        text-align: center;
        background: url(../../../../public/images/pop.png) no-repeat center top;
        .close-btn {
            background: url(../../../../public/images/cl.png) no-repeat;
            width: 16px;
            height: 16px;
            margin: 27px;
            float: right;
        }
    }
    .content {
        box-sizing: border-box;
        width: 100%;
        padding: 0 26px 13px;
        height: calc(100% - 70px);
        overflow-y: auto;
        .task-item {
            box-sizing: border-box;
            padding: 11px 24px;
            border-radius: 10px;
            height: 100px;
            background: #ffffff;
            box-shadow: 0px 3px 15px 1px rgba(49, 144, 238, 0.2);
            margin-top: 26px;
            .task-item-img {
                float: left;
                width: 66px;
                height: 78px;
                background-repeat: no-repeat;
                background-position: left center;
            }
            .task-item-img.study-task {
                background-image: url(../../../../public/images/studywork.png);
            }
            .task-item-img.work-task {
                background-image: url(../../../../public/images/workwork.png);
            }
            .task-item-img.practice-task {
                background-image: url(../../../../public/images/practicetasks.png);
            }
            .task-item-img.error-task {
                background-image: url(../../../../public/images/errorwork.png);
            }
            .task-item-info {
                float: left;
                width: 700px;
                padding: 10px 16px;
                p {
                    height: 30px;
                    line-height: 30px;
                    font-size: 16px;
                    text-align: left;
                    label {
                        padding: 0 5px;
                        height: 20px;
                        font-size: 14px;
                        color: #fff;
                        line-height: 20px;
                        display: inline-block;
                        background: rgba(176, 177, 190, 1);
                        border-radius: 4px;
                    }
                    .text {
                        margin-left: 11px;
                        font-size: 18px;
                    }
                    .time {
                        font-size: 18px;
                        i {
                            color: #ff5c5c;
                            font-style: normal;
                        }
                    }
                    .coins {
                        color: #ffae4f;
                    }
                }
            }
            .task-item-btn {
                float: right;
                .finished {
                    background: url(../../../../public/images/qd.png) no-repeat
                        10px center;
                    margin-top: 10px;
                    padding-left: 58px;
                    height: 36px;
                    line-height: 36px;
                    color: #ff8a03;
                    width: 124px;
                    box-sizing: border-box;
                    text-align: left;
                }
                .btnbox {
                    font-size: 16px;
                    .btn {
                        background: url(../../../../public/images/btnbj.png)
                            no-repeat center center;
                        width: 124px;
                        height: 36px;
                        text-align: center;
                        display: block;
                        color: #fff;
                        line-height: 36px;
                        cursor: pointer;
                    }
                    p {
                        text-align: center;
                        height: 36px;
                        line-height: 36px;
                    }
                }
            }
        }
    }
}
</style>
<template>
    <div class="user-box">
        <div class="box">
            <div class="contleft">
                <div class="photo" @click="eventShowUserBtn">
                    <img v-if="photo" :src="photo" />
                    <img
                        v-else
                        src="../../../../public/images/student_photo.png"
                    />
                </div>
                <div v-show="showUserBtn" class="infopop">
                    <a href="#">
                        <img src="../../../../public/images/perinfoico.png" />
                        <span>个人信息</span></a
                    >
                    <a href="#">
                        <img src="../../../../public/images/quitico.png" />
                        <span>退出登录</span></a
                    >
                </div>
            </div>
            <div class="contright">
                <div class="username">
                    <span class="nsp" v-text="name"></span>
                    <span class="newsp">
                        <img src="../../../../public/images/mesgico.png" />
                        <em v-text="newMsgNum"></em>
                    </span>
                    <!-- <span class="date">有效期至：3000-01-01<i>（试用账号可体验试学课程第1课时）</i></span> -->
                </div>
                <div class="userschool">
                    太棒了！你完成了全部任务，共领取1000金币！
                    <a href="#" @click="eventShowCoinsTask">查看详情</a>
                </div>
            </div>
        </div>
        <div class="config">
            <div class="infotext">
                <div class="text" v-text="todayStudyTime">
                    50<span>分</span>
                </div>
                <div class="label">今日学习</div>
            </div>
            <div class="infotext">
                <div class="text" v-text="studyDayNumber">8<span>天</span></div>
                <div class="label">学习天数</div>
            </div>
            <div class="infotext">
                <div class="text" v-text="coinNum">50<span>个</span></div>
                <div class="label">
                    金币数量
                    <em title="这是什么?">
                        <img src="../../../../public/images/infoico.png" />
                    </em>
                </div>
            </div>
        </div>
        <div style="clear: both"></div>

        <coin-task v-if="showCoinTask" :show.sync="showCoinTask"></coin-task>
    </div>
</template>

<script>
import CoinTask from "../../../components/MsgBox/CoinTask";
export default {
    name: "UserInfo",
    components: {
        CoinTask,
    },
    data() {
        return {
            photo: "",
            name: "张某某",
            newMsgNum: 99,
            showUserBtn: false,

            todayStudyTime: 0,
            studyDayNumber: 0,
            coinNum: 10,

            showCoinTask: false,
        };
    },
    mounted() {
        document.addEventListener("click", this.eventCloseUserBtn);
    },
    destroyed() {
        document.removeEventListener("click", this.eventCloseUserBtn);
    },
    methods: {
        eventShowUserBtn(e) {
            this.showUserBtn = !this.showUserBtn;
            e.preventDefault();
            e.stopPropagation();
        },
        eventCloseUserBtn() {
            this.showUserBtn = false;
        },
        eventShowCoinsTask() {
            this.showCoinTask = true;
        },
    },
};
</script>
<style lang="less" scoped>
.user-box {
    background: #fff;
    border-radius: 10px;
    padding: 20px 22px;
    box-shadow: 0 0 16px rgba(175, 162, 150, 0.2);
    margin-bottom: 18px;
    .box {
        float: left;
        cursor: pointer;

        .contleft {
            float: left;
            position: relative;
            .photo {
                float: left;
                width: 66px;
                height: 66px;
                border: 1px solid #ff8a03;
                border-radius: 50%;
            }
            .infopop {
                width: 180px;
                position: absolute;
                padding: 10px;
                left: 0;
                z-index: 2;
                border-radius: 5px;
                background-color: #fff;
                top: 66px;
                box-shadow: 0 0 8px #f1f2f5;
                a {
                    display: block;
                    line-height: 50px;
                    font-size: 16px;
                    color: #222;
                    border-bottom: 1px solid #f4f4f4;
                }
                a:last-child {
                    border: none;
                }
                a:hover {
                    color: #ff8a03;
                }
                img {
                    vertical-align: middle;
                }
                span {
                    display: inline-block;
                    vertical-align: middle;
                    padding-left: 13px;
                }
            }
        }
        .contright {
            float: left;
            min-height: 100%;
            .username {
                padding-top: 10px;
                text-align: left;
                padding-left: 15px;
                span {
                    vertical-align: middle;
                    font-size: 18px;
                    color: #222;
                }
                span.date {
                    display: inline-block;
                    margin-left: 18px;
                    padding-left: 18px;
                    font-size: 16px;
                    border-left: 1px solid #eaeaea;
                    cursor: default;
                    i {
                        color: #f00;
                    }
                }
                .nsp {
                    padding-right: 10px;
                }
                .newsp {
                    position: relative;
                    em {
                        position: absolute;
                        background-color: #ff3a00;
                        font-size: 12px;
                        width: 16px;
                        height: 16px;
                        top: -7px;
                        right: -8px;
                        border-radius: 50%;
                        color: #fff;
                        text-align: center;
                        line-height: 16px;
                    }
                }
            }
            .userschool {
                text-align: left;
                margin-left: 15px;
                padding-left: 27px;
                font-size: 16px;
                color: #222;
                line-height: 22px;
                background: url(../../../../public/images/infoico1.png)
                    no-repeat left center;
                margin-top: 10px;
                a {
                    display: inline-block;
                    vertical-align: middle;
                    color: #ff8a03;
                    line-height: 22px;
                    margin-top: -4px;
                    padding-right: 23px;
                    background: url(../../../../public/images/infoicon2.png)
                        no-repeat right center;
                }
            }
        }
    }
    .config {
        float: right;
        .infotext {
            width: 118px;
            text-align: center;
            float: left;
            .label {
                font-size: 14px;
                padding-top: 7px;
                color: #222;
            }
            .text {
                font-size: 24px;
                color: #ff8a03;
                padding-top: 10px;
            }
            span {
                font-size: 14px;
                color: #a9a9a9;
                display: inline-block;
                padding-left: 5px;
            }
            img {
                vertical-align: middle;
                cursor: pointer;
            }
        }
        .infotext:nth-child(2) {
            border-left: 1px solid #f6f6f6;
            border-right: 1px solid #f6f6f6;
        }
    }
}
</style>
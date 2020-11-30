<template>
    <div class="select-box" :class="{ active: canSubmit }">
        <div class="close-btn" @click="close"></div>
        <div class="select">
            <div class="icon class-select"></div>
            <label class="label">课程选择:</label>
            <!-- <select-box
                placeholder="请选择课程"
                :list="courseList"
                @changed="changeCourse"
            ></select-box> -->
            <select-input
                placeholder="请选择课程"
                :list="courseList"
                v-model="courseId"
            ></select-input>
        </div>
        <div class="select">
            <div class="icon count-select"></div>
            <label class="label">题目数量:</label>
            <select-input
                placeholder="请选择题目数量"
                :list="countList"
                v-model="count"
            ></select-input>
        </div>
        <p>本次练习可得100金币（每天限3次，今日已练3次）</p>
    </div>
</template>
<script>
//import SelectBox from "./components/SelectBox";
import SelectInput from "./components/SelectInput";
export default {
    components: {
        // SelectBox,
        SelectInput,
    },
    name: "ExercisesSelect", //组件名称
    data() {
        return {
            courseList: [
                { value: "10000", text: "课程1" },
                { value: "10001", text: "课程2" },
            ],
            countList: [
                { value: 5, text: "5" },
                { value: 10, text: "10" },
                { value: 20, text: "20" },
            ],
            courseId: null,
            count: null,
        };
    }, //组件数据
    props: {}, //组件参数
    computed: {
        canSubmit() {
            return this.courseId != null && this.count != null;
        },
    }, //计算属性
    methods: {
        close() {
            this.$emit("close-page");
        },
        // changeCourse(val) {
        //     console.log("changeCourse", val);
        //     this.courseId = val;
        // },
    }, //方法
    watch: {}, //监听属性
};
</script>
<style lang="less" scoped>
.select-box {
    position: relative;
    width: 642px;
    height: 565px;
    background: url(../../../../../public/images/content_9Bg.png) no-repeat;
    padding-top: 185px;
    padding-left: 50px;
    padding-right: 90px;
    box-sizing: border-box;
    .close-btn {
        position: absolute;
        top: 88px;
        cursor: pointer;
        right: 0px;
        height: 42px;
        width: 42px;
        border-radius: 21px;
    }
    .select {
        width: 410px;
        height: 92px;
        line-height: 92px;
        border-bottom: 1px solid #ffe9ba;
        padding: 0 40px;
        text-align: left;
        .icon {
            width: 54px;
            height: 48px;
            line-height: 48px;
            background-size: contain;
            display: inline-block;
            background-repeat: no-repeat;
            background-position: center;
            margin-right: 16px;
        }
        .icon::before {
            content: "";
            display: inline-block;
        }

        .class-select {
            background-image: url(../../../../../public/images/books1.png);
        }
        .count-select {
            background-image: url(../../../../../public/images/books2.png);
        }
        .label {
            color: #ff8a03;
            font-size: 20px;
            height: 20px;
            margin-right: 8px;
        }
    }
    p {
        margin-top: 30px;
    }
}
.select-box.active {
    background-image: url(../../../../../public/images/content_9Bg_active.png);
}
</style>
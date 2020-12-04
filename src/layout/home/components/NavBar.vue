<template>
    <div class="nav-box">
        <div class="content">
            <router-link to="/HomeWork" :class="{ active: isHomeWork }">
                课后作业
            </router-link>
            <a href="#" @click="openPractice">课后练习</a>
            <router-link to="/ErrorBook" :class="{ active: isErrorBook }">
                错题本
            </router-link>
            <router-link to="/" :class="{ active: isHomeWork }" class="logoimg">
                <img src="../../../../public/images/logo.png" />
            </router-link>
            <router-link to="/ReportCenter" :class="{ active: isReportCenter }">
                报告中心
            </router-link>
            <router-link
                to="/FinishedCourses"
                :class="{ active: isFinishedCourses }"
            >
                已学课程
            </router-link>
            <router-link to="/CourseShop" :class="{ active: isCourseShop }"
                >选课中心</router-link
            >
        </div>
    </div>
</template>
<script>
export default {
    name: "NavBar",
    data() {
        return {
            practiceClose: false,
        };
    },
    computed: {
        isHomeWork() {
            return this.$route.name == "HomeWork";
        },
        isErrorBook() {
            return this.$route.name == "ErrorBook";
        },
        isReportCenter() {
            return this.$route.name == "ReportCenter";
        },
        isFinishedCourses() {
            return this.$route.name == "FinishedCourses";
        },
        isCourseShop() {
            return this.$route.name == "CourseShop";
        },
    },
    methods: {
        openPractice() {
            this.$store.commit("openPopupPage", 2);
        },
    },
};
</script>
<style lang="less" scoped>
.nav-box {
    background-color: #f5f5f5;
    height: 78px;
    border-bottom: 1px solid #e2e2e2;
    position: fixed;
    width: 100%;
    left: 0;
    z-index: 2;
    top: 0;
    .content {
        width: 1200px;
        height: 78px;
        padding: 0 25px;
        margin: 0 auto;
        overflow: hidden;
        text-align: center;
    }
    a {
        display: inline-block;
        width: 100px;
        text-align: center;
        height: 78px;
        vertical-align: middle;
        line-height: 78px;
        /* font-weight: bold; */
        color: #000;
        font-size: 20px;
        margin: 0 20px;
        text-decoration: none;
    }
    a.active {
        font-size: 22px;
        color: #ff8a03;
        font-weight: bolder;
        border-bottom: 6px solid #ff8a03;
    }
    a.logoimg {
        width: auto;
        padding: 0;
        img {
            display: block;
            height: 60px;
            margin-top: 9px;
            transition: all 0.2s;
        }
    }
    a.logoimg:hover {
        img {
            transform: scale(1.1);
        }
    }
}
</style>
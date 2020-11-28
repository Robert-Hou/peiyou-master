<template>
    <div class="home">
        <nav-bar></nav-bar>
        <div class="content">
            <div class="inner-box">
                <user-info v-if="hasUserInfo"></user-info>
                <router-view />
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import NavBar from "./components/NavBar";
import UserInfo from "./components/UserInfo";
var hasUserPage = ["Home", "CourseShop"];
export default {
    name: "LayoutHome",
    components: {
        NavBar,
        UserInfo,
    },
    created() {
        console.log("LayoutHome created");
    },
    computed: {
        hasUserInfo() {
            return hasUserPage.indexOf(this.$route.name) > -1;
        },
    },
};
</script>

<style lang="less" scoped>
.home {
    min-height: 100%;
    background: url(../../../public/images/bodybj_light.png) no-repeat center
        center fixed;
    background-size: cover;
    .content {
        min-height: calc(100vh - 128px);
        width: 100%;
        padding: 103px 0 25px;
        display: flex;
        .inner-box {
            width: 1200px;
            position: relative;
            margin: 0 auto;
            padding: 20px 22px 0;
            border-radius: 10px;
            background: #f5f5f5;
        }
    }
}
</style>
<template>
    <div class="home">
        <nav-bar></nav-bar>
        <div class="content">
            <router-view class="inner-box" />
        </div>

        <popup-page v-if="PopupPageType"></popup-page>
    </div>
</template>

<script>
// @ is an alias to /src
import NavBar from "./components/NavBar";
//import UserInfo from "./components/UserInfo";

import PopupPage from "./../../components/PopupPage";
import { mapState } from "vuex";
export default {
    name: "LayoutHome",
    components: {
        NavBar,
        //UserInfo,
        PopupPage,
    },
    created() {
        console.log("LayoutHome created");
    },
    computed: {
        ...mapState({
            PopupPageType: (s) => s.PopupPageType,
        }),
    },
    methods: {},
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
            padding: 20px 22px;
            border-radius: 10px;
            background: #f5f5f5;
        }
    }
}
</style>
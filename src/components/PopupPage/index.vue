
<template>
    <div class="popup-page">
        <coin-task
            v-if="PopupPageType == 1"
            v-on:close-page="close"
        ></coin-task>
        <exercises-select
            v-if="PopupPageType == 2"
            v-on:close-page="close"
        ></exercises-select>
    </div>
</template>
<script>
import { mapState } from "vuex";
import CoinTask from "./views/CoinTask";
import ExercisesSelect from "./views/ExercisesSelect";
export default {
    components: { CoinTask, ExercisesSelect },
    name: "PopupPage", //组件名称
    data() {
        return {};
    }, //组件数据
    props: {}, //组件参数
    computed: {
        ...mapState({
            PopupPageType: (s) => s.PopupPageType,
        }),
    }, //计算属性
    methods: {
        close() {
            console.log("接收到了closePage");
            this.$store.commit("openPopupPage", 0);
        },
    }, //方法
    watch: {}, //监听属性
};
</script>
<style lang="less" scoped>
.popup-page {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
    background-color: #00000088;
}
</style>
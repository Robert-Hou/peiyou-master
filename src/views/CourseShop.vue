<template>
    <div>
        <user-info></user-info>
        <div>选课中心</div>
    </div>
</template>
<script>
import UserInfo from "../components/UserInfo.vue";
export default {
    components: {
        UserInfo,
    },
    name: "", //组件名称
    data() {
        return {};
    }, //组件数据
    props: {}, //组件参数
    computed: {}, //计算属性
    methods: {}, //方法
    watch: {}, //监听属性
};
</script>
<style lang="less" scoped>
</style>
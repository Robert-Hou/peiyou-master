<template>
    <div class="learn-page">
        <div class="learn-head"></div>
    </div>
</template>
<style lang="less" scoped>
.learn-page {
    width: 100%;
    .learn-head {
        height: 78px;
        border-bottom: 1px solid #e2e2e2;
        background-color: #f5f5f5;
    }
}
</style>
<script>
export default {
    name: "Learning",
    components: {},
    data() {
        return {
            id: 10000, //课时id
            name: "name", //课时名称
            index: 1, //课时序号
            audioLink: "", //课时音频链接
            audioPlayed: false, //导入音频是否已播放过
            introduction: "", //导语内容
        };
    },
};
</script>
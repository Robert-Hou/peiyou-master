<template>
    <div class="subject-flag" :class="subjectClass"></div>
</template>
<script>
export default {
    name: "", //组件名称
    data() {
        return {};
    }, //组件数据
    props: {
        subjectFlag: Number,
    }, //组件参数
    computed: {
        subjectClass() {
            let subClass = "";
            switch (this.subjectFlag) {
                case 1:
                    subClass = "math";
                    break;
                case 8:
                    subClass = "english";
                    break;
            }
            return subClass;
        },
    }, //计算属性
};
</script>
<style lang="less" scoped>
.subject-flag {
    display: inline-block;
    vertical-align: middle;
    color: #fff;
    padding: 0 7px;
    border-radius: 5px;
    line-height: 24px;
    margin-right: 5px;
    font-size: 14px;
}
.english {
    background-color: #1f5198;
}
.english::before {
    content: "英语";
}
.math {
    background-color: #05984d;
}
.math::before {
    content: "数学";
}
</style>
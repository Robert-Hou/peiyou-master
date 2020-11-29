<template>
    <msg-box>
        <div class="practice-select"><span @click="closeBox">X</span></div>
    </msg-box>
</template>
<script>
import MsgBox from "./MsgBox";
export default {
    name: "Practice",
    components: { MsgBox },
    props: {
        close: Boolean,
    },
    methods: {
        closeBox() {
            this.$emit("update:close", false);
        },
    },
};
</script>
<style lang="less" scoped>
.practice-select {
    width: 730px;
    height: 667px;
    background: #fff;
    border-radius: 10px;
}
</style>
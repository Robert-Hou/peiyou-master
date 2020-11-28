<template>
    <div class="massage-box">
        <slot></slot>
    </div>
</template>
<style lang="less" scoped>
.massage-box {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100vw;
    height: 100vh;
    background-color: #00000088;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
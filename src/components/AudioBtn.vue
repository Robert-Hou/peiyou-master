<template>
    <div class="audio-btn">
        <audio class="audio" :src="src" />
    </div>
</template>
<style lang="less" scoped>
.audio-btn {
    display: inline-block;
    cursor: pointer;
    background: url(../../public/images/audioBtnClose.png) no-repeat center;
    .audio {
        display: none;
    }
}
.audio-btn.play {
    background-image: url(../../public/images/audioBtn.png);
}
</style>
<script>
export default {
    name: "AudioBtn",
    props: {
        src: String,
    },
    mounted() {},
};
</script>
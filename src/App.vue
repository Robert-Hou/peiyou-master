<template>
    <div id="app">
        <router-view />
        <!-- <video-box
            src="http://video.ailianmath.com/dbeb814df13341fd81d13ef6a005571f/34bcce4d1372473aaf6c8a1c0ceeb247-6d8e62f8817b6c2e512b40475b54f1a8-ld.mp4"
        ></video-box> -->
    </div>
</template>

<script>
//import VideoBox from "./components/VideoBox";
export default {
    name: "App",
    created() {
        console.log("state.msgBoxType", this.$store.state.messageBoxType);
    },
    data() {
        return {
            coinTask: false,
        };
    },
    components: {
      //  VideoBox,
    },
    methods: {
        showCoinTask() {},
    },
};
</script>
<style>
* {
    margin: 0;
    padding: 0;
}
body,
html {
    color: #222222;
}
a {
    text-decoration: none;
}
#app {
    font-family: "Microsoft Yahei", "宋体", Arail, Tabhoma;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #000000;
    height: 100vh;
}
</style>

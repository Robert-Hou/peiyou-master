<template>
    <div id="app">
        <router-view />
        <!-- <video-box
            ref="video-box"
            src="http://video.ailianmath.com/dbeb814df13341fd81d13ef6a005571f/34bcce4d1372473aaf6c8a1c0ceeb247-6d8e62f8817b6c2e512b40475b54f1a8-ld.mp4"
            :markers="markers"
            @markerPlayed="markerPlay"
        ></video-box> -->
    </div>
</template>

<script>
// import VideoBox from "./components/VideoBox";
export default {
    name: "App",
    created() {
        console.log("state.msgBoxType", this.$store.state.messageBoxType);
    },
    data() {
        return {
            coinTask: false,
            markers: [
                {
                    id: 10001,
                    second: 10,
                    title: "这是一条神奇的天路啊,你好!",
                },
                {
                    id: 10002,
                    second: 64,
                    title: "这是一条神奇的天路啊,你好!",
                },
                {
                    id: 10003,
                    second: 103,
                    title: "这是一条神奇的天路啊,你好!",
                },
            ],
        };
    },
    components: {
        // VideoBox,
    },
    methods: {
        showCoinTask() {},
        markerPlay(marker) {
            console.log("markerPlayed", marker);
            if (marker.played) {
                marker.classObj = { played: true };
            }
            marker.played = true;
        },
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
.played {
    background-color: #00ff0f !important;
}
</style>

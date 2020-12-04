<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
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
    // components: {
    //     // ...mapState({
    //     //     msgBoxType: (s) => s.messageBoxType,
    //     // }),
    // },
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

<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
export default {
    name: "App",
    data() {
        return {
            coinTask: false,
        };
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
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100vh;
}
</style>

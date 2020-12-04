<template>
    <div class="info-page">
        <div class="info-nav">
            <div class="nav">
                <div class="title" v-text="name"></div>
                <router-link class="back-link" :to="backLink">返回</router-link>
            </div>
        </div>
        <div class="info-box">
            <div class="info-content">
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "InfoPage", //组件名称
    props: {
        name: String,
        backLink: {
            validator(value) {
                if (typeof value == "object") {
                    var keys = Object.keys(value);
                    return (
                        keys.indexOf("path") > -1 || keys.indexOf("name") > -1
                    );
                }
                return false;
            },
            default: { path: "/" },
        },
    }, //组件参数
};
</script>
<style lang="less" scoped>
.info-page {
    min-height: 100%;
    background: url(../../public/images/bodybj_light.png) no-repeat center
        center fixed;
    background-size: cover;
    .info-nav {
        height: 78px;
        background-color: #f5f5f5;
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        z-index: 1;
        border-bottom: 1px solid #e2e2e2;
        .nav {
            width: 1200px;
            height: 78px;
            line-height: 78px;
            margin: 0 auto;
            padding: 0 20px;
            box-sizing: border-box;
            .title {
                display: inline-block;
                font-size: 20px;
                padding-left: 12px;
                background: url(../../public/images/hg.png) no-repeat left
                    center;
            }
            .back-link {
                float: right;
                font-size: 18px;
                color: #ff8a03;
                background: url(../../public/images/backbtn.png) no-repeat left
                    center;
                padding-left: 16px;
            }
        }
    }
    .info-box {
        min-height: 100vh;
        box-sizing: border-box;
        padding: 103px 0 25px;
        .info-content {
            min-height: calc(100vh - 128px);
            box-sizing: border-box;
            background-color: #fff;
            border-radius: 8px;
            padding: 25px 22px;
            box-shadow: 0 0 16px rgba(175, 162, 150, 0.2);
            width: 1200px;
            margin: 0 auto;
        }
    }
}
</style>

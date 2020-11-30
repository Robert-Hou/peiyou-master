<template>
    <div class="select-input-box" :class="{ active: open }">
        <div v-text="selectedText" class="input" @click="target"></div>
        <ul class="list">
            <li v-text="placeholder" @click="selected()"></li>
            <li
                v-for="item in list"
                :key="item.value"
                v-text="item.text"
                @click="selected(item)"
            ></li>
        </ul>
    </div>
</template>
<script>
export default {
    name: "SelectInput", //组件名称
    data() {
        return {
            open: false,
        };
    }, //组件数据
    props: {
        list: Array,
        placeholder: String,
        data: {
            validator: (val) => {
                console.log("data type", typeof val);
                return (
                    typeof val === "string" ||
                    typeof val === "number" ||
                    typeof val === "undefined" ||
                    val == null
                );
            },
            default: null,
        }, //接收v-model的值的地方
    }, //组件参数
    model: {
        prop: "data", //接收的props名称 与props对象中同名即可
        event: "selfEvent", //自定义事件名称
    }, //修改v-model指令
    computed: {
        selectedText() {
            let item = this.list.filter((s) => {
                return s.value == this.data;
            });
            console.log("list", this.list);
            console.log("data", this.data);
            return item.length > 0 ? item[0].text : this.placeholder;
        },
    }, //计算属性
    methods: {
        target() {
            this.open = !this.open;
        },
        close() {
            this.open = false;
        },
        documentClick(event) {
            console.log("event.target", event.target);
            console.log("this.$el", this.$el);
            console.log("event.target == this.$el", event.target == this.$el);
        },
        selected(item) {
            let value = item ? item.value : null;
            this.$emit("selfEvent", value);
        },
    }, //方法
    watch: {}, //监听属性
    mounted() {
        document.addEventListener("click", this.documentClick);
    }, //加载完成-生命周期
    destroyed() {
        document.removeEventListener("click", this.documentClick);
    }, //注销组件-生命周期
};
</script>
<style lang="less" scoped>
.select-input-box {
    display: inline-block;
    position: relative;
    cursor: pointer;
    height: 40px;
    width: 240px;
    font-size: 16px;
    text-align: left;
    -webkit-touch-callout: none;
    /* iOS Safari */
    -webkit-user-select: none;
    /* Chrome/Safari/Opera */
    -khtml-user-select: none;
    /* Konqueror */
    -moz-user-select: none;
    /* Firefox */
    -ms-user-select: none;
    /* Internet Explorer/Edge */
    user-select: none;
    .input {
        height: 40px;
        line-height: 40px;
        border-radius: 10px;
        text-indent: 2em;
        color: #ffffff;
        background: url(../../../../../../public/images/chooseBoxbg1.png)
            no-repeat 200px center;
        background-color: #ffa107;
    }
    .list {
        display: none;
        width: 100%;
        border-radius: 10px;
        background: #fff;
        border: 1px solid #ffa107;
        position: absolute;
        left: 0;
        top: 40px;
        z-index: 2;
        li {
            list-style: none;
            width: 100%;
            text-indent: 2em;
            height: 40px;
            line-height: 40px;
        }
        li:hover {
            background-color: #ffa107;
        }
    }
}
.select-input-box.active {
    .input {
        background-image: url(../../../../../../public/images/chooseBoxbg2.png);
    }
    .list {
        display: block;
    }
}
</style>
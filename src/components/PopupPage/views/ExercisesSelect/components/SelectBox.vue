<template>
    <div
        class="select-input-box"
        :class="{ active: showList }"
        :data-value="value"
    >
        <div v-text="selectedText" class="input" @click.stop="target"></div>
        <ul class="list">
            <li v-text="placeholder" @click.stop="selected()"></li>
            <li
                v-for="item in list"
                :key="item.value"
                v-text="item.text"
                @click.stop="selected(item)"
            ></li>
        </ul>
    </div>
</template>
<script>
export default {
    name: "SelectBox", //组件名称
    data() {
        return {
            value: null,
            text: null,
            showList: false,
        };
    }, //组件数据
    props: {
        placeholder: { type: String, default: "请选择" }, //提示文字
        list: Array, //列表值 {value:"",text:""}
        defaultValue: {
            validator: (val) => {
                console.log("value", typeof val);
                return (
                    typeof val == "string" ||
                    typeof val == "number" ||
                    typeof val == "undefined"
                );
            },
            default: "",
        }, //默认值
    }, //组件参数
    created() {
        console.log("defaultval", this.defaultValue);
        console.log("list", this.list);
        let defaultItem = this.list.filter((s) => s.value == this.defaultValue);
        if (defaultItem.length > 0) {
            let item = defaultItem[0];
            this.value = item.value;
            this.text = item.text;
        }
    },
    computed: {
        selectedText() {
            console.log("text", this.text);
            return this.text || this.placeholder;
        },
    }, //计算属性
    methods: {
        target() {
            this.showList = !this.showList;
        },
        close() {
            this.showList = false;
        },
        selected(item) {
            console.log("item", item);
            if (item) {
                this.text = item.text;
                this.value = item.value;
            } else {
                this.text = null;
                this.value = null;
            }
            this.close();
            this.$emit("changed", this.value);
        },
    }, //方法
    watch: {}, //监听属性
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
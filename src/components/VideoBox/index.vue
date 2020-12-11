<template>
    <div class="video-box">
        <video ref="video" class="video" :src="src" @click="target"></video>
        <div class="video-controls" v-show="private_showControls">
            <div
                class="video-control-btn play-btn"
                :class="{ pause: !paused }"
                @click="target"
            ></div>
            <div
                ref="progress-box"
                class="progress-box"
                @mousedown="progressDown"
                @mousemove="progressMove"
                @mouseout="progressOut"
            >
                <div ref="progress-line" class="progress-line">
                    <div
                        ref="progress-now"
                        class="progress-now"
                        :time="currentTime"
                    ></div>
                </div>
                <div
                    ref="progress-tip"
                    class="time-tip"
                    v-show="private_showProgressTip"
                >
                    <div class="time-tip-text" v-text="selectTimer"></div>
                </div>
                <div
                    class="progress-marker"
                    v-for="marker in markers"
                    :key="marker.index"
                    :style="{ left: `${(marker.second / duration) * 100}%` }"
                    :class="marker.classObj"
                    @click="markerClick(marker)"
                >
                    <span
                        v-html="
                            changeTime(marker.second) + '<br/>' + marker.title
                        "
                    ></span>
                </div>
            </div>
            <div
                class="video-control-btn volume-btn"
                @click="volumeBtnDown"
                @mousedown.stop=""
            >
                <div
                    class="volume-box"
                    ref="volume-box"
                    v-show="private_showVolumeLine"
                    @mousedown.stop="volumeLineDown"
                    @click.stop=""
                >
                    <div ref="volume-line" class="volume-line">
                        <div ref="volume-now" class="volume-now"></div>
                    </div>
                </div>
            </div>
            <div class="timer" v-text="timer">300:56</div>
        </div>
    </div>
</template>
<script>
export default {
    name: "VideoBox", //组件名称
    data() {
        return {
            /** 视频是否准备完成 */
            isReady: false,
            /** 是否显示控件 */
            private_showControls: false,
            /** 是否显示选中进度控件 */
            private_showProgressTip: false,
            /** 私有播放方法 */
            private_paused: true,
            /** 视频总时长 */
            private_duration: 0,
            /** 私有当前时间 */
            private_currentTime: 0,
            /** 私有选择时间 */
            private_selectTime: 0,
            /** 私有音量 */
            private_volume: 0,
            /** 私有是否显示音量调节框 */
            private_showVolumeLine: false,
            /** 私有鼠标记录按钮 */
            private_mouse: { x: 0, y: 0 },
            /** 鼠标按下的标识 */
            private_mouseDownFlag: "",
            /** 隐藏控件定时器 */
            private_hidnControlTimeOut: 0,
        };
    }, //组件数据
    props: {
        src: String, //视频路径
        markers: {
            validator(arr) {
                if (arr instanceof Array) {
                    for (let i = 0; i < arr.length; i++) {
                        let itemKeys = Object.keys(arr[i]);
                        if (
                            !(
                                itemKeys.indexOf("id") > -1 &&
                                itemKeys.indexOf("second") > -1 &&
                                itemKeys.indexOf("title") > -1
                            )
                        ) {
                            return false;
                        }
                    }
                    return true;
                }
                return false;
            },
            default() {
                return [];
            },
        },
    }, //组件参数
    computed: {
        /** 暂停只读属性 */
        paused() {
            return this.private_paused;
        },
        /** 当前时间属性 */
        currentTime: {
            get() {
                return this.private_currentTime;
            },
            set(val) {
                this.video.currentTime = val;
            },
        },
        /** 当前时间字符串 */
        timer() {
            let sec = Math.floor(this.private_currentTime % 60)
                .toString()
                .padStart(2, "0");
            let min = Math.floor(this.private_currentTime / 60)
                .toString()
                .padStart(2, "0");
            return `${min}:${sec}`;
        },
        /** 进度条标签 */
        progressBox() {
            return this.$refs["progress-box"];
        },
        /** 进度条内部标签 */
        progressNow() {
            return this.$refs["progress-now"];
        },
        /** 选中时间字符串 */
        selectTimer() {
            let sec = Math.floor(this.private_selectTime % 60)
                .toString()
                .padStart(2, "0");
            let min = Math.floor(this.private_selectTime / 60)
                .toString()
                .padStart(2, "0");
            return `${min}:${sec}`;
        },
        /** 当前视频标签 */
        video() {
            return this.$refs["video"];
        },
        /** 音量属性 */
        volume: {
            get() {
                return this.private_volume;
            },
            set(val) {
                this.video.volume = val;
            },
        },
        /** 音量框标签 */
        volumeBox() {
            return this.$refs["volume-box"];
        },
        /** 音量框内容标签 */
        volumeNow() {
            return this.$refs["volume-now"];
        },
        /** 视频时长标签 */
        duration() {
            return this.private_duration;
        },
    }, //计算属性
    methods: {
        /** 向视频添加新的文本轨道。 */
        addTextTrack(...arg) {
            let video = this.video;
            return video.addTextTrack.apply(video, arg);
        },
        /** 检查浏览器是否能够播放指定的视频类型。 */
        canPlayType() {
            let video = this.video;
            return video.canPlayType();
        },
        /** 重新加载视频元素。 */
        load(...arg) {
            let video = this.video;
            return video.load.apply(video, arg);
        },
        play() {
            this.video.play();
        },
        pause() {
            this.video.pause();
        },
        /** 转换时间方法 */
        changeTime(second) {
            let sec = Math.floor(second % 60)
                .toString()
                .padStart(2, "0");
            let min = Math.floor(second / 60)
                .toString()
                .padStart(2, "0");
            return `${min}:${sec}`;
        },
        /** 播放按钮切换 */
        target() {
            if (this.video.paused) {
                this.play();
            } else {
                this.pause();
            }
        },
        /** 执行marker点事件 */
        markerClick(marker) {
            this.currentTime = marker.second;
        },
        /** 执行marker事件 */
        markerPlayed(marker) {
            this.$emit("markerPlayed", marker);
        },
        //#region 窗口鼠标事件处理
        /** 窗口鼠标按下 */
        windowMouseDown() {
            this.private_showVolumeLine = false;
        },
        /** 窗口鼠标移动 */
        windowMouseMove(e) {
            let move = {
                x: e.pageX - this.private_mouse.x,
                y: e.pageY - this.private_mouse.y,
            };
            switch (this.private_mouseDownFlag) {
                case "volumeLine":
                    this.volumeLineMove(e, move.x, move.y);
                    break;
                case "progressBox":
                    this.progressChange(e, move.x);
                    break;
                default:
                    break;
            }
            if (e.path.indexOf(this.$el) > -1) {
                clearTimeout(this.private_hidnControlTimeOut);
                this.private_showControls = true;
                this.private_hidnControlTimeOut = setTimeout(() => {
                    this.private_showControls = false;
                }, 10 * 1000); //十秒后隐藏控件
            }
        },
        /** 窗口鼠标抬起 */
        windowMouseUp() {
            this.private_mouseDownFlag = "";
        },
        //#endregion

        //#region 音量控制
        /** 音频按钮按下 */
        volumeBtnDown() {
            this.private_showVolumeLine = !this.private_showVolumeLine;
            this.private_mouseDownFlag = "volumeBtn";
        },
        /** 音频线按下 */
        volumeLineDown(e) {
            this.private_mouse.x = e.pageX;
            this.private_mouse.y = e.pageY;
            this.private_mouseDownFlag = "volumeLine"; //设定点击的是音频框
            let layerY = e.layerY; //获取鼠标点击在volume-box的光标位置

            if (e.target === this.$refs["volume-line"]) {
                //如果是点到了volume-line上
                layerY += 5; //修正layerY,加入padding-top值
            } else if (e.target === this.volumeNow) {
                //如果是点到了volume-now上
                layerY = //修正layerY
                    this.volumeBox.clientHeight - //使用volume-box高度减去
                    this.volumeNow.clientHeight - //volume-now高度再减去
                    5 + //volume-box的padding-top再加上layerY
                    layerY;
            }

            let height = 1 - (layerY - 5) / (this.volumeBox.clientHeight - 10); //获取高度占比
            height = height < 0 ? 0 : height > 1 ? 1 : height; //修正高度占比
            this.volumeNow.style.height = height * 100 + "%"; //设置volume-now高度
            this.volumeNow.dataset.oldheight = this.volumeNow.clientHeight; //记录volume-now原始高度
            this.video.volume = height; //设置视频音量
        },
        /**
         * 音频线拖动
         * @param {number} x 距离点击位置的x值
         * @param {number} y 距离点击位置的y值
         */
        volumeLineMove(e, x, y) {
            let height =
                (this.volumeNow.dataset.oldheight - y) /
                this.$refs["volume-line"].clientHeight; //音量高度为1- (原有高度 - 偏移高度)/总高度
            height = height < 0 ? 0 : height > 1 ? 1 : height; //修正高度
            this.volumeNow.style.height = `${height * 100}%`; //设置高度
            this.video.volume = height; //设置音量
        },

        /** 设置音频 */
        setVolume(val) {
            this.video.volume = val;
        },
        //#endregion

        //#region 进度条控制
        /** 进度条移动事件 */
        progressDown(e) {
            this.private_mouse.x = e.pageX;
            this.private_mouse.y = e.pageY;
            this.private_mouseDownFlag = "progressBox";
            let layerX = e.layerX;
            if (e.target === this.$refs["progress-tip"]) {
                layerX = this.$refs["progress-tip"].offsetLeft;
            }
            let left = layerX / this.progressBox.clientWidth;
            left = left < 0 ? 0 : left > 1 ? 1 : left;
            this.progressNow.style.width = `${left * 100}%`;
            this.currentTime = left * this.private_duration;
            this.progressNow.dataset.width = this.progressNow.clientWidth;
        },
        progressMove(e) {
            this.private_showProgressTip = true;
            let layerX = e.layerX;
            let classList = e.target.className.replace(/\s+/g, " ").split(" ");
            if (e.target === this.$refs["progress-tip"]) {
                //如果是在tip的线上的话直接返回,不做修改
                return;
            } else if (classList.indexOf("progress-marker") > -1) {
                this.private_showProgressTip = false;
                return false;
            }
            let left = layerX / this.progressBox.clientWidth;
            left = left < 0 ? 0 : left > 1 ? 1 : left;
            this.private_selectTime = left * this.private_duration;
            this.$refs["progress-tip"].style.left = `${left * 100}%`;
        },
        progressOut(e) {
            if (e.target === this.$refs["progress-tip"]) {
                //如果是在tip的线上的话直接返回,不做修改
                return;
            }
            this.private_showProgressTip = false;
        },
        /** 修改进度条 */
        progressChange(e, x) {
            let width = parseInt(this.progressNow.dataset.width) + x;
            let bi = width / this.progressBox.clientWidth;
            bi = bi < 0 ? 0 : bi > 1 ? 1 : bi;
            this.progressNow.style.width = `${bi * 100}%`;
            this.currentTime = bi * this.duration;
        },
        //#endregion
    }, //方法
    /** 页面加载完成 */
    mounted() {
        let video = this.video;
        video.src = this.src;
        let _this = this;
        this.private_volume = video.volume;
        this.volumeNow.style.height = this.volume * 100 + "%";
        //#region 视频事件处理

        // loadstart：视频查找。当浏览器开始寻找指定的音频/视频时触发，也就是当加载过程开始时
        video.addEventListener("loadstart", function (e) {
            // console.log("提示视频的元数据已加载");
            // console.log(e);
            // console.log(video.duration); // NaN
            _this.private_showControls = true;
            _this.$emit("loadstart", e);
        });

        // durationchange：时长变化。当指定的音频/视频的时长数据发生变化时触发，加载后，时长由 NaN 变为音频/视频的实际时长
        video.addEventListener("durationchange", function (e) {
            // console.log("提示视频的时长已改变", video.duration);// 528.981333   视频的实际时长（单位：秒）
            // console.log(e);
            _this.private_duration = video.duration;
            _this.$emit("durationchange", e);
        });

        // loadedmetadata ：元数据加载。当指定的音频/视频的元数据已加载时触发，元数据包括：时长、尺寸（仅视频）以及文本轨道
        video.addEventListener("loadedmetadata", function (e) {
            // console.log("提示视频的元数据已加载");
            // console.log(e);
            _this.$emit("loadedmetadata", e);
        });

        // loadeddata：视频下载监听。当当前帧的数据已加载，但没有足够的数据来播放指定音频/视频的下一帧时触发
        video.addEventListener("loadeddata", function (e) {
            // console.log("提示当前帧的数据是可用的");
            // console.log(e);
            _this.$emit("loadeddata", e);
        });

        // progress：浏览器下载监听。当浏览器正在下载指定的音频/视频时触发
        video.addEventListener("progress", function (e) {
            // console.log("提示视频正在下载中");
            // console.log(e);
            _this.$emit("progress", e);
        });

        // canplay：可播放监听。当浏览器能够开始播放指定的音频/视频时触发
        video.addEventListener("canplay", function (e) {
            // console.log("提示该视频已准备好开始播放");
            // console.log(e);
            _this.isReady = true;
            _this.$emit("canplay", e);
        });

        // canplaythrough：可流畅播放。当浏览器预计能够在不停下来进行缓冲的情况下持续播放指定的音频/视频时触发
        video.addEventListener("canplaythrough", function (e) {
            // console.log("提示视频能够不停顿地一直播放");
            // console.log(e);
            _this.isReady = true;
            _this.$emit("canplaythrough", e);
        });

        // play：播放监听
        video.addEventListener("play", function (e) {
            console.log("提示该视频正在播放中");
            // console.log(e);
            _this.private_paused = false;
            _this.$emit("play", e);
        });

        // pause：暂停监听
        video.addEventListener("pause", function (e) {
            console.log("暂停播放");
            // console.log(e);
            _this.private_paused = true;
            _this.$emit("pause", e);
        });

        // seeking：查找开始。当用户开始移动/跳跃到音频/视频中新的位置时触发
        video.addEventListener("seeking", function (e) {
            // console.log("开始移动进度条");
            // console.log(e);
            _this.$emit("seeking", e);
        });

        // seeked：查找结束。当用户已经移动/跳跃到视频中新的位置时触发
        video.addEventListener("seeked", function (e) {
            // console.log("进度条已经移动到了新的位置");
            // console.log(e);
            _this.$emit("seeked", e);
        });

        // waiting：视频加载等待。当视频由于需要缓冲下一帧而停止，等待时触发
        video.addEventListener("waiting", function (e) {
            // console.log("视频加载等待");
            // console.log(e);
            _this.$emit("waiting", e);
        });

        // playing：当视频在已因缓冲而暂停或停止后已就绪时触发
        video.addEventListener("playing", function (e) {
            // console.log("playing");
            // console.log(e);
            _this.$emit("playing", e);
        });
        /** 上一秒 */
        let lastSecond = 0;
        // timeupdate：目前的播放位置已更改时，播放时间更新
        video.addEventListener("timeupdate", function (e) {
            // console.log("timeupdate");
            // console.log(e);
            _this.private_currentTime = video.currentTime;
            _this.progressNow.style.width = `${
                (video.currentTime / video.duration) * 100
            }%`;
            let sec = Math.floor(video.currentTime); //当前秒
            if (sec != lastSecond) {
                lastSecond = sec; //设定当前秒
                //如果当前秒不等于上一秒
                let _markers = _this.markers.filter((s) => s.second == sec);
                _markers.forEach((s) => {
                    _this.markerPlayed(s);
                });
            }
            _this.$emit("timeupdate", e);
        });

        // ended：播放结束
        video.addEventListener("ended", function (e) {
            // console.log("视频播放完了");
            // console.log(e);
            _this.$emit("ended", e);
        });

        // error：播放错误
        video.addEventListener("error", function (e) {
            // console.log("视频出错了");
            // console.log(e);
            _this.$emit("error", e);
        });

        // volumechange：当音量更改时
        video.addEventListener("volumechange", function (e) {
            // console.log("volumechange", e);
            _this.private_volume = video.volume;
            _this.$emit("volumechange", e);
        });

        // stalled：当浏览器尝试获取媒体数据，但数据不可用时
        video.addEventListener("stalled", function (e) {
            // console.log("stalled");
            // console.log(e);
            _this.$emit("stalled", e);
        });

        // ratechange：当视频的播放速度已更改时
        video.addEventListener("ratechange", function (e) {
            // console.log("ratechange");
            // console.log(e);
            _this.$emit("ratechange", e);
        });
        //#endregion
        window.addEventListener("mousedown", this.windowMouseDown);
        window.addEventListener("mousemove", this.windowMouseMove);
        window.addEventListener("mouseup", this.windowMouseUp);
    },
    /** 页面注销 */
    destroyed() {
        window.removeEventListener("mousedown", this.windowMouseDown);
        window.removeEventListener("mousemove", this.windowMouseMove);
        window.removeEventListener("mouseup", this.windowMouseUp);
    },
};
</script>
<style lang="less" scoped>
@font-face {
    font-family: "Glyphicons Halflings";
    src: url("fonts/glyphicons-halflings-regular.eot");
    src: url("fonts/glyphicons-halflings-regular.eot?#iefix")
            format("embedded-opentype"),
        url("fonts/glyphicons-halflings-regular.woff2") format("woff2"),
        url("fonts/glyphicons-halflings-regular.woff") format("woff"),
        url("fonts/glyphicons-halflings-regular.ttf") format("truetype"),
        url("fonts/glyphicons-halflings-regular.svg#glyphiconsprivate_halflingsregular")
            format("svg");
}
.video-box {
    display: inline-block;
    position: relative;
    font-family: "Glyphicons Halflings";
    .video {
        position: relative;
        width: 100%;
        height: 100%;
    }
    .video-controls {
        user-select: none;
        position: absolute;
        bottom: 0px;
        height: 30px;
        width: 100%;
        background: #88888888;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: flex-start;
        color: #ffffff;
        .video-control-btn {
            position: relative;
            font-size: 16px;
            height: 16px;
            line-height: 16px;
            width: 16px;
            margin: 7px 7px;
            cursor: pointer;
        }
        .play-btn::before {
            content: "\e072";
        }
        .play-btn.pause::before {
            content: "\e073";
        }
        .progress-box {
            position: relative;
            width: calc(100% - 120px);
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            .progress-line {
                width: 100%;
                height: 2px;
                background: #888888;
                .progress-now {
                    height: 100%;
                    width: 0px;
                    background: #ffffff;
                }
            }
            .time-tip {
                position: absolute;
                height: 100%;
                width: 0px;
                top: 0px;
                .time-tip-text {
                    position: absolute;
                    top: -28px;
                    left: -50%;
                    height: 20px;
                    line-height: 20px;
                    font-size: 12px;
                    border: 1px solid #ccc;
                    background: #fff;
                    color: #000;
                    border-radius: 5px;
                    width: 46px;
                    left: -23px;
                    text-align: center;
                }
                .time-tip-text::before {
                    content: "";
                    position: absolute;
                    border-left: 6px solid #ffffff00;
                    border-top: 6px solid #ffffff;
                    border-right: 6px solid #ffffff00;
                    margin-left: -6px;
                    bottom: -6px;
                    left: 50%;
                }
            }
            .progress-marker {
                position: absolute;
                width: 10px;
                height: 10px;
                border-radius: 5px;
                margin-left: -5px;
                background: #ffffff;
                top: calc(100% / 2 - 5px);
                span {
                    display: none;
                    position: absolute;
                    bottom: 15px;
                    width: 60px;
                    line-height: 20px;
                    font-size: 12px;
                    border: 1px solid #ccc;
                    background: #fff;
                    color: #000;
                    border-radius: 5px;
                    padding: 5px;
                    text-align: left;
                    left: -31px;
                }

                span::before {
                    content: "";
                    position: absolute;
                    border-left: 6px solid #ffffff00;
                    border-top: 6px solid #ffffff;
                    border-right: 6px solid #ffffff00;
                    margin-left: -6px;
                    bottom: -6px;
                    left: 50%;
                }
            }
            .progress-marker:hover {
                span {
                    display: inline-block;
                }
            }
        }
        .volume-btn::before {
            content: "\e038";
        }
        .volume-btn.off::before {
            content: "\e036";
        }
        .volume-btn {
            .volume-box {
                position: absolute;
                width: 100%;
                height: 110px;
                padding: 5px 0;
                bottom: 23px;
                background: #88888888;
                display: flex;
                justify-content: center;
                align-items: center;
                .volume-line {
                    position: relative;
                    height: 100%;
                    width: 2px;
                    background: #00000088;
                    .volume-now {
                        position: absolute;
                        bottom: 0px;
                        background: #ffffff88;
                        width: 2px;
                    }
                    .volume-now::before {
                        position: absolute;
                        content: "";
                        width: 10px;
                        height: 10px;
                        border-radius: 5px;
                        top: -5px;
                        left: -4px;
                        background: #fff;
                    }
                }
            }
        }
        .timer {
            width: 60px;
            font-size: 12px;
            text-align: center;
            height: 30px;
            line-height: 30px;
            cursor: default;
        }
        .hide {
            display: none;
        }
    }
}
</style>
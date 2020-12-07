<template>
    <div class="video-box">
        <video ref="video" class="video" :src="src"></video>
        <div class="video-controls">
            <div
                class="video-control-btn play-btn"
                :class="{ pause: !paused }"
                @click="target"
            ></div>
            <div
                ref="progress-box"
                class="progress-box"
                @mousedown="progressDown"
            >
                <div class="progress-line">
                    <div
                        ref="progress"
                        class="progress-now"
                        :time="currentTime"
                    ></div>
                </div>
                <div
                    ref="progress-tip"
                    class="time-tip"
                    :class="{ hide: private_progress_time_hide }"
                >
                    <div class="time-tip-text" v-text="selectTimer"></div>
                </div>
            </div>
            <div class="video-control-btn volume-btn">
                <div class="volume-box">
                    <div class="volume-line">
                        <div ref="volume" class="volume-now"></div>
                    </div>
                </div>
            </div>
            <div class="timer" v-text="timer">300:56</div>
        </div>
    </div>
</template>
<script>
export default {
    name: "", //组件名称
    data() {
        return {
            /** 视频是否准备完成 */
            isReady: false,
            /** 视频是否暂停 */
            private_paused: true,
            /** 视频总时长(私有,外部禁止设置) */
            private_duration: NaN,
            /** 当前音量(私有,外部直接调用无效,如果修改当前时间使用 volume 计算属性) */
            private_volume: 0,
            /** 当前时间(私有,外部直接调用无效,如果修改当前时间使用 currentTime 计算属性) */
            private_currentTime: 0,
            /** 进度条上按下 */
            private_progress_down: 0,
            private_progress_over: true,
            private_progress_time_hide: true,
            /** 进度条上显示的时间 */
            private_progress_time: 0,
        };
    }, //组件数据
    props: {
        src: String, //视频路径
    }, //组件参数
    computed: {
        //视频时长
        duration() {
            return this.private_duration;
        },
        //是否暂停
        paused() {
            return this.private_paused;
        },
        //音量
        volume: {
            get() {
                return this.private_volume;
            },
            set(val) {
                let video = this.$refs["video"];
                video.volume = val;
            },
        },
        //当前时间
        currentTime: {
            get() {
                return this.private_currentTime;
            },
            set(val) {
                let video = this.$refs["video"];
                video.currentTime = val;
            },
        },
        //显示时间
        timer() {
            let second = Math.floor(this.currentTime);
            let min = Math.floor(second / 60);
            let sec = second % 60;
            return (
                min.toString().padStart(2, "0") +
                ":" +
                sec.toString().padStart(2, "0")
            );
        },
        selectTimer() {
            let second = Math.floor(this.private_progress_time);
            let min = Math.floor(second / 60);
            let sec = second % 60;
            return (
                min.toString().padStart(2, "0") +
                ":" +
                sec.toString().padStart(2, "0")
            );
        },
    }, //计算属性
    methods: {
        /** 向视频添加新的文本轨道。 */
        addTextTrack(...arg) {
            let video = this.$refs["video"];
            return video.addTextTrack.apply(video, arg);
        }, //
        /** 检查浏览器是否能够播放指定的视频类型。 */
        canPlayType() {
            let video = this.$refs["video"];
            return video.canPlayType();
        }, //
        /** 重新加载视频元素。 */
        load(...arg) {
            let video = this.$refs["video"];
            return video.load.apply(video, arg);
        }, //
        /**
         * 	开始播放视频。
         */
        play() {
            let video = this.$refs["video"];
            console.log("play", video);
            return video.play();
        },
        /**
         * 暂停当前播放的视频。
         */
        pause() {
            let video = this.$refs["video"];
            console.log("pause", video);
            return video.pause();
        },
        /**
         * 切换暂停和播放
         */
        target() {
            if (this.paused) {
                this.play();
            } else {
                this.pause();
            }
        },
        /** 进度条按下 */
        progressDown(e) {
            this.private_progress_down = e.pageX;
            this.pause();
        },
        /**
         * 进度条滑动
         */
        progressMove(e) {
            console.log("move", e);
            let x = e.offsetX;
            this.private_progress_over = false;
            this.private_progress_time_hide = false;
            let proBox = this.$refs["progress-box"];
            let width = proBox.offsetWidth;
            let bi = x / width;
            let tipBox = this.$refs["progress-tip"];
            tipBox.style.left = x + "px";
            this.private_progress_time = bi * this.duration;
            if (this.private_progress_down) {
                this.currentTime = this.private_progress_time;
            }
        },
        /** 进度条点击 */
        progressUp(e) {
            console.log("up", e);
            this.private_progress_down = 0;
        },
        /** 进度条移出 */
        progressOver() {
            this.private_progress_over = true;
            this.private_progress_time_hide = true;
            console.log("out");
        },

        /** 窗口鼠标移动 */
        windowMouseMove(e) {
            let proBox = this.$refs["progress-box"];
            if (e.path.indexOf(proBox) > -1) {
                this.progressMove(e);
            } else if (!this.private_progress_down) {
                this.progressOver(e);
            }
        },
        /** 窗口鼠标抬起 */
        windowMouseUp(e) {
            this.progressUp(e);
        },
    }, //方法
    /** 页面加载完成 */
    mounted() {
        let video = this.$refs["video"];
        video.src = this.src;
        let _this = this;
        this.private_volume = video.volume;
        console.log("音量", video.volume);
        console.log("volume", this.$refs["volume"]);
        this.$refs["volume"].style.height = this.volume * 100 + "%";
        //#region 视频事件处理

        // loadstart：视频查找。当浏览器开始寻找指定的音频/视频时触发，也就是当加载过程开始时
        video.addEventListener("loadstart", function (e) {
            // console.log("提示视频的元数据已加载");
            // console.log(e);
            // console.log(video.duration); // NaN
            _this.$emit("loadstart", e);
        });

        // durationchange：时长变化。当指定的音频/视频的时长数据发生变化时触发，加载后，时长由 NaN 变为音频/视频的实际时长
        video.addEventListener("durationchange", function (e) {
            // console.log("提示视频的时长已改变");
            // console.log(e);
            // console.log(video.duration); // 528.981333   视频的实际时长（单位：秒）
            _this.private_duration = video.duration; //设置当前视频时间
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

        // timeupdate：目前的播放位置已更改时，播放时间更新
        video.addEventListener("timeupdate", function (e) {
            // console.log("timeupdate");
            // console.log(e);
            _this.private_currentTime = video.currentTime;
            let bili = (video.currentTime / video.duration) * 100;
            _this.$refs["progress"].style.width = bili + "%";
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
            // console.log("volumechange");
            // console.log(e);
            _this.private_volume = video.volume;
            let bili = video.volume * 100;
            _this.$refs["volume"].style.height = bili + "%";

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
        window.addEventListener("mousemove", this.windowMouseMove);
        window.addEventListener("mouseup", this.windowMouseMove);
    },
    /** 页面注销 */
    destroyed() {
        window.removeEventListener("mousemove", this.windowMouseMove);
        window.removeEventListener("mouseup", this.windowMouseMove);
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
    }
    .video-controls {
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
                border-left: 1px solid #ff0000;
                .time-tip-text {
                    position: absolute;
                    bottom: 35px;
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
                        background: #ffffff88;
                        width: 2px;
                    }
                }
                .volume-line::before {
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
<template>
<view class="page">
    <ShowTitle @Vclose="closePop" v-if="status" :wenzi='desc' :type1='PopType' :coloseType='coloseT'></ShowTitle>
    <!-- <image class="topImg" src="../../static/img/topImg.png" mode="heightFix"></image> -->
    <Heade :url='url' @language='changeLangae' ref="mainindex" style='z-index: 0;' v-if="hackReset"></Heade>
    <web-view :src="webViewUrl" class="" v-if="showUpload"></web-view>

    <view class="boxes">

        <!-- <image :src="anniu.chunwang[language]" mode="widthFix" class="uploadBox" style="width: 18vw;" @click="zhibo"></image>

<image :src="anniu.upload[language]" mode="widthFix" class="zhiboBox" style="width: 18vw;" @click="upload"></image> -->

        <view class="box">
            <view class="left_bar bar">
                <view class="barBox topBar">

                </view>

            </view>

            <view class="middle-box">
                <view class="box-content">
                    <image class="box-img animation-scale-up" v-for="(item,index) in item" :src="item.url" :style="{'width':'36vw','height':'25vw','left':item.p.x+'vw','top':item.p.y+'vh','z-index':item.p.index}" mode="aspectFit" @click="get_into(item.path)" :class="{'clickEffict':item.path!=0}"></image>
                </view>
            </view>

            <view class="right_bar bar">
                <view class="barBox bottomBar">
                </view>
            </view>
        </view>

    </view>

    <image class="buttomImg" src="../../static/img/right-bot.png" mode="heightFix"></image>

    <Foot v-if="showFoot"></Foot>

</view>
</template>

<script>
import Heade from '../Com/Head.vue'
import Foot from '../Com/foot.vue'
import ShowTitle from '../Com/showTitle.vue'
import ButtonImg from '../Com/buttomImg.vue'
import TopImg from '../Com/topImg.vue'
import Upload from '../Com/upload.vue'
export default {
    components: {
        Heade,
        Foot,
        ShowTitle,
        ButtonImg,
        Upload,
        TopImg
    },

    data() {
        return {
            url: '../../static/img/guojizhongwen.png',
            title: this.CON.CON.title,
            PopType: 0,
            hackReset: true,
            item: [],
            status: false,
            uploadStatus: false,
            showUpload: false,
            language: '',
            title1: this.CON.CON.index,
            desc: this.CON.CON.wenzi.index,
            webViewUrl: '',
            coloseT: 0,
            showFoot: true,
            anniu: {
                upload: {
                    china: '../../static/img/upload.png',
                    english: '../../static/img/uploadworks.png'
                },
                chunwang: {
                    china: '../../static/img/chunwanChina.png',
                    english: '../../static/img/chunwan_english.png'
                }
            }
        }
    },
    onShow(e) {
        this.hackReset = false;
        this.showFoot = false;
        this.$nextTick(() => {
            this.hackReset = true;
            this.showFoot = true;
        });
        console.log("this.language " + this.language);
        uni.getStorage({
            key: 'language',
            success: (res) => {
                this.language = res.data;

                if (this.language != res.data) {
                    window.reload();

                }

            },
            fail() {
                uni.setStorage({
                    key: 'language',
                    data: 'china',
                    success: function () {
                        this.language = "china";
                        console.log('success');
                    }
                });
            }
        });

    },
    onLoad(option) {
        this.showFoot = true;
        this.showIndex();

    },

    mounted() {
        window.addEventListener('message', (e) => {
            switch (e.data.data.type) {
                case 'close':
                    this.upload();
                    break;
            }

        }, false);
        var lan = '';
        uni.getStorage({
            key: 'language',
            success: (res) => {
                this.language = res.data;
                this.webViewUrl = '../../static/word/upload.html?language=' + this.language;
            },
            fail() {

                uni.setStorage({
                    key: 'language',
                    data: 'china',
                    success: () => {
                        this.language = 'china';
                        this.webViewUrl = '../../static/word/upload.html?language=' + this
                            .language;
                    }
                });
            }
        });
        this.$nextTick(() => {

            this.item = this.CON.CON.index.item;

        });
        uni.getStorage({
            key: "deguo",
            success: (res) => {
                console.log("chenggg");

            },
            fail: () => {
                this.click_span1();
                uni.setStorage({
                    key: 'deguo',
                    data: 'deguo',
                    success: function () {
                        console.log('success');
                    }
                })
            }
        });

    },
    methods: {
        showIndex() {

        },

        click_span1() {
            let language = this.CON.CON.language;
            this.desc = this.CON.CON.wenzi.int.china;
            this.coloseT = 0;

            if (this.status) {
                this.status = false
            } else {
                this.status = true;
            }
        },

        click_span() {
            let language = this.CON.CON.language;
            this.desc = this.CON.CON.wenzi.index[language];
            this.coloseT = 1;
            if (this.status) {
                this.status = false
            } else {
                this.status = true;
            }
        },
        tishi(msg) {
            uni.showModal({
                title: "提 示",
                content: msg,
                showCancel: false
            });
        },
        upload() {

            this.webViewUrl = '../../static/word/upload.html?language=' + this.language;
            if (this.showUpload) {
                this.showUpload = false;
            } else {
                this.showUpload = true;
            }

        },
        closeUpLoad() {
            this.uploadStatus = false;
        },
        closePop(type) {
            switch (type) {
                case 'video':
                    this.showVideo = false;
                    this.videoUrl = false;

                    break;
                case 'img':
                    this.showImage = false;
                    this.imgUrl = false;

                    break;
                case 'title':

                    this.status = false;
                    break;
            }

        },
        changeLangae(lan) { //切换语言
            console.log("dd" + lan);
            this.language = lan;
            this.showFoot = false;
            this.$nextTick(() => {
                this.showFoot = true;
            })

        },
        zhibo() {
            uni.navigateTo({
                url: "/pages/index/zhibo",
                animationType: 'pop-in',
                animationDuration: 500
            });
        },
        get_into(path) {
            if (path != 0 && path != 2) {
                uni.navigateTo({
                    url: path,
                    animationType: 'pop-in',
                    animationDuration: 500
                });
            }
            if (path == 2) {
                window.location.href = "./dist/index.html";
            }
        }
    }
}
</script>

<style scoped>
@import "../../static/css/index.css";

.upload {
    /* top: 0; */
    /* 		position: fixed;

z-index: 99999; */
}

.uploadB {
    width: 100vw;
    height: 100vh;
    background-color: #000000;
    z-index: 999999;
    position: absolute;
    top: 0;
}

.uploadBoxWeb {
    position: absolute;
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: 99999;
}
</style>

<template>
    <view class="header">
        <!-- <view class="headTile" v-html="banquan[language]">
		</view> -->
        <view class="headTile">
            <view class="headRow">
                <view class="rowleft">
                    {{ banquan[language].z }}
                </view>
                <view class="rowRight">
                    {{ banquan[language].a }}
                </view>
            </view>
            <view class="headRow">
                <view class="rowleft">
                    {{ banquan[language].cb }}
                </view>
                <view class="rowRight">
                    {{ banquan[language].b }}
                </view>
            </view>
            <view class="headRow">
                <view class="rowleft">
                    {{ banquan[language].xb }}
                </view>
                <view class="rowRight">
                    {{ banquan[language].c }}
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    name: "Foot",

    data() {
        return {
            language: "china",
            banquan: this.CON.CON.banquan,
        };
    },
    mounted() {
        uni.getStorage({
            key: "language",
            success: (res) => {
                this.language = res.data;
            },
            fail() {
                console.log("dx");
                uni.setStorage({
                    key: "language",
                    data: "china",
                    success: function () {
                        this.language = "china";
                    },
                });
            },
        });
    },
    methods: {},
};
</script>

<style scoped>
.header {
    width: 100vw;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    position: relative;
    flex-direction: column;
}

.headTile {
    width: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    font-size: 3vw;
    flex-direction: column;
    justify-content: center;
}
.headRow {
    width: 100%;

    display: flex;
    flex-direction: row;
}
.rowleft {
    width: 15%;

    text-align: right;
}
.rowRight {
    margin-left: 1%;

    width: 85%;
    text-align: left;
    height: 100%;
}
</style>

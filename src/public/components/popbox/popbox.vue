<style lang="scss" scoped>
    @import "../../../public/assets/scss/mix.scss";

    .popwin-wrap {
        position: fixed;
        left: 0;
        top:0;
        display: flex;
        justify-content: center;
        align-items:center;
        width: 100%;
        height: 100%;
        z-index: 1005;
    }

    .popbox {
        position: relative;
        width: px2rem(600);
        padding-top: px2rem(28);
        border-radius: px2rem(30);
        background-color: rgba(#ffffff, 0.9);
        z-index: 1005;
    }

    .pop_tit {
        font-size: px2rem(32);
        color: $colorBlack;
        text-align: center;
        line-height: px2rem(60);
        padding: 0 px2rem(40);
    }

    .pop_tip{
        font-size: px2rem(28);
        color: $colorBlack;
        text-align: center;
        line-height: px2rem(40);
        padding: px2rem(20) px2rem(40);
    }

    .pop_text {
        padding: px2rem(10) px2rem(35);
        color: $colorGray;
        text-align: center;
    }

    .mask {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(#000000, 0.8);
        z-index: 1002;
        opacity: 1;
    }

    .btn-box {
        display: flex;
        justify-content: space-around;
        height: px2rem(88);
        margin-top: px2rem(28);
        border-top: 1px solid #dddddd;
        line-height: px2rem(88);
        text-align: center;
        @include font-dpr(16);
        color: $colorBlack;
        div:only-child{
            &:after {
                display: none;
            }
        }
    }

    .btn-gray {
        position: relative;
        flex: 1;
        text-align: center;
        color: $colorGray;
        &:after {
            content: "";
            position: absolute;
            top: 0;
            right: 0;
            height: px2rem(85);
            width: 1px;
            background-color: #dddddd;
        }
    }

    .btn-black {
        flex: 1;
        text-align: center;
        color: $colorBlack;
    }

    .popbox-animate-enter {
        .mask {
            opacity: 0;
        }
        .popbox {
            opacity: 0;
            transform: scale(1.2);

        }
    }
    .popbox-animate-leave-to {
        .mask {
            opacity: 0;
        }
        .popbox {
            opacity: 0;
            transform: scale(0.7);

        }
    }
    .popbox-animate-enter-to, .popbox-animate-leave {
        .mask {
            opacity: 1;
        }
        .popbox {
            opacity: 1;
            transform: scale(1);
        }
    }
    .popbox-animate-enter-active,
    .popbox-animate-leave-active {
        transition: all 0.2s;
        .mask {
            transition: all 0.2s;
        }
        .popbox {
            transition: all 0.2s;
        }
    }
</style>
<template>
    <transition name="popbox-animate">
        <div class="popwin-wrap" v-if="isShow" :class="popClass">
            <div class="mask"></div>
            <div class="popbox">
                <div class="pop_tit" v-if="popTit">{{popTit}}</div>
                <div class="pop_tip" v-if="popTip">{{popTip}}</div>
                <div class="pop_text" v-if="popText" v-html="popText"></div>
                <div class="btn-box">
                    <div class="btn-gray" v-if="leftBtnText" @click="leftBtnClick">{{leftBtnText}}</div>
                    <div class="btn-black" v-if="rightBtnText" @click="rightBtnClick">{{rightBtnText}}</div>
                </div>

            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "popbox",
        props: {
            isShow: '',
            popClass: '',
            popTit: '',
            popTip: '',
            popText: '',
            leftBtnText: '',
            rightBtnText: ''
        },
        data() {
            return {}
        },
        methods: {
            leftBtnClick(){
                this.$emit("leftBtnClick");
            },
            rightBtnClick(){
                this.$emit("rightBtnClick");
            },
        }
    }
</script>

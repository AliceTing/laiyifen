<style lang="scss" scoped>
    @import "../../../public/assets/scss/mix.scss";

    .toast_popWin {
        position: fixed;
        left: 0;
        top: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        z-index: 1005;
        .toast_popbox {
            position: relative;
            z-index: 1005;
            min-width: px2rem(410);
            max-width: px2rem(580);
            box-sizing: border-box;
            border-radius: px2rem(30);
            background-color: rgba(#222222, 0.9);
            .toast_tit {
                padding: px2rem(35);
                @include font-dpr(13);
                color: #fff;
                text-align: center;
                line-height: px2rem(40);
            }
        }
    }

    .toast-animate-enter, .toast-animate-leave-to {
        opacity: 0;
    }

    .toast-animate-enter-to, .toast-animate-leave {
        opacity: 1;
    }

    .toast-animate-enter-active,
    .toast-animate-leave-active {
        transition: all 0.2s;
    }
</style>
<template>
    <transition name="toast-animate">
        <div class="toast_popWin" v-if="isShow">
            <div class="toast_popbox" :class="toastClass">
                <div class="toast_tit">{{toastText}}</div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "toast",
        props: {
            isShow: '',
            toastText: '',
            toastClass: ''
        },
        data() {
            return {}
        },
        methods: {}
    }
</script>

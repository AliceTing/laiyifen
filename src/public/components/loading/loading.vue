<style lang="scss" scoped>
    @import "../../assets/scss/mix.scss";

    .toast_popWin {
        position: fixed;
        left: 0;
        top:0;
        display: flex;
        justify-content: center;
        align-items:center;
        width: 100%;
        height: 100%;
        z-index: 1005;
        background: rgba(#fff, .7);
        .toast_popbox {
            min-width: px2rem(260);
            max-width: px2rem(580);
            padding: px2rem(20);
            border-radius: px2rem(30);
            background-color: rgba(#222222, 0.9);
            .toast_tit {
                padding: px2rem(10);
                @include font-dpr(13);
                color: #fff;
                text-align: center;
                line-height: px2rem(40);
            }
        }
    }

    .loading-icon {
        width: px2rem(48);
        height: px2rem(48);
        margin: px2rem(10) auto;
        background: url("../../assets/images/loading.png") center no-repeat;
        background-size: 100% 100%;
        animation: spin .5s linear infinite;
    }

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
    .toast-animate-enter,.toast-animate-leave-to {
            opacity: 0;

    }
    .toast-animate-enter-to, .toast-animate-leave {
            opacity: 1;
    }
    .toast-animate-enter-active,
    .toast-animate-leave-active {
            transition: all .2s;
    }
</style>
<template>
    <transition name="toast-animate">
        <div class="toast_popWin" v-if="isShow">
            <div class="toast_popbox">
                <div class="loading-icon"></div>
                <div class="toast_tit">请求加载中...</div>
            </div>
        </div>
    </transition>
</template>
<script>
    export default {
        name: 'Loading',
        props: ['isShow']
    }
</script>

<style lang="scss" scoped>
    @import '../../public/assets/scss/mix.scss';

    .fade-enter-active,
    .fade-leave-active {
        transition: all .2s ease
    }

    .fade-enter, .fade-leave-active {
        opacity: 0
    }
</style>
<template>
    <transition name="fade" mode="out-in">
        <router-view class="view"></router-view>
    </transition>
</template>

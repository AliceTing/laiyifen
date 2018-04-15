import Vue from 'vue';
let Event = new Vue();

/**
 * 解决页面A ajax获取数据后，滑到页面底部，跳转到页面B，再返回页面A，页面A空白bug
 * 出处：https://github.com/vuejs/vue-router/pull/1804
 * 使用方法：
 * 页面A ajax数据后callback调用 Event.$emit('triggerScroll');
 */
Event.$on('triggerScroll', () => {
    document.querySelector('body').scrollTop = 0;
});

export default Event;

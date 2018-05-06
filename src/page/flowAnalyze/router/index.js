import Vue from 'vue';
import VueRouter from 'vue-router';
import {setTitle} from 'Public/util';

Vue.use(VueRouter);
// 流量分析
const flowAnalyze = r => require.ensure([], () => r(require('../flowAnalyze.vue')), 'flowAnalyze');

const router = new VueRouter({
    routes: [{
        path: '/',
        name: 'orderAnalyze',
        meta: {
            title: '流量分析'
        },
        component: flowAnalyze,
    }, {
        path: '*',
        redirect: '/'
    }],

    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {x: 0, y: 0}
        }
    }
});

router.beforeEach((to, from, next) => {
    setTitle(to.matched[to.matched.length - 1] && to.matched[to.matched.length - 1].meta.title || '');
    next();
});

export default router;



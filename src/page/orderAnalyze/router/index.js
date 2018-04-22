import Vue from 'vue';
import VueRouter from 'vue-router';
import {setTitle} from 'Public/util';

Vue.use(VueRouter);
// 订单分析
const orderAnalyze = r => require.ensure([], () => r(require('../orderAnalyze.vue')), 'orderAnalyze');

const router = new VueRouter({
    routes: [{
        path: '/',
        name: 'orderAnalyze',
        meta: {
            title: '订单分析'
        },
        component: orderAnalyze,
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



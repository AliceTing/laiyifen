import Vue from 'vue';

import * as filters from 'Public/filter'
import mixin from 'Public/util/mixin';
import store from './store';
import router from './router';
import App from './App.vue';
import 'Public/assets/scss/common.scss';
import Toast from '../../public/components/toast/';
import Loading from '../../public/components/loading/';

// 注册
Vue.$toast = Vue.prototype.$toast = Toast;
Vue.$loading = Vue.prototype.$loading = Loading;

import VueTouch from 'vue-touch';
import vuescroll from 'vue-scroll';
import VCharts from 'v-charts'
import echarts from "echarts"


Vue.mixin(mixin);
Vue.use(VueTouch,{name: 'v-touch'});
Vue.use(vuescroll);
Vue.use(VCharts);
new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#root');




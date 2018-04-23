import Vue from 'vue';
import mixin from 'Public/util/mixin';
import store from './store';
import router from './router';
import App from './App.vue';
import 'Public/assets/scss/common.scss';

import VueTouch from 'vue-touch';
import vuescroll from 'vue-scroll';
import VCharts from 'v-charts'


Vue.mixin(mixin);
Vue.use(VueTouch,{name: 'v-touch'});
Vue.use(vuescroll);
Vue.use(VCharts);
new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#root');




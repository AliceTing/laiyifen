import Vue from 'vue';
import mixin from 'Public/util/mixin';
import store from './store';
import router from './router';
import App from './App.vue';
import 'Public/assets/scss/common.scss';
import Toast from '../../public/components/toast/';
import Loading from '../../public/components/loading/';

Vue.$toast = Vue.prototype.$toast = Toast;
Vue.$loading = Vue.prototype.$loading = Loading;

import VueTouch from 'vue-touch';
import vuescroll from 'vue-scroll';


Vue.mixin(mixin);
Vue.use(VueTouch,{name: 'v-touch'});
Vue.use(vuescroll);
new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#root');




import Vue from 'vue';
import Vuex from 'vuex';

import orderAnalyze from './orderAnalyze';

Vue.use(Vuex);

const vueInstance = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {},
  actions: {},
  mutations: {},
  modules: {
      orderAnalyze
  }
});

export default vueInstance;


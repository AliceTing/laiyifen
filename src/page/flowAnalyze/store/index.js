import Vue from 'vue';
import Vuex from 'vuex';

import flowAnalyze from './flowAnalyze';

Vue.use(Vuex);

const vueInstance = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {},
  actions: {},
  mutations: {},
  modules: {
      flowAnalyze
  }
});

export default vueInstance;


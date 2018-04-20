import Vue from 'vue';
import Vuex from 'vuex';

//查询购物车
import realTimeModule from './realTimeModule';

Vue.use(Vuex);

const vueInstance = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {},
  actions: {},
  mutations: {},
  modules: {

  }
});

export default vueInstance;


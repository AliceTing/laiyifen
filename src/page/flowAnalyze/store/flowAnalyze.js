import {getValue} from 'Public/util';
import Vue from 'vue';
import apis from '../api';

export default {
    state: {
        flowDataArr: []
    },
    actions: {
        getData({commit, state}, data){
            Vue.$loading.show();
            apis[data.time](data.param).then(data => {
                Vue.$loading.close();
                if (data.code == 0) {
                    commit('setData', getValue(data, 'result'));
                }
            }).catch(err => {
                Vue.$toast.show({
                    toastText: '服务异常，请稍后重试'
                });
                setTimeout(function () {
                    Vue.$toast.close();
                }, 2000)
            });
        }
    },
    mutations: {
        ['setData'](state, data) {
            state.flowDataArr = data;
        }
    }
}
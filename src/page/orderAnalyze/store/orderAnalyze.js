import {getValue} from 'Public/util';
import apis from '../api';

export default {
    state: {
        orderDataArr: []
    },
    actions: {
        getData({commit, state}, data){
            apis[data.time](data.param).then(data => {
                if (data.code == 0) {
                    commit('setData', getValue(data, 'result'));
                }
            }).catch(err => {

            });
        }
    },
    mutations: {
        ['setData'](state, data) {
            state.orderDataArr = data;
        }
    }
}
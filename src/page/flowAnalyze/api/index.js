import axios from 'axios';

const apiHost = (process.env.NODE_ENV == 'development' ? ('http:' + '//tj.laiyifen.com/cloudraker/') : (location.protocol + '//tj.laiyifen.com/cloudraker/'));

const apiUrl = {
    year: {
        type: 'get',
        url: apiHost + 'visitorsAnalysis/queryByYear'
    },
    month:{
        type: 'get',
        url: apiHost + 'visitorsAnalysis/queryByMonth'
    },
    day:{
        type: 'get',
        url: apiHost + 'visitorsAnalysis/queryByDay'
    },
    week:{
        type: 'get',
        url: apiHost + 'visitorsAnalysis/queryByWeek'
    }
};

let apis = {};
let CancelToken = axios.CancelToken;
apis.isCancel = axios.isCancel; // 判断是否是取消
Object.keys(apiUrl).forEach((item) => {
    /**
     * 创建api请求function，返回promise对象
     */
    apis[item] = function apiFunc(data) {
        let obj = apiUrl[item];
        let promise;
        let dataTmp = data;
        promise = axios({
            method: obj.type,
            url: process.env.mock == 'true' ? obj.urlTest : obj.url,
            timeout: 20000,
            params: dataTmp,
            cancelToken: new CancelToken(function executor(c) {
                apis[item + 'Cancel'] = c;
            })
        }).then(response => {
            let data = response.data;
            return data;
        });
        return promise;
    }
});

export default apis;

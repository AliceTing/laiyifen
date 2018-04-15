/**
 * Created by yuting2 on 2017/11/2.
 * Description: 全局混合
 */

import {getValue, isEmpty, parseMoney, numMoney , parseIntMoney} from './index';

export default {
    methods: {
        getValue(obj, exp) {
            return getValue(obj, exp);
        },
        isEmpty(str) {
            return isEmpty(str);
        },
        parseMoney(num) {
            return parseMoney(num);
        },
        numMoney(num) {
            return numMoney(num);
        },
        parseIntMoney(num) {
            return parseIntMoney(num);
        }

    }
}

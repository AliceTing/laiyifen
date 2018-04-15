import Helper from './helper';


/**
 * 给body添加overflowY:hidden
 * @export
 * @param {boolean} 是否overflowY:hidden
 */
export function bodyOverflow(isOverflow) {
    let appDom = document.getElementById('app');
    let body = document.body;
    if (isOverflow) {
        addClass(document.documentElement, 'noscroll');
    } else {
        removeClass(document.documentElement, 'noscroll');
    }
}

export function addClass(el, className) {
    if (el.classList)
        el.classList.add(className);
    else
        el.className += ' ' + className;
}

export function removeClass(el, className) {
    if (el.classList)
        el.classList.remove(className);
    else
        el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
}

/**
 * 设置title
 * @param {string} title文字
 */
export function setTitle(title) {
    document.title = title;
    //解决document.title 在 ios 下不生效bug方案 ios内生效
    const mobile = navigator.userAgent.toLowerCase();
    // const length = document.querySelectorAll('iframe').length;
    if (/iphone|ipad|ipod/.test(mobile)) {
        const iframe = document.createElement('iframe');
        iframe.style.cssText = 'display: none; width: 0; height: 0;position:fixed;';
        //iframe.setAttribute('src', '//www.jd.com/favicon.ico');
        iframe.addEventListener('load', () => {
            setTimeout(() => {
                document.body.removeChild(iframe);
            }, 0);
        });
        document.body.appendChild(iframe);
    }
}

// 正则规则
export const regRule = {
    name: /^[\u4e00-\u9fa5]{1,100}$|^[A-Za-z]+\/[A-Za-z]+( [A-Za-z]+)?$|^[\u4e00-\u9fa5]+[a-zA-Z]+$/,
    email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
    mobile: /(^1[3|4|5|7|8]{1}[0-9]{1}\*{4}\d{4}$)|(^1[3|4|5|7|8]{1}[0-9]{9}$)/,
    PSP: /^[A-Za-z0-9]*$/, // 护照（http://www.voidcn.com/blog/sunkaikaisun/article/p-3766234.html）
    HKM: /^[A-Za-z0-9]*$/, // 港澳通行证
    MOC: /^[\u4e00-\u9fa5]{1}字第\d{6,7}$/,  //军官证、士兵证格式为:*字第+6/7位数字
    numAndLetter: /^[A-Za-z0-9]*$/, //数字和英文
};

/**
 * localStorage封装
 */
export const storage = {
    // 根据key获取localStorage
    getItem(key) {
        let item = '';
        try {
            item = window.localStorage.getItem(key) || '';
        } catch (e) {
            return '';
        }
        return item;
    },
    // 设置localStorage
    setItem(key, value) {
        try {
            if (typeof(items) == 'object') {
                window.localStorage.setItem(key, JSON.stringify(value));
            } else {
                window.localStorage.setItem(key, value);
            }
        } catch (e) {
            return false;
        }
    },
    // 根据key删除localStorage
    removeItem(key) {
        try {
            window.localStorage.removeItem(key);
        } catch (e) {
            return false;
        }
    },
    // 清空localStrage
    clear() {
        try {
            window.localStorage.clear();
        } catch (e) {
            return false;
        }
    },
    /**
     * 设置cookie
     * @param {any} name  cookie键
     * @param {any} value cookie值
     * @param {any} time  时间，单位天
     */
    setCookie(name, value, time) {
       var exp = new Date();
        exp.setTime(exp.getTime() + time * 24 * 60 * 60 * 1000);
        storage.setItems(name, value, exp , '/',  '.toplife.com')
    },
    /**
     * 获取cookie
     * @export
     * @param {string} cookie键
     * @returns
     */
    getCookie(name) {
        //读取COOKIE
        storage.getItems(name)
    },
    delCookie(name) {
        storage.removeItems(name, '/', '.toplife.com');
    },

    /*
     *  new add cookie
     */
    getItems(sKey) {
        return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
    },
    setItems(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
        if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
        var sExpires = "";
        if (vEnd) {
            switch (vEnd.constructor) {
                case Number:
                    sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
                    break;
                case String:
                    sExpires = "; expires=" + vEnd;
                    break;
                case Date:
                    sExpires = "; expires=" + vEnd.toUTCString();
                    break;
            }
        }
        document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
        return true;
    },
    removeItems(sKey, sPath, sDomain) {
        if (!sKey || !storage.hasItems(sKey)) { return false; }
        document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + ( sDomain ? "; domain=" + sDomain : "") + ( sPath ? "; path=" + sPath : "");
        return true;
    },
    hasItems(sKey) {
        return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
    },
    keys() {
        var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
        for (var nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
        return aKeys;
    }

}

/**
 * 将时间戳转换成日期格式
 * new Date().Format('Y-MM-dd hh:mm:ss') => "2017-11-30 10:53:02"
 * new Date().Format('Y-MM-dd') => "2017-11-30"
 */
Date.prototype.Format = function (fmt) {
    let o = {
        "Y+": this.getFullYear(), //年
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

export function getWeek(time) {
    let show_day = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    let timeFormat = new Date(time);
    let day = timeFormat.getDay();
    return show_day[day];
}

//判断是否为空
export function isEmpty(str) {
    if (type(str) === 'object') {
        if (str != null && Object.keys(str).length > 0) {
            return false;
        }
    } else if (type(str) !== 'array' && type(str) !== 'undefined' && type(str) !== 'error' && type(str) !== 'null') {
        str = '' + str;
        if (str.length > 0) {
            return false;
        }
    } else if (type(str) === 'array') {
        if (str.length > 0) {
            return false;
        }
    }
    return true;
}

export function type(o) {
    let TYPES = {
        'undefined': 'undefined',
        'number': 'number',
        'boolean': 'boolean',
        'string': 'string',
        '[object String]': 'string',
        '[object Number]': 'number',
        '[object Function]': 'function',
        '[object RegExp]': 'regexp',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object Error]': 'error'
    };
    let TOSTRING = Object.prototype.toString;
    return TYPES[typeof o] || TYPES[TOSTRING.call(o)] || (o ? 'object' : 'null');
}

/**
 *  getValue(list,'a.b');
 * @param obj 需要取值的对象
 * @param exp  取值表达式
 */
export function getValue(obj, exp) {
    if (isEmpty(obj)) {
        return undefined;
    }
    if (isEmpty(exp)) {
        return undefined;
    }
    if (type(exp) !== 'string') {
        return undefined;
    }
    let exps = exp.split('.');
    let passedObj = {};
    let len = exps.length;
    let passed = exps.every(function (t, num) {
        if (num === 0) {
            passedObj = obj[t];
            if (isEmpty(passedObj)) {
                return false;
            }
        } else if (num < len) {
            passedObj = passedObj[t];
            if (isEmpty(passedObj)) {
                return false;
            }
        }
        return true;
    });
    if (passed) {
        let returnObj = {};
        exps.forEach(function (t, num) {
            if (num === 0) {
                returnObj = obj[t];
            } else if (num < len) {
                returnObj = returnObj[t];
            }
        });
        return returnObj;
    } else {
        return undefined;
    }
}

export function createApi(routes) {
    // let API_DOMAIN = '//api.toplife.com';
    const pre = process.env.pre;
    const test = process.env.test;

    let API_DOMAIN = '//api.toplife.com';
    // if(pre || test){
    //     API_DOMAIN = '//api-beta.toplife.com';
    // }

    for (let key in routes) {
        routes[key] = API_DOMAIN + routes[key]
    }
    return routes;
}
export function createMstone(routes) {
    let API_DOMAIN = '//mstone-api.jd.com';

    for (let key in routes) {
        routes[key] = API_DOMAIN + routes[key]
    }
    return routes;
}

export function baseParam(obj) {
    return {
        uuid: Helper.getUUID(),
        areas: Helper.getAreaId().areaIds.join('-'),
        source: 3,
        clientType: 'm',
        cv: (obj && obj.cv) ? obj.cv : '2.6.0',
    };
}

/**
 * 将人民币(String/Num)转带有分隔符（,）的字符串（String）
 * parseMoney ('16400') => "16,400"
 */
export function parseMoney(num) {
    num = '' + num;
    num = num.toString().replace(/\$|,/g, '')
    if (isNaN(num)) num = '0'

    num = Math.floor(num * 100 + 0.50000000001)
    let cents = num % 100
    num = Math.floor(num / 100).toString()

    if (cents < 10) cents = '0' + cents
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
        num = num.substring(0, num.length - (4 * i + 3)) + ',' +
            num.substring(num.length - (4 * i + 3))
    }
    return (num + '.' + cents)
}

/**
 * 将带有分隔符（,）的字符串（String）人民币 转为Num（去掉 ','号）
 * parseMoney ('16,400') => "16400"
 */
export function numMoney(num) {
    num = '' + num;
    num = num.toString().replace(/\$|,/g, '');
    if (isEmpty(num)) {
        num = '0';
    }
    return parseFloat(num);
}

/**
 * 将带有分隔符（,）的字符串（String）人民币 过滤掉'.00'部分）
 * parseMoney ('16,400.00') => "16,400"
 */

export function parseIntMoney(num) {
    num = '' + num;
    let numIdx = num.toString().indexOf('.00');
    if (numIdx !== -1) {
        num = num.substr(0, numIdx)
    }
    return num;
}

/**
 * @获取url中参数属性
 * getUrlParam("skuId")
 */
export function getUrlParam(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    let r = window.location.search.substr(1).match(reg);
    if (r !== null) return unescape(r[2]);
    return null;
}

/**
 * @数组去重
 * @Param arr
 */
export function unique(arr) {
    arr.sort();
    let res = [arr[0]];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] !== res[res.length - 1]) {
            res.push(arr[i]);
        }
    }
    return res;
}


/**
 * 设置地址cookie
 * @param {Array} areaId  省市区镇id
 * @param {Array} areaName  省市区镇中文名
 */
export function setAreaCookie(areaId, areaName) {
    let areaStr = areaId.join('-').replace(/^-+|-+$/g, '');
    let areaNameStr = escape(JSON.stringify(areaName));
    // 省市区镇id@Param[String]  17－1381－50718－52129
    storage.setCookie('ipLoc-djd', areaStr, 30);
    // 省市区镇中文名@Param[String] "["湖北","武汉市","洪山区","城区"]"   escape
    storage.setCookie('ipLoc-djd-cName', areaNameStr, 30);

}
//当前协议
export const LOCAL_PROTOCOL = window.location.protocol;

//当前项目域名
export const LOCAL_DOMAIN = LOCAL_PROTOCOL + process.env.HOME_DOMAIN;

export const LOGIN_URL = '//plogin.m.jd.com/user/login.action?appid=333&tpl=toplife&returnurl=';

// 去登陆 ,returnurl不传就是当前默认链接
export function goLogin(returnurl) {
    let mixReturnUrl = LOCAL_DOMAIN + returnurl;
    window.location.href = LOGIN_URL + encodeURIComponent(mixReturnUrl || LOCAL_DOMAIN);
}

// 判断设备
export const device = function () {
    // 获取浏览器UA
    let ua = navigator.userAgent,
        // WindowsPhone
        isWindowsPhone = /(?:Windows Phone)/.test(ua),
        // Symbian
        isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
        // Android
        isAndroid = /(?:Android)/.test(ua),
        // FireFox
        isFireFox = /(?:Firefox)/.test(ua),
        // Tablet
        isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
        // Phone
        isPhone = /(?:iPhone)/.test(ua) && !isTablet,
        // Pc
        isPc = !isPhone && !isAndroid && !isSymbian,
        // iPhone X
        isIphoneX = window.devicePixelRatio && window.devicePixelRatio === 3 && window.screen.width === 375 && window.screen.height === 812,
        // 微信
        isWeixin = navigator.userAgent.indexOf('MicroMessenger') > -1,
        // UC
        isUC = navigator.userAgent.indexOf('UCBrowser') > -1,
        // QQ浏览器
        isQQB = navigator.userAgent.indexOf('MQQBrowser') > -1 || navigator.userAgent.indexOf('QBWebViewType') > -1,
        // Chrome https://github.com/serbanghita/Mobile-Detect/blob/master/Mobile_Detect.php
        isChrome = /\bCrMo\b|CriOS|Android.*Chrome\/[.0-9]* (Mobile)?/.test(navigator.userAgent),
        //toplife app or jd app
        isApp = ua.toLowerCase().indexOf('toplifeapp') > -1 || ua.toLowerCase().indexOf('jdapp') > -1,
        //京东金融 app
        isJR = ua.toLowerCase().indexOf('jdjr') > -1;
    return {
        isTablet: isTablet,
        isPhone: isPhone,
        isAndroid: isAndroid,
        isPc: isPc,
        isIphoneX: isIphoneX,
        isWeixin: isWeixin,
        isUC: isUC,
        isQQB: isQQB,
        isChrome: isChrome,
        isApp: isApp,
        isJR: isJR
    };
}()
// iPhone X底部兼容
export function fixIpxFixed() {
    let originalWindowHeight = window.innerHeight;
    let $fixIpxFixed = document.querySelector('.fix-ipx-fixed');

    // 如果是iPhone X
    if (device.isIphoneX && !!$fixIpxFixed) {
        // 如果在微信或者Chrome，始终增加底部
        if (device.isWeixin || device.isChrome) {
            $fixIpxFixed.classList.add('fix-ipx-fixed-current');
            // 如果在UC或者QQ浏览器，不做任何处理
        }else if(device.isUC || device.isQQB){
            return false;
        } else {
            window.addEventListener('scroll', function () {
                if (window.innerHeight > originalWindowHeight) {
                    $fixIpxFixed.classList.add('fix-ipx-fixed-current');
                } else {
                    $fixIpxFixed.classList.remove('fix-ipx-fixed-current');
                }
            }, false);
        }
    }
}

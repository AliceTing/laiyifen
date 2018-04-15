import Vue from 'vue';
import Helper from 'Public/util/helper';

/**
 *将jfs路径转化为完整的图片路径
 *调用方式： imgPath | getImgFullUrl(图片的域名为空则用默认,图片宽度，图片高度)
 */
Vue.filter('getImgFullUrl', function (imgUrl,domain, width, height) {
    if(imgUrl){
        return Helper.getImgFullUrl(domain, width, height, imgUrl);
    }else{
        return '';
    }
});

/**
 *将完整的图片路径随机打散到域名服务器
 *调用方式： imgPath | getImgUrl(图片宽度，图片高度)
 */
Vue.filter('getImgUrl', function (imgUrl, width, height) {
    if(imgUrl){
        return Helper.getImgUrl(imgUrl, {
            w:width,
            h:height
        });
    }else{
        return '';
    }
});

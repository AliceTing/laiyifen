<style lang="scss" scoped>
    @import "../../assets/scss/mix.scss";

    .placeholder-box {
        height: px2rem(100);
    }

    .tp-global-head {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 150;
        width: 100%;
        max-width: px2rem(750);
        margin: 0 auto;
        height: px2rem(100);
        background-color: #fff;
        color: #212121;
        font-size: px2rem(30);
        line-height: px2rem(100);
        .btn {
            position: absolute;
            top: 0;
            width: px2rem(100);
            height: px2rem(100);
            overflow: hidden;
            font-size: px2rem(28);
        }
        .btn-back {
            left: 0;
            img {
                position: absolute;
                top: 50%;
                left: px2rem(30);
                width: px2rem(24);
                height: px2rem(48);
                margin-top: px2rem(-24);
            }
        }
        .logo {
            width: px2rem(256);
            height: px2rem(100);
            margin: 0 auto;
            img {
                width: 100%;
                height: px2rem(30);
                vertical-align: middle;
            }
        }
        .title {
            max-width: px2rem(350);
            height: px2rem(100);
            overflow: hidden;
            margin: 0 auto;
            text-align: center;
        }
        .btn-handle {
            right: 0;
        }
        .btn-handle2 {
            right: px2rem(120);
        }
        .cart {
            right: 0;
            .number {
                position: absolute;
                top: px2rem(14);
                right: px2rem(20);
                z-index: 5;
                width: px2rem(34);
                height: px2rem(34);
                border-radius: 50%;
                background-color: #e80000;
                color: #fff;
                font-size: px2rem(22);
                line-height: px2rem(34);
                text-align: center;
                &.more {
                    font-size: px2rem(16);
                }
            }
            img {
                position: absolute;
                top: 50%;
                right: px2rem(30);
                width: px2rem(45);
                height: px2rem(44);
                margin-top: px2rem(-22);
            }
        }
    }
</style>

<template>
    <div class="placeholder-box" v-if="isH5" :class="className">
        <div class="tp-global-head">
            <div class="btn btn-back" v-if="goBack||beforeGoBack" @click="onGoBack" :clstag="goBackClstag">
                <img src="//static.360buyimg.com/tp-statics/images/ic_search_leftarrow.png" alt="">
            </div>
            <div class="logo" v-if="logo"><img src="//static.360buyimg.com/tp-statics/images/homeTop/logo.png" alt="">
            </div>
            <div class="title" v-if="title">{{title}}</div>
            <div class="btn cart" v-if="cart == 0 || cart" @click="onGoCart">
                <div class="number" :class="{more : parseInt(cart) >= 100}" v-if="cart>0">{{parseInt(cart) >= 100 ?
                    '99+' : cart}}
                </div>
                <img src="//static.360buyimg.com/tp-statics/images/homeTop/shoppingbag.png" alt=""></div>
            <div class="btn btn-handle2" v-if="isShowProduct" @click="showPoupons(true)" clstag="pageclick|keycount|TOPLIFE_201802071|27">优惠券</div>
            <div class="btn btn-handle" v-if="isShowProduct">
                <div class="btn-change" :clstag="isEdit ? 'pageclick|keycount|TOPLIFE_201802071|26' : 'pageclick|keycount|TOPLIFE_2017051715|36'" @click="showEditMod">{{isEdit
                    ?
                    '完成' : '编辑'}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {LOCAL_DOMAIN, device} from 'Public/util/index';

    export default {
        name: "globalHead",
        props: {
            // 重置样式
            className: {
                type: String
            },
            goBack: {
                type: Boolean
            },
            goBackClstag: {
                type: String
            },
            beforeGoBack:{
                type: Function
            },
            //logo
            logo: {
                type: Boolean
            },
            //标题
            title: {
                type: String
            },
            //是否显示右上角编辑按钮
            isEdit: {
                type: Boolean
            },
            //显示编辑模块
            showEditMod: {
                type: Function
            },
            //购物车是否有商品
            isShowProduct: {
                type: Boolean
            },
            //显示优惠券
            showPoupons: {
                type: Function
            },
            //购物车数量
            cart: {
                type: Number
            }
        },
        data() {
            return {
                isH5: true
            }
        },
        created() {
            let me = this;
            me.isH5 = !device.isApp;
        },
        methods: {
            onGoBack() {
                if(this.beforeGoBack){
                    this.beforeGoBack();
                }else{
                    history.go(-1);
                }
            },
            onGoCart() {
                window.location.href = LOCAL_DOMAIN + '/cart.html';
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../public/assets/scss/mix.scss';

    $mainColor: #ff6900;

    .container {
        background-color: #fff;
        .real_time {
            height: px2rem(88);
            padding: 0 px2rem(20);
            color: $mainColor;
            font-size: px2rem(30);
            line-height: px2rem(88);
        }
        .mod {
            .title {
                height: px2rem(84);
                padding-left: px2rem(40);
                background-color: #f8f8f8;
                color: #333;
                line-height: px2rem(84);
                font-size: px2rem(32);
                font-weight: bold;
            }
            .item {
                display: flex;
                flex-direction: column;
                justify-content: center;
                float: left;
                width: 50%;
                height: px2rem(180);
                padding-left: px2rem(40);
                .key {
                    color: $mainColor;
                    font-size: px2rem(28);
                }
                .value_box {
                    color: #333;
                    font-size: px2rem(20);
                    .value {
                        margin-right: px2rem(10);
                        font-size: px2rem(40);
                    }
                }
            }
            &.mod_order {
                .item {
                    &:first-child {
                        width: 100%;
                    }
                }
            }
        }
    }
</style>

<template>
    <div class="container">
        <div class="real_time">{{realTime}}</div>
        <div class="mod mod_order">
            <div class="title">订单</div>
            <div class="content clearfix">
                <div class="item">
                    <div class="key">支付金额</div>
                    <div class="value_box"><span class="value">{{orderArr.payAmount}}</span>元</div>
                </div>
                <div class="item">
                    <div class="key">支付订单数</div>
                    <div class="value_box"><span class="value">{{orderArr.payOrderNum}}</span>单</div>
                </div>
                <div class="item">
                    <div class="key">单均价</div>
                    <div class="value_box"><span class="value">{{orderArr.avgOrderAmount}}</span>元</div>
                </div>
            </div>
        </div>
        <div class="mod">
            <div class="title">流量</div>
            <div class="content clearfix">
                <div class="item">
                    <div class="key">访客数（UV）</div>
                    <div class="value_box"><span class="value">{{flowArr.uv}}</span>位</div>
                </div>
                <div class="item">
                    <div class="key">浏览量（PV）</div>
                    <div class="value_box"><span class="value">{{flowArr.pv}}</span>次</div>
                </div>
                <div class="item">
                    <div class="key">登录用户数</div>
                    <div class="value_box"><span class="value">{{flowArr.loginUserNum}}</span>位</div>
                </div>
                <div class="item">
                    <div class="key">下单用户数</div>
                    <div class="value_box"><span class="value">{{flowArr.orderUserNum}}</span>位</div>
                </div>
                <div class="item">
                    <div class="key">客单价</div>
                    <div class="value_box"><span class="value">{{flowArr.avgUserAmount}}</span>元</div>
                </div>
                <div class="item">
                    <div class="key">转换率</div>
                    <div class="value_box"><span class="value">{{flowArr.conversionPercent}}</span></div>
                </div>
            </div>
        </div>
        <div class="mod">
            <div class="title">物流</div>
            <div class="content clearfix">
                <div class="item">
                    <div class="key">DO单</div>
                    <div class="value_box"><span class="value">{{logisticsArr.doNum}}</span>件</div>
                </div>
                <div class="item">
                    <div class="key">发货量</div>
                    <div class="value_box"><span class="value">{{logisticsArr.deliveryNum}}</span>件</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';

    export default {
        data() {
            return {
                realTime: '',
                //订单
                orderArr: {
                    payAmount: 0,
                    payOrderNum:0,
                    avgOrderAmount: 0
                },
                //流量
                flowArr:{
                    uv: 0,
                    pv:0,
                    loginUserNum: 0,
                    orderUserNum:0 ,
                    avgUserAmount: 0,
                    conversionPercent: '0'
                },
                //物流
                logisticsArr: {
                    doNum: 0,
                    deliveryNum: 0
                },
                stompClient: null
            }
        },
        created() {
            let me = this;
            //实时时钟显示
            me.getRealTime();
            me.initRealTime();
            me.send();
        },
        methods: {
            //实时时钟显示
            getRealTime() {
                let me = this;
                let t = null;
                t = setTimeout(time, 1000);

                function time() {
                    clearTimeout(t);//清除定时器
                    let date = new Date();
                    let year = date.getFullYear();
                    let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
                    let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
                    let h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
                    let m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
                    let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
                    me.realTime = year + '年' + month + '月' + day + '日 ' + ' ' + h + ":" + m + ":" + s;
                    t = setTimeout(time, 1000);
                }
            },
            initRealTime() {
                let me = this;
                let socket = new SockJS('http://tj.laiyifen.com/cloudraker/tianpan-websocket');
                Vue.$loading.show();
                me.stompClient = Stomp.over(socket);
                me.stompClient.connect({"system": "TP", "page": "overall"}, function (frame) {
                    me.stompClient.subscribe('/user/topic/getRealTimeOverall', function (msg) {
                        if(msg){
                            Vue.$loading.close();
                            let data = JSON.parse(msg.body);
                            me.orderArr.payAmount = data.payAmount || 0;
                            me.orderArr.payOrderNum = data.payOrderNum || 0;
                            me.orderArr.avgOrderAmount = data.avgOrderAmount || 0;
                            me.flowArr.uv = data.uv || 0;
                            me.flowArr.pv = data.pv || 0;
                            me.flowArr.loginUserNum = data.loginUserNum || 0;
                            me.flowArr.orderUserNum = data.orderUserNum || 0;
                            me.flowArr.avgUserAmount = data.avgUserAmount || 0;
                            me.flowArr.conversionPercent = data.conversionPercent || 0;
                            me.logisticsArr.doNum = data.doNum || 0;
                            me.logisticsArr.deliveryNum = data.deliveryNum || 0;
                        }
                    });
                });
            },
            send() {
                let me = this;
                setTimeout(function () {
                    try {
                        me.stompClient.send("/app/initRealTimeOverall", {}, '');
                    }catch (e) {
                        Vue.$toast.show({
                            toastText: '网络开小差，稍后重试'
                        });
                        setTimeout(function () {
                            Vue.$toast.close();
                        }, 2000)
                    }
                },1000);
            }
        }
    }

</script>


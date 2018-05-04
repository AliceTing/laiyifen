<style lang="scss" scoped>
    @import '../../public/assets/scss/mix.scss';

    .container {
        background-color: #fff;
        .real_time {
            height: px2rem(88);
            padding: 0 px2rem(20);
            color: #993300;
            font-size: px2rem(30);
            line-height: px2rem(88);
        }
        .mod {
            .title {
                height: px2rem(84);
                padding-left: px2rem(40);
                background-color: #f8f8f8;
                color: #000;
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
                    color: #993300;
                    font-size: px2rem(28);
                }
                .value_box {
                    color: #000;
                    font-size: px2rem(20);
                    .value {
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
                <div class="item" v-for="(item,index) in orderArr" :key="index">
                    <div class="key">{{item.key}}</div>
                    <div class="value_box"><span class="value">{{item.value}}</span>元</div>
                </div>
            </div>
        </div>
        <div class="mod">
            <div class="title">流量</div>
            <div class="content clearfix">
                <div class="item" v-for="(item,index) in orderArr" :key="index">
                    <div class="key">{{item.key}}</div>
                    <div class="value_box"><span class="value">{{item.value}}</span>元</div>
                </div>
            </div>
        </div>
        <div class="mod">
            <div class="title">物流</div>
            <div class="content clearfix">
                <div class="item" v-for="(item,index) in orderArr" :key="index">
                    <div class="key">{{item.key}}</div>
                    <div class="value_box"><span class="value">{{item.value}}</span>元</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                realTime: '',
                //订单
                orderArr: [{
                    'key': '支付金额',
                    'value': '1200000000'
                }, {
                    'key': '支付订单数',
                    'value': '1200000000'
                }, {
                    'key': '单均价',
                    'value': '1200000000'
                }],
                //流量
                flowArr: [{
                    'key': '支付金额',
                    'value': '1200000000'
                }, {
                    'key': '支付订单数',
                    'value': '1200000000'
                }, {
                    'key': '单均价',
                    'value': '1200000000'
                }],
                //物流
                logisticsArr: [{
                    'key': '支付金额',
                    'value': '1200000000'
                }, {
                    'key': '支付订单数',
                    'value': '1200000000'
                }, {
                    'key': '单均价',
                    'value': '1200000000'
                }],
                stompClient: null,
                connected: false
            }
        },
        created() {
            let me = this;
            //实时时钟显示
            me.getRealTime();
            me.initRealTime();
            setTimeout(function () {
                me.send();
            },200)
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
                me.stompClient = Stomp.over(socket);
                me.stompClient.connect({"system": "TP", "page": "flow"}, function (frame) {
                    me.stompClient.subscribe('/topic/getRealTimeOverall', function (msg) {
                        console.log(11111,msg);
                    });
                    me.connected = true;
                });
            },
            send() {
                let me = this;
                let msg = '';
                me.stompClient.send("/app/initRealTimeData", {}, msg);
            }
        }
    }

</script>


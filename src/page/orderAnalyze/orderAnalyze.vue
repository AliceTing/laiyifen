<style lang="scss" scoped>
    @import '../../public/assets/scss/mix.scss';

    $mainColor: #ff6900;

    .container {
        background-color: #fff;
    }

    .tab_tit {
        display: flex;
        .tab_item {
            flex: 1;
            text-align: center;
        }
    }

    .order_type_tit {
        height: px2rem(88);
        border-top: solid 1px #ababab;
        border-bottom: solid 1px #ccc;
        color: #000;
        line-height: px2rem(88);
        @include font-dpr(15);
        .order_type_item {
            position: relative;
            &.current {
                color: $mainColor;
                &:after {
                    content: '';
                    position: absolute;
                    left: 0;
                    bottom: -1px;
                    width: 100%;
                    height: px2rem(4);
                    background-color: $mainColor;
                }
            }
        }
    }

    .time_type_tit {
        height: px2rem(58);
        margin: px2rem(15) px2rem(32);
        border: solid 1px $mainColor;
        border-radius: px2rem(8);
        background-color: #fff;
        color: $mainColor;
        line-height: px2rem(56);
        @include font-dpr(12);
        .time_type_item {
            border-left: solid 1px $mainColor;
            &:first-child {
                border-left: none;
            }
            &.current {
                background-color: $mainColor;
                color: #fff;
            }
        }
    }

    .switch_time {
        position: relative;
        height: px2rem(84);
        line-height: px2rem(84);
        text-align: center;
        @include font-dpr(17);
        .btn_switch {
            position: absolute;
            top: 0;
            z-index: 5;
            width: px2rem(90);
            height: 100%;
            &:before {
                content: '';
                position: absolute;
                top: 0;
                bottom: 0;
                width: px2rem(20);
                height: px2rem(20);
                border-top: solid px2rem(3) $mainColor;
                border-right: solid px2rem(3) $mainColor;
                margin: auto;
            }
            &.prev {
                left: 0;
                &:before {
                    left: px2rem(32);
                    transform: rotate(-135deg);
                }
            }
            &.next {
                right: 0;
                &:before {
                    right: px2rem(32);
                    transform: rotate(45deg);
                }
            }
            &.disabled {
                opacity: .3;
            }
        }
    }

    .tab_ditch_province {
        .tab_tit {
            margin: px2rem(15) px2rem(32) 0;
            border: solid 1px $mainColor;
            border-radius: px2rem(8);
            .tab_item {
                height: px2rem(58);
                border-left: solid 1px $mainColor;
                color: $mainColor;
                line-height: px2rem(56);
                @include font-dpr(10);
                &:first-child {
                    border-left: none;
                }
                &.current {
                    background-color: $mainColor;
                    color: #fff;
                }
            }
        }
        //渠道表格
        .table_ditch{
            width: 100%;
            height: px2rem(90);
            text-align: left;
            line-height: px2rem(90);
            @include font-dpr(15);
            thead{
                background-color: #fbfbfb;
                color: #000;
                th:nth-child(1){
                    padding-left: px2rem(32);
                }
            }
            tbody{
                color: #999;
                tr{
                    background-color: #fbfbfb;
                    &:nth-child(odd){
                       background-color: #fff;
                    }
                    td:nth-child(1){
                        padding-left: px2rem(32);
                    }
                    td:nth-child(2){
                        color: #e74c39;
                    }
                }

            }
        }
    }

</style>

<template>
    <div class="container">
        <v-touch @swipeleft="onSwipeLeft"
                 @swiperight="onSwipeRight">
            <div class="tab_box">
                <div class="tab_tit order_type_tit">
                    <div v-for="(typeItem,index) in orderTypeArr"
                         :key="index"
                         :class="{current : typeItem.current}"
                         class="tab_item order_type_item">{{typeItem.name}}
                    </div>
                </div>
                <div class="tab-con">
                    <!--年、月、日、周视图tab-->
                    <div class="tab_tit time_type_tit">
                        <div v-for="(timeItem,i) in timeTypeArr"
                             :key="i"
                             :class="{current : timeItem.current}"
                             class="tab_item time_type_item">{{timeItem.name}}
                        </div>
                    </div>
                    <!--箭头切换-->
                    <div class="switch_time">
                        <div class="btn_switch prev" v-show="prevShow" @click="switchTime(-1)"></div>
                        <div class="btn_switch next" v-show="nextShow" @click="switchTime(1)"></div>
                        <div class="current_time">{{display}}</div>
                    </div>
                    <!--年柱状图-->
                    <histogramItem></histogramItem>

                    <!--数据统计模块-->
                    <statisticsItem :total="thisYearTotal(orderDataArr)"></statisticsItem>

                    <!--省份、渠道-->
                    <div class="tab_box tab_ditch_province">
                        <div class="tab_tit">
                            <div v-for="(item,index) in ditchProvinceArr"
                                 :key="index"
                                 class="tab_item"
                                 :class="{current : item.current}" @click="onShowWay(index,item.way)">{{item.name}}
                            </div>
                        </div>
                        <div class="tab_con">
                            <!--渠道-->
                            <template v-if="showWay === 1">
                                <!--环形图-->
                                <ve-ring :data="yearPieData(orderDataArr).data"
                                         :settings="yearPieData(orderDataArr).settings"></ve-ring>
                                <!--表格-->
                                <table class="table_ditch">
                                    <thead>
                                    <tr>
                                        <th>渠道</th>
                                        <th>支付金额</th>
                                        <th>年同比</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="(item,index) in orderDataArr.channelStat" :key="index">
                                        <td>{{item.channel}}</td>
                                        <td>{{item.payAmount?item.payAmount:0}}</td>
                                        <td>{{item.ycPayAmountPercent?item.ycPayAmountPercent:0}}%</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </template>

                            <!--省份-->
                            <template v-if="showWay === 2">
                                <div>渠道</div>
                            </template>
                        </div>
                    </div>


                </div>
            </div>
        </v-touch>
    </div>
</template>

<script>
    import {mapState, mapActions, mapMutations} from 'vuex';

    import statisticsItem from './components/statisticsItem';
    import histogramItem from './components/histogramItem';

    export default {
        components: {
            statisticsItem,
            histogramItem
        },
        data() {
            return {
                //订单类型
                orderTypeArr: [{
                    name: '支付金额',
                    current: true,
                    type: 0
                }, {
                    name: '支付订单数',
                    current: false,
                    type: 1
                }, {
                    name: '单均价',
                    current: false,
                    type: 2
                }],
                //时间类型
                timeTypeArr: [{
                    name: '日',
                    time: 'day',
                    current: false
                }, {
                    name: '周',
                    time: 'week',
                    current: false
                }, {
                    name: '月',
                    time: 'month',
                    current: false
                }, {
                    name: '年',
                    time: 'year',
                    current: true
                }],
                //渠道省份
                ditchProvinceArr: [{
                    name: '渠道',
                    way: 'ditch',
                    current: true
                }, {
                    name: '省份',
                    way: 'province',
                    current: false
                }],
                //当前视图类型，文字
                name: '',
                //当前视图类型，年、月、日、周
                time: '',
                //订单类型
                type: '',
                //当前年
                year: '',
                //当前月
                month: '',
                //当前日
                day: '',
                //上一个切换箭头
                prevShow: true,
                //下一个切换箭头
                nextShow: false,
                //接口请求入参
                param: {},
                //页面展示类型
                display: '',
                showWay: 1
            }
        },
        created() {
            let me = this;
            //初始化入参
            me.timeTypeArr.map(function (el) {
                if (el.current) {
                    me.name = el.name;
                    me.time = el.time;
                    me.orderTypeArr.map(function (item) {
                        if (item.current) {
                            me.type = item.type;
                        }
                    })
                }
            });
            me.init();
            me.orderDisplay(me.name, me.time, me.type);
        },
        methods: {
            ...mapActions([
                'getData'
            ]),
            //初始化时间
            init() {
                let me = this;
                let date = new Date();
                let year = date.getFullYear();
                let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
                let day = date.getDate() + 1 < 10 ? '0' + date.getDate() : date.getDate();
                me.year = year;
                me.month = month;
                me.day = day;
            },
            //请求接口
            orderDisplay() {
                let me = this;
                me.param.day = me.year + '-' + me.month + '-' + me.day;
                me.param.type = me.type;
                switch (me.time) {
                    case 'year':
                        me.display = me.year + me.name;
                        break;
                    case 'month':
                        me.display = me.year + '年' + me.month + me.name;
                        break;
                    case 'day':
                        me.display = me.year + '年' + me.month + '月' + me.day + me.name;
                        break;
                    case 'week':
                        //TODO
                        me.display = me.day + me.name;
                        me.param.startTime = '';
                        me.param.endTime = '';
                        break;
                }
                me.getData({
                    param: me.param,
                    time: me.time
                });
            },
            //点击切换时间
            switchTime(e) {
                let me = this;
                let date = new Date();
                let year = date.getFullYear();
                let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
                let day = date.getDate() + 1 < 10 ? '0' + date.getDate() : date.getDate();

                switch (me.time) {
                    case 'year':
                        if (e > 0) {
                            //下一年
                            me.year++;

                            if (me.year == year) {
                                me.nextShow = false;
                            }
                            me.prevShow = true;
                        } else {
                            //上一年
                            me.year--;
                            me.display = me.year + me.name;
                            if (me.year == 1970) {
                                me.prevShow = false;
                            }
                            me.nextShow = true;
                        }
                        break;
                    case 'month':
                        break;
                    case 'day':
                        break;
                    case 'week':
                        break;
                }
                console.log('switch:', me.year);
                me.orderDisplay(me.name, me.time, me.type);
            },
            //滑动切换统计类型
            onSwipeLeft() {
                alert('left');
            },
            //滑动切换统计类型
            onSwipeRight() {
                alert('right');
            },
            //渲染年数据-柱状图
            yearHistogramData(orderData) {
                let me = this;
                let tmp = {};
                tmp = {
                    columns: ['x轴', '成本'],
                    rows: []
                };

                let thisYearDetail = orderData.thisYearDetail;
                console.log(thisYearDetail);
                if (thisYearDetail) {
                    for (let i = 0; i < thisYearDetail.length; i++) {
                        tmp.rows.push({
                            'x轴': i,
                            '成本': 3000
                        });
                    }
                }

                return tmp;
            },
            //今年数据统计模块
            thisYearTotal(orderData) {
                let me = this;
                let tmp = {};
                tmp.time = me.time;
                switch (me.time) {
                    case 'year':
                        tmp.thisAmount = orderData.thisYearTotalPayAmount;
                        tmp.lastAmount = orderData.lastYearTotalPayAmount;
                        tmp.percent = orderData.yearAmountPercent;
                        break;
                }
                return tmp;
            },
            //切换省份、渠道
            onShowWay(index) {
                let me = this;
                me.ditchProvinceArr.map(function (el) {
                    el.current = false;
                });
                me.ditchProvinceArr[index].current = true;
                me.showWay = index + 1;
            },
            //渲染年数据-省份、渠道
            yearPieData(orderData) {
                let me = this;
                let tmp = {
                    data: {
                        columns: ['channel', 'percent'],
                        rows: []
                    },
                    settings: {
                        dimension: 'channel',
                        metrics: 'percent',
                        dataType: 'percent',
                        digit: 1,
                        selectedMode: 'single',
                        hoverAnimation: false,
                        radius: [104, 50],
                        offsetY: 150,
                        label: {
                            position: 'inside',
                            formatter: ''
                        },
                        labelLine: {
                            show: false
                        }
                    }
                };

                let channelStat = orderData.channelStat;
                if (channelStat) {
                    //总数
                    let amount = 0;
                    channelStat.map(function (el) {
                        amount += el.payAmount;
                    });

                    channelStat.map(function (el) {
                        tmp.data.rows.push({
                            'channel': el.channel,
                            'percent': ((el.payAmount / amount).toFixed(5) * 100).toFixed(1)
                        });

                        tmp.settings.label.formatter = '{@channel}' + '%';
                    });
                }
                return tmp;
            }
        },
        computed: {
            ...mapState({
                orderDataArr: state => state.orderAnalyze.orderDataArr,
            })
        },
    }
</script>


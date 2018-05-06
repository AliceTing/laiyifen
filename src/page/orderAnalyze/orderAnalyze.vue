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
        .tab_con {
            margin-top: px2rem(30);
            .ring_type{
                margin-bottom: px2rem(20);
                color: #000;
                font-size: px2rem(30);
                text-align: center;
            }
        }
        //渠道表格
        .table_ditch {
            width: 100%;
            height: px2rem(90);
            text-align: left;
            line-height: px2rem(90);
            @include font-dpr(15);
            thead {
                background-color: #fbfbfb;
                color: #000;
                th:nth-child(1) {
                    padding-left: px2rem(32);
                }
            }
            tbody {
                color: #999;
                tr {
                    background-color: #fbfbfb;
                    &:nth-child(odd) {
                        background-color: #fff;
                    }
                    td:nth-child(1) {
                        padding-left: px2rem(32);
                    }
                    td:nth-child(2) {
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
                         @click="onChangeParam(index,'type')"
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
                             class="tab_item time_type_item"
                             @click="onChangeParam(i,'time')">{{timeItem.name}}
                        </div>
                    </div>
                    <!--箭头切换-->
                    <div class="switch_time">
                        <div class="btn_switch prev" v-show="prevShow" @click="switchTime(-1)"></div>
                        <div class="btn_switch next" v-show="nextShow" @click="switchTime(1)"></div>
                        <div class="current_time">{{display}}</div>
                    </div>

                    <!--柱状图：年视图、周视图-->
                    <histogramItem :total="orderDataArr" :time="time" :type="type" :year="year" :month="month"
                                   :day="day" :mondayTime="mondayTime" :sundayTime="sundayTime"></histogramItem>

                    <!--折线图：月视图、日视图>-->
                    <lineItem :total="orderDataArr" :time="time" :type="type" :year="year" :month="month" :day="day"
                              :mondayTime="mondayTime"></lineItem>

                    <!--数据统计模块-->
                    <statisticsItem :total="orderDataArr" :time="time" :type="type" :day="day"></statisticsItem>

                    <!--省份、渠道-->
                    <div class="tab_box tab_ditch_province"
                         v-show="!isEmpty(orderDataArr.channelStat)&&!isEmpty(orderDataArr.provinceStat)">
                        <div class="tab_tit">
                            <div v-for="(item,index) in ditchProvinceArr"
                                 :key="index"
                                 class="tab_item"
                                 :class="{current : item.current}"
                                 @click="onShowWay(index)">{{item.name}}
                            </div>
                        </div>
                        <div class="tab_con">
                            <!--渠道-->
                            <template v-if="showWay === 1">
                                <!--环形图-->
                                <div class="ring_type">{{orderTypeArr[type].name}}</div>
                                <ve-ring :data="yearPieData(orderDataArr).data"
                                         :settings="yearPieData(orderDataArr).settings"></ve-ring>
                                <!--表格-->
                                <table class="table_ditch">
                                    <thead>
                                    <tr>
                                        <th>渠道</th>
                                        <th v-show="type === 0">支付金额</th>
                                        <th v-show="type === 1">支付订单数</th>
                                        <th v-show="type === 2">单均价</th>
                                        <!--<th>日环比</th>-->
                                        <!--<th>周同比</th>-->
                                        <th v-show="time === 'week'">周环比</th>
                                        <th v-show="time === 'week'">年同比</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="(item,index) in orderDataArr.channelStat" :key="index">
                                        <td>{{item.channel}}</td>
                                        <!--支付金额-->
                                        <template v-if="type === 0">
                                            <td>{{item.payAmount?item.payAmount:0}}</td>
                                            <!--<td>{{item.dcPayAmountPercent?item.dcPayAmountPercent:0}}</td>-->
                                            <!--<td>{{item.wcPayAmountPercent?item.wcPayAmountPercent:0}}</td>-->
                                            <!--<td>{{item.ycPayAmountPercent?item.ycPayAmountPercent:0}}</td>-->
                                            <td v-show="time === 'week'">
                                                {{item.weekPayAmountPercent?item.weekPayAmountPercent:0}}
                                            </td>
                                            <td v-show="time === 'week'">
                                                {{item.yearPayAmountPercent?item.yearPayAmountPercent:0}}
                                            </td>
                                        </template>
                                        <!--支付订单数-->
                                        <template v-if="type === 1">
                                            <td>{{item.payOrderNum?item.payOrderNum:0}}</td>
                                            <!--<td>{{item.dcPayOrderNumPercent?item.dcPayOrderNumPercent:0}}</td>-->
                                            <!--<td>{{item.wcPayOrderNumPercent?item.wcPayOrderNumPercent:0}}</td>-->
                                            <!--<td>{{item.ycPayOrderNumPercent?item.ycPayOrderNumPercent:0}}</td>-->
                                            <td v-show="time === 'week'">
                                                {{item.weekPayOrderNumPercent?item.weekPayOrderNumPercent:0}}
                                            </td>
                                            <td v-show="time === 'week'">
                                                {{item.yearPayOrderNumPercent?item.yearPayOrderNumPercent:0}}
                                            </td>
                                        </template>
                                        <!--单均价-->
                                        <template v-if="type === 2">
                                            <td>{{item.avgAmount?item.avgAmount:0}}</td>
                                            <!--<td>{{item.dcAvgAmountPercent?item.dcAvgAmountPercent:0}}</td>-->
                                            <!--<td>{{item.wcAvgAmountPercent?item.wcAvgAmountPercent:0}}</td>-->
                                            <!--<td>{{item.ycAvgAmountPercent?item.ycAvgAmountPercent:0}}</td>-->
                                            <td v-show="time === 'week'">
                                                {{item.weekAvgAmountPercent?item.weekAvgAmountPercent:0}}
                                            </td>
                                            <td v-show="time === 'week'">
                                                {{item.yearAvgAmountPercent?item.yearAvgAmountPercent:0}}
                                            </td>
                                        </template>
                                    </tr>
                                    </tbody>
                                </table>
                            </template>

                            <!--省份-->
                            <template v-if="showWay === 2">
                                <!--条形图-->
                                <ve-bar :data="yearBarData(orderDataArr).data"
                                        :settings="yearBarData(orderDataArr).settings"></ve-bar>
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
    import lineItem from './components/lineItem';

    export default {
        components: {
            statisticsItem,
            histogramItem,
            lineItem
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
                    current: true
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
                    current: false
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
                //展示年
                year: '',
                //当前年
                curYear: '',
                //展示月
                month: '',
                //当前月
                curMonth: '',
                //展示年
                day: '',
                //当前日
                curDay: '',
                //展示周一
                mondayTime: '',
                //展示周日
                sundayTime: '',
                //当前周一
                curMondayTime: '',
                //当前周日
                curSundayTime: '',
                originStartTime: '',
                originEndTime: '',
                //上一个切换箭头
                prevShow: true,
                //下一个切换箭头
                nextShow: false,
                //接口请求入参
                param: {},
                //页面展示类型
                display: '',
                //年视图渠道或者省份切换
                showWay: 1,
                stompClient: null
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
            me.orderDisplay();
        },
        methods: {
            ...mapActions([
                'getData'
            ]),
            //初始化当天实时数据
            initRealTime() {
                let me = this;
                let socket = new SockJS('http://tj.laiyifen.com/cloudraker/tianpan-websocket');
                me.stompClient = Stomp.over(socket);
                me.stompClient.connect({"system": "TP", "page": "order"}, function (frame) {
                    me.stompClient.subscribe('/user/topic/getRealTimeOrderPayMoney', function (msg) {
                        console.log(11111, msg);
                    });
                });
            },
            //初始化
            init() {
                let me = this;
                let date = new Date();
                let year = date.getFullYear();
                let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
                let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
                //星期
                let nowTime = date.getTime();
                let weekDay = date.getDay();
                let oneDayLong = 24 * 60 * 60 * 1000;
                let mondayTime = nowTime - (weekDay - 1) * oneDayLong;
                let sundayTime = nowTime + (7 - weekDay) * oneDayLong;
                let originStartTime = Date.parse(new Date(1970, 1, 1));
                //1970年1月1号为周四，结束日期 = 开始日期 + 4
                let originEndTime = originStartTime + oneDayLong * 4;
                me.year = year;
                me.month = month;
                me.day = day;
                me.mondayTime = mondayTime;
                me.sundayTime = sundayTime;
                me.originStartTime = originStartTime;
                me.originEndTime = originEndTime;
                //当前年月日周
                me.curYear = year;
                me.curMonth = month;
                me.curDay = day;
                me.curMondayTime = mondayTime;
                me.curSundayTime = sundayTime;
                //左右切换箭头初始化
                switch (me.time) {
                    case 'year':
                        if (me.year == 1970) {
                            me.prevShow = false;
                            me.nextShow = true;
                        } else if (me.year == year) {
                            me.prevShow = true;
                            me.nextShow = false;
                        }
                        break;
                    case 'month':
                        if (me.month == 1) {
                            me.prevShow = false;
                            me.nextShow = true;
                        } else if (me.month == month) {
                            me.prevShow = true;
                            me.nextShow = false;
                        }
                        break;
                    case  'week':
                        if (me.mondayTime <= me.originStartTime) {
                            me.prevShow = false;
                            me.nextShow = true;
                        } else if (me.sundayTime >= me.curSundayTime) {
                            me.prevShow = true;
                            me.nextShow = false;
                        }
                        break;
                    case 'day':
                        if (me.day == 1) {
                            me.prevShow = false;
                            me.nextShow = true;
                        } else if (me.day == day) {
                            me.prevShow = true;
                            me.nextShow = false;
                        }
                        break;
                }
            },
            //请求接口
            orderDisplay() {
                let me = this;
                me.param.day = me.year + '-' + me.month + '-' + me.day;
                me.param.type = me.type;
                switch (me.time) {
                    case 'year':
                        delete me.param.startTime;
                        delete me.param.endTime;
                        me.display = me.year + '年';
                        break;
                    case 'month':
                        delete me.param.startTime;
                        delete me.param.endTime;
                        me.display = me.year + '年' + me.month + '月';
                        break;
                    case 'day':
                        delete me.param.startTime;
                        delete me.param.endTime;
                        if (me.year === me.curYear && me.month === me.curMonth && me.day === me.curDay) {
                            me.display = '今天';
                            me.initRealTime();
                            //fixme 昨天
                        } else if (me.year === me.curYear && me.month === me.curMonth && me.day === (me.curDay - 1)) {
                            me.display = '昨天';
                        } else {
                            me.display = me.year + '年' + me.month + '月' + me.day + me.name;
                        }
                        break;
                    case 'week':
                        delete me.param.day;
                        let monday = new Date(me.mondayTime);
                        let sunday = new Date(me.sundayTime);
                        me.display = monday.Format('Y年MM月dd日') + '至' + sunday.Format('MM月dd日');
                        me.param.startTime = monday.Format('Y-MM-dd');
                        me.param.endTime = sunday.Format('Y-MM-dd');
                        break;
                }
                me.getData({
                    param: me.param,
                    time: me.time
                });
            },
            //滑动（左滑）切换统计类型
            onSwipeLeft() {
                let me = this;
                if (me.type === (me.orderTypeArr.length - 1)) {
                    me.type = 0
                } else {
                    me.type++;
                }
                me.orderTypeArr.map((el) => {
                    el.current = false;
                });
                me.orderTypeArr[me.type].current = true;
                me.orderDisplay();
            },
            //滑动（右滑）切换统计类型
            onSwipeRight() {
                let me = this;
                if (me.type === 0) {
                    me.type = me.orderTypeArr.length - 1
                } else {
                    me.type--;
                }
                me.orderTypeArr.map((el) => {
                    el.current = false;
                });
                me.orderTypeArr[me.type].current = true;
                me.orderDisplay();
            },
            //切换入参
            onChangeParam(index, paramType) {
                let me = this;
                let tmpArr;
                switch (paramType) {
                    case 'type':
                        tmpArr = me.orderTypeArr;
                        break;
                    case 'time':
                        tmpArr = me.timeTypeArr;
                        break;
                }
                tmpArr.map((el) => {
                    el.current = false;
                });
                tmpArr[index].current = true;
                me[paramType] = tmpArr[index][paramType];
                if (paramType === 'time') {
                    me.init();
                }
                me.orderDisplay();
            },
            //左右箭头点击切换时间
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
                        if (e > 0) {
                            //下一月
                            me.month++;
                            if (me.month == month) {
                                me.nextShow = false;
                            }
                            me.prevShow = true;
                        } else {
                            //上一月
                            me.month--;
                            me.display = me.year + me.name;
                            if (me.month == 1) {
                                me.prevShow = false;
                            }
                            me.nextShow = true;
                        }
                        me.month = me.month < 10 ? '0' + me.month : me.month;
                        break;
                    case 'day':
                        if (e > 0) {
                            //明天
                            me.day++;
                            if (me.day == day && me.month == month && me.year == year) {
                                me.nextShow = false;
                            }
                            me.prevShow = true;
                        } else {
                            //昨天
                            me.day--;
                            me.display = me.year + me.name;
                            if (me.day == 1) {
                                me.prevShow = false;
                            }
                            me.nextShow = true;
                        }
                        me.day = me.day < 10 ? '0' + me.day : me.day;
                        break;
                    case 'week':
                        let oneDayLong = 24 * 60 * 60 * 1000;
                        if (e > 0) {
                            //下周
                            me.mondayTime = me.mondayTime + oneDayLong * 7;
                            me.sundayTime = me.sundayTime + oneDayLong * 7;
                            if (me.sundayTime >= me.curSundayTime) {
                                me.nextShow = false;
                            }
                            me.prevShow = true;
                        } else {
                            //上周
                            me.mondayTime = (me.mondayTime - oneDayLong * 7);
                            me.sundayTime = (me.sundayTime - oneDayLong * 7);
                            if (me.mondayTime <= me.originStartTime) {
                                me.prevShow = false;
                            }
                            me.nextShow = true;
                        }
                        break;
                }
                me.orderDisplay();
            },
            //切换省份、渠道
            onShowWay(index) {
                let me = this;
                me.ditchProvinceArr.map((el) => {
                    el.current = false;
                });
                me.ditchProvinceArr[index].current = true;
                me.showWay = index + 1;
            },
            //渲染年数据-渠道
            yearPieData(orderData) {
                let me = this;
                let dataType;
                switch (me.type) {
                    case 0:
                        dataType = 'payAmount';
                        break;
                    case 1:
                        dataType = 'payOrderNum';
                        break;
                    case 2:
                        dataType = 'avgAmount';
                        break;
                }
                let tmp = {
                    data: {
                        columns: ['channel', 'percent'],
                        rows: []
                    },
                    settings: {
                        dataType: 'percent',
                        selectedMode: 'single',
                        hoverAnimation: false,
                        radius: [104, 50],
                        label: {
                            position: 'inside',
                            formatter: ''
                        }
                    }
                };
                let channelStat = orderData.channelStat;
                if (channelStat) {
                    //总数
                    let amount = 0;
                    channelStat.map((el) => {
                        amount += el[dataType];
                    });
                    channelStat.map((el) => {
                        tmp.data.rows.push({
                            'channel': el.channel,
                            'percent': ((el[dataType] / amount).toFixed(5) * 100).toFixed(1)
                        });

                        tmp.settings.label.formatter = '{@channel}' + '%';
                    });
                }
                return tmp;
            },
            //渲染年数据-省份
            yearBarData(orderData) {
                let me = this;
                let dataType;
                let dataTypeText;
                switch (me.type) {
                    case 0:
                        dataType = 'payAmount';
                        dataTypeText = '支付金额';
                        break;
                    case 1:
                        dataType = 'payOrderNum';
                        dataTypeText = '支付订单数';
                        break;
                    case 2:
                        dataType = 'avgAmount';
                        dataTypeText = '单均价';
                        break;
                }
                let tmp = {
                    data: {
                        columns: ['xAxis', dataTypeText],
                        rows: []
                    },
                    settings: {
                        label: {
                            show: true,
                            position: 'right',
                        },
                        itemStyle: {
                            color: '#ff6900'
                        }
                    }
                };
                let provinceStat = orderData.provinceStat;
                if (provinceStat) {
                    provinceStat.map((el) => {
                        tmp.data.rows.push({
                            'xAxis': el.province,
                            [dataTypeText]:  Math.round(el[dataType])
                        });
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


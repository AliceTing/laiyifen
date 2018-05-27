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
        font-size: px2rem(30);
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
        font-size: px2rem(24);
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
        font-size: px2rem(34);
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
                line-height: px2rem(58);
                font-size: px2rem(28);
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
            padding-bottom: px2rem(40);
            .ring_type {
                margin-bottom: px2rem(20);
                color: #000;
                font-size: px2rem(28);
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
                    td{
                        &.red{
                            color: red;
                        }
                        &.green{
                            color: green;
                        }
                    }
                }

            }
        }
    }

</style>

<template>
    <div class="container">

        <!--<v-touch @swipeleft="onSwipeLeft"-->
        <!--@swiperight="onSwipeRight">-->
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
                    <histogramItem :total="orderDataArr" :time="time" :type="type" :oneDayLong="oneDayLong"
                                   :timeStamp="timeStamp" :mondayTime="mondayTime" :sundayTime="sundayTime"
                                   :year="year"></histogramItem>

                    <!--折线图：月视图、日视图>-->
                    <lineItem :total="orderDataArr" :time="time" :type="type" :mondayTime="mondayTime"
                              :oneDayLong="oneDayLong" :month="month" :timeStamp="timeStamp"
                              :curTimeStamp="curTimeStamp"></lineItem>

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
                                         :settings="yearPieData(orderDataArr).settings"
                                         :tooltip="yearPieData(orderDataArr).tooltip"></ve-ring>
                                <!--表格-->
                                <table class="table_ditch">
                                    <thead>
                                    <tr>
                                        <th>渠道</th>
                                        <th>{{orderTypeArr[type].name}}</th>
                                        <th v-show="time === 'day'">日环比</th>
                                        <th v-show="time === 'day'">周同比</th>
                                        <th v-show="time === 'week'">周环比</th>
                                        <th v-show="time === 'month'">月环比</th>
                                        <th>年同比</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="(item,index) in orderDataArr.channelStat" :key="index">
                                        <td>{{item.channel}}</td>
                                        <!--支付金额-->
                                        <template v-if="type === 0">
                                            <td>{{item.payAmount?item.payAmount:0}}</td>
                                            <td :class="getStyle(item.dcPayAmountPercent)" v-show="time === 'day'">{{item.dcPayAmountPercent?item.dcPayAmountPercent:0}}</td>
                                            <td :class="getStyle(item.wcPayAmountPercent)" v-show="time === 'day'">{{item.wcPayAmountPercent?item.wcPayAmountPercent:0}}</td>
                                            <td :class="getStyle(item.weekPayAmountPercent)" v-show="time === 'week'">{{item.weekPayAmountPercent?item.weekPayAmountPercent:0}}</td>
                                            <td :class="getStyle(item.mcPayAmountPercent)" v-show="time === 'month'">{{item.mcPayAmountPercent?item.mcPayAmountPercent:0}}</td>
                                            <td :class="getStyle(item.yearPayAmountPercent)">{{item.yearPayAmountPercent?item.yearPayAmountPercent:0}}</td>
                                        </template>
                                        <!--支付订单数-->
                                        <template v-if="type === 1">
                                            <td>{{item.payOrderNum?item.payOrderNum:0}}</td>
                                            <td :class="getStyle(item.dcPayOrderNumPercent)" v-show="time === 'day'">{{item.dcPayOrderNumPercent?item.dcPayOrderNumPercent:0}}</td>
                                            <td :class="getStyle(item.wcPayOrderNumPercent)" v-show="time === 'day'">{{item.wcPayOrderNumPercent?item.wcPayOrderNumPercent:0}}</td>
                                            <td :class="getStyle(item.weekPayOrderNumPercent)" v-show="time === 'week'">{{item.weekPayOrderNumPercent?item.weekPayOrderNumPercent:0}}</td>
                                            <td :class="getStyle(item.mcPayOrderNumPercent)" v-show="time === 'month'">{{item.mcPayOrderNumPercent?item.mcPayOrderNumPercent:0}}</td>
                                            <td :class="getStyle(item.yearPayOrderNumPercent)">{{item.yearPayOrderNumPercent?item.yearPayOrderNumPercent:0}}</td>
                                        </template>
                                        <!--单均价-->
                                        <template v-if="type === 2">
                                            <td>{{item.avgAmount?item.avgAmount:0}}</td>
                                            <td :class="getStyle(item.dcAvgAmountPercent)" v-show="time === 'day'">{{item.dcAvgAmountPercent?item.dcAvgAmountPercent:0}}</td>
                                            <td :class="getStyle(item.wcAvgAmountPercent)" v-show="time === 'day'">{{item.wcAvgAmountPercent?item.wcAvgAmountPercent:0}}</td>
                                            <td :class="getStyle(item.weekAvgAmountPercent)" v-show="time === 'week'">{{item.weekAvgAmountPercent?item.weekAvgAmountPercent:0}}</td>
                                            <td :class="getStyle(item.mcAvgAmountPercent)" v-show="time === 'month'">{{item.mcAvgAmountPercent?item.mcAvgAmountPercent:0}}</td>
                                            <td :class="getStyle(item.yearAvgAmountPercent)">{{item.yearAvgAmountPercent?item.yearAvgAmountPercent:0}}</td>
                                        </template>
                                    </tr>
                                    </tbody>
                                </table>
                            </template>

                            <!--省份-->
                            <template v-if="showWay === 2">
                                <!--条形图-->
                                <ve-bar height="800px" :data="yearBarData(orderDataArr).data"
                                        :settings="yearBarData(orderDataArr).settings"
                                        :grid="yearBarData(orderDataArr).grid"
                                        :xAxis="yearBarData(orderDataArr).xAxis"></ve-bar>
                            </template>
                        </div>
                    </div>
                </div>
            <!--</v-touch>-->
        </div>
    </div>
</template>

<script>
    import {mapState, mapActions, mapMutations} from 'vuex';
    import Vue from 'vue';
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
                timeStamp: 0,
                curTimeStamp: 0,
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
                stompClient: null,
                oneDayLong: 0,
                orderDataArr: [],
                connected: true,
                subscribeUrlMap: [
                '/user/topic/getRealTimeOrderPayMoney',
                '/user/topic/getRealTimeOrderPayNum',
                '/user/topic/getRealTimeOrderAvgMoney'
            ]
            }
        },
        created() {
            let me = this;
            me.oneDayLong = 24 * 60 * 60 * 1000;

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
                    let url;
                    switch (me.type) {
                        case 0:
                            url = '/user/topic/getRealTimeOrderPayMoney';
                            break;
                        case 1:
                            url = '/user/topic/getRealTimeOrderPayNum';
                            break;
                        case 2:
                            url = '/user/topic/getRealTimeOrderAvgMoney';
                            break;
                    }
                    me.stompClient.subscribe(url, function (msg) {
                        if (me.connected && me.subscribeUrlMap[me.type] === url) {
                            me.orderDataArr = JSON.parse(msg.body);
                        }
                    });
                });
            },
            //断开实时链接
            disconnectRealTime(){
                let me = this;
                me.connected = false;
            },
            openRealTime(){
                let me = this;
                me.connected = true;
            },
            //初始化
            init() {
                let me = this;
                let date = new Date();
                let year = date.getFullYear();
                let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
                let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
                let nowTime = date.getTime();
                let weekDay = date.getDay();
                let mondayTime = nowTime - (weekDay - 1) * me.oneDayLong - 7 * me.oneDayLong;
                let sundayTime = nowTime + (7 - weekDay) * me.oneDayLong - 7 * me.oneDayLong;
                console.log(weekDay,'weekDay',new Date(sundayTime));
                me.year = year;
                me.month = month;
                me.day = day;
                me.mondayTime = mondayTime;
                me.sundayTime = sundayTime;
                //当前年月日周
                me.curTimeStamp = nowTime;
                me.timeStamp = nowTime;
                me.curYear = year;
                me.curMonth = month;
                me.curDay = day;
                me.curMondayTime = mondayTime;
                me.curSundayTime = sundayTime;

                //左右切换箭头初始化
                me.prevShow = true;
                me.nextShow = false;
            },
            //请求接口
            orderDisplay() {
                let me = this;
                me.param.type = me.type;
                me.param.day = new Date(me.timeStamp).Format('Y-MM-dd');
                delete me.param.startTime;
                delete me.param.endTime;
                switch (me.time) {
                    case 'year':
                        me.disconnectRealTime();
                        me.display = new Date(me.timeStamp).Format('Y年');
                        break;
                    case 'month':
                        me.disconnectRealTime();
                        me.display = new Date(me.timeStamp).Format('Y年MM月');
                        break;
                    case 'week':
                        me.disconnectRealTime();
                        delete me.param.day;
                        me.param.startTime = new Date(me.mondayTime).Format('Y-MM-dd');
                        me.param.endTime = new Date(me.sundayTime).Format('Y-MM-dd');
                        if (new Date(me.mondayTime).Format('Y') === new Date(me.sundayTime).Format('Y')) {
                            me.display = new Date(me.mondayTime).Format('MM月dd日') + '至' + new Date(me.sundayTime).Format('MM月dd日');
                        } else {
                            me.display = new Date(me.mondayTime).Format('Y年MM月dd日') + '至' + new Date(me.sundayTime).Format('Y年MM月dd日');
                        }
                        break;
                    case 'day':
                        if (me.timeStamp === me.curTimeStamp) {
                            me.display = '今天';
                            me.openRealTime();
                            me.initRealTime();
                        } else if (me.timeStamp + me.oneDayLong === me.curTimeStamp) {
                            me.display = '昨天';
                            me.disconnectRealTime();
                        } else {
                            me.display = new Date(me.timeStamp).Format('Y年MM月dd日');
                            me.disconnectRealTime();
                        }
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
                switch (me.time) {
                    case 'year':
                        if (e > 0) {
                            //下一年
                            me.year++;
                            me.prevShow = true;
                            if (me.year === me.curYear) {
                                me.nextShow = false;
                            }
                        } else {
                            //上一年
                            me.year--;
                            me.nextShow = true;
                        }
                        me.timeStamp = Date.parse(me.year);
                        break;
                    case 'month':
                        if (e > 0) {
                            //下一月
                            me.timeStamp = me.timeStamp + me.oneDayLong * me.getDaysInMonth();
                            me.prevShow = true;
                            if (me.timeStamp === me.curTimeStamp) {
                                me.nextShow = false;
                            }
                        } else {
                            //上一月
                            me.timeStamp = me.timeStamp - me.oneDayLong * me.getDaysInMonth();
                            me.nextShow = true;
                        }
                        me.display = new Date(me.timeStamp).Format('Y年MM月');
                        break;
                    case 'day':
                        if (e > 0) {
                            //明天
                            me.timeStamp = me.timeStamp + me.oneDayLong;
                            me.prevShow = true;
                            if (me.timeStamp === me.curTimeStamp) {
                                me.nextShow = false;
                                try {
                                    me.initRealTime();
                                } catch (e) {
                                    Vue.$toast.show({
                                        toastText: '服务异常，请稍后重试'
                                    });
                                    setTimeout(function () {
                                        Vue.$toast.close();
                                    }, 2000)
                                }
                            }
                        } else {
                            //昨天
                            me.timeStamp = me.timeStamp - me.oneDayLong;
                            me.nextShow = true;
                            me.display = new Date(me.timeStamp).Format('Y年MM月dd日');
                        }
                        break;
                    case 'week':
                        if (e > 0) {
                            //下周
                            me.mondayTime = me.mondayTime + me.oneDayLong * 7;
                            me.sundayTime = me.sundayTime + me.oneDayLong * 7;
                            me.prevShow = true;
                            if (me.sundayTime >= me.curSundayTime) {
                                me.nextShow = false;
                            }
                        } else {
                            //上周
                            me.mondayTime = (me.mondayTime - me.oneDayLong * 7);
                            me.sundayTime = (me.sundayTime - me.oneDayLong * 7);
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
                    tooltip: {
                        show: false
                    },
                    settings: {
                        dataType: 'percent',
                        selectedMode: 'single',
                        hoverAnimation: false,
                        radius: [104, 50],
                        label: {
                            position: 'inside',
                            formatter: '{@channel}' + '%'
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
                    grid: {
                        top: 30,
                        left: -10,
                        right: 20,
                        bottom: 0
                    },
                    settings: {
                        label: {
                            show: true,
                            position: 'right',
                        },
                        itemStyle: {
                            color: '#ff6900'
                        },
                        'barCategoryGap': '70%'
                    },
                    xAxis:{
                        axisLabel: {
                            rotate: 20
                        }
                    }
                };
                let provinceStat = orderData.provinceStat;
                if (provinceStat) {
                    provinceStat.map((el) => {
                        tmp.data.rows.unshift({
                            'xAxis': el.province,
                            [dataTypeText]: Math.round(el[dataType])
                        });
                    });
                }
                console.log(tmp,'tmp');
                return tmp;
            },
            //获取展示月的天数
            getDaysInMonth() {
                let me = this;
                let curDate = new Date();
                let curMonth = me.month;
                curDate.setMonth(curMonth);
                curDate.setDate(0);
                return curDate.getDate();
            },
            //不同颜色区分数值
            getStyle(value){
                if(value){
                    if(parseFloat(value)>0){
                        return 'red';
                    }else if(parseFloat(value)<0){
                        return 'green';
                    }else{
                        return '';
                    }
                }else{
                    return '';
                }
            }
        },
        computed: {
            ...mapState({
                orderData: state => state.orderAnalyze.orderDataArr,
            })
        },
        watch: {
            orderData() {
                let me = this;
                me.orderDataArr = me.orderData;
            }
        }
    }
</script>


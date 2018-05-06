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
            height: px2rem(87);
            font-size: px2rem(24);
            overflow: hidden;
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
    //渠道表格
    .table {
        width: 100%;
        height: px2rem(90);
        margin-top: px2rem(20);
        text-align: left;
        line-height: px2rem(90);
        font-size: px2rem(30);
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

</style>

<template>
    <div class="container">
        <v-touch @swipeleft="onSwipeLeft"
                 @swiperight="onSwipeRight">
            <div class="tab_box">
                <div class="tab_tit order_type_tit">
                    <div v-for="(typeItem,index) in flowTypeArr"
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
                    <histogramItem :total="flowDataArr" :time="time" :type="type" :oneDayLong="oneDayLong"
                    :timeStamp="timeStamp" :mondayTime="mondayTime" :sundayTime="sundayTime"
                    :year="year"></histogramItem>

                    <!--折线图：月视图、日视图>-->
                    <lineItem :total="flowDataArr" :time="time" :type="type" :mondayTime="mondayTime"
                              :oneDayLong="oneDayLong" :year="year" :month="month" :timeStamp="timeStamp" :curTimeStamp="curTimeStamp"></lineItem>

                    <!--数据统计模块-->
                    <statisticsItem :total="flowDataArr" :time="time" :type="type"></statisticsItem>

                    <!--渠道表格-->
                    <template v-if="!isEmpty(flowDataArr.channelStat)">
                        <!--表格-->
                        <table class="table" v-if="!isEmpty(flowDataArr.channelStat[0].channel)">
                            <thead>
                            <tr>
                                <th>渠道</th>
                                <th>{{flowTypeArr[type].name}}</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(item,index) in flowDataArr.channelStat" :key="index">
                                <td>{{item.channel}}</td>
                                <!--UV-->
                                <template v-if="type === 0">
                                    <td>{{item.uv?item.uv:0}}</td>
                                </template>
                                <!--PV-->
                                <template v-if="type === 1">
                                    <td>{{item.pv?item.pv:0}}</td>
                                </template>
                                <!--登录用户数-->
                                <template v-if="type === 2">
                                    <td>{{item.loginUV?item.loginUV:0}}</td>
                                </template>
                                <!--下单用户数-->
                                <template v-if="type === 3">
                                    <td>{{item.orderUV?item.orderUV:0}}</td>
                                </template>
                                <!--客单价-->
                                <template v-if="type === 4">
                                    <td>{{item.unitPrice?item.unitPrice:0}}</td>
                                </template>
                                <!--转化率-->
                                <template v-if="type === 5">
                                    <td>{{item.conversionRate?item.conversionRate:0}}</td>
                                </template>
                            </tr>
                            </tbody>
                        </table>
                    </template>

                    <!--页面表格-->
                    <template v-if="!isEmpty(flowDataArr.pageStat)">
                        <!--表格-->
                        <table class="table" v-if="!isEmpty(flowDataArr.pageStat[0].page)">
                            <thead>
                            <tr>
                                <th>页面</th>
                                <th>{{flowTypeArr[type].name}}</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(item,index) in flowDataArr.pageStat" :key="index">
                                <td>{{item.page}}</td>
                                <!--UV-->
                                <template v-if="type === 0">
                                    <td>{{item.uv?item.uv:0}}</td>
                                </template>
                                <!--PV-->
                                <template v-if="type === 1">
                                    <td>{{item.pv?item.pv:0}}</td>
                                </template>
                                <!--登录用户数-->
                                <template v-if="type === 2">
                                    <td>{{item.loginUV?item.loginUV:0}}</td>
                                </template>
                                <!--下单用户数-->
                                <template v-if="type === 3">
                                    <td>{{item.orderUV?item.orderUV:0}}</td>
                                </template>
                                <!--客单价-->
                                <template v-if="type === 4">
                                    <td>{{item.unitPrice?item.unitPrice:0}}</td>
                                </template>
                                <!--转化率-->
                                <template v-if="type === 5">
                                    <td>{{item.conversionRate?item.conversionRate:0}}</td>
                                </template>
                            </tr>
                            </tbody>
                        </table>
                    </template>
                </div>
            </div>
        </v-touch>
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
                arr:[],
                //订单类型
                flowTypeArr: [{
                    name: '访客数(UV)',
                    current: true,
                    type: 0
                }, {
                    name: '浏览量(PV)',
                    current: false,
                    type: 1
                }, {
                    name: '登录用户数',
                    current: false,
                    type: 2
                }, {
                    name: '下单用户数',
                    current: false,
                    type: 3
                }, {
                    name: '客单价',
                    current: false,
                    type: 4
                }, {
                    name: '转化率',
                    current: false,
                    type: 5
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
                stompClient: null,
                oneDayLong: 0,
                // flowDataArr:[]
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
                    me.flowTypeArr.map(function (item) {
                        if (item.current) {
                            me.type = item.type;
                        }
                    })
                }
            });
            me.init();
            me.orderDisplay();
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
                me.stompClient.connect({"system": "TP", "page": "flow"}, function (frame) {
                    let url;
                    switch (me.type) {
                        //访客数
                        case 0:
                            url = '/user/topic/getRealTimeFlowUv';
                            break;
                        //浏览量
                        case 1:
                            url = '/user/topic/getRealTimeFlowPv';
                            break;
                        //登录用户数
                        case 2:
                            url = '/user/topic/getRealTimeFlowLogin';
                            break;
                        //下单用户数
                        case 3:
                            url = '/user/topic/getRealTimeFlowOrderUser';
                            break;
                        //客单价
                        case 4:
                            url = '/user/topic/getRealTimeFlowAvgUserMoney';
                            break;
                        //转化率
                        case 5:
                            url = '/user/topic/getRealTimeFlowConversion';
                            break;
                    }
                    me.stompClient.subscribe(url, function (msg) {
                        console.log(11111, JSON.parse(msg.body));
                        //TODO 实时数据替换接口返回数据
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
                let nowTime = date.getTime();
                let weekDay = date.getDay();
                let mondayTime = nowTime - (weekDay - 1) * me.oneDayLong;
                let sundayTime = nowTime + (7 - weekDay) * me.oneDayLong;
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
                        me.display = new Date(me.timeStamp).Format('Y年');
                        break;
                    case 'month':
                        me.display = new Date(me.timeStamp).Format('Y年MM月');
                        break;
                    case 'week':
                        delete me.param.day;
                        me.param.startTime = new Date(me.mondayTime).Format('Y-MM-dd');
                        me.param.endTime = new Date(me.sundayTime).Format('Y-MM-dd');
                        me.display = new Date(me.mondayTime).Format('Y年MM月dd日') + '至' + new Date(me.sundayTime).Format('Y年MM月dd日');
                        break;
                    case 'day':
                        if (me.timeStamp === me.curTimeStamp) {
                            me.display = '今天';
                        } else if (me.timeStamp + me.oneDayLong === me.curTimeStamp) {
                            me.display = '昨天';
                        } else {
                            me.display = new Date(me.timeStamp).Format('Y年MM月dd日');
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
                if (me.type === (me.flowTypeArr.length - 1)) {
                    me.type = 0
                } else {
                    me.type++;
                }
                me.flowTypeArr.map((el) => {
                    el.current = false;
                });
                me.flowTypeArr[me.type].current = true;
                me.orderDisplay();
            },
            //滑动（右滑）切换统计类型
            onSwipeRight() {
                let me = this;
                if (me.type === 0) {
                    me.type = me.flowTypeArr.length - 1
                } else {
                    me.type--;
                }
                me.flowTypeArr.map((el) => {
                    el.current = false;
                });
                me.flowTypeArr[me.type].current = true;
                me.orderDisplay();
            },
            //切换入参
            onChangeParam(index, paramType) {
                let me = this;
                let tmpArr;
                switch (paramType) {
                    case 'type':
                        tmpArr = me.flowTypeArr;
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
                            [dataTypeText]: Math.round(el[dataType])
                        });
                    });
                }
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
            }
        },
        computed: {
            ...mapState({
                flowDataArr: state => state.flowAnalyze.flowDataArr,
            })
    },
    }
</script>


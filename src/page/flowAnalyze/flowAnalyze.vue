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
            height: px2rem(86);
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
            margin-top: px2rem(28);
            padding-bottom: px2rem(40);
            .ring_type {
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

    .no_data_tips {
        margin: 0 auto;
        padding: px2rem(40) 0;
        color: #999;
        text-align: center;
        font-size: px2rem(40);
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

</style>

<template>
    <div class="container">
        <!--<v-touch @swipeleft="onSwipeLeft"-->
        <!--@swiperight="onSwipeRight" @pandown="onPanStart($event)" @panmove="onPanmove($event)">-->
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
                          :oneDayLong="oneDayLong" :month="month" :timeStamp="timeStamp"
                          :curTimeStamp="curTimeStamp"></lineItem>

                <!--数据统计模块-->
                <statisticsItem :total="flowDataArr" :time="time" :type="type"></statisticsItem>

                <!--渠道、页面-->
                <div class="tab_box tab_ditch_province">
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
                            <div v-if="!isEmpty(flowDataArr.channelStat)">
                                <!--环形图-->
                                <div class="ring_type" v-show="ringShow">{{flowTypeArr[type].name}}</div>
                                <ve-ring v-show="ringShow"
                                         :data="yearPieData(flowDataArr).data"
                                         :settings="yearPieData(flowDataArr).settings"
                                         :tooltip="yearPieData(flowDataArr).tooltip"></ve-ring>
                                <!--渠道表格-->
                                <template v-if="!isEmpty(flowDataArr.channelStat)">
                                    <!--表格-->
                                    <table class="table" v-if="!isEmpty(flowDataArr.channelStat[0].channel)">
                                        <thead>
                                        <tr>
                                            <th>渠道</th>
                                            <th>{{flowTypeArr[type].name}}</th>
                                            <th v-show="time === 'day'">日环比</th>
                                            <th v-show="time === 'day'">周同比</th>
                                            <th v-show="time === 'week'">周环比</th>
                                            <th v-show="time === 'month'">月环比</th>
                                            <th>年同比</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="(item,index) in flowDataArr.channelStat" :key="index">
                                            <td>{{item.channel}}</td>
                                            <!--UV-->
                                            <template v-if="type === 0">
                                                <td>{{item.uv?item.uv:0}}</td>
                                                <td :class="getStyle(item.dcUVPercent)" v-show="time === 'day'">{{item.dcUVPercent?item.dcUVPercent:0}}</td>
                                                <td :class="getStyle(item.wcUVPercent)" v-show="time === 'day' || time === 'week'">{{item.wcUVPercent?item.wcUVPercent:0}}</td>
                                                <td :class="getStyle(item.mcUVPercent)" v-show="time === 'month'">{{item.mcUVPercent?item.mcUVPercent:0}}</td>
                                                <td :class="getStyle(item.ycUVPercent)">{{item.ycUVPercent?item.ycUVPercent:0}}</td>
                                            </template>
                                            <!--PV-->
                                            <template v-if="type === 1">
                                                <td>{{item.pv?item.pv:0}}</td>
                                                <td :class="getStyle(item.dcPVPercent)" v-show="time === 'day'">{{item.dcPVPercent?item.dcPVPercent:0}}</td>
                                                <td :class="getStyle(item.wcPVPercent)" v-show="time === 'day' || time === 'week'">{{item.wcPVPercent?item.wcPVPercent:0}}</td>
                                                <td :class="getStyle(item.mcPVPercent)" v-show="time === 'month'">{{item.mcPVPercent?item.mcPVPercent:0}}</td>
                                                <td :class="getStyle(item.ycPVPercent)">{{item.ycPVPercent?item.ycPVPercent:0}}</td>
                                            </template>
                                            <!--登录用户数-->
                                            <template v-if="type === 2">
                                                <td>{{item.loginUV?item.loginUV:0}}</td>
                                                <td :class="getStyle(item.dcLoginUVPercent)" v-show="time === 'day'">{{item.dcLoginUVPercent?item.dcLoginUVPercent:0}}</td>
                                                <td :class="getStyle(item.wcLoginUVPercent)" v-show="time === 'day' || time === 'week'">{{item.wcLoginUVPercent?item.wcLoginUVPercent:0}}</td>
                                                <td :class="getStyle(item.mcLoginUVPercent)" v-show="time === 'month'">{{item.mcLoginUVPercent?item.mcLoginUVPercent:0}}</td>
                                                <td :class="getStyle(item.ycLoginUVPercent)">{{item.ycLoginUVPercent?item.ycLoginUVPercent:0}}</td>
                                            </template>
                                            <!--下单用户数-->
                                            <template v-if="type === 3">
                                                <td>{{item.orderUV?item.orderUV:0}}</td>
                                                <td :class="getStyle(item.dcOrderUVPercent)" v-show="time === 'day'">{{item.dcOrderUVPercent?item.dcOrderUVPercent:0}}</td>
                                                <td :class="getStyle(item.wcOrderUVPercent)" v-show="time === 'day' || time === 'week'">{{item.wcOrderUVPercent?item.wcOrderUVPercent:0}}</td>
                                                <td :class="getStyle(item.mcOrderUVPercent)" v-show="time === 'month'">{{item.mcOrderUVPercent?item.mcOrderUVPercent:0}}</td>
                                                <td :class="getStyle(item.ycOrderUVPercent)">{{item.ycOrderUVPercent?item.ycOrderUVPercent:0}}</td>
                                            </template>
                                            <!--客单价-->
                                            <template v-if="type === 4">
                                                <td>{{item.unitPrice?item.unitPrice:0}}</td>
                                                <td :class="getStyle(item.dcUnitPricePercent)" v-show="time === 'day'">{{item.dcUnitPricePercent?item.dcUnitPricePercent:0}}</td>
                                                <td :class="getStyle(item.wcUnitPricePercent)" v-show="time === 'day' || time === 'week'">{{item.wcUnitPricePercent?item.wcUnitPricePercent:0}}</td>
                                                <td :class="getStyle(item.mcUnitPricePercent)" v-show="time === 'month'">{{item.mcUnitPricePercent?item.mcUnitPricePercent:0}}</td>
                                                <td :class="getStyle(item.ycUnitPricePercent)">{{item.ycUnitPricePercent?item.ycUnitPricePercent:0}}</td>
                                            </template>
                                            <!--转化率-->
                                            <template v-if="type === 5">
                                                <td>{{item.conversionRate?item.conversionRate:0}}</td>
                                                <td :class="getStyle(item.dcConversionRatePercent)" v-show="time === 'day'">{{item.dcConversionRatePercent?item.dcConversionRatePercent:0}}</td>
                                                <td :class="getStyle(item.wcConversionRatePercent)" v-show="time === 'day' || time === 'week'">{{item.wcConversionRatePercent?item.wcConversionRatePercent:0}}</td>
                                                <td :class="getStyle(item.mcConversionRatePercent)" v-show="time === 'month'">{{item.mcConversionRatePercent?item.mcConversionRatePercent:0}}</td>
                                                <td :class="getStyle(item.ycConversionRatePercent)">{{item.ycConversionRatePercent?item.ycConversionRatePercent:0}}</td>
                                            </template>
                                        </tr>
                                        </tbody>
                                    </table>
                                </template>
                            </div>
                            <div class="no_data_tips" v-else>
                                暂无数据
                            </div>
                        </template>

                        <!--页面-->
                        <template v-if="showWay === 2">
                            <div v-if="!isEmpty(flowDataArr.pageStat) && type <= 1">
                                <ve-bar height="1000px" :data="yearBarData(flowDataArr).data"
                                        :settings="yearBarData(flowDataArr).settings"
                                        :grid="yearBarData(flowDataArr).grid"
                                        :xAxis="yearBarData(flowDataArr).xAxis"></ve-bar>
                            </div>
                            <div class="no_data_tips" v-else>
                                暂无数据
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
        <!--</v-touch>-->
    </div>
</template>

<script>
    import {mapState, mapActions, mapMutations} from 'vuex';
    import Vue from 'vue';
    import statisticsItem from './components/statisticsItem';
    import histogramItem from './components/histogramItem';
    import lineItem from './components/lineItem';
    import {isEmpty} from "Public/util";

    export default {
        components: {
            statisticsItem,
            histogramItem,
            lineItem
        },
        data() {
            return {
                arr: [],
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
                    name: '支付人数',
                    current: false,
                    type: 3
                }, {
                    name: '客单价',
                    current: false,
                    type: 4
                }, {
                    name: '买家转化率',
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
                //渠道省份
                ditchProvinceArr: [{
                    name: '渠道',
                    way: 'ditch',
                    current: true
                }, {
                    name: '页面',
                    way: 'page',
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
                flowDataArr: [],
                //年视图渠道或者页面切换
                showWay: 1,
                //饼图是否显示
                ringShow: true,
                connected: true,
                subscribeUrlMap: [
                    '/user/topic/getRealTimeFlowUv',
                    '/user/topic/getRealTimeFlowPv',
                    '/user/topic/getRealTimeFlowLogin',
                    '/user/topic/getRealTimeFlowOrderUser',
                    '/user/topic/getRealTimeFlowAvgUserMoney',
                    '/user/topic/getRealTimeFlowConversion'
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
                    me.flowTypeArr.map(function (item) {
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
                        if (me.connected && me.subscribeUrlMap[me.type] === url) {
                            me.flowDataArr = JSON.parse(msg.body);
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
                let mondayTime ;
                let sundayTime ;
                switch (weekDay){
                    // 周一至周六
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                        mondayTime = nowTime - (weekDay - 1) * me.oneDayLong;
                        sundayTime = nowTime + (7 - weekDay) * me.oneDayLong;
                        break;
                    //周日
                    case 0:
                        mondayTime = nowTime - (me.oneDayLong * 6);
                        sundayTime = nowTime;
                        break;
                }
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
                switch (me.type) {
                    case 0:
                        dataType = 'uv';
                        normal(channelStat, tmp, dataType);
                        break;
                    case 1:
                        dataType = 'pv';
                        normal(channelStat, tmp, dataType);
                        break;
                    case 2:
                        dataType = 'loginUV';
                        normal(channelStat, tmp, dataType);
                        break;
                    case 3:
                        dataType = 'orderUV';
                        normal(channelStat, tmp, dataType);
                        break;
                    case 4:
                        dataType = 'unitPrice';
                        normal(channelStat, tmp, dataType);
                        break;
                    case 5:
                        dataType = 'conversionRate';
                        if (channelStat) {
                            //总数
                            let amount = 0;
                            channelStat.map((el) => {
                                amount += (el[dataType].replace(/%/, "") * 1000);
                            });
                            if(amount > 0){
                                me.ringShow = true;
                                channelStat.map((el) => {
                                    tmp.data.rows.push({
                                        'channel': el.channel,
                                        'percent': ((el[dataType].replace(/%/, "") * 1000 / amount).toFixed(5) * 100).toFixed(1)
                                    });
                                });
                            }else{
                                me.ringShow = false;
                            }
                        }
                        break;
                }

                function normal(channelStat, tmp, dataType) {
                    if (channelStat) {
                        //总数
                        let amount = 0;
                        channelStat.map((el) => {
                            amount += el[dataType];
                        });
                        if(amount > 0){
                            me.ringShow = true;
                            channelStat.map((el) => {
                                if(el[dataType] == null){
                                    el[dataType] = 0;
                                }
                                tmp.data.rows.push({
                                    'channel': el.channel,
                                    'percent': ((el[dataType] / amount).toFixed(5) * 100).toFixed(1)
                                });
                            });
                        }else{
                            me.ringShow = false;
                        }
                    }
                }
                return tmp;
            },
            //渲染页面条形图
            yearBarData(orderData) {
                let me = this;
                let dataType;
                let dataTypeText;
                switch (me.type) {
                    case 0:
                        dataType = 'uv';
                        dataTypeText = '访客数';
                        break;
                    case 1:
                        dataType = 'pv';
                        dataTypeText = '浏览量';
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
                        bottom: 0,
                    },
                    settings: {
                        label: {
                            show: true,
                            position: 'right',
                        },
                        itemStyle: {
                            color: '#ff6900'
                        }
                    },
                    xAxis:{
                        axisLabel: {
                            rotate: 20
                        }
                    }
                };
                let pageStat = orderData.pageStat;
                if (pageStat) {
                    pageStat.map((el) => {
                        tmp.data.rows.unshift({
                            'xAxis': el.page,
                            [dataTypeText]: Math.round(el[dataType])
                        });
                    });
                }
                console.log(tmp);
                return tmp;
            },
            //获取展示月的天数
            getDaysInMonth() {
                let me = this;
                let d = new Date(new Date(me.timeStamp).Format('Y'), new Date(me.timeStamp).Format('M'), 0);
                return d.getDate();
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
                flowData: state => state.flowAnalyze.flowDataArr,
            })
        },
        watch: {
            flowData() {
                let me = this;
                me.flowDataArr = me.flowData;
            }
        }
    }
</script>


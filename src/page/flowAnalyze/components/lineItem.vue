<style lang="scss" scoped>
    @import '../../../public/assets/scss/mix.scss';
</style>
<template>
    <div class="line">
        <div v-show="time === 'day'">
            <ve-line :data="dayLineData(total).data"
                     :settings="dayLineData(total).settings"
                     :colors="dayLineData(total).colors"
                     :legend="dayLineData(total).legend"
                     :events="chartEvents"></ve-line>
        </div>
        <div v-show="time ==='month'">
            <ve-line :data="monthLineData(total).data"
                     :settings="monthLineData(total).settings"
                     :colors="monthLineData(total).colors"></ve-line>
        </div>
        <div v-show="time ==='year'">
            <ve-line :data="yearHistogramData(total).data"
                     :settings="yearHistogramData(total).settings"
                     :colors="yearHistogramData(total).colors"></ve-line>
        </div>
    </div>
</template>

<script>
    import {isEmpty} from "Public/util";

    export default {
        components: {},
        props: {
            total: '',
            type: '',
            time: '',
            month: '',
            timeStamp: 0,
            curTimeStamp: 0,
            oneDayLong: 0
        },
        data() {
            return {
                wkStatus: false,
                yeStatus: false
            }
        },
        created() {
            let me = this;
            me.chartEvents = {
                legendselectchanged(e){
                    switch(e.name){
                        case '周同比':
                            me.wkStatus = e.selected[e.name];
                            break;
                        case '年同比':
                            me.yeStatus = e.selected[e.name];
                            break;
                    }
                }
            }
        },
        mounted() {
        },
        methods: {
            //年视图
            yearHistogramData(data) {
                let me = this;
                let thisYearX = new Date(me.timeStamp).Format('Y年');
                let lastYearX = new Date(me.timeStamp).Format('Y') - 1 + '年';
                let tmp = {
                    data: {
                        columns: ['xAxis', thisYearX, lastYearX],
                        rows: [
                            {'xAxis': '1月', [thisYearX]: null, [lastYearX]: null},
                            {'xAxis': '2月', [thisYearX]: null, [lastYearX]: null},
                            {'xAxis': '3月', [thisYearX]: null, [lastYearX]: null},
                            {'xAxis': '4月', [thisYearX]: null, [lastYearX]: null},
                            {'xAxis': '5月', [thisYearX]: null, [lastYearX]: null},
                            {'xAxis': '6月', [thisYearX]: null, [lastYearX]: null},
                            {'xAxis': '7月', [thisYearX]: null, [lastYearX]: null},
                            {'xAxis': '8月', [thisYearX]: null, [lastYearX]: null},
                            {'xAxis': '9月', [thisYearX]: null, [lastYearX]: null},
                            {'xAxis': '10月', [thisYearX]: null, [lastYearX]: null},
                            {'xAxis': '11月', [thisYearX]: null, [lastYearX]: null},
                            {'xAxis': '12月', [thisYearX]: null, [lastYearX]: null}
                        ]
                    },
                    colors:['#ff6900','rgba(255,105,0,.4)'],
                    settings:{}
                };
                if (!isEmpty(data)) {
                    //客单价
                    if (me.type === 4) {
                        me.rendYearData(data.curYearDetail, thisYearX, tmp, 'this');
                        me.rendYearData(data.preYearDetail, lastYearX, tmp, 'last');
                    } else {
                        //其他
                        me.rendYearData(data.curYearChartInfo, thisYearX, tmp);
                        me.rendYearData(data.lastYearChartInfo, lastYearX, tmp);
                    }
                }
                return tmp;
            },
            //年视图
            rendYearData(arr, which, tmp,diff) {
                let me = this;
                let dataType;
                if (!isEmpty(arr)) {
                    switch (me.type) {
                        case 0:
                            dataType = 'uv';
                            normalData(arr, which, tmp, dataType);
                            break;
                        case 1:
                            dataType = 'pv';
                            normalData(arr, which, tmp, dataType);
                            break;
                        case 2:
                            dataType = 'loginUv';
                            normalData(arr, which, tmp, dataType);
                            break;
                        case 3:
                            dataType = 'orderUv';
                            normalData(arr, which, tmp, dataType);
                            break;
                        case 4:
                            specialData(arr, which, tmp, diff);
                            break;
                        case 5:
                            dataType = 'conversionRate';
                            normalData(arr, which, tmp, dataType);
                            break;
                    }
                }
                function normalData(arr, which, tmp, dataType) {
                    arr.map((el) => {
                        tmp.data.rows[el.month - 1][which] = el[dataType];
                    });
                }

                function specialData(arr, which, tmp, diff) {
                    arr.map((el) => {
                        if (Object.values(el) && Object.values(Object.values(el))) {
                            tmp.data.rows[Object.values(Object.values(el))[0].month - 1][which] = Object.values(Object.values(el))[0][diff + 'YearUnitPrice'];
                        }
                    })
                }
            },
            //月视图
            monthLineData(data) {
                let me = this;
                let thisYearMonthX = new Date(me.timeStamp).Format('Y年MM月');
                let lastYearMonthX = new Date(me.timeStamp).Format('Y') - 1 + '年' + new Date(me.timeStamp).Format('MM月');
                let tmp = {
                    data: {
                        columns: ['xAxis', thisYearMonthX, lastYearMonthX],
                        rows: [
                            {'xAxis': '1', [thisYearMonthX]: null, [lastYearMonthX]: null},
                            {'xAxis': '2', [thisYearMonthX]: null, [lastYearMonthX]: null},
                            {'xAxis': '3', [thisYearMonthX]: null, [lastYearMonthX]: null},
                            {'xAxis': '4', [thisYearMonthX]: null, [lastYearMonthX]: null},
                            {'xAxis': '5', [thisYearMonthX]: null, [lastYearMonthX]: null},
                            {'xAxis': '6', [thisYearMonthX]: null, [lastYearMonthX]: null},
                            {'xAxis': '7', [thisYearMonthX]: null, [lastYearMonthX]: null},
                            {'xAxis': '8', [thisYearMonthX]: null, [lastYearMonthX]: null},
                            {'xAxis': '9', [thisYearMonthX]: null, [lastYearMonthX]: null},
                            {'xAxis': '10', [thisYearMonthX]: null, [lastYearMonthX]: null},
                            {'xAxis': '11', [thisYearMonthX]: null, [lastYearMonthX]: null},
                            {'xAxis': '12', [thisYearMonthX]: null, [lastYearMonthX]: null},
                            {'xAxis': '13', [thisYearMonthX]: null, [lastYearMonthX]: null},
                            {'xAxis': '14', [thisYearMonthX]: null, [lastYearMonthX]: null},
                            {'xAxis': '15', [thisYearMonthX]: null, [lastYearMonthX]: null},
                            {'xAxis': '16', [thisYearMonthX]: null, [lastYearMonthX]: null},
                            {'xAxis': '17', [thisYearMonthX]: null, [lastYearMonthX]: null},
                            {'xAxis': '18', [thisYearMonthX]: null, [lastYearMonthX]: null},
                            {'xAxis': '19', [thisYearMonthX]: null, [lastYearMonthX]: null},
                            {'xAxis': '20', [thisYearMonthX]: null, [lastYearMonthX]: null},
                            {'xAxis': '21', [thisYearMonthX]: null, [lastYearMonthX]: null},
                            {'xAxis': '22', [thisYearMonthX]: null, [lastYearMonthX]: null},
                            {'xAxis': '23', [thisYearMonthX]: null, [lastYearMonthX]: null},
                            {'xAxis': '24', [thisYearMonthX]: null, [lastYearMonthX]: null},
                            {'xAxis': '25', [thisYearMonthX]: null, [lastYearMonthX]: null},
                            {'xAxis': '26', [thisYearMonthX]: null, [lastYearMonthX]: null},
                            {'xAxis': '27', [thisYearMonthX]: null, [lastYearMonthX]: null},
                            {'xAxis': '28', [thisYearMonthX]: null, [lastYearMonthX]: null},
                            {'xAxis': '29', [thisYearMonthX]: null, [lastYearMonthX]: null},
                            {'xAxis': '30', [thisYearMonthX]: null, [lastYearMonthX]: null},
                            {'xAxis': '31', [thisYearMonthX]: null, [lastYearMonthX]: null}
                        ]
                    },
                    colors:['#ff6900','rgba(255,105,0,.4)'],
                    settings: {},
                };
                if (!isEmpty(data)) {
                    //客单价
                    if (me.type === 4) {
                        me.rendMonthData(data.curMonthDetail, thisYearMonthX, tmp, 'this');
                        me.rendMonthData(data.preYearMonthDetail, thisYearMonthX, tmp, 'last');
                    } else {
                        //其他
                        me.rendMonthData(data.curMonthChartInfo, thisYearMonthX, tmp);
                        me.rendMonthData(data.preMonthChartInfo, thisYearMonthX, tmp);
                    }
                }
                return tmp;
            },
            //日视图
            dayLineData(data) {
                let me = this;
                let thisDayX;
                if (me.timeStamp === me.curTimeStamp) {
                    thisDayX = '今天';
                } else if (me.timeStamp + me.oneDayLong === me.curTimeStamp) {
                    thisDayX = '昨天';
                } else {
                    thisDayX = new Date(me.timeStamp).Format('Y年MM月dd日');
                }
                let lastDayX = '日环比';
                let lastWeekX = '周同比';
                let lastYearX = '年同比';
                let tmp = {
                    data: {
                        columns: ['xAxis', thisDayX, lastDayX, lastWeekX, lastYearX],
                        rows: [
                            {'xAxis': '1', [thisDayX]: null, [lastDayX]: null, [lastWeekX]: null, [lastYearX]: null},
                            {'xAxis': '2', [thisDayX]: null, [lastDayX]: null, [lastWeekX]: null, [lastYearX]: null},
                            {'xAxis': '3', [thisDayX]: null, [lastDayX]: null, [lastWeekX]: null, [lastYearX]: null},
                            {'xAxis': '4', [thisDayX]: null, [lastDayX]: null, [lastWeekX]: null, [lastYearX]: null},
                            {'xAxis': '5', [thisDayX]: null, [lastDayX]: null, [lastWeekX]: null, [lastYearX]: null},
                            {'xAxis': '6', [thisDayX]: null, [lastDayX]: null, [lastWeekX]: null, [lastYearX]: null},
                            {'xAxis': '7', [thisDayX]: null, [lastDayX]: null, [lastWeekX]: null, [lastYearX]: null},
                            {'xAxis': '8', [thisDayX]: null, [lastDayX]: null, [lastWeekX]: null, [lastYearX]: null},
                            {'xAxis': '9', [thisDayX]: null, [lastDayX]: null, [lastWeekX]: null, [lastYearX]: null},
                            {'xAxis': '10', [thisDayX]: null, [lastDayX]: null, [lastWeekX]: null, [lastYearX]: null},
                            {'xAxis': '11', [thisDayX]: null, [lastDayX]: null, [lastWeekX]: null, [lastYearX]: null},
                            {'xAxis': '12', [thisDayX]: null, [lastDayX]: null, [lastWeekX]: null, [lastYearX]: null},
                            {'xAxis': '13', [thisDayX]: null, [lastDayX]: null, [lastWeekX]: null, [lastYearX]: null},
                            {'xAxis': '14', [thisDayX]: null, [lastDayX]: null, [lastWeekX]: null, [lastYearX]: null},
                            {'xAxis': '15', [thisDayX]: null, [lastDayX]: null, [lastWeekX]: null, [lastYearX]: null},
                            {'xAxis': '16', [thisDayX]: null, [lastDayX]: null, [lastWeekX]: null, [lastYearX]: null},
                            {'xAxis': '17', [thisDayX]: null, [lastDayX]: null, [lastWeekX]: null, [lastYearX]: null},
                            {'xAxis': '18', [thisDayX]: null, [lastDayX]: null, [lastWeekX]: null, [lastYearX]: null},
                            {'xAxis': '19', [thisDayX]: null, [lastDayX]: null, [lastWeekX]: null, [lastYearX]: null},
                            {'xAxis': '20', [thisDayX]: null, [lastDayX]: null, [lastWeekX]: null, [lastYearX]: null},
                            {'xAxis': '21', [thisDayX]: null, [lastDayX]: null, [lastWeekX]: null, [lastYearX]: null},
                            {'xAxis': '22', [thisDayX]: null, [lastDayX]: null, [lastWeekX]: null, [lastYearX]: null},
                            {'xAxis': '23', [thisDayX]: null, [lastDayX]: null, [lastWeekX]: null, [lastYearX]: null},
                            {'xAxis': '24', [thisDayX]: null, [lastDayX]: null, [lastWeekX]: null, [lastYearX]: null}
                        ]
                    },
                    legend: {
                        selected: {
                            [lastWeekX] : me.wkStatus,
                            [lastYearX] : me.yeStatus
                        }
                    },
                    colors: ['#ff6900', '#5ab1ef', '#fa6e86', '#ffb980'],
                    settings: {}
                };
                if (!isEmpty(data)) {
                    // 当天
                    me.rendDayData(data.curDayDetail || {}, thisDayX, tmp);
                    //日环比
                    me.rendDayData(data.preDayDetail || {}, lastDayX, tmp);
                    //周同比
                    me.rendDayData(data.preWeekDayDetail || {}, lastWeekX, tmp);
                    //年同比
                    me.rendDayData(data.preYearDayDetail || {}, lastYearX, tmp);
                }
                return tmp;
            },
            rendMonthData(arr, which, tmp, diff) {
                let me = this;
                let dataType;
                if (!isEmpty(arr)) {
                    switch (me.type) {
                        case 0:
                            dataType = 'uv';
                            normalData(arr, which, tmp, dataType);
                            break;
                        case 1:
                            dataType = 'pv';
                            normalData(arr, which, tmp, dataType);
                            break;
                        case 2:
                            dataType = 'loginUv';
                            normalData(arr, which, tmp, dataType);
                            break;
                        case 3:
                            dataType = 'orderUv';
                            normalData(arr, which, tmp, dataType);
                            break;
                        case 4:
                            specialData(arr, which, tmp, diff);
                            break;
                        case 5:
                            dataType = 'conversionRate';
                            normalData(arr, which, tmp, dataType);
                            break;
                    }

                    function normalData(arr, which, tmp, dataType) {
                        let tmpData = [];
                        arr.map((el) => {
                            tmpData.push(el[dataType]);
                        });
                        //初始化时设定31天，实际展示要根据展示月天数
                        for (let a = 0; a < 31 - me.getDaysInMonth(); a++) {
                            tmp.data.rows.pop();
                            tmpData.pop();
                        }
                        tmpData.map((el, i) => {
                            tmp.data.rows[i][which] = el;
                        });
                    }
                    function specialData(arr, which, tmp, diff) {
                        arr.map((el, i) => {
                            if (Object.values(el) && Object.values(el)[0][diff + 'MonthUnitPrice']) {
                                tmp.data.rows[i][which] = Object.values(el)[0][diff + 'MonthUnitPrice'];
                            }
                        })
                    }
                }
            },
            rendDayData(obj, which, tmp) {
                if (!isEmpty(obj)) {
                    Object.values(obj).map((el, i) => {
                        tmp.data.rows[i][which] = el;
                    });
                }
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
        }
    }
</script>

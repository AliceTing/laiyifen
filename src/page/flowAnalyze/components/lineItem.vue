<style lang="scss" scoped>
    @import '../../../public/assets/scss/mix.scss';
</style>
<template>
    <div class="line">
        <div v-show="time === 'day'">
            <ve-line :data="dayLineData(total).data"
                     :settings="dayLineData(total).settings"></ve-line>
        </div>
        <div v-show="time ==='month'">
            <ve-line :data="monthLineData(total).data"
                     :settings="monthLineData(total).settings"></ve-line>
        </div>
        <div v-show="time ==='year'">
            <ve-line :data="yearHistogramData(total).data"
                     :settings="yearHistogramData(total).settings"></ve-line>
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
            return {}
        },
        created() {
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
                            {'xAxis': '1月', [thisYearX]: 0, [lastYearX]: 0},
                            {'xAxis': '2月', [thisYearX]: 0, [lastYearX]: 0},
                            {'xAxis': '3月', [thisYearX]: 0, [lastYearX]: 0},
                            {'xAxis': '4月', [thisYearX]: 0, [lastYearX]: 0},
                            {'xAxis': '5月', [thisYearX]: 0, [lastYearX]: 0},
                            {'xAxis': '6月', [thisYearX]: 0, [lastYearX]: 0},
                            {'xAxis': '7月', [thisYearX]: 0, [lastYearX]: 0},
                            {'xAxis': '8月', [thisYearX]: 0, [lastYearX]: 0},
                            {'xAxis': '9月', [thisYearX]: 0, [lastYearX]: 0},
                            {'xAxis': '10月', [thisYearX]: 0, [lastYearX]: 0},
                            {'xAxis': '11月', [thisYearX]: 0, [lastYearX]: 0},
                            {'xAxis': '12月', [thisYearX]: 0, [lastYearX]: 0}
                        ]
                    }
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
                            console.log(Object.values(Object.values(el)));
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
                            {'xAxis': '1', [thisYearMonthX]: 0, [lastYearMonthX]: 0},
                            {'xAxis': '2', [thisYearMonthX]: 0, [lastYearMonthX]: 0},
                            {'xAxis': '3', [thisYearMonthX]: 0, [lastYearMonthX]: 0},
                            {'xAxis': '4', [thisYearMonthX]: 0, [lastYearMonthX]: 0},
                            {'xAxis': '5', [thisYearMonthX]: 0, [lastYearMonthX]: 0},
                            {'xAxis': '6', [thisYearMonthX]: 0, [lastYearMonthX]: 0},
                            {'xAxis': '7', [thisYearMonthX]: 0, [lastYearMonthX]: 0},
                            {'xAxis': '8', [thisYearMonthX]: 0, [lastYearMonthX]: 0},
                            {'xAxis': '9', [thisYearMonthX]: 0, [lastYearMonthX]: 0},
                            {'xAxis': '10', [thisYearMonthX]: 0, [lastYearMonthX]: 0},
                            {'xAxis': '11', [thisYearMonthX]: 0, [lastYearMonthX]: 0},
                            {'xAxis': '12', [thisYearMonthX]: 0, [lastYearMonthX]: 0},
                            {'xAxis': '13', [thisYearMonthX]: 0, [lastYearMonthX]: 0},
                            {'xAxis': '14', [thisYearMonthX]: 0, [lastYearMonthX]: 0},
                            {'xAxis': '15', [thisYearMonthX]: 0, [lastYearMonthX]: 0},
                            {'xAxis': '16', [thisYearMonthX]: 0, [lastYearMonthX]: 0},
                            {'xAxis': '17', [thisYearMonthX]: 0, [lastYearMonthX]: 0},
                            {'xAxis': '18', [thisYearMonthX]: 0, [lastYearMonthX]: 0},
                            {'xAxis': '19', [thisYearMonthX]: 0, [lastYearMonthX]: 0},
                            {'xAxis': '20', [thisYearMonthX]: 0, [lastYearMonthX]: 0},
                            {'xAxis': '21', [thisYearMonthX]: 0, [lastYearMonthX]: 0},
                            {'xAxis': '22', [thisYearMonthX]: 0, [lastYearMonthX]: 0},
                            {'xAxis': '23', [thisYearMonthX]: 0, [lastYearMonthX]: 0},
                            {'xAxis': '24', [thisYearMonthX]: 0, [lastYearMonthX]: 0},
                            {'xAxis': '25', [thisYearMonthX]: 0, [lastYearMonthX]: 0},
                            {'xAxis': '26', [thisYearMonthX]: 0, [lastYearMonthX]: 0},
                            {'xAxis': '27', [thisYearMonthX]: 0, [lastYearMonthX]: 0},
                            {'xAxis': '28', [thisYearMonthX]: 0, [lastYearMonthX]: 0},
                            {'xAxis': '29', [thisYearMonthX]: 0, [lastYearMonthX]: 0},
                            {'xAxis': '30', [thisYearMonthX]: 0, [lastYearMonthX]: 0},
                            {'xAxis': '31', [thisYearMonthX]: 0, [lastYearMonthX]: 0}
                        ]
                    },
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
                let lastDayX;
                if (me.timeStamp === me.curTimeStamp) {
                    thisDayX = '今天';
                } else if (me.timeStamp + me.oneDayLong === me.curTimeStamp) {
                    thisDayX = '昨天';
                } else {
                    thisDayX = new Date(me.timeStamp).Format('Y年MM月dd日');
                }
                lastDayX = new Date(me.timeStamp - me.oneDayLong).Format('Y年MM月dd日');
                let tmp = {
                    data: {
                        columns: ['xAxis', thisDayX, lastDayX],
                        rows: [
                            {'xAxis': '1', [thisDayX]: 0, [lastDayX]: 0},
                            {'xAxis': '2', [thisDayX]: 0, [lastDayX]: 0},
                            {'xAxis': '3', [thisDayX]: 0, [lastDayX]: 0},
                            {'xAxis': '4', [thisDayX]: 0, [lastDayX]: 0},
                            {'xAxis': '5', [thisDayX]: 0, [lastDayX]: 0},
                            {'xAxis': '6', [thisDayX]: 0, [lastDayX]: 0},
                            {'xAxis': '7', [thisDayX]: 0, [lastDayX]: 0},
                            {'xAxis': '8', [thisDayX]: 0, [lastDayX]: 0},
                            {'xAxis': '9', [thisDayX]: 0, [lastDayX]: 0},
                            {'xAxis': '10', [thisDayX]: 0, [lastDayX]: 0},
                            {'xAxis': '11', [thisDayX]: 0, [lastDayX]: 0},
                            {'xAxis': '12', [thisDayX]: 0, [lastDayX]: 0},
                            {'xAxis': '13', [thisDayX]: 0, [lastDayX]: 0},
                            {'xAxis': '14', [thisDayX]: 0, [lastDayX]: 0},
                            {'xAxis': '15', [thisDayX]: 0, [lastDayX]: 0},
                            {'xAxis': '16', [thisDayX]: 0, [lastDayX]: 0},
                            {'xAxis': '17', [thisDayX]: 0, [lastDayX]: 0},
                            {'xAxis': '18', [thisDayX]: 0, [lastDayX]: 0},
                            {'xAxis': '19', [thisDayX]: 0, [lastDayX]: 0},
                            {'xAxis': '20', [thisDayX]: 0, [lastDayX]: 0},
                            {'xAxis': '21', [thisDayX]: 0, [lastDayX]: 0},
                            {'xAxis': '22', [thisDayX]: 0, [lastDayX]: 0},
                            {'xAxis': '23', [thisDayX]: 0, [lastDayX]: 0},
                            {'xAxis': '24', [thisDayX]: 0, [lastDayX]: 0},
                        ]
                    },
                    settings: {},
                };
                if (!isEmpty(data)) {
                    // 当天
                    me.rendDayData(data.curDayDetail, thisDayX, tmp);
                    //昨天
                    me.rendDayData(data.preDayDetail, lastDayX, tmp);
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
                    Object.keys(obj).sort().map((el, i) => {
                        tmp.data.rows[i][which] = obj[el];
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

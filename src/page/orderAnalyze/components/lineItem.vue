<style lang="scss" scoped>
    @import '../../../public/assets/scss/mix.scss';

    .center{
        margin-left: auto;
        margin-right: auto;
    }
</style>
<template>
    <div class="line">
        <div v-show="time === 'day'">
            <ve-line :width="width"
                     class="center"
                     :data="dayLineData(total).data"
                     :settings="dayLineData(total).settings"
                     :colors="dayLineData(total).colors"
                     :legend="dayLineData(total).legend"
                     :events="chartEvents"></ve-line>
        </div>
        <div v-show="time ==='month'">
            <ve-line :width="width"
                     class="center"
                     :data="monthLineData(total).data"
                     :settings="monthLineData(total).settings"
                     :colors="monthLineData(total).colors"
                     :xAxis="monthLineData(total).xAxis"></ve-line>
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
                yeStatus: false,
                maxDays: 31,
                width: ''
            }
        },
        created() {
            let me = this;
            let maxWidth = 414;
            let _w = parseInt(window.getComputedStyle(document.querySelector('body')).getPropertyValue('width'));
            _w > maxWidth ? _w = maxWidth : _w;
            me.width = _w + 'px';
            me.chartEvents = {
                legendselectchanged(e) {
                    switch (e.name) {
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
            //月视图
            monthLineData(data) {
                let me = this;
                let thisYearMonthX = new Date(me.timeStamp).Format('Y年MM月');
                let lastYearMonthX = new Date(me.timeStamp).Format('Y') - 1 + '年' + new Date(me.timeStamp).Format('MM月');
                let tmp = {
                    data: {
                        columns: ['xAxis', thisYearMonthX, lastYearMonthX],
                        rows: [
                            // {'xAxis': '1', [thisYearMonthX]: null, [lastYearMonthX]: null},
                            // {'xAxis': '2', [thisYearMonthX]: null, [lastYearMonthX]: null},
                            // {'xAxis': '3', [thisYearMonthX]: null, [lastYearMonthX]: null},
                            // {'xAxis': '4', [thisYearMonthX]: null, [lastYearMonthX]: null},
                            // {'xAxis': '5', [thisYearMonthX]: null, [lastYearMonthX]: null},
                            // {'xAxis': '6', [thisYearMonthX]: null, [lastYearMonthX]: null},
                            // {'xAxis': '7', [thisYearMonthX]: null, [lastYearMonthX]: null},
                            // {'xAxis': '8', [thisYearMonthX]: null, [lastYearMonthX]: null},
                            // {'xAxis': '9', [thisYearMonthX]: null, [lastYearMonthX]: null},
                            // {'xAxis': '10', [thisYearMonthX]: null, [lastYearMonthX]: null},
                            // {'xAxis': '11', [thisYearMonthX]: null, [lastYearMonthX]: null},
                            // {'xAxis': '12', [thisYearMonthX]: null, [lastYearMonthX]: null},
                            // {'xAxis': '13', [thisYearMonthX]: null, [lastYearMonthX]: null},
                            // {'xAxis': '14', [thisYearMonthX]: null, [lastYearMonthX]: null},
                            // {'xAxis': '15', [thisYearMonthX]: null, [lastYearMonthX]: null},
                            // {'xAxis': '16', [thisYearMonthX]: null, [lastYearMonthX]: null},
                            // {'xAxis': '17', [thisYearMonthX]: null, [lastYearMonthX]: null},
                            // {'xAxis': '18', [thisYearMonthX]: null, [lastYearMonthX]: null},
                            // {'xAxis': '19', [thisYearMonthX]: null, [lastYearMonthX]: null},
                            // {'xAxis': '20', [thisYearMonthX]: null, [lastYearMonthX]: null},
                            // {'xAxis': '21', [thisYearMonthX]: null, [lastYearMonthX]: null},
                            // {'xAxis': '22', [thisYearMonthX]: null, [lastYearMonthX]: null},
                            // {'xAxis': '23', [thisYearMonthX]: null, [lastYearMonthX]: null},
                            // {'xAxis': '24', [thisYearMonthX]: null, [lastYearMonthX]: null},
                            // {'xAxis': '25', [thisYearMonthX]: null, [lastYearMonthX]: null},
                            // {'xAxis': '26', [thisYearMonthX]: null, [lastYearMonthX]: null},
                            // {'xAxis': '27', [thisYearMonthX]: null, [lastYearMonthX]: null},
                            // {'xAxis': '28', [thisYearMonthX]: null, [lastYearMonthX]: null},
                            // {'xAxis': '29', [thisYearMonthX]: null, [lastYearMonthX]: null},
                            // {'xAxis': '30', [thisYearMonthX]: null, [lastYearMonthX]: null},
                            // {'xAxis': '31', [thisYearMonthX]: null, [lastYearMonthX]: null}
                        ]
                    },
                    colors: ['#ff6900', 'rgba(255,105,0,.4)']
                };
                if (!isEmpty(data)) {
                    //本年本月数据
                    let thisMonthDetail = data.thisMonthDetail;
                    me.rendData(thisMonthDetail, thisYearMonthX, tmp);
                    //去年本月数据
                    let lastYearMonthDetail = data.lastYearMonthDetail;
                    me.rendData(lastYearMonthDetail, lastYearMonthX, tmp);
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
                            [lastWeekX]: me.wkStatus,
                            [lastYearX]: me.yeStatus
                        }
                    },
                    colors: ['#ff6900', '#5ab1ef', '#fa6e86', '#ffb980'],
                    settings: {},
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
            rendData(arr, which, tmp) {
                let me = this;
                let tmpData = [];
                let dataType;
                if (!isEmpty(arr)) {
                    switch (me.type) {
                        case 0:
                            dataType = 'payAmount';
                            break;
                        case 1:
                            dataType = 'payOrderNum';
                            break;
                        case 2:
                            dataType = 'avgPayAmount';
                            break;
                    }
                    arr.map((el) => {
                        tmpData.push(el[dataType]);
                    });
                    tmpData.map((el, i) => {
                        if (tmp.data.rows[i]) {
                            if (Object.keys(tmp.data.rows[i])[0] !== 'xAxis') {
                                tmp.data.rows.push({'xAxis': i + 1});
                            }
                        } else {
                            tmp.data.rows.push({'xAxis': i + 1});
                        }
                        tmp.data.rows[i][which] = el;
                    });
                }
            },
            rendDayData(arr, which, tmp) {
                if (!isEmpty(arr)) {
                    Object.values(arr).map((el, i) => {
                        tmp.data.rows[i][which] = el;
                    });
                }
            },
            //获取展示月的天数
            getDaysInMonth() {
                let me = this;
                let d = new Date(new Date(me.timeStamp).Format('Y'), new Date(me.timeStamp).Format('M'), 0);
                return d.getDate();
            }
        }
    }
</script>

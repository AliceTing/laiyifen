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
    </div>
</template>

<script>
    import {isEmpty, getValue} from "Public/util";

    export default {
        components: {},
        props: {
            total: '',
            type: '',
            time: '',
            year: '',
            month: '',
            day: '',
            mondayTime: ''
        },
        data() {
            return {}
        },
        created() {
        },
        mounted() {
        },
        methods: {
            //月视图
            monthLineData(data) {
                let me = this;
                let thisYearMonthX = me.year + '年' + me.month + '月';
                let lastYearMonthX = (me.year - 1) + '年' + me.month + '月';
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
                            {'xAxis': '31', [thisYearMonthX]: 0, [lastYearMonthX]: 0},
                        ]
                    },
                    settings: {},
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
                let tmp = {
                    data: {
                        columns: ['xAxis'],
                        rows: []
                    },
                    settings: {},
                };
                if (!isEmpty(data)) {
                    //24小时
                    let len = 24;
                    let dayLineArr = [];
                    let curDay = me.year + me.year + me.day;
                    switch (me.type) {
                        //支付金额
                        case 0:
                            //当天
                            let curDayDetail = data.curDayDetail;
                            //周同比
                            let preWeekDayDetail = data.preWeekDayDetail;
                            //当天
                            if (!isEmpty(curDayDetail)) {
                                tmp.data.columns.push(curDay);
                                Object.values(curDayDetail).map((el, index) => {
                                    dayLineArr[index] = {
                                        'curDayDetail': el
                                    };
                                });
                            }
                            //周同比
                            if (!isEmpty(preWeekDayDetail)) {
                                tmp.data.columns.push('周同比');
                                Object.values(preWeekDayDetail).map((el, index) => {
                                    if (dayLineArr.length === len) {
                                        dayLineArr[index].preWeekDayDetail = el;
                                    } else {
                                        dayLineArr[index] = {
                                            'preWeekDayDetail': el
                                        };
                                    }
                                });
                            }
                            break;
                        //周同比
                        //支付订单数
                        case 1:
                            break;
                        //单均价
                        case 2:
                            break;
                    }
                    if (dayLineArr.length > 0) {
                        dayLineArr.map((el, index) => {
                            tmp.data.rows.push({
                                'xAxis': index + 1,
                                curDay: el.curDayDetail,
                                '周同比': el.preWeekDayDetail,
                                '日环比': el.preDayDetail,
                                '年同比': el.preYearDayDetail,
                            });
                        })
                    }


                    // if (!isEmpty(preDayDetail)) {
                    //     tmp.data.columns.push('日环比');
                    //     Object.values(preDayDetail).map((el, index) => {
                    //         dayLineArr[index].preDayDetail = el;
                    //     });
                    // }
                    // if (!isEmpty(preYearDayDetail)) {
                    //     tmp.data.columns.push('年同比');
                    //     Object.values(preYearDayDetail).map((el, index) => {
                    //         dayLineArr[index].preYearDayDetail = el;
                    //     });
                    // }
                    //上一天数据
                    // let lastMonthDetail = data.lastMonthDetail;
                    // if (lastMonthDetail && lastMonthDetail.length > 0) {
                    //     tmp.data.columns.push(me.year - 1);
                    //     tmp.settings.metrics.push(me.year - 1 + '');
                    //     lastMonthDetail.map((el, index) => {
                    //         if (tmp.data.rows[index]) {
                    //             tmp.data.rows[index][me.year - 1 + ''] = el.payAmount;
                    //         }
                    //     })
                    // }
                    // console.log('tmp', tmp);
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
                    //初始化时设定31天，实际展示要根据展示月天数
                    for (let a = 0; a < 31 - getDaysInMonth(); a++) {
                        tmp.data.rows.pop();
                        tmpData.pop();
                    }
                    tmpData.map((el, i) => {
                        tmp.data.rows[i][which] = el;
                    });
                }

                //获取展示月的天数
                function getDaysInMonth() {
                    let curDate = new Date();
                    let curMonth = me.month;
                    curDate.setMonth(curMonth);
                    curDate.setDate(0);
                    return curDate.getDate();
                }

            }
        }
    }
</script>

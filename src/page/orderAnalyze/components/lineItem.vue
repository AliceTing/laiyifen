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
            day: ''
        },
        data() {
            return {

            }
        },
        created() {
        },
        mounted() {
        },
        methods: {
            //月视图
            monthLineData(data) {
                let me = this;
                let tmp = {
                    data: {
                        columns: ['xAxis'],
                        rows: []
                    },
                    settings: {},
                };
                //当前年、月数据
                let thisMonthDetail = data.thisMonthDetail;
                if (thisMonthDetail) {
                    let xAxis;
                    tmp.data.columns.push(me.month + '');
                    thisMonthDetail.map((el) => {
                        xAxis = el.dt.substr(-2, 2);
                        tmp.data.rows.push({
                            'xAxis': xAxis,
                            [me.month + '']: +[el.payAmount]
                        })
                    });
                    tmp.settings = {
                        labelMap: {
                            [me.month + '']: me.year + '年' + me.month + '日'
                        }
                    }
                }
                //上一月数据 FIXME
                let lastMonthDetail = data.lastMonthDetail;
                if (lastMonthDetail && lastMonthDetail.length > 0) {
                    tmp.data.columns.push(me.year - 1);
                    tmp.settings.metrics.push(me.year - 1 + '');
                    lastMonthDetail.map((el, index) => {
                        if (tmp.data.rows[index]) {
                            tmp.data.rows[index][me.year - 1 + ''] = el.payAmount;
                        }
                    })
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
                                    if(dayLineArr.length === len){
                                        dayLineArr[index].preWeekDayDetail = el;
                                    }else{
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
            }
        },
        computed: {
            // showDayLine(){
            //     let me = this;
            //     console.log(getValue(me.total,'curDayDetail'));
            //     return me.total && me.total.curDayDetail;
            // }
        }
    }
</script>

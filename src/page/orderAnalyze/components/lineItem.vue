<style lang="scss" scoped>
    @import '../../../public/assets/scss/mix.scss';
</style>
<template>
    <div class="line">
        <div v-show="time === 'day'">
            <ve-line :data="dayLineData(total).data"
                     :settings="dayLineData(total).settings"
                     :colors="dayLineData(total).colors"></ve-line>
        </div>
        <div v-show="time ==='month'">
            <ve-line :data="monthLineData(total).data"
                     :settings="monthLineData(total).settings"
                     :colors="monthLineData(total).colors"></ve-line>
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
            curTimeStamp:0,
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
                let lastDayX;
                if(me.timeStamp === me.curTimeStamp){
                    thisDayX = '今天';
                }else if(me.timeStamp+me.oneDayLong === me.curTimeStamp){
                    thisDayX = '昨天';
                }else{
                    thisDayX = new Date(me.timeStamp).Format('Y年MM月dd日');
                }
                // lastDayX = new Date(me.timeStamp - me.oneDayLong).Format('Y年MM月dd日');
                lastDayX = '周同比';
                let tmp = {
                    data: {
                        columns: ['xAxis', thisDayX, lastDayX],
                        rows: [
                            {'xAxis': '1', [thisDayX]: null, [lastDayX]: null},
                            {'xAxis': '2', [thisDayX]: null, [lastDayX]: null},
                            {'xAxis': '3', [thisDayX]: null, [lastDayX]: null},
                            {'xAxis': '4', [thisDayX]: null, [lastDayX]: null},
                            {'xAxis': '5', [thisDayX]: null, [lastDayX]: null},
                            {'xAxis': '6', [thisDayX]: null, [lastDayX]: null},
                            {'xAxis': '7', [thisDayX]: null, [lastDayX]: null},
                            {'xAxis': '8', [thisDayX]: null, [lastDayX]: null},
                            {'xAxis': '9', [thisDayX]: null, [lastDayX]: null},
                            {'xAxis': '10', [thisDayX]: null, [lastDayX]: null},
                            {'xAxis': '11', [thisDayX]: null, [lastDayX]: null},
                            {'xAxis': '12', [thisDayX]: null, [lastDayX]: null},
                            {'xAxis': '13', [thisDayX]: null, [lastDayX]: null},
                            {'xAxis': '14', [thisDayX]: null, [lastDayX]: null},
                            {'xAxis': '15', [thisDayX]: null, [lastDayX]: null},
                            {'xAxis': '16', [thisDayX]: null, [lastDayX]: null},
                            {'xAxis': '17', [thisDayX]: null, [lastDayX]: null},
                            {'xAxis': '18', [thisDayX]: null, [lastDayX]: null},
                            {'xAxis': '19', [thisDayX]: null, [lastDayX]: null},
                            {'xAxis': '20', [thisDayX]: null, [lastDayX]: null},
                            {'xAxis': '21', [thisDayX]: null, [lastDayX]: null},
                            {'xAxis': '22', [thisDayX]: null, [lastDayX]: null},
                            {'xAxis': '23', [thisDayX]: null, [lastDayX]: null},
                            {'xAxis': '24', [thisDayX]: null, [lastDayX]: null},
                        ]
                    },
                    colors:['#ff6900','rgba(255,105,0,.4)'],
                    settings: {},
                };
                if (!isEmpty(data)) {
                    // 当天
                    let curDayDetail = data.curDayDetail;
                    me.rendDayDate(curDayDetail,thisDayX,tmp);
                    //周同比
                    let preDayDetail = data.preWeekDayDetail;
                    me.rendDayDate(preDayDetail,lastDayX,tmp);
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
                    for (let a = 0; a < 31 - me.getDaysInMonth(); a++) {
                        tmp.data.rows.pop();
                        tmpData.pop();
                    }
                    tmpData.map((el, i) => {
                        tmp.data.rows[i][which] = el;
                    });
                }
            },
            rendDayDate(arr,which,tmp){
                if (!isEmpty(arr)) {
                    Object.values(arr).map((el, i) => {
                        tmp.data.rows[i][which] = el;
                    });
                }
            },
            //获取展示月的天数
            getDaysInMonth(){
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

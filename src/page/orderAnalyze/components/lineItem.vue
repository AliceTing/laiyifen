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
                let lastYearMonthX = new Date(me.timeStamp - me.oneDayLong * me.getDaysInMonth()).Format('Y年MM月');
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
                    colors:['#ff6900','rgba(255,105,0,.4)'],
                    settings: {},
                };
                if (!isEmpty(data)) {
                    // 当天
                    let curDayDetail = data.curDayDetail;
                    me.rendDayDate(curDayDetail,thisDayX,tmp);
                    //昨天
                    let preDayDetail = data.preDayDetail;
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

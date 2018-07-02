<style lang="scss" scoped>
    @import '../../../public/assets/scss/mix.scss';

    .center{
        margin-left: auto;
        margin-right: auto;
    }
</style>
<template>
    <div class="year_histogram">
        <div v-show="time ==='year'">
            <ve-histogram :width="width"
                          class="center"
                          :data="yearHistogramData(total).data"
                          :settings="yearHistogramData(total).settings"
                          :colors="yearHistogramData(total).colors"></ve-histogram>
        </div>
        <div v-show="time === 'week'">
            <ve-histogram :width="width"
                          class="center"
                          :data="weekHistogramData(total).data"
                          :settings="weekHistogramData(total).settings"
                          :colors="weekHistogramData(total).colors"
                          :tooltip="weekHistogramData(total).tooltip"
                          :grid="weekHistogramData(total).grid"></ve-histogram>
        </div>
    </div>
</template>

<script>
    import {isEmpty} from 'Public/util/';
    import echarts from 'echarts';

    export default {
        components: {},
        props: {
            total: {},
            mondayTime: '',
            sundayTime: '',
            time: '',
            type: '',
            timeStamp: 0,
            oneDayLong: 0,
            year: ''
        },
        data() {
            return {
                dataType: '',
                width: ''
            }
        },
        created() {
            let me = this;
            let maxWidth = 414;
            let _w = parseInt(window.getComputedStyle(document.querySelector('body')).getPropertyValue('width'));
            _w > maxWidth ? _w = maxWidth : _w;
            me.width = _w + 'px';
        },
        mounted() {
        },
        methods: {
            yearHistogramData(data) {
                let me = this;
                let thisYearX = me.year + '年';
                let lastYearX = me.year - 1 + '年';
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
                    },
                    colors: ['#ff6900', 'rgba(255,105,0,.4)'],
                    settings: {}
                };
                if (!isEmpty(data)) {
                    //当年数据
                    me.rendYearData(data.thisYearDetail, thisYearX, tmp);
                    //去年数据
                    me.rendYearData(data.lastYearDetail, lastYearX, tmp);
                }
                return tmp;
            },
            weekHistogramData(data) {
                let me = this;
                let oneWeek = 7;
                let oneDayLong = 24 * 60 * 60 * 1000;
                let thisWeekX;
                let lastWeekX;
                thisWeekX = ifShowYear(me.mondayTime, me.sundayTime);
                lastWeekX = ifShowYear(me.mondayTime - oneWeek * oneDayLong, me.sundayTime - oneWeek * oneDayLong);
                //不跨年不需要显示年
                function ifShowYear(start, end) {
                    let tmp;
                    if (new Date(start).Format('Y') === new Date(end).Format('Y')) {
                        tmp = new Date(start).Format('MM月dd日') + '至' + new Date(end).Format('MM月dd日');
                    } else {
                        tmp = new Date(start).Format('Y年MM月dd日') + '至' + new Date(end).Format('Y年MM月dd日');
                    }
                    return tmp;
                }

                let tmp = {
                    data: {
                        columns: ['xAxis', thisWeekX, lastWeekX],
                        rows: [
                            {'xAxis': '周一', [thisWeekX]: 0, [lastWeekX]: 0},
                            {'xAxis': '周二', [thisWeekX]: 0, [lastWeekX]: 0},
                            {'xAxis': '周三', [thisWeekX]: 0, [lastWeekX]: 0},
                            {'xAxis': '周四', [thisWeekX]: 0, [lastWeekX]: 0},
                            {'xAxis': '周五', [thisWeekX]: 0, [lastWeekX]: 0},
                            {'xAxis': '周六', [thisWeekX]: 0, [lastWeekX]: 0},
                            {'xAxis': '周日', [thisWeekX]: 0, [lastWeekX]: 0}
                        ]
                    },
                    tooltip: {
                        position: [5,30]
                    },
                    grid: {
                        top: 80,
                        bottom: 10
                    },
                    colors: ['#ff6900', 'rgba(255,105,0,.4)'],
                    settings: {}
                };
                if (!isEmpty(data)) {
                    //本周数据
                    let thisWeekDetail = data.thisWeekDetail;
                    me.rendData(thisWeekDetail, thisWeekX, tmp);
                    //上周数据
                    let lastWeekDetail = data.lastWeekDetail;
                    me.rendData(lastWeekDetail, lastWeekX, tmp);
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
                        case 3:
                            dataType = 'orderConRate';
                            break;
                    }
                    arr.map((el) => {
                        tmpData.push(el[dataType]);
                    });
                    tmpData.map((el, i) => {
                        tmp.data.rows[i][which] = el;
                    })
                }
            },
            rendYearData(arr, which, tmp) {
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
                        dataType = 'avgPayAmount';
                        break;
                    case 3:
                        dataType = 'orderConRate';
                        break;
                }
                if (!isEmpty(arr)) {
                    arr.map((el) => {
                        tmp.data.rows[el.month - 1][which] = el[dataType];
                    });
                }
            }
        },
        computed: {}
    }
</script>

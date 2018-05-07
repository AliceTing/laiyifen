<style lang="scss" scoped>
    @import '../../../public/assets/scss/mix.scss';
</style>
<template>
    <div class="year_histogram">
        <div v-show="time === 'week'">
            <ve-histogram :data="weekHistogramData(total).data"
                          :settings="weekHistogramData(total).settings"></ve-histogram>
        </div>
    </div>
</template>

<script>
    import {isEmpty} from 'Public/util/';

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
                dataType: ''
            }
        },
        created() {
        },
        mounted() {
        },
        methods: {
            weekHistogramData(data) {
                let me = this;
                let oneWeek = 7;
                let oneDayLong = 24 * 60 * 60 * 1000;
                let thisWeekX = new Date(me.mondayTime).Format('Y年MM月dd日') + '至' + new Date(me.sundayTime).Format('Y年MM月dd日');
                let lastWeekX = new Date(me.mondayTime - oneWeek * oneDayLong).Format('Y年MM月dd日') + '至' + new Date(me.sundayTime - oneWeek * oneDayLong).Format('Y年MM月dd日');
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
                    settings: {}
                };
                if (!isEmpty(data)) {
                    //客单价
                    if (me.type === 4) {
                        me.rendData(data.curWeekDetail, thisWeekX, tmp, 'this');
                        me.rendData(data.preWeekDetail, lastWeekX, tmp, 'last');
                    } else {
                        //其他
                        me.rendData(data.curWeekChartInfo, thisWeekX, tmp);
                        me.rendData(data.preWeekChartInfo, lastWeekX, tmp);
                    }
                }
                return tmp;
            },
            rendData(arr, which, tmp, diff) {
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
                        tmpData.map((el, i) => {
                            tmp.data.rows[i][which] = el;
                        })
                    }

                    function specialData(arr, which, tmp, diff) {
                        arr.map((el, i) => {
                            if (Object.values(el) && Object.values(el)[0][diff + 'WeekNuitPrice']) {
                                tmp.data.rows[i][which] = Object.values(el)[0][diff + 'WeekNuitPrice'];
                            }
                        })
                    }
                }
            }
        },
        computed: {},
    }
</script>

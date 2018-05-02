<style lang="scss" scoped>
    @import '../../../public/assets/scss/mix.scss';
</style>
<template>
    <div class="year_histogram">
        <div v-show="time ==='year'">
            <ve-histogram :data="yearHistogramData(total).data"
                          :settings="yearHistogramData(total).settings"></ve-histogram>
        </div>
        <div v-show="time === 'week'">
            <ve-line :data="weekHistogramData(total).data"
                     :settings="weekHistogramData(total).settings"></ve-line>
        </div>
    </div>
</template>

<script>
    export default {
        components: {},
        props: {
            total: {},
            year: '',
            time: ''
        },
        data() {
            return {}
        },
        created() {
        },
        mounted() {
        },
        methods: {
            yearHistogramData(data) {
                let me = this;
                let tmp = {
                    data: {
                        columns: ['xAxis', me.year + ''],
                        rows: []
                    },
                    settings: {
                        metrics: [me.year + '']
                    }
                };
                //当前年数据
                let thisYearDetail = data.thisYearDetail;
                if (thisYearDetail) {
                    thisYearDetail.map((el) => {
                        tmp.data.rows.push({
                            'xAxis': [el.month] + '月',
                            [me.year]: +[el.payAmount]
                        })
                    });
                }
                //前一年数据
                let lastYearDetail = data.lastYearDetail;
                if (lastYearDetail && lastYearDetail.length > 0) {
                    tmp.data.columns.push(me.year - 1);
                    tmp.settings.metrics.push(me.year - 1 + '');
                    lastYearDetail.map((el, index) => {
                        if (tmp.data.rows[index]) {
                            tmp.data.rows[index][me.year - 1 + ''] = el.payAmount;
                        }
                    })
                }
                return tmp;
            },
            weekHistogramData(data) {
                let me = this;
                let tmp = {
                    data: {
                        columns: ['xAxis', me.year + ''],
                        rows: []
                    },
                    settings: {
                        metrics: [me.year + '']
                    }
                };

                //当前周数据
                let thisWeekDetail = data.thisWeekDetail;
                if (thisWeekDetail) {

                    thisWeekDetail.map((el) => {
                        let weekRv;
                        try {
                            console.log(new Date([el.dt]).getDay());
                            switch (new Date([el.dt]).getDay()) {
                                case 1:
                                    weekRv = '一';
                                    break;
                                case 2:
                                    weekRv = '二';
                                    break;
                                case 3:
                                    weekRv = '三';
                                    break;
                                case 4:
                                    weekRv = '四';
                                    break;
                                case 5:
                                    weekRv = '五';
                                    break;
                                case 6:
                                    weekRv = '六';
                                    break;
                                case 0:
                                    weekRv = '日';
                                    break;
                            }
                        } catch (e) {

                        }

                        tmp.data.rows.push({
                            'xAxis': '周' + weekRv,
                            [me.year]: +[el.payAmount]
                        })
                    });
                }
                return tmp;
            }
        },
        computed: {}
    }
</script>

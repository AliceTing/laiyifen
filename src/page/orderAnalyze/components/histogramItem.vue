<style lang="scss" scoped>
    @import '../../../public/assets/scss/mix.scss';
</style>
<template>
    <div class="year_histogram">
        <ve-histogram :data="yearHistogramData(yearHistogram).data"
                      :settings="yearHistogramData(yearHistogram).settings"></ve-histogram>
    </div>
</template>

<script>
    export default {
        components: {},
        props: {
            yearHistogram: {},
            year: ''
        },
        data() {
            return {
                chartData: {},
                chartSettings: {}
            }
        },
        created() {
        },
        mounted() {
        },
        methods: {
            yearHistogramData(data) {
                let me = this;
                let xYear;
                let tmp = {
                    data: {
                        columns: ['xAxis', me.year + ''],
                        rows: []
                    },
                    settings: {
                        metrics: [me.year+'']
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
                    tmp.data.columns.push(me.year-1);
                    tmp.settings.metrics.push(me.year-1+'');
                    lastYearDetail.map((el,index) => {
                        if(tmp.data.rows[index]){
                            tmp.data.rows[index][me.year-1+''] = el.payAmount;
                        }
                    })
                }
                return tmp;

            }
        },
        computed: {}
    }
</script>

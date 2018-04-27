<style lang="scss" scoped>
    @import '../../../public/assets/scss/mix.scss';
</style>
<template>
    <div class="month_line">
        <ve-line :data="monthLineData(monthLine).data"
                 :settings="monthLineData(monthLine).settings"></ve-line>
    </div>
</template>

<script>
    export default {
        components: {},
        props: {
            monthLine: {},
            year:'',
            month: ''
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
            monthLineData(data) {
                let me = this;
                let xYear;
                let tmp = {
                    data: {
                        columns: ['xAxis', me.month + ''],
                        rows: []
                    },
                    settings: {
                        metrics: [me.month + ''],
                        labelMap:{
                           [me.month + '']: me.year+'年'+me.month + '日'
                        }
                    },

                };
                //当前年月数据
                let thisMonthDetail = data.thisMonthDetail;
                if (thisMonthDetail) {
                    thisMonthDetail.map((el) => {
                        let xAxis = el.dt.substr(-2, 2);
                        tmp.data.rows.push({
                            'xAxis': xAxis,
                            [me.month + '']: +[el.payAmount]
                        })
                    });
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

            }
        },
        computed: {}
    }
</script>

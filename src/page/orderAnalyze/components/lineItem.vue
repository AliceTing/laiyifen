<style lang="scss" scoped>
    @import '../../../public/assets/scss/mix.scss';
</style>
<template>
    <div class="line">
        <div v-show="time ==='month'">
            <ve-line :data="monthLineData(total).data"
                     :settings="monthLineData(total).settings"></ve-line>
        </div>

        <div v-show="time === 'day'">
            <ve-line :data="dayLineData(total).data"
                     :settings="dayLineData(total).settings"></ve-line>
        </div>
    </div>
</template>

<script>
    export default {
        components: {},
        props: {
            total: {},
            time: '',
            year: '',
            month: '',
            day: ''
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
                    tmp.data.columns.push(me.month + '');
                    thisMonthDetail.map((el) => {
                        let xAxis = el.dt.substr(-2, 2);
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
                //当前年、月数据
                let curDayDetail = data.curDayDetail;
                if (curDayDetail) {
                    // tmp.data.columns.push(me.day + '');
                    // thisMonthDetail.map((el) => {
                    //     let xAxis = el.dt.substr(-2, 2);
                    //     tmp.data.rows.push({
                    //         'xAxis': xAxis,
                    //         [me.month + '']: +[el.payAmount]
                    //     })
                    // });
                    // tmp.settings = {
                    //     labelMap: {
                    //         [me.month + '']: me.year + '年' + me.month + '日'
                    //     }
                    // }
                }
                //上一天数据
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

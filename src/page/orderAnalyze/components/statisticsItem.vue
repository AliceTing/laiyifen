<style lang="scss" scoped>
    @import '../../../public/assets/scss/mix.scss';

    $mainColor: #ff6900;

    .data_statistics {
        background-color: $mainColor;
        color: #fff;
        .item {
            float: left;
            width: 50%;
            height: px2rem(175);
            padding: px2rem(40) 0;
            text-align: center;
            .title {
                font-size: px2rem(28);
            }
            .value {
                margin-top: px2rem(10);
                font-size: px2rem(40);
            }
        }
    }
</style>
<template>
    <section class="section_statistics">
        <div class="data_statistics clearfix">
            <!--日-->
            <div v-show="time ==='day'">
                <div class="item">
                    <div class="title">当日累计</div>
                    <div class="value">{{total.curDayTotalPayAmount?total.curDayTotalPayAmount:0}}元</div>
                </div>
                <div class="item">
                    <div class="title">昨日累计</div>
                    <div class="value">{{total.preDayTotalPayAmount?total.preDayTotalPayAmount:0}}</div>
                </div>
                <div class="item">
                    <div class="title">日环比</div>
                    <div class="value">{{total.dayPayAmountPercent?total.dayPayAmountPercent:0}}</div>
                </div>
                <div class="item">
                    <div class="title">上周同期</div>
                    <div class="value">{{total.preWeekDayTotalPayAmount?total.preWeekDayTotalPayAmount:0}}</div>
                </div>
                <div class="item">
                    <div class="title">周同比</div>
                    <div class="value">{{total.weekPayAmountPercent?total.weekPayAmountPercent:0}}</div>
                </div>
            </div>
            <!--周-->
            <div v-show="time ==='week'">
                <div class="item">
                    <div class="title">当周累计</div>
                    <div class="value" v-show="type === 0">{{total.thisWeekTotalPayAmount?total.thisWeekTotalPayAmount:0}}元</div>
                    <div class="value" v-show="type === 1">{{total.thisWeekPayOrderNum?total.thisWeekPayOrderNum:0}}件</div>
                    <div class="value" v-show="type === 2">{{total.thisWeekAvgAmount?total.thisWeekAvgAmount:0}}元</div>
                </div>
                <div class="item">
                    <div class="title">上周累计</div>
                    <div class="value" v-show="type === 0">{{total.lastWeekTotalPayAmount?total.lastWeekTotalPayAmount:0}}元</div>
                    <div class="value" v-show="type === 1">{{total.lastWeekPayOrderNum?total.lastWeekPayOrderNum:0}}件</div>
                    <div class="value" v-show="type === 2">{{total.lastWeekAvgAmount?total.lastWeekAvgAmount:0}}元</div>
                </div>
                <div class="item">
                    <div class="title">周环比</div>
                    <div class="value" v-show="type === 0">{{total.weekPayAmountPercent?total.weekPayAmountPercent:0}}</div>
                    <div class="value" v-show="type === 1">{{total.weekPayOrderNumPercent?total.weekPayOrderNumPercent:0}}</div>
                    <div class="value" v-show="type === 2">{{total.weekAvgAmountPercent?total.weekAvgAmountPercent:0}}</div>
                </div>
                <div class="item">
                    <div class="title">去年同期</div>
                    <div class="value" v-show="type === 0">{{total.lastYearWeekTotalPayAmount?total.lastYearWeekTotalPayAmount:0}}</div>
                    <div class="value" v-show="type === 1">{{total.lastYearWeekPayOrderNum?total.lastYearWeekPayOrderNum:0}}</div>
                    <div class="value" v-show="type === 2">{{total.lastYearWeekAvgAmount?total.lastYearWeekAvgAmount:0}}</div>
                </div>
                <div class="item">
                    <div class="title">年同比</div>
                    <div class="value" v-show="type === 0">{{total.yearPayAmountPercent?total.yearPayAmountPercent:0}}</div>
                    <div class="value" v-show="type === 1">{{total.yearPayOrderNumPercent?total.yearPayOrderNumPercent:0}}</div>
                    <div class="value" v-show="type === 2">{{total.yearAvgAmountPercent?total.yearAvgAmountPercent:0}}</div>
                </div>
            </div>
            <!--月-->
            <div v-show="time ==='month'">
                <div class="item">
                    <div class="title">当月累计</div>
                    <div class="value" v-show="type === 0">{{total.thisMonthTotalPayAmount?total.thisMonthTotalPayAmount:0}}元</div>
                    <div class="value" v-show="type === 1">{{total.thisMonthPayOrderNum?total.thisMonthPayOrderNum:0}}件</div>
                    <div class="value" v-show="type === 2">{{total.thisMonthAvgAmount?total.thisMonthAvgAmount:0}}元</div>
                </div>
                <div class="item">
                    <div class="title">上月累计</div>
                    <div class="value" v-show="type === 0">{{total.lastMonthTotalPayAmount?total.lastMonthTotalPayAmount:0}}元</div>
                    <div class="value" v-show="type === 1">{{total.lastMonthPayOrderNum?total.lastMonthPayOrderNum:0}}件</div>
                    <div class="value" v-show="type === 2">{{total.lastMonthAvgAmount?total.lastMonthAvgAmount:0}}元</div>
                </div>
                <div class="item">
                    <div class="title">月环比</div>
                    <div class="value" v-show="type === 0">{{total.monthPayAmountPercent?total.monthPayAmountPercent:0}}</div>
                    <div class="value" v-show="type === 1">{{total.monthPayOrderNumPercent?total.monthPayOrderNumPercent:0}}</div>
                    <div class="value" v-show="type === 2">{{total.monthAvgAmountPercent?total.monthAvgAmountPercent:0}}</div>
                </div>
                <div class="item">
                    <div class="title">去年同期</div>
                    <div class="value" v-show="type === 0">{{total.lastYearMonthTotalPayAmount?total.lastYearMonthTotalPayAmount:0}}</div>
                    <div class="value" v-show="type === 1">{{total.lastYearMonthPayOrderNum?total.lastYearMonthPayOrderNum:0}}</div>
                    <div class="value" v-show="type === 2">{{total.lastYearMonthAvgAmount?total.lastYearMonthAvgAmount:0}}</div>
                </div>
                <div class="item">
                    <div class="title">年同比</div>
                    <div class="value" v-show="type === 0">{{total.yearPayAmountPercent?total.yearPayAmountPercent:0}}</div>
                    <div class="value" v-show="type === 1">{{total.yearPayOrderNumPercent?total.yearPayOrderNumPercent:0}}</div>
                    <div class="value" v-show="type === 2">{{total.yearAvgAmountPercent?total.yearAvgAmountPercent:0}}</div>
                </div>
            </div>
            <!--年-->
            <div v-show="time ==='year'">
                <div class="item">
                    <div class="title">当年累计</div>
                    <div class="value" v-show="type === 0">{{total.thisYearTotalPayAmount?total.thisYearTotalPayAmount:0}}元</div>
                    <div class="value" v-show="type === 1">{{total.thisYearPayOrderNum?total.thisYearPayOrderNum:0}}件</div>
                    <div class="value" v-show="type === 2">{{total.thisYearAvgAmount?total.thisYearAvgAmount:0}}元</div>
                </div>
                <div class="item">
                    <div class="title">去年累计</div>
                    <div class="value" v-show="type === 0">{{total.lastYearTotalPayAmount?total.lastYearTotalPayAmount:0}}元</div>
                    <div class="value" v-show="type === 1">{{total.lastYearPayOrderNum?total.lastYearPayOrderNum:0}}件</div>
                    <div class="value" v-show="type === 2">{{total.lastYearAvgAmount?total.lastYearAvgAmount:0}}元</div>
                </div>
                <div class="item">
                    <div class="title">年环比</div>
                    <div class="value" v-show="type === 0">{{total.yearPayAmountPercent?total.yearPayAmountPercent:0}}</div>
                    <div class="value" v-show="type === 1">{{total.yearPayOrderNumPercent?total.yearPayOrderNumPercent:0}}</div>
                    <div class="value" v-show="type === 2">{{total.yearAvgAmountPercent?total.yearAvgAmountPercent:0}}</div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        components: {},
        props: {
            total: {},
            time: '',
            type: ''
        },
        data() {
            return {}
        },
        created() {
        },
        mounted() {
        },
        methods: {},
        computed: {}
    }
</script>

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
            <!--年-->
            <div v-show="time ==='year'">
                <div class="item">
                    <div class="title">当年累计</div>
                    <div class="value">{{total.thisYearTotalPayAmount?total.thisYearTotalPayAmount:0}}元</div>
                </div>
                <div class="item">
                    <div class="title">去年累计</div>
                    <div class="value">{{total.lastYearTotalPayAmount?total.lastYearTotalPayAmount:0}}</div>
                </div>
                <div class="item">
                    <div class="title">年环比</div>
                    <div class="value">{{total.yearAmountPercent?total.yearAmountPercent:0}}%</div>
                </div>
            </div>
            <!--月-->
            <div v-show="time ==='month'">
                <div class="item">
                    <div class="title">当月累计</div>
                    <div class="value">{{total.thisMonthTotalPayAmount?total.thisMonthTotalPayAmount:0}}元</div>
                </div>
                <div class="item">
                    <div class="title">上月累计</div>
                    <div class="value">{{total.lastMonthTotalPayAmount?total.lastMonthTotalPayAmount:0}}</div>
                </div>
                <div class="item">
                    <div class="title">月环比</div>
                    <div class="value">{{total.monthAmountPercent?total.monthAmountPercent:0}}%</div>
                </div>
                <div class="item">
                    <div class="title">去年同期</div>
                    <div class="value">{{total.lastYearMonthTotalPayAmount?total.lastYearMonthTotalPayAmount:0}}</div>
                </div>
                <div class="item">
                    <div class="title">年同比</div>
                    <div class="value">{{total.yearPayAmountPercent?total.yearPayAmountPercent:0}}%</div>
                </div>
            </div>
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
                    <div class="value">{{total.thisWeekTotalPayAmount?total.thisWeekTotalPayAmount:0}}元</div>
                </div>
                <div class="item">
                    <div class="title">上周累计</div>
                    <div class="value">{{total.lastWeekTotalPayAmount?total.lastWeekTotalPayAmount:0}}</div>
                </div>
                <div class="item">
                    <div class="title">周环比</div>
                    <div class="value">{{total.weekPayAmountPercent?total.weekPayAmountPercent:0}}</div>
                </div>
                <div class="item">
                    <div class="title">去年同期</div>
                    <div class="value">{{total.lastYearWeekTotalPayAmount?total.lastYearWeekTotalPayAmount:0}}</div>
                </div>
                <div class="item">
                    <div class="title">年同比</div>
                    <div class="value">{{total.yearPayAmountPercent?total.yearPayAmountPercent:0}}</div>
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
            day: ''
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

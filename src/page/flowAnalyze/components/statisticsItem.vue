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
            &:first-child{
                float: none;
                width: 100%;
                height: px2rem(125);
                padding: 0 0 0 px2rem(40);
                background-color: #fff;
                color: $mainColor;
                text-align: left;
                line-height: px2rem(125);
                .title,
                .value{
                    display: inline-block;
                }
                .value{
                    margin-top: 0;
                    span{
                        margin-left: px2rem(8);
                        font-size: px2rem(24);
                    }
                }
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
                    <div class="value" v-show="type === 0">{{total.curDayUV?total.curDayUV:0}}</div>
                    <div class="value" v-show="type === 1">{{total.curDayPV?total.curDayPV:0}}</div>
                    <div class="value" v-show="type === 2">{{total.curDayLoginUV?total.curDayLoginUV:0}}</div>
                    <div class="value" v-show="type === 3">{{total.curDayPaymentUv?total.curDayPaymentUv:0}}</div>
                    <div class="value" v-show="type === 4">{{total.curDayUnitPrice?total.curDayUnitPrice:0}}</div>
                    <div class="value" v-show="type === 5">{{total.curDayConversionRate?total.curDayConversionRate:0}}</div>
                </div>
                <div class="item">
                    <div class="title">昨日累计</div>
                    <div class="value" v-show="type === 0">{{total.preDayUV?total.preDayUV:0}}</div>
                    <div class="value" v-show="type === 1">{{total.preDayPV?total.preDayPV:0}}</div>
                    <div class="value" v-show="type === 2">{{total.preDayLoginUV?total.preDayLoginUV:0}}</div>
                    <div class="value" v-show="type === 3">{{total.preDayPaymentUv?total.preDayPaymentUv:0}}</div>
                    <div class="value" v-show="type === 4">{{total.preDayUnitPrice?total.preDayUnitPrice:0}}</div>
                    <div class="value" v-show="type === 5">{{total.preDayConversionRate?total.preDayConversionRate:0}}</div>
                </div>
                <div class="item">
                    <div class="title">上周同期</div>
                    <div class="value" v-show="type === 0">{{total.preWeekDayUV?total.preWeekDayUV:0}}</div>
                    <div class="value" v-show="type === 1">{{total.preWeekDayPV?total.preWeekDayPV:0}}</div>
                    <div class="value" v-show="type === 2">{{total.preWeekDayLoginUV?total.preWeekDayLoginUV:0}}</div>
                    <div class="value" v-show="type === 3">{{total.preWeekDayPaymentUv?total.preWeekDayPaymentUv:0}}</div>
                    <div class="value" v-show="type === 4">{{total.preWeekDayUnitPrice?total.preWeekDayUnitPrice:0}}</div>
                    <div class="value" v-show="type === 5">{{total.preWeekDayConversionRate?total.preWeekDayConversionRate:0}}</div>
                </div>
                <div class="item">
                    <div class="title">日环比</div>
                    <div class="value" v-show="type === 0">{{total.dayUVPercent?total.dayUVPercent:0}}</div>
                    <div class="value" v-show="type === 1">{{total.dayPVPercent?total.dayPVPercent:0}}</div>
                    <div class="value" v-show="type === 2">{{total.dayLoginUVPercent?total.dayLoginUVPercent:0}}</div>
                    <div class="value" v-show="type === 3">{{total.dayPaymentUvPercent?total.dayPaymentUvPercent:0}}</div>
                    <div class="value" v-show="type === 4">{{total.dayUnitPricePercent?total.dayUnitPricePercent:0}}</div>
                    <div class="value" v-show="type === 5">{{total.dayConversionRatePercent?total.dayConversionRatePercent:0}}</div>
                </div>
                <div class="item">
                    <div class="title">周环比</div>
                    <div class="value" v-show="type === 0">{{total.weekUVPercent?total.weekUVPercent:0}}</div>
                    <div class="value" v-show="type === 1">{{total.weekPVPercent?total.weekPVPercent:0}}</div>
                    <div class="value" v-show="type === 2">{{total.weekLoginUVPercent?total.weekLoginUVPercent:0}}</div>
                    <div class="value" v-show="type === 3">{{total.weekPaymentUvPercent?total.weekPaymentUvPercent:0}}</div>
                    <div class="value" v-show="type === 4">{{total.weekUnitPricePercent?total.weekUnitPricePercent:0}}</div>
                    <div class="value" v-show="type === 5">{{total.weekConversionRatePercent?total.weekConversionRatePercent:0}}</div>
                </div>
            </div>
            <!--周-->
            <div v-show="time ==='week'">
                <div class="item">
                    <div class="title">当周累计</div>
                    <div class="value" v-show="type === 0">{{total.curWeekUV?total.curWeekUV:0}}</div>
                    <div class="value" v-show="type === 1">{{total.curWeekPV?total.curWeekPV:0}}</div>
                    <div class="value" v-show="type === 2">{{total.curWeekLoginUV?total.curWeekLoginUV:0}}</div>
                    <div class="value" v-show="type === 3">{{total.curWeekPaymentUv?total.curWeekPaymentUv:0}}</div>
                    <div class="value" v-show="type === 4">{{total.curWeekUnitPrice?total.curWeekUnitPrice:0}}</div>
                    <div class="value" v-show="type === 5">{{total.curWeekConversionRate?total.curWeekConversionRate:0}}</div>
                </div>
                <div class="item">
                    <div class="title">上周累计</div>
                    <div class="value" v-show="type === 0">{{total.preWeekUV?total.preWeekUV:0}}</div>
                    <div class="value" v-show="type === 1">{{total.preWeekPV?total.preWeekPV:0}}</div>
                    <div class="value" v-show="type === 2">{{total.preWeekLoginUV?total.preWeekLoginUV:0}}</div>
                    <div class="value" v-show="type === 3">{{total.preWeekPaymentUv?total.preWeekPaymentUv:0}}</div>
                    <div class="value" v-show="type === 4">{{total.preWeekUnitPrice?total.preWeekUnitPrice:0}}</div>
                    <div class="value" v-show="type === 5">{{total.preWeekConversionRate?total.preWeekConversionRate:0}}</div>
                </div>
                <div class="item">
                    <div class="title">去年同期</div>
                    <div class="value" v-show="type === 0">{{total.preYearWeekPV?total.preYearWeekPV:0}}</div>
                    <div class="value" v-show="type === 1">{{total.preYearWeekPV?total.preYearWeekPV:0}}</div>
                    <div class="value" v-show="type === 2">{{total.preYearWeekLoginUV?total.preYearWeekLoginUV:0}}</div>
                    <div class="value" v-show="type === 3">{{total.preYearWeekPaymentUv?total.preYearWeekPaymentUv:0}}</div>
                    <div class="value" v-show="type === 4">{{total.preYearWeekUnitPrice?total.preYearWeekUnitPrice:0}}</div>
                    <div class="value" v-show="type === 5">{{total.preYearWeekConversionRate?total.preYearWeekConversionRate:0}}</div>
                </div>
                <div class="item">
                    <div class="title">周环比</div>
                    <div class="value" v-show="type === 0">{{total.weekUVPercent?total.weekUVPercent:0}}</div>
                    <div class="value" v-show="type === 1">{{total.weekPVPercent?total.weekPVPercent:0}}</div>
                    <div class="value" v-show="type === 2">{{total.weekLoginUVPercent?total.weekLoginUVPercent:0}}</div>
                    <div class="value" v-show="type === 3">{{total.weekPaymentUvPercent?total.weekPaymentUvPercent:0}}</div>
                    <div class="value" v-show="type === 4">{{total.weekUnitPricePercent?total.weekUnitPricePercent:0}}</div>
                    <div class="value" v-show="type === 5">{{total.weekConversionRatePercent?total.weekConversionRatePercent:0}}</div>
                </div>
                <div class="item">
                    <div class="title">年环比</div>
                    <div class="value" v-show="type === 0">{{total.yearUVPercent?total.yearUVPercent:0}}</div>
                    <div class="value" v-show="type === 1">{{total.yearPVPercent?total.yearPVPercent:0}}</div>
                    <div class="value" v-show="type === 2">{{total.yearLoginUVPercent?total.yearLoginUVPercent:0}}</div>
                    <div class="value" v-show="type === 3">{{total.yearPaymentUvPercent?total.yearPaymentUvPercent:0}}</div>
                    <div class="value" v-show="type === 4">{{total.yearUnitPricePercent?total.yearUnitPricePercent:0}}</div>
                    <div class="value" v-show="type === 5">{{total.yearConversionRatePercent?total.yearConversionRatePercent:0}}</div>
                </div>
            </div>
            <!--月-->
            <div v-show="time ==='month'">
                <div class="item">
                    <div class="title">当月累计</div>
                    <div class="value" v-show="type === 0">{{total.curMonthUV?total.curMonthUV:0}}</div>
                    <div class="value" v-show="type === 1">{{total.curMonthPV?total.curMonthPV:0}}</div>
                    <div class="value" v-show="type === 2">{{total.curMonthLoginUV?total.curMonthLoginUV:0}}</div>
                    <div class="value" v-show="type === 3">{{total.curMonthPaymentUv?total.curMonthPaymentUv:0}}</div>
                    <div class="value" v-show="type === 4">{{total.curMonthUnitPrice?total.curMonthUnitPrice:0}}</div>
                    <div class="value" v-show="type === 5">{{total.curMonthConversionRate?total.curMonthConversionRate:0}}</div>
                </div>
                <div class="item">
                    <div class="title">上月累计</div>
                    <div class="value" v-show="type === 0">{{total.preMonthUV?total.preMonthUV:0}}</div>
                    <div class="value" v-show="type === 1">{{total.preMonthPV?total.preMonthPV:0}}</div>
                    <div class="value" v-show="type === 2">{{total.preMonthLoginUV?total.preMonthLoginUV:0}}</div>
                    <div class="value" v-show="type === 3">{{total.preMonthPaymentUv?total.preMonthPaymentUv:0}}</div>
                    <div class="value" v-show="type === 4">{{total.preMonthUnitPrice?total.preMonthUnitPrice:0}}</div>
                    <div class="value" v-show="type === 5">{{total.preMonthConversionRate?total.preMonthConversionRate:0}}</div>
                </div>
                <div class="item">
                    <div class="title">去年同期</div>
                    <div class="value" v-show="type === 0">{{total.preYearMonthUV?total.preYearMonthUV:0}}</div>
                    <div class="value" v-show="type === 1">{{total.preYearMonthPV?total.preYearMonthPV:0}}</div>
                    <div class="value" v-show="type === 2">{{total.preYearMonthLoginUV?total.preYearMonthLoginUV:0}}</div>
                    <div class="value" v-show="type === 3">{{total.preYearMonthPaymentUv?total.preYearMonthPaymentUv:0}}</div>
                    <div class="value" v-show="type === 4">{{total.preYearMonthUnitPrice?total.preYearMonthUnitPrice:0}}</div>
                    <div class="value" v-show="type === 5">{{total.preYearMonthConversionRate?total.preYearMonthConversionRate:0}}</div>
                </div>
                <div class="item">
                    <div class="title">月环比</div>
                    <div class="value" v-show="type === 0">{{total.monthUVPercent?total.monthUVPercent:0}}</div>
                    <div class="value" v-show="type === 1">{{total.monthPVPercent?total.monthPVPercent:0}}</div>
                    <div class="value" v-show="type === 2">{{total.monthLoginUVPercent?total.monthLoginUVPercent:0}}</div>
                    <div class="value" v-show="type === 3">{{total.monthPaymentUvPercent?total.monthPaymentUvPercent:0}}</div>
                    <div class="value" v-show="type === 4">{{total.monthUnitPricePercent?total.monthUnitPricePercent:0}}</div>
                    <div class="value" v-show="type === 5">{{total.monthConversionRatePercent?total.monthConversionRatePercent:0}}</div>
                </div>
                <div class="item">
                    <div class="title">年同比</div>
                    <div class="value" v-show="type === 0">{{total.yearUVPercent?total.yearUVPercent:0}}</div>
                    <div class="value" v-show="type === 1">{{total.yearPVPercent?total.yearPVPercent:0}}</div>
                    <div class="value" v-show="type === 2">{{total.yearLoginUVPercent?total.yearLoginUVPercent:0}}</div>
                    <div class="value" v-show="type === 3">{{total.yearPaymentUvPercent?total.yearPaymentUvPercent:0}}</div>
                    <div class="value" v-show="type === 4">{{total.yearUnitPricePercent?total.yearUnitPricePercent:0}}</div>
                    <div class="value" v-show="type === 5">{{total.yearConversionRatePercent?total.yearConversionRatePercent:0}}</div>
                </div>
            </div>
            <!--年-->
            <div v-show="time ==='year'">
                <div class="item">
                    <div class="title">当年累计</div>
                    <div class="value" v-show="type === 0">{{total.curYearUV?total.curYearUV:0}}</div>
                    <div class="value" v-show="type === 1">{{total.curYearPV?total.curYearPV:0}}</div>
                    <div class="value" v-show="type === 2">{{total.curYearLoginUV?total.curYearLoginUV:0}}</div>
                    <div class="value" v-show="type === 3">{{total.curYearPaymentUv?total.curYearPaymentUv:0}}</div>
                    <div class="value" v-show="type === 4">{{total.curYearUnitPrice?total.curYearUnitPrice:0}}</div>
                    <div class="value" v-show="type === 5">{{total.curYearConversionRate?total.curYearConversionRate:0}}</div>
                </div>
                <div class="item">
                    <div class="title">上一年度</div>
                    <div class="value" v-show="type === 0">{{total.preYearUV?total.preYearUV:0}}</div>
                    <div class="value" v-show="type === 1">{{total.preYearPV?total.preYearPV:0}}</div>
                    <div class="value" v-show="type === 2">{{total.preYearLoginUV?total.preYearLoginUV:0}}</div>
                    <div class="value" v-show="type === 3">{{total.preYearPaymentUv?total.preYearPaymentUv:0}}</div>
                    <div class="value" v-show="type === 4">{{total.preYearUnitPrice?total.preYearUnitPrice:0}}</div>
                    <div class="value" v-show="type === 5">{{total.preYearConversionRate?total.preYearConversionRate:0}}</div>
                </div>
                <div class="item">
                    <div class="title">年环比</div>
                    <div class="value" v-show="type === 0">{{total.yearUVPercent?total.yearUVPercent:0}}</div>
                    <div class="value" v-show="type === 1">{{total.yearPVPercent?total.yearPVPercent:0}}</div>
                    <div class="value" v-show="type === 2">{{total.yearLoginUVPercent?total.yearLoginUVPercent:0}}</div>
                    <div class="value" v-show="type === 3">{{total.yearPaymentUvPercent?total.yearPaymentUvPercent:0}}</div>
                    <div class="value" v-show="type === 4">{{total.yearUnitPricePercent?total.yearUnitPricePercent:0}}</div>
                    <div class="value" v-show="type === 5">{{total.yearConversionRatePercent?total.yearConversionRatePercent:0}}</div>
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

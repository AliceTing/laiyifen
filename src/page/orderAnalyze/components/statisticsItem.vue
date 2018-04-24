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
            <template v-if="total.time ==='year'">
                <div class="item">
                    <div class="title">当年累计</div>
                    <div class="value">{{total.thisAmount?total.thisAmount:0}}</div>
                </div>
                <div class="item">
                    <div class="title">去年累计</div>
                    <div class="value">{{total.lastAmount?total.lastAmount:0}}</div>
                </div>
                <div class="item">
                    <div class="title">年环比</div>
                    <div class="value">{{total.percent?total.percent:0}}%</div>
                </div>
            </template>

        </div>
    </section>
</template>

<script>
    export default {
        components: {},
        props: {
            total: Object
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

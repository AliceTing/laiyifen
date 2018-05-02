<style lang="scss" scoped>
    @import '../../../public/assets/scss/mix.scss';
    .tab_ditch_province {
        .tab_tit {
            margin: px2rem(15) px2rem(32) 0;
            border: solid 1px $mainColor;
            border-radius: px2rem(8);
            .tab_item {
                height: px2rem(58);
                border-left: solid 1px $mainColor;
                color: $mainColor;
                line-height: px2rem(56);
                @include font-dpr(10);
                &:first-child {
                    border-left: none;
                }
                &.current {
                    background-color: $mainColor;
                    color: #fff;
                }
            }
        }
        .tab_con {
            margin-top: px2rem(30);
        }
    }
    //渠道表格
    .table_ditch {
        width: 100%;
        height: px2rem(90);
        text-align: left;
        line-height: px2rem(90);
        @include font-dpr(15);
        thead {
            background-color: #fbfbfb;
            color: #000;
            th:nth-child(1) {
                padding-left: px2rem(32);
            }
        }
        tbody {
            color: #999;
            tr {
                background-color: #fbfbfb;
                &:nth-child(odd) {
                    background-color: #fff;
                }
                td:nth-child(1) {
                    padding-left: px2rem(32);
                }
                td:nth-child(2) {
                    color: #e74c39;
                }
            }

        }
    }
</style>
<template>
    <div>
        <table class="table_ditch">
            <thead>
            <tr>
                <th>渠道</th>
                <th>支付金额</th>
                <th>日同比</th>
                <th>周同比</th>
                <th>年同比</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) in orderDataArr.channelStat" :key="index">
                <td>{{item.channel}}</td>
                <td>{{item.payAmount?item.payAmount:0}}</td>
                <td>{{item.payAmount?item.payAmount:0}}</td>
                <td>{{item.payAmount?item.payAmount:0}}</td>
                <td>{{item.ycPayAmountPercent?item.ycPayAmountPercent:0}}%</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        components: {},
        props: {},
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

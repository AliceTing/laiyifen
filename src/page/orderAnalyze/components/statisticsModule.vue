<style lang="scss" scoped>
    @import '../../../public/assets/scss/mix.scss';

    $mainColor: #ff6900;

    .data_statistics {
        background-color: $mainColor;
        color: #fff;
        .item {
            float: left;
            width: 50%;
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
                    <div class="data">{{total.amount}}</div>
                </div>
                <div class="item">
                    <div class="title">当年累计</div>
                    <div class="data">{{total.percent}}</div>
                </div>
            </template>

            <!---->
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

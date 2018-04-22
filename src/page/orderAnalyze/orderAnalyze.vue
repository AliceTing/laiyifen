<style lang="scss" scoped>
    @import '../../public/assets/scss/mix.scss';

    $mainColor: #ff6900;

    .container {
        background-color: #fff;
    }

    .tab_tit {
        display: flex;
        .tab_item {
            flex: 1;
            text-align: center;
        }
    }

    .order_type_tit {
        height: px2rem(88);
        border-top: solid 1px #ababab;
        border-bottom: solid 1px #ccc;
        color: #000;
        line-height: px2rem(88);
        @include font-dpr(15);
        .order_type_item {
            position: relative;
            &.current {
                color: $mainColor;
                &:after {
                    content: '';
                    position: absolute;
                    left: 0;
                    bottom: -1px;
                    width: 100%;
                    height: px2rem(4);
                    background-color: $mainColor;
                }
            }
        }
    }

    .time_type_tit {
        height: px2rem(54);
        margin: px2rem(15) px2rem(32);
        border: solid 1px $mainColor;
        border-radius: px2rem(8);
        background-color: #fff;
        color: $mainColor;
        line-height: px2rem(54);
        @include font-dpr(12);
        .time_type_item {
            border-left: solid 1px $mainColor;
            &:first-child {
                border-left: none;
            }
            &.current {
                background-color: $mainColor;
                color: #fff;
            }
        }
    }

    .switch_time {
        position: relative;
        height: px2rem(84);
        line-height: px2rem(84);
        text-align: center;
        @include font-dpr(17);
        .btn_switch {
            position: absolute;
            top: 0;
            z-index: 5;
            width: px2rem(90);
            height: 100%;
            &:before {
                content: '';
                position: absolute;
                top: 0;
                bottom: 0;
                width: px2rem(20);
                height: px2rem(20);
                border-top: solid px2rem(3) $mainColor;
                border-right: solid px2rem(3) $mainColor;
                margin: auto;
            }
            &.prev {
                left: 0;
                &:before {
                    left: px2rem(32);
                    transform: rotate(-135deg);
                }
            }
            &.next {
                right: 0;
                &:before {
                    right: px2rem(32);
                    transform: rotate(45deg);
                }
            }
            &.disabled {
                opacity: .3;
            }
        }
    }

</style>

<template>
    <div class="container">
        <div class="tab_box">
            <div class="tab_tit order_type_tit">
                <div v-for="(typeItem,index) in orderTypeArr"
                     :key="index"
                     :class="{current : typeItem.current}"
                     class="tab_item order_type_item">{{typeItem.name}}
                </div>
            </div>
            <div class="tab-con">
                <div class="tab_tit time_type_tit">
                    <div v-for="(timeItem,i) in timeTypeArr"
                         :key="i"
                         :class="{current : timeItem.current}"
                         class="tab_item time_type_item">{{timeItem.name}}
                    </div>
                </div>
                <div class="switch_time">
                    <div class="btn_switch prev" v-show="prevShow" @click="switchTime(-1)"></div>
                    <div class="btn_switch next" v-show="nextShow" @click="switchTime(1)"></div>
                    <div class="current_time">{{display}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState, mapActions, mapMutations} from 'vuex';

    export default {
        components: {},
        data() {
            return {
                //订单类型
                orderTypeArr: [{
                    name: '支付金额',
                    current: true,
                    type: 0
                }, {
                    name: '支付订单数',
                    current: false,
                    type: 1
                }, {
                    name: '单均价',
                    current: false,
                    type: 2
                }],
                //时间类型
                timeTypeArr: [{
                    name: '日',
                    time: 'day',
                    current: false
                }, {
                    name: '周',
                    time: 'week',
                    current: false
                }, {
                    name: '月',
                    time: 'month',
                    current: false
                }, {
                    name: '年',
                    time: 'year',
                    current: true
                }],
                //当前视图类型，文字
                name: '',
                //当前视图类型，年、月、日、周
                time: '',
                //订单类型
                type: '',
                //当前年
                year: '',
                //当前月
                month: '',
                //当前日
                day: '',
                //上一个切换箭头
                prevShow: true,
                //下一个切换箭头
                nextShow: false,
                //接口请求入参
                param: {},
                //页面展示类型
                display: ''
            }
        },
        created() {
            let me = this;

            me.timeTypeArr.map(function (el) {
                if (el.current) {
                    me.name = el.name;
                    me.time = el.time;
                    me.orderTypeArr.map(function (item) {
                        if (item.current) {
                            me.type = item.type;
                        }
                    })
                }
            });

            me.init();
            me.orderDisplay(me.name, me.time, me.type);
        },
        methods: {
            ...mapActions([
                'getData'
            ]),
            init(){
                let me = this;
                let date = new Date();
                let year = date.getFullYear();
                let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
                let day = date.getDate() + 1 < 10 ? '0' + date.getDate() : date.getDate();

                me.year = year;
                me.month = month;
                me.day = day;
            },
            orderDisplay() {
                let me = this;
                me.param.day = me.year + '-' + me.month + '-' + me.day;
                me.param.type = me.type;
                switch (me.time) {
                    case 'year':
                        me.display = me.year + me.name;
                        break;
                    case 'month':
                        me.display = me.year + '年' + me.month + me.name;
                        break;
                    case 'day':
                        me.display = me.year + '年' + me.month + '月' + me.day + me.name;
                        break;
                    case 'week':
                        //TODO
                        me.display = me.day + me.name;
                        me.param.startTime = '';
                        me.param.endTime = '';
                        break;
                }
                me.getData({
                    param: me.param,
                    time: me.time
                });
            },
            switchTime(e) {
                let me = this;
                let date = new Date();
                let year = date.getFullYear();
                let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
                let day = date.getDate() + 1 < 10 ? '0' + date.getDate() : date.getDate();

                switch (me.time) {
                    case 'year':
                        if (e > 0) {
                            //下一年
                            me.year++;

                            if(me.year == year){
                                me.nextShow = false;
                            }
                            me.prevShow = true;
                        } else {
                            //上一年
                            me.year--;
                            me.display = me.year + me.name;
                            if(me.year == 1970){
                                me.prevShow = false;
                            }
                            me.nextShow = true;
                        }
                        break;
                    case 'month':
                        break;
                    case 'day':
                        break;
                    case 'week':
                        break;
                }
                console.log('switch:',me.year);
                me.orderDisplay(me.name, me.time, me.type);
            }
        },
        computed: {
            ...mapState({
                orderDataArr: state => state.orderAnalyze.orderDataArr,
            })
        },
    }
</script>


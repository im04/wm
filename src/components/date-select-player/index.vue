<template>
    <div class="date-select-player">
        <div class="text-right text-today">
            <div class="fr"><span class="text-today fl">{{activity.date}}</span><el-button @click="toToday()" type="warning" class="width-100 btn-orange fr" size="small">回到今天</el-button></div>
        </div>
        <div class="date-player bg-gray">
            <div class="btn fl hover border-gray date-select-player-prev"><i class="el-icon-arrow-left"></i>上一周</div>
            <swiper class="player-main" :options="swiperOption"  :not-next-tick="true" ref="mySwiper">
                <swiper-slide v-for="(slide,index) in swiperSlides" :key="index">
                    <div class="fx">
                        <div v-for="(item,i) in slide" :key="i" class="date-content hover" :class="{today: day == item.date, on: item == activity }" @click="click(item)">
                            <div class="week">
                                {{item.day}}
                            </div>
                            <div class="date">{{item.date}} 3场</div>
                        </div>
                    </div>
                </swiper-slide>
            </swiper>
            <div class="btn fr hover date-select-player-next">下一周<i class="el-icon-arrow-right"></i></div>
        </div>
    </div>
</template>
<script>
    import 'swiper/dist/css/swiper.css';
    import swiper from 'vue-awesome-swiper';
    import createDate from 'assets/script/week-data-creater';
    Vue.use(swiper);
    const creater = new createDate();
    export default {
        data() {
            return {
                day: createDate.initDate(Date.now()),
                activity: {},
                swiperOption: {
                    initialSlide: creater.index,
                    setWrapperSize :true,
                    mousewheelControl : true,
                    paginationClickable: true,
                    observeParents:true,
                    spaceBetween: 0,
                    nextButton: '.date-select-player-next',
                    prevButton: '.date-select-player-prev'
                },
                swiperSlides: creater.dataList,
            }
        },
        methods: {
            toToday() {
                this.$refs.mySwiper.swiper.slideTo(creater.index)
            },
            click(item) {
                this.activity = item;
            }
        }
    }
</script>
<style lang="stylus" scoped>
    bg-cr = #f3f3f3;
    border-cr = #e5e5e5;
    border-cr-hover = #ff9901;
    .date-select-player {

        .text-today {
            margin-bottom 10px;
            height 28px;
            line-height 28px;
        }
        .btn-orange {
            margin-left 15px;
            background-color #ff9901;
            color white;
        }
        .date-player {
            position relative;
            overflow hidden;
            text-align center;
            color #323232;
            .fx {
                display flex;
            }
            .btn {
                width 10%;
                min-height 88px;
                line-height 88px;
            }
            .player-main {
                float left;
                width 80%;
            }

            .hover {
                position relative;
                cursor pointer;
                border 1px solid border-cr;
                -webkit-transition: border-color .6s;
                -moz-transition: border-color .6;
                -ms-transition: border-color .6;
                -o-transition: border-color .6;
                transition: border-color .6;
                &.today:before {
                    h = 20px;
                    content '今天';
                    position absolute;
                    top: 0;
                    right: 0;
                    background-color border-cr-hover;
                    width: 40px;
                    height: h;
                    line-height h;
                    color: white;
                    font-size 14px;
                }
                &.on,&:hover {
                    border-color border-cr-hover;
                }
            }
            .date-content {
                flex-grow 1;
                height 90px;
                padding-top 20px;
                padding-bottom 20px;
            }
            .border-gray {
                border-color border-cr;
            }
            &.bg-gray {
                background-color bg-cr;
            }

        }
    }
</style>

<script>
    export default {
        created() {
            console.log(this);
        },
        data() {
            return {
                active: 0,
            }
        },
        methods: {
            next() {
                this.active<this.maxSteps&&this.active++;
            },
            prev() {
                this.active>0&&this.active--;
            }
        },
        created() {
            this.maxSteps = this.$slots.default.length;
        },
        render(h) {
            let {
                $slots,
                active,
                changeAcrive
            }=this;
            return (
                <div class="steps">
                    <div class="steps-header ov-hi">
                        {$slots.default.filter((v)=>!!v.tag).map((v,i)=>{
                            return (
                                <div class={{"steps-item":true,activity:active==i}}>
                                    {v.data.attrs.tit}
                                </div>
                            )
                        })}
                    </div>


                    <div class="steps-content m-top-30">
                        {$slots.default.filter((v)=>!!v.tag).map((v,i)=>{
                            return (
                                <div class={{show:i==active,"steps-content-box":true}}>
                                    {v}
                                </div>
                            )
                        })}
                    </div>
                </div>
            )
        }
    }
</script>
<style lang="stylus">
    .steps {
        transition-bg() {
            -webkit-transition: background-color .6s;
            -moz-transition: background-color .6s;
            -ms-transition: background-color .6s;
            -o-transition: background-color .6s;
            transition: background-color .6s;
        }
        transition-br() {
            -webkit-transition: border-color .6s;
            -moz-transition: border-color .6s;
            -ms-transition: border-color .6s;
            -o-transition: border-color .6s;
            transition: border-color .6s;
        }
        .steps-header {
            font-size 0;
            text-align center;
            .steps-item {
                df-bg-cl = #9ea7b4;
                act-bg-cl = #20a0ff;
                title-height = 36px;
                df-radius = 3px;
                padding 10px 36px;
                background-color df-bg-cl;
                font-size 16px;
                color white;
                display inline-block;
                line-height 1;
                position relative;
                transition-bg();
                &:before {
                    content: '';
                    position absolute;
                    top 0;
                    right - title-height;
                    border (title-height / 2) solid df-bg-cl;
                    border-bottom-color transparent;
                    border-top-color transparent;
                    border-right-color transparent;
                    z-index 10;
                    transition-br();
                }
                &:first-child {
                    border-radius df-radius 0 0 df-radius;
                }
                &:last-child {
                    border-radius 0 df-radius df-radius 0;
                    &:before {
                        content:'';
                        display none;
                    }
                }
                &.activity {
                    background-color act-bg-cl;
                    &:before {
                        border-left-color act-bg-cl;
                    }
                }

            }
        }
        .steps-content {
            .steps-content-box {
                display none;
                &.show {
                    display block;
                }
            }
        }
    }

</style>
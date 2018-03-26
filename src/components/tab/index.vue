<script>
    export default {
        props: {
            options: {
                type: Object,
                default: _=>{}
            },
            tabClick:{
                type: Function,
                default(){}
            },
        },
        data() {
            return {
                currentName: 0,
            }
        },
        methods: {
            headClick(item,index) {
                this.currentName = index;
                this.tabClick&&this.tabClick(item, index);
            },
            addPanes() {},
            removePanes() {}
        },
        mounted() {
            console.log(this)
        },
        render(h) {
            let {
                options,
                headClick,
                $slots,
                currentName
            } = this,
            list = $slots.default&&$slots.default.filter((v)=>!!v.tag),
            headList = $slots.headList&&$slots.headList.filter((v)=>!!v.tag),
            head = $slots.head;
            return (
                <div class="tab-block">
                    <div class="tab-head">
                        <div class="tab-nav">
                            <div class="tab-list">
                                {
                                    list.map((v,i)=>{
                                        return (
                                            <div class={{"activity":  i == currentName,"tab-item":true}} on-click={()=>headClick(v,i)}>
                                                {v.data.attrs.tit}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div class="tab-btn-list">
                                {
                                    (headList&&headList.length)? headList.map((v,i)=>{
                                                                    return (
                                                                        <div class={{"tab-btn":true, "child-top":true, activity:i == currentName}} >
                                                                            {v}
                                                                        </div>
                                                                    );
                                                                }):(head&&head.length&&(
                                                                        <div class="tab-btn child-top activity">
                                                                        {head}
                                                                        </div>
                                                                        ))
                                }
                            </div>
                        </div>
                    </div>
                    <div class="tab-body">
                        {
                            list.map((v,i)=>{
                                return (
                                    <div class={{"tab-body-content":true,"activity":i == currentName}}>{v}</div>
                                )
                            })
                        }
                    </div>
                </div>
            )
        }
    }
</script>
<style lang="stylus">
    @import "~styles-var";
    .tab-block {
        df-br-color = #4f88bb;
        df-border =1px solid  df-br-color;
        .tab-head {
            border-bottom df-border;
            .tab-nav {
                padding-left 15px;
                overflow hidden;
                margin-bottom -1px;
                .tab-list {
                    overflow hidden;
                    float left;
                    .tab-item {
                        margin-left 15px;
                        padding 10px 16px;
                        border-radius 4px 4px 0 0;
                        border df-border;
                        float left;
                        font-size 14px;
                        color white;
                        background-color df-br-color;
                        cursor pointer;
                        -webkit-transition: all .3s cubic-bezier(.645,.045,.355,1);
                        -ms-transition: all .3s cubic-bezier(.645,.045,.355,1);
                        -o-transition: all .3s cubic-bezier(.645,.045,.355,1);
                        -moz-transition: all .3s cubic-bezier(.645,.045,.355,1);
                        transition: all .3s cubic-bezier(.645,.045,.355,1);
                        &:first-child {
                            margin-left 0;
                        }
                        &.activity {
                            border-bottom-color default-bg-color;
                            background-color white;
                            color #333;
                        }
                    }
                }
                .tab-btn-list {
                    float right;
                    overflow hidden;
                    .tab-btn {
                        vertical-align middle;
                        display none;
                        &>div {
                            display inline-block;
                            &>* {
                                max-width 140px;
                            }
                        }
                        &.activity {
                            display inline-block;
                        }

                        .el-select {
                            .el-input__inner {
                                padding-top 2px;
                                padding-bottom 2px;
                                height 28px;
                            }
                        }
                    }
                }
            }
        }
        .tab-body-content {
            display none;
            &.activity{
                display block;
            }
        }
    }
</style>
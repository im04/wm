<template>
    <div>
        <div class="search-header" @change="changeCallback">
            <div class="search-header-bar m-right-10">
                <span class="el-icon-search"></span>&nbsp;筛选查询
            </div>
            <div>
                <!--<template slot="title">-->

                    <!--<div class="fr">-->
                        <!--<el-button size="small" :plain="true" class="width-90" @click.stop="buttonCallback(options)">查询结果</el-button>-->
                    <!--</div>-->
                <!--</template>-->
                <div class="form-search-detail">
                    <div v-for="item in options">
                        <el-button class="btnText p-right-40" type="text" v-for="(data, index) in item.dataList" :key="index" @click.stop="click(item, data, index)" :class="{on: item.activity == data.value}">{{data.label||data}}</el-button>
                    </div>
                </div>
                <slot/>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            changeCallback:{
                type: Function,
                default (){}
            },
            filtrateCallback: {
                type: Function,
                default (){}
            },
            options: {
                type: Array,
                default () {
                    return []
                }
            }
        },
        methods: {
            click(item, data, index) {
                item.activity = data.value;
                this.filtrateCallback&&this.filtrateCallback(data, index);
            }
        }
    }

</script>
<style lang="stylus">
    @import "~styles-var";
    .search-header {
        border 0;
        background-color default-bg-color;
        border-bottom 1px solid default-br-color;
        .search-header-bar {
            height 50px;
            line-height: 50px;
            padding 0 20px;
            border-bottom 1px solid default-br-color;
            color #48576a;
            font-size 13px;
        }
        .form-search-detail {
            height auto;
            df-pad-lr();
            df-pad('tb');
            background-color white;
            .btnText {
                color black;
                font-weight bold;
                &.on {
                    color: #20a0ff;
                }
            }
        }
        .el-collapse-item__arrow {
            float none;
        }
        .el-collapse-item .el-collapse-item__header {
            border-color default-br-color !important;
        }
        .el-collapse-item__header {
            line-height-h(50);
            padding 0 20px;
            background-color transparent;
            border-bottom-color default-br-color;
        }
        .el-collapse-item__content {
            padding 0;
        }
    }
</style>
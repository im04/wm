<template>
    <div class="live-schedule">
        <date-select-player class="play-block"></date-select-player>
        <div class="room-list m-top-4">
            <div v-for="(item,index) in roomList" :key="index" class="room-item">
                {{item.name}}(<span class="room-list-number">{{item.number}}</span>)
            </div>
        </div>
        <div class="search-list m-top-4">
            <el-form ref="form" :model="searchInfo" label-width="80px">
                <el-form-item label="搜索选项">
                    <el-input class="width-226 m-left-36" v-model="searchInfo.liveName" placeholder="直播名称/id"></el-input>
                    <el-select class="width-140 m-left-36" v-model="searchInfo.liveType" placeholder="分类">
                        <el-option
                                v-for="item in liveTypeOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select class="width-140 m-left-36" v-model="searchInfo.liveStatus" placeholder="状态">
                        <el-option
                                v-for="item in liveStatusOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <el-button class="m-left-10">搜索</el-button>
                    <el-button>重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="table-block">
            <pagination-content :options="paginationInit" :size-change="handleSizeChange" :current-change="handleCurrentChange">
                <template slot="body">
                    <schedule-table :table-data="tableData"/>
                </template>
            </pagination-content>
        </div>
    </div>
</template>
<script>
    import dateSelectPlayer from 'components/date-select-player';
    import scheduleTable from 'components/schedule-table';
    import paginationContent from 'components/pagination-content';
    import { mapState } from 'vuex';
    export default {
        components: {
            dateSelectPlayer,
            scheduleTable,
            paginationContent
        },
        computed: {
            ...mapState('liveSchedule',[
                'liveTypeOptions',
                'liveStatusOptions',
                'roomList',
                'tableData'
            ]),
        },
        data() {
            return {
                searchInfo: {},
                paginationInit: {//分页初始化
                    size: 10,
                    length: 1000,
                    currentPage: 1
                },
            }
        },
        methods: {
            handleSizeChange() {
                console.log(arguments);
            },
            handleCurrentChange() {
                console.log(arguments);


            }
        }
    }
</script>
<style lang="stylus" scoped>
    bd-color = #e5e5e5;
    df-bor = 1px solid bd-color;
    df-pad = 13px;
    lag-pad = 45px;
    bg-color = white;
    .live-schedule {
        df-padding() {
            padding-top df-pad;
            padding-bottom df-pad;
        }
        df-border() {
            border df-bor;
        }
        .play-block {
            padding 12px lag-pad 35px;
            background-color white;
            border-bottom df-bor;
        }
        .room-list {
            df-padding();
            text-align center;
            background-color white;
            df-border();
            .room-item {
                margin 0 6px;
                padding 6px 10px;
                display inline-block;
                df-border();
                .room-list-number {
                    color #f76133;
                }
            }

        }
        .search-list {
            pad-lr = 38px;
            df-padding();
            df-border();
            padding-left pad-lr;
            padding-right pad-lr;
            background-color bg-color;
            .el-form-item {
                margin-bottom 0;
            }
        }
        .table-block {
            margin 10px lag-pad;
        }
        .m-left-36 {
            margin-left 36px;
        }
        .width-226 {
            width 226px;
        }
        .width-130 {
            width 130px;
        }
        .c-gray {
            color #323232;
        }
        .fs-18 {
            font-size 18px;
        }
    }
</style>
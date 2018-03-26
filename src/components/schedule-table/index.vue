<template>
    <div>
        <el-table class="schedule-table" :data="tableData"
                  style="width: 100%">
            <el-table-column label="直播时间">
                <template slot-scope="scope">
                    <div class="status" :class="'status'+scope.row.statusCode">{{scope.row.status}}</div>
                    <div class="font22">{{scope.row.time1}}</div>
                    <div class="font18">总时长：{{scope.row.time2}}</div>
                    <div class="font18">结束倒计时：{{scope.row.time3}}</div>
                </template>
            </el-table-column>
            <el-table-column label="直播信息">
                <template slot-scope="scope">
                    <div class="text-left">
                        <div class="f-w-n font20">{{scope.row.msg1}}</div>
                        <div class="f-w-n font18 m-top-9">{{scope.row.msg2}}</div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="直播配套">
                <template slot-scope="scope">
                    <div class="setting-block">
                        <div>{{scope.row.liveRoom}}</div>
                        <div>{{scope.row.liveNumber}}</div>
                        <div v-if="scope.row.statusCode == '0'"><el-button size="small" type="primary" @click="setting(scope)">配置</el-button></div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                    label="操作区">
                <template slot-scope="scope">
                    <div class="ctrl-block">
                        <div class="ov-hi">
                            <el-button class="ctrl-btn btn-top-bg-color" @click="check(scope)">查看</el-button>
                            <el-button class="ctrl-btn m-left-10 btn-top-bg-color" @click="copy(scope)">复制地址</el-button>
                        </div>
                        <el-button v-if="testTime(scope.row.startTime)" class="m-top-5 full-width btn-bottom-bg-color" :class="{on:testStart(scope)}" @click="start(scope.row.startTime > Date.now(),scope)">开始直播</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="配置直播厅" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="直播厅">
                    <el-input v-model="form.liveRoom" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="使用机位">
                    <el-radio-group  v-model="form.usingCamera">
                        <el-radio v-for="item in jw" :label="item.value" :key="item.value">{{item.label}}</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import { mapState } from 'vuex';
    export default {
        props: {
            tableData: {
                type: Array,
                default: _=>[]
            }
        },
        computed: {
            ...mapState('liveSchedule',[
                'jw'
            ])
        },
        data() {
            return {
                form:{},
                dialogFormVisible: false
            }
        },
        methods: {
            setting(scope) {
                let data = scope.row;
                this.dialogFormVisible = true;
                this.form.liveRoom = data.liveRoom;
                this.form.usingCamera = data.usingCamera;
            },
            testStart(scope) {
                let time = scope.row.startTime,
                    now = Date.now();
                return time - now <= 600000 && time >= now;
            },
            testTime(time) {
                let now = Date.now();
                return time <= now + 600000;
            },
            copy(item) {
                let div = document.createElement('div'),
                    body = document.body;
                div.innerText = item.row.name;
                div.style.width = 0;
                div.style.height = 0;
                body.appendChild(div);
                utils.copyText(div);
                body.removeChild(div);
            },
            check(scope) {
                this.$router.push(
                    {
                        name: '查看直播间',
                        params: {
                            liveId: scope.row.liveId
                        }
                    }
                );
            },
            start(flag,item) {

            }
        }
    }
</script>
<style lang="stylus">
    .schedule-table {
        btn-top-bg-color = #e5e5e5;
        btn-bottom-bg-color = #afafaf;
        btn-bottom-activity-color = #ff6600;
        transition-bg() {
            -webkit-transition: background-color .5s;
            -moz-transition: background-color .5s;
            -ms-transition: background-color .5s;
            -o-transition: background-color .5s;
            transition: background-color .5s;
        }
        table-head-padding() {
            p = 15px;
            padding-top p;
            padding-bottom p;
        }
        text-align center;
        .full-width {
            width 100%;
        }
        .m-top-5 {
            margin-top 5px;
        }
        .m-left-10 {
            margin-left 10px;
        }
        .btn-top-bg-color {
            color btn-bottom-activity-color;
            background-color btn-top-bg-color;
            border-color transparent;
            &.on {
                border-color transparent;
            }
        }
        .btn-bottom-bg-color {
            color white;
            background-color btn-bottom-bg-color;
            border-color transparent;
            transition-bg();
            &.on  {
                background-color btn-bottom-activity-color;
            }
        }
        .status {
            position absolute;
            top: 0;
            left: 0;
            padding-left 5px;
            padding-right 5px;
            color: white;
            font-size 14px;
            &.status1 {
                background-color #18b2b2;
            }
            &.status0 {
                background-color btn-bottom-activity-color;
            }
            &.status2 {
                background-color btn-bottom-bg-color;
            }
        }
        .setting-block {

        }
        .ctrl-block {
            margin 0 auto;
            width 180px;
            overflow hidden;
        }
        .ctrl-btn {
            width: 85px;
            padding-left 0;
            padding-right 0;
            float left;
        }
        .el-table__header{
            th,th .cell {
                background-color #c9c9c9;
            }
            thead tr div {
                table-head-padding();
                text-align center;
            }
        }


        .el-table__body {
            .cell {
                padding-top 30px;
                padding-bottom 30px;
            }
        }

    }
</style>
<template>
    <div>
        <search-header :options="searchInit" :click-callback="clickCallback" :button-callback="buttonClick">
            <div class="search-bar bg-white child-middle">
                <span>搜索选项 : </span>
                <el-input  placeholder="直播厅名称" class="repeat-el-input" ></el-input>
                <el-button class="m-left-10">搜索</el-button>
                <el-button>重置</el-button>
            </div>
        </search-header>
        <div class="content">
            <tab-cpt :options="tabInit" :tab-click="tabClick">
                <template slot="head">
                    <el-button type="primary" @click="tabCallback()" size="small">添加直播间</el-button>
                </template>
                <div tit="数据列表" name="0">
                    <pagination-content :options="paginationInit" :size-change="handleSizeChange" :current-change="handleCurrentChange">
                        <template slot="body">
                            <!--<table-cpt class="b-top-0" :options="tableInit" max-line="12" :ctrl-callback="ctrCallback" :select-callback="selectCallback"/>-->
                            <el-table :data="tableInit.dataList" :border="true" size="small">
                                <el-table-column prop="date" label="直播厅名称"/>
                                <el-table-column prop="date" label="直播厅id"/>
                                <el-table-column prop="date" label="机位"/>
                                <el-table-column label="操作">
                                    <template slot-scope="scope">
                                        <el-button v-for="item in tableInit.tableCtrl.ctrlList" v-if="item.test?item.test(item,scope.row):true" :key="item.key" type="text">{{item.name}}</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </template>
                    </pagination-content>
                </div>
            </tab-cpt>
        </div>
    </div>
</template>
<script>

    import tabCpt from 'components/tab';
    import searchHeader from 'components/search-header';
    import tableSwitch from 'components/table-switch';
    import paginationContent from 'components/pagination-content';
    import selectBar from 'components/select-bar';
    export default {
        components: {

            tabCpt,
            searchHeader,
            paginationContent,
            selectBar,
            tableSwitch
        },
        data() {
            return {
                searchInit: [
                    {
                        activity: 0,
                        dataList: ["全部","综艺","音乐","搞笑","二次元"]
                    },
                    {
                        activity: 0,
                        dataList: ["全部","大陆","欧美","日本","韩国"]
                    },
                    {
                        activity: 0,
                        dataList: ["全部","　男","　女","组合"]
                    }
                ],
                tabInit: {
                    activeName: '0',
                },
                currentPage1: 1,
                tableInit: {
                    tableCtrl: {
                        ctrlList: [
                            {
                                name: '查看',
                                key: 'check',
                                type: 'text',
                                test(item,scope){
                                    return ;
                                }
                            },
                            {
                                name: '编辑',
                                key: 'edit',
                                type: 'text'
                            },
                            {
                                name: '删除',
                                key: 'delete',
                                type: 'text'
                            }
                        ]
                    },
                    dataList: [{
                        number: '10',
                        date: '2016-05-03',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄',
                        open: 'true'
                    }, {
                        date: '2016-05-02',
                        number: '11',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }, {
                        date: '2016-05-04',
                        number: '12',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }]
                },
                tableInit2: {
                    tableCtrl: {
                        ctrlList: [
                            {
                                name: '查看',
                                key: 'check',
                                type: 'text'
                            },
                            {
                                name: '编辑',
                                key: 'edit',
                                type: 'text'
                            },
                            {
                                name: '删除',
                                key: 'delete',
                                type: 'text'
                            }
                        ]
                    },
                    tableHead: [
                        {
                            prop: 'name',
                            label: '直播栏目名称'
                        },
                        {
                            prop: 'date',
                            label: '栏目id',
                        },
                        {
                            prop: 'activity',
                            label: '直播活动'
                        },
                        {
                            prop: 'date',
                            label: '最近开播时间'
                        },
                        {
                            prop: 'type',
                            label: '类型'
                        },
                        {
                            prop: 'type',
                            label: '修改时间'
                        }
                    ],
                    dataList: [{
                        number: '10',
                        date: '2016-05-03',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄',
                        open: 'true'
                    }, {
                        date: '2016-05-02',
                        number: '11',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }, {
                        date: '2016-05-04',
                        number: '12',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }]
                },
                selectInit: {
                    value: 'option1',
                    dataList: [
                        {
                            value: 'option1',
                            label: '批量置顶'
                        },
                        {
                            value: 'option2',
                            label: '批量撤出置顶'
                        }
                    ],
                },
                selectInit2: {
                    value: 'option1',
                    dataList: [
                        {
                            value: 'option1',
                            label: '按开播时间排序'
                        },
                        {
                            value: 'option2',
                            label: '按修改时间排序'
                        }
                    ],
                },
                paginationInit: {
                    size: 10,
                    length: 1000
                }
            };
        },
        methods: {
            tabCallback(target) {
                let _router = this.$router;
                _router.push('/backgroundConfig/liveRoomConfig/liveRoomConfigEdit');
            },
            buttonClick(item) {
                console.log(arguments);
            },
            clickCallback(item) {
                console.log(arguments);
            },
            ctrCallback() {
                console.log(arguments)
            },
            selectCallback() {
                console.log(arguments)
            },
            handleSizeChange() {
                console.log(arguments)
            },
            handleCurrentChange() {
                console.log(arguments)
            },
            tabClick() {
                console.log(arguments)
            },
            selectChange() {
                console.log(arguments)
            }
        }
    };
</script>

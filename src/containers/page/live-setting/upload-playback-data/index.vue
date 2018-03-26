<template>
    <div>
        <search-header>
            <div class="search-bar bg-white p-lr-40 child-middle">
                <span>搜索选项 : </span><el-input size="large"  placeholder="请输入内容" class="repeat-el-input" ></el-input><el-input size="large"  placeholder="请输入内容" class="repeat-el-input"> </el-input>
            </div>
        </search-header>
        <div class="upload-playback-data content">
            <pagination-content :options="paginationInit" :size-change="handleSizeChange" :current-change="handleCurrentChange">
                <template slot="body">
                    <tab-cpt :options="tabInit" :tab-click="tabClick" :button-callback="buttonCallback">
                        <template slot="head">
                            <el-button type="primary" size="small" @click="buttonCallback()">上传回放</el-button>
                            <el-button size="small">批量添加</el-button>
                        </template>
                        <el-tab-pane label="已经发布" name="0"/>
                    </tab-cpt>
                    <!--<table-cpt class="b-top-0" :options="tableInit" max-line="12"/>-->
                </template>
                <template slot="floor">
                    <el-button class="btn" size="small">批量删除</el-button>
                </template>
            </pagination-content>
        </div>
    </div>
</template>
<script>

    import tabCpt from 'components/tab';
    import searchHeader from 'components/search-header';
    import paginationContent from 'components/pagination-content';
    export default {
        components: {

            tabCpt,
            searchHeader,
            paginationContent
        },
        data() {
            return {
                paginationInit: {
                    size: 10,
                    length: 1000
                },
                tabInit: {
                    activeName: '0',
                },
                tableInit: {
                    tableSelect: {
                        callback: function() {
                            console.log(arguments)
                        }
                    },
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
                        ],
                        callback: function() {
                            console.log(arguments)
                        }
                    },
                    tableHead: [
                        {
                            prop: 'name',
                            label: '直播名称'
                        },
                        {
                            prop: 'room',
                            label: '场次'
                        },
                        {
                            prop: 'id',
                            label: '直播活动id'
                        },
                        {
                            prop: 'time',
                            label: '上传时间'
                        },
                        {
                            prop: 'type',
                            label: '内容分类'
                        }
                    ],
                    dataList: [
                        {
                            name: 'abcd',
                            room: 'acd',
                            id: '1',
                            table: '1',
                            time: '2222',
                            type: 'ddd'
                        }
                    ]
                },
                value: '1',
                currentPage1: 1,
                options: [
                    {
                        value: '1',
                        label: '批量推荐'
                    },
                    {
                        value: '2',
                        label: '批量撤出推荐'
                    }
                ],
            }
        },
        methods: {
            buttonCallback(target) {
                var _router = this.$router;
                _router.push('/liveSetting/uploadPlaybackData/uploadPlaybackDataEdit');
            },
            tabClick() {
                console.log(arguments)
            },
            handleSizeChange() {

            },
            handleCurrentChange() {

            }
        }
    }
</script>
<style scoped>

</style>
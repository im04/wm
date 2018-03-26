<template>
    <div>
        <search-header :options="searchInit" :click-callback="clickCallback" :button-callback="buttonClick">
            <div class="search-bar bg-white child-middle">
                <span>搜索选项 : </span>
                <el-input v-model="searchInfo.id" placeholder="直播id" class="repeat-el-input" ></el-input>
                <el-input v-model="searchInfo.name" placeholder="直播名称" class="repeat-el-input"> </el-input>
            </div>
        </search-header>
        <div class="content">
            <tab-cpt>
                <template slot="head">
                    <el-button type="primary" @click="addPrograma()" size="small">添加直播栏目</el-button>
                    <select-bar size="small" placeholder="排序方式" :options="selectSort" :select-change="selectChange"/>
                </template>
                <div tit="已经发布" name="0">
                    <pagination-content :options="paginationInitReleased" :size-change="handleSizeChange" :current-change="handleCurrentReleased">
                        <template slot="body">
                            <!--<table-cpt class="b-top-0" :options="tableInit" max-line="12" :ctrl-callback="ctrCallback" :select-callback="selectCallback"/>-->
                            <el-table :data="tableReleased" border size="small">
                                <el-table-column type="selection"/>
                                <el-table-column prop="liveName" label="直播栏目名称"/>
                                <el-table-column prop="livePrograma" label="栏目id"/>
                                <el-table-column prop="liveRoom" label="直播活动"/>
                                <el-table-column prop="when" label="最近开播时间"/>
                                <el-table-column prop="type" label="类型"/>
                                <el-table-column label="内容置顶">
                                    <template slot-scope="scope">
                                        <el-switch on-color="#13ce66" off-color="#ff4949" on-text="" off-text="" on-value="true" off-value="false"></el-switch>
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作">
                                    <template slot-scope="scope">
                                        <ctrl-button :data="scope" :options="ctrlInit" :click-callback="ctrCallback"/>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </template>
                        <template slot="floor">
                            <select-bar size="small" :options="selectTopInit" :select-change="selectChange"/>
                            <!--<el-select size="small" v-model="selectInit.value" placeholder="请选择">-->
                                <!--<el-option v-for="item in selectInit.options" :key="item.value" :label="item.label" :value="item.value"/>-->
                            <!--</el-select>-->
                            <el-button :plain="true" class="btn" size="small">批量下架</el-button>
                        </template>
                    </pagination-content>
                </div>
                <div tit="草稿" name="1">
                    <pagination-content :options="paginationInitDraft" :size-change="handleSizeChange" :current-change="handleCurrentDraft">
                        <template slot="body">
                            <!--<table-cpt class="b-top-0" :options="tableInit2" max-line="12" :ctrl-callback="ctrCallback" :select-callback="selectCallback"/>-->
                            <el-table :data="tableDraft" border>
                                <el-table-column type="selection"/>
                                <el-table-column prop="liveName" label="直播栏目名称"/>
                                <el-table-column prop="livePrograma" label="栏目id"/>
                                <el-table-column prop="liveRoom" label="直播活动"/>
                                <el-table-column prop="when" label="最近开播时间"/>
                                <el-table-column prop="type" label="类型"/>
                                <el-table-column prop="date" label="修改时间"/>
                                <el-table-column label="操作">
                                    <template slot-scope="scope">
                                        <ctrl-button :data="scope" :router-test="true" :options="ctrlInit" :click-callback="ctrCallback"/>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </template>
                        <template slot="floor">
                            <el-button :plain="true" class="btn" size="small">批量上架</el-button>
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
    import { mapState } from 'vuex';
    import ctrlButton from 'components/ctrl-button';
    export default {
        components: {
            tabCpt,
            searchHeader,
            paginationContent,
            selectBar,
            tableSwitch,
            ctrlButton
        },
        computed: {
            ...mapState('liveProgramaSetting',[
                'tableReleased',
                'tableDraft'
            ]),
        },
        beforeCreate() {
            this.$store.dispatch('liveProgramaSetting/getTableReleasedData');
            this.$store.dispatch('liveProgramaSetting/getTableDraftData');
        },
        data() {
            return {
                searchInfo: {},//搜索选项
                pickerOptions: utils.pickerOptions,//日期选择快捷配置
                ctrlInit: {//表单按钮
                    ctrlList: [
                        {
                            name: '查看',
                            key: 'check',
                        },
                        {
                            name: '编辑',
                            key: 'edit',
                        },
                        {
                            name: '删除',
                            key: 'delete',
                        }
                    ]
                },
                searchInit: [//筛选条件
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
                selectTopInit: {//批量置顶
                    value: null,
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
                selectSort: {//选择排序
                    value: null,
                    dataList: [
                        {
                            value: 'sort1',
                            label: '按开播时间排序'
                        },
                        {
                            value: 'sort2',
                            label: '按修改时间排序'
                        }
                    ],
                },
                paginationInitReleased: {//分页初始化
                    size: 10,
                    length: 1000,
                    currentPage: 1
                },
                paginationInitDraft: {//分页初始化
                    size: 10,
                    length: 1000,
                    currentPage: 1
                }
            };
        },
        methods: {
            filtrateCallback() {//筛选回调
                console.log(arguments);
            },
            copyUrl(name) {
                let e = this.$refs[name];
                utils.copyText(e);
            },
            addPrograma(target) {
                let _router = this.$router;
                _router.push(
                    {
                        name: '添加直播栏目'
                    }
                )
            },
            buttonClick(item) {
                console.log(arguments);
            },
            clickCallback(item, row) {

            },
            ctrCallback(item, row) {
                console.log(arguments);
                switch (item.key) {
                    case 'delete':
                        return this.deleteOpt(row);
                    case 'check':
                        return row.liveId&&this.$router.push(
                            {
                                name: '查看直播栏目',
                                params: {
                                    liveId: row.liveId,
                                }
                            }
                        );

                    case 'edit':
                        return row.liveId&&this.$router.push(
                            {
                                name: '编辑直播栏目',
                                params: {
                                    liveId: row.liveId
                                }
                            }
                        );
                }
            },
            deleteOpt(row) {
                this.$store.dispatch('liveProgramaSetting/deleteLive',{
                    data: row
                }).then((data)=>{
                    this.$message({
                        message: data.data.msg,
                        type: 'success'
                    });
                }).catch((data)=>{
                    this.$message({
                        message: data.data.msg,
                        type: 'error'
                    });
                });
            },
            selectCallback() {
                console.log(arguments)
            },
            handleSizeChange() {
                console.log(arguments)
            },
            handleCurrentDraft() {
                console.log(this.paginationInitDraft.currentPage);
            },
            handleCurrentReleased() {
                console.log(this.paginationInitReleased.currentPage);
            },
            tabClick() {
                console.log(arguments)
            },
            selectChange(item) {
                this.$store.dispatch('liveProgramaSetting/getTableReleasedData',{
                    sort: item
                });
                this.$store.dispatch('liveProgramaSetting/getTableDraftData',{
                    sort: item
                });
            },
            selectTopChange(item) {
                this.$store.dispatch('liveProgramaSetting/setTopLive',{
                    data: item
                }).then((data)=>{
                    this.$message({
                        message: data.data.msg,
                        type: 'success'
                    });
                }).catch((data)=>{
                    this.$message({
                        message: data.data.msg,
                        type: 'error'
                    });
                });
            },
            switchCallback() {
                console.log(arguments)
            }
        }
    };
</script>

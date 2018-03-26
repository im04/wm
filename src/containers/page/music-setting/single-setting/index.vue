<template>
    <div>
        <search-header :options="searchInit" :click-callback="clickCallback" :button-callback="buttonClick">
            <div class="search-bar bg-white child-middle">
                <span>搜索选项 : </span>
                <el-input v-model="searchInfo.singleName" placeholder="单曲名称/单曲id" class="repeat-el-input"></el-input>
                <el-input v-model="searchInfo.specialName" placeholder="专辑名称/专辑id" class="repeat-el-input"></el-input>
                <el-input v-model="searchInfo.singerData" placeholder="歌手名称/歌手id" class="repeat-el-input"></el-input>
            </div>
        </search-header>
        <div class="content">
            <tab-cpt :tab-click="tabClick">
                <template slot="head">
                    <el-button type="primary" @click="tabCallback()" size="small">添加单曲</el-button>
                    <el-button class="m-left-0" size="small">批量上传</el-button>
                    <select-bar size="small" placeholder="排序方式" :options="selectSort" :select-change="selectCallback"/>
                </template>
                <div tit="已发布">
                    <pagination-content :options="paginationInitReleased" :current-change="handleCurrentReleased">
                        <template slot="body">
                            <!--<table-cpt class="b-top-0" :options="tableInit" max-line="12" :ctrl-callback="ctrCallback" :select-callback="selectCallback"/>-->

                            <el-table :data="tableReleased" :border="true" size="small">
                                <el-table-column type="selection"/>
                                <el-table-column prop="date" label="文件名"/>
                                <el-table-column prop="name" label="单曲名称"/>
                                <el-table-column prop="date" label="所属专辑"/>
                                <el-table-column prop="name" label="歌手"/>
                                <el-table-column prop="name" label="语种"/>
                                <el-table-column prop="name" label="音乐类型"/>
                                <el-table-column label="是否置顶">
                                    <template slot-scope="scope">
                                        <table-switch  :scope="scope"/>
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
                            <select-bar size="small" :options="selectTopInit" :select-change="selectCallback"/>
                            <el-button :plain="true" class="btn" size="small">批量下架</el-button>
                        </template>
                    </pagination-content>
                </div>
                <div tit="草稿">
                    <pagination-content :options="paginationInitDraft" :current-change="handleCurrentDraft">
                        <template slot="body">
                            <!--<table-cpt class="b-top-0" :options="tableInit" max-line="12" :ctrl-callback="ctrCallback" :select-callback="selectCallback"/>-->
                            <el-table :data="tableDraft" :border="true" size="small">
                                <el-table-column type="selection"/>
                                <el-table-column prop="date" label="文件名"/>
                                <el-table-column prop="name" label="单曲名称"/>
                                <el-table-column prop="date" label="所属专辑"/>
                                <el-table-column prop="name" label="歌手"/>
                                <el-table-column prop="name" label="语种"/>
                                <el-table-column prop="name" label="音乐类型"/>
                                <el-table-column prop="name" label="修改时间"/>
                                <el-table-column label="操作">
                                    <template slot-scope="scope">
                                        <ctrl-button :data="scope" :options="ctrlInit" :click-callback="ctrCallback"/>
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
    import ctrlButton from 'components/ctrl-button';
    import { mapState } from 'vuex';
    export default {
        components: {

            tabCpt,
            searchHeader,
            paginationContent,
            selectBar,
            tableSwitch,
            ctrlButton
        },
        beforeCreate() {
//            this.$store.dispatch('liveSettingIndex/getTableDraftData');
        },
        computed: {
            ...mapState('liveSettingIndex',[
                'tableReleased',
                'tableDraft'
            ]),
            requestParams() {
                return {
                    ...this.searchInfo,
                    ...this.searchInit,
                    selectSort: this.selectSort.value,
                    selectTop: this.selectTopInit.value,
                    currentPage: this.paginationInit.currentPage
                }
            }
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
                            hasTips: true,
                            title: '删除直播',
                            content: '是否确认删除直播场次？',
                            type: 'warning'
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
            tabCallback(target) {
                let _router = this.$router;
                _router.push('/musicSetting/singleSetting/singleSettingEdit');
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
                                name: '查看单曲',
                                params: {
                                    liveId: row.liveId
                                }
                            }
                        );

                    case 'edit':
                        return row.liveId&&this.$router.push(
                            {
                                name: '编辑单曲',
                                params: {
                                    liveId: row.liveId,
                                    status: 'playing'
                                }
                            }
                        );
                }
            },
            deleteOpt(row) {
                this.$store.dispatch('liveSettingIndex/deleteLive',{
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
            handleCurrentReleased() {
                console.log(this.paginationInitReleased.currentPage);
            },
            handleCurrentDraft() {
                console.log(this.paginationInitDraft.currentPage);
            },
            tabClick() {
                console.log(arguments)
            },
            releasedSelectChange(item) {
                this.$store.dispatch('liveSettingIndex/getTableReleasedData',{
                    sort: item
                });
                this.$store.dispatch('liveSettingIndex/getTableDraftData',{
                    sort: item
                });
            },
            selectTopChange(item) {
                this.$store.dispatch('liveSettingIndex/setTopLive',{
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

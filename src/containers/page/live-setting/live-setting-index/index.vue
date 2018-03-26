<template>
    <div>
        <search-header prop="key" :options="searchInit" :filtrate-callback="filtrateCallback">
            <div class="search-bar bg-white child-middle">
                <span>搜索选项 : </span>
                <el-date-picker
                        class="m-left-10"
                        v-model="searchInfo.dateRange"
                        type="daterange"
                        align="left"
                        placeholder="选择日期范围"
                        :picker-options="pickerOptions">
                </el-date-picker>
                <el-input v-model="searchInfo.keyWork" placeholder="直播名称" class="repeat-el-input"></el-input>
                <el-button class="m-left-10" @click="searchAll()">搜索全部</el-button>
                <el-button  @click="resetSearchInfo()">重置全部</el-button>
            </div>
        </search-header>
        <div class="content">
            <!--<tab-cpt>-->
                <div class="p-tb-12">
                    <el-button type="primary" @click="addLive()" size="small">添加</el-button>
                    <tipButton type="primary" :callback="setAsPrevue"  size="small">设为预告</tipButton>
                    <tipButton type="primary" :callback="setAsOriginal"  size="small">设为初始</tipButton>
                    <tipButton :callback="deleteLive"
                               :confirm="{title:'',content:'是否确认删除直播场次？',type:'warning'}" size="small">
                        删除
                    </tipButton>
                    <tipButton :callback="alterLive" size="small">修改</tipButton>
                </div>
                <pagination-content :options="paginationInit" :current-change="searchAll">
                    <template slot="body">
                        <el-table :data="tableData" :border="true" size="small">
                            <el-table-column type="selection"/>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <div class="p-tb-4">
                                        <ctrl-button size="mini" :data="scope" :options="ctrlInit"/>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="status" label="状态"/>
                            <el-table-column label="直播标题">
                                <template slot-scope="scope">
                                    <upaway-tag :is-upaway="true">
                                        {{scope.liveName}}
                                    </upaway-tag>
                                </template>
                            </el-table-column>
                            <el-table-column prop="when" label="开播时间"/>
                            <el-table-column prop="pay" label="付费方式"/>
                            <el-table-column prop="liveRoom" label="直播厅"/>
                            <el-table-column width="170" label="推荐排序">
                                <template slot-scope="scope">
                                    <el-input-number size="small" v-model="scope.row.index"/>
                                </template>
                            </el-table-column>
                            <el-table-column prop="number" label="浏览人数"/>
                            <el-table-column prop="date" label="艺人"/>
                            <el-table-column prop="livePrograma" label="直播栏目"/>
                        </el-table>
                    </template>
                </pagination-content>
        </div>
    </div>
</template>
<script>
    import searchHeader from 'components/search-header';
    import paginationContent from 'components/pagination-content';
    import ctrlButton from 'components/ctrl-button';
    import tipButton from 'components/tip-button';
    import upawayTag from 'components/upaway-tag';
    import { mapState } from 'vuex';
    export default {
        components: {
            searchHeader,
            paginationContent,
            tipButton,
            ctrlButton,
            upawayTag
,       },
        computed: {
            ...mapState('liveSettingIndex',[
                'tableData'
            ]),
            requestParams() {
                return {
                    ...this.searchInfo,
                    filtrate: this.searchInit[0].activity,
                    currentPage: this.paginationInit.currentPage
                }
            }
        },
        beforeCreate() {
            this.$store.dispatch('liveSettingIndex/getTableData');
        },
        data() {
            return {
                searchInfo: {},//搜索选项
                pickerOptions: utils.pickerOptions,//日期选择快捷配置
                ctrlInit: {//表单按钮
                    ctrlList: [
                        {
                            name: '开播',
                            key: 'play',
                            test:row=>'1'.includes(row.statusCode),
                            success: (item,row)=> {

                            }
                        },
                        {
                            name: '修改',
                            key: 'edit',
                            test:row=>'0123567'.includes(row.statusCode),
                            success:(item,row)=> {
                                row.liveId&&this.$router.push(
                                    {
                                        name: '编辑直播间',
                                        params: {
                                            liveId: row.liveId,
                                            status: 'playing'
                                        }
                                    }
                                );
                            }
                        },
                        {
                            name: '上架',
                            key: 'upaway',
                            test:row=>'0'.includes(row.statusCode),
                            success:(item,row)=> {
                                row.liveId&&this.$router.push(
                                    {
                                        name: '编辑直播间',
                                        params: {
                                            liveId: row.liveId,
                                            status: 'playing'
                                        }
                                    }
                                );
                            }
                        },
                        {
                            name: '结束直播 ',
                            key: 'finish',
                            test:row=>'23'.includes(row.statusCode),
                            success:(item,row)=> {

                            }
                        },
                        {
                            name: '推荐',
                            key: 'recommend',
                            confirm: {
                                title: '推荐直播',
                                content: '是否确认推荐直播场次？',
                            },
                            test:row=>'13'.includes(row.statusCode),
                            success:(item,row)=> {
                                return this.$store.dispatch('liveSettingIndex/setAsPrevue',{});
                            }
                        },
                        {
                            name: '取消推荐',
                            key: 'cancelRecommend',
                            confirm:{
                                title: '取消推荐',
                                content: '是否确认取消推荐直播场次？',
                            },
                            test:row=>'25'.includes(row.statusCode),
                            success:(item,row)=> {
                                return this.$store.dispatch('liveSettingIndex/setAsPrevue',{});
                            }
                        },
                        {
                            name: '复制URL',
                            key: 'copyUrl',
                            test:row=>'123'.includes(row.statusCode),
                            success:(item,row)=> {
                                utils.copyByText(row.url)
                            }
                        },
                        {
                            name: '添加回放',
                            key: 'addPlayback',
                            test:row=>'4' == row.statusCode,
                            success:(item,row)=> {
                                this.$router.push({
                                    name : '上传回放'
                                });
                            }
                        }
                    ]
                },
                searchInit: [//筛选条件
                    {
                        activity: null,
                        dataList: [
                            {
                                label: '全部',
                                key: '0'
                            },
                            {
                                label: '预告',
                                key: '1'
                            },
                            {
                                label: '正在直播',
                                key: '2'
                            },
                            {
                                label: '直播中断',
                                key: '3'
                            },
                            {
                                label: '直播结束',
                                key: '4'
                            },
                            {
                                label: '回放',
                                key: '5'
                            }
                        ]
                    }
                ],
                paginationInit: {//分页初始化
                    size: 10,
                    length: 1000,
                    currentPage: 1
                },
            };
        },
        methods: {
            filtrateCallback() {//筛选回调
                console.log(arguments);
            },
            searchAll() {
                this.$store.dispatch('liveSettingIndex/getTableData',this.requestParams);
            },
            resetSearchInfo() {

            },
            addLive(target) {
                let _router = this.$router;
                _router.push(
                    {
                        name: '添加直播间'
                    }
                )
            },
            setAsPrevue({success,fail}) {
                return this.$store.dispatch('liveSettingIndex/setAsPrevue',{});
            },
            setAsOriginal() {
                return this.$store.dispatch('liveSettingIndex/setAsPrevue',{});
            },
            deleteLive() {
                return this.$store.dispatch('liveSettingIndex/setAsPrevue',{});
            },
            alterLive() {

            },
            deleteOpt(row) {
                return this.$store.dispatch('liveSettingIndex/deleteLive',{
                    data: row
                })
            }
        }
    };
</script>

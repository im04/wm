<template>
    <div>
        <search-header :options="searchInit">
            <div class="search-bar bg-white child-middle">
                <span>搜索选项 : </span>
                <el-input v-model="searchInfo.title" placeholder="视频名称" class="repeat-el-input" ></el-input>
                <el-input v-model="searchInfo.programTitle" placeholder="节目名称" class="repeat-el-input" ></el-input>
                <el-button class="m-left-10" @click="getData()">搜索结果</el-button>
                <el-button @click="reset()">重置</el-button>
            </div>
        </search-header>
        <div class="content">
            <!--<tab-cpt :tab-click="tabClick">-->
                <!--<template slot="head">-->
                    <div class="p-tb-12">
                        <el-button type="primary" @click="addVideo()" size="small">添加</el-button>
                        <tipButton :callback="putaway" type="primary" size="small"
                                   :confirm="{title:'',content:'是否确认上架该节目？',type:'warning'}">
                            上架
                        </tipButton>
                        <tipButton :callback="downaway" type="primary" size="small"
                                   :confirm="{title:'',content:'是否确认下架该节目？',type:'warning'}">
                            下架
                        </tipButton>
                    </div>
                <!--</template>-->
                <!--<div tit="已经发布" name="0">-->
                    <pagination-content :options="paginationInit" :current-change="getData">
                        <template slot="body">
                            <!--<table-cpt class="b-top-0" :options="tableInit" max-line="12" :ctrl-callback="ctrCallback" :select-callback="selectCallback"/>-->
                            <el-table :data="tableData" :border="true" size="small" @selection-change="selectionChange">
                                <el-table-column type="selection"/>
                                <el-table-column label="操作">
                                    <template slot-scope="scope">
                                        <ctrl-button :data="scope" :options="ctrlInit"/>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="date" label="状态" :formatter="videoStatusFilter"/>
                                <el-table-column prop="date" label="视频名称">
                                    <template slot-scope="scope">
                                        <upaway-tag :is-upaway="scope.row.isRecommend == 0">
                                            {{scope.row.title}}
                                        </upaway-tag>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="classifyId" label="内容分类"/>
                                <el-table-column prop="updateTime" label="修改时间" :formatter="timeFilter"/>
                                <el-table-column prop="isRecommend" label="推荐排序" :formatter="recommendFilter"/>
                                <el-table-column prop="viewNum" label="浏览人数"/>
                                <el-table-column prop="programTitle" label="所属节目"/>
                                <!--<el-table-column label="是否置顶">-->
                                    <!--<template slot-scope="scope">-->
                                        <!--<el-switch on-color="#13ce66" off-color="#ff4949" on-text="" off-text="" on-value="true" off-value="false"></el-switch>-->
                                    <!--</template>-->
                                <!--</el-table-column>-->
                            </el-table>
                        </template>
                        <!--<template slot="floor">-->
                            <!--<select-bar size="small" placeholder="置顶方式" :options="selectTopInit" :select-change="selectTopChange"/>-->
                            <!--<el-select size="small" v-model="selectInit.value" placeholder="请选择">-->
                            <!--<el-option v-for="item in selectInit.options" :key="item.value" :label="item.label" :value="item.value"/>-->
                            <!--</el-select>-->
                            <!--<el-button :plain="true" class="btn" size="small">批量下架</el-button>-->
                        <!--</template>-->
                    </pagination-content>
                <!--</div>-->
                <!--<div tit="草稿" name="1">-->
                    <!--<pagination-content :options="paginationInitDraft" :size-change="handleSizeChange" :current-change="handleCurrentChange">-->
                        <!--<template slot="body">-->
                            <!--&lt;!&ndash;<table-cpt class="b-top-0" :options="tableInit2" max-line="12" :ctrl-callback="ctrCallback" :select-callback="selectCallback"/>&ndash;&gt;-->
                            <!--<el-table :data="tableDraft" :border="true" size="small">-->
                                <!--<el-table-column type="selection"/>-->
                                <!--<el-table-column prop="name" label="节目名称"/>-->
                                <!--<el-table-column prop="date" label="节目id"/>-->
                                <!--<el-table-column prop="date" label="视频"/>-->
                                <!--<el-table-column label="操作">-->
                                    <!--<template slot-scope="scope">-->
                                        <!--<ctrl-button :data="scope" :options="ctrlInit" :click-callback="ctrCallback"/>-->
                                    <!--</template>-->
                                <!--</el-table-column>-->
                            <!--</el-table>-->
                        <!--</template>-->
                        <!--<template slot="floor">-->
                            <!--<el-button :plain="true" class="btn" size="small">批量上架</el-button>-->
                        <!--</template>-->
                    <!--</pagination-content>-->
                <!--</div>-->
            <!--</tab-cpt>-->


        </div>
    </div>
</template>
<script>
    import searchHeader from 'components/search-header';
    import paginationContent from 'components/pagination-content';
    import ctrlButton from 'components/ctrl-button';
    import tipButton from 'components/tip-button';
    import upawayTag from 'components/upaway-tag';
    import { mapState, mapActions } from 'vuex';
    export default {
        components: {
            searchHeader,
            paginationContent,
            tipButton,
            ctrlButton,
            upawayTag
        },
        computed: {
            ...mapState('uploadVideo',[
                'tableData'
            ]),
            requestParams() {
                return {
                    onlineStatus: this.searchInit[1].activity,
                    title: this.searchInfo.title,
                    programTitle: this.searchInfo.programTitle,
                    birtateStatus: null,
                    pageNo: this.paginationInit.currentPage,
                    pageSize: 10,
                }
            }
        },
        created() {
            this.getData();
        },
        data() {
            return {
                selectList: null,
                searchInfo: {},//搜索选项
                ctrlInit: {//表单按钮
                    ctrlList: [
//                        {
//                            name: '查看',
//                            key: 'check',
//                            test:row=>'03'.includes(row.statusCode),
//                            success:(item,row)=> {
//                                this.$router.push(
//                                    {
//                                        name: '查看视频',
//                                        params: {
//                                            liveId: row.id
//                                        }
//                                    }
//                                );
//                            }
//                        },
                        {
                            name: '编辑',
                            key: 'edit',
                            test:row=>row.onlineStatus == 2,
                            success:(item,row)=> {
                                this.$router.push(
                                    {
                                        name: '编辑视频',
                                        params: {
                                            liveId: row.id,
                                            status: 'playing'
                                        }
                                    }
                                );
                            }
                        },
                        {
                            name: '上架',
                            key: 'upaway',
                            confirm: {
                                title: '上架视频',
                                content: '是否确认上架该视频？',
                            },
                            test:row=>{ console.log(row.onlineStatus),row.onlineStatus == 2},
                            success:(item,row)=> {
                                return this.updateOnlineStatus({
                                    onlineStatus: 1,
                                    ids: [row.id]
                                });
                            }
                        },
                        {
                            name: '下架',
                            key: 'downaway',
                            confirm: {
                                title: '下架视频',
                                content: '是否确认下架该视频？',
                            },
                            test:row=>row.onlineStatus == 1,
                            success:(item,row)=> {
                                return this.updateOnlineStatus({
                                    onlineStatus: 2,
                                    ids: [row.id]
                                });
                            }
                        },
                        {
                            name: '删除',
                            key: 'delete',
                            confirm: {
                                title: '删除视频',
                                content: '是否确认删除该视频？',
                            },
                            test:row=>row.onlineStatus == 2,
                            success:(item,row)=> {
                                return this.delete({
                                    ids: [row.id]
                                });
                            }
                        },
                        {
                            name: '推荐',
                            key: 'recommend',
                            confirm: {
                                title: '推荐视频',
                                content: '是否确认推荐该视频？',
                            },
                            test:row=>row.onlineStatus == 1 && row.isRecommend == 1,
                            success:(item,row)=> {
                                return this.updateRemconnendStatus({
                                    remconnendStatus: 2,
                                    ids: [row.id]
                                });
                            }
                        },
                        {
                            name: '撤销推荐',
                            key: 'cancelRecommend',
                            confirm:{
                                title: '取消推荐',
                                content: '是否确认取消推荐该视频？',

                            },
                            test:row=>row.onlineStatus == 1 && row.isRecommend == 0,
                            success:(item,row)=> {
                                return this.updateRemconnendStatus({
                                    remconnendStatus: 1,
                                    ids: [row.id]
                                });
                            }
                        }
                    ]
                },
                searchInit: [//筛选条件
                    {
                        activity: '',
                        dataList: [
                            {
                                label: '全部',
                                value: '',
                            },
                            {
                                label: '综艺',
                                value: '1',
                            }
                        ]
                    },
                    {
                        activity: '1',
                        dataList: [
//                            {
//                                label: '全部',
//                                value: '',
//                            },
                            {
                                label: '上架',
                                value: '1',
                            },
                            {
                                label: '下架',
                                value: '2',
                            }
                        ]
                    }
                ],
                paginationInit: {//分页初始化
                    size: 10,
                    length: 1000,
                    currentPage: 1
                }
            };
        },
        methods: {
            ...mapActions('uploadVideo',[
                'updateRemconnendStatus',
                'delete',
                'updateOnlineStatus'
            ]),
            selectionChange(list) {
                this.selectList = list.map(v=>{
                    return v.id
                });
                console.log(this.selectList);
            },
            getData() {
                console.log(this.tableData);
                this.$store.dispatch('uploadVideo/getData',this.requestParams);
            },
            reset() {
                this.searchInfo.title = '';
                this.searchInfo.programTitle = '';
            },
            addVideo() {
                this.$router.push('/videoSetting/uploadVideo/uploadVideoAdd');
            },
            putaway() {
                return this.updateOnlineStatus({
                    onlineStatus: 2,
                    ids: this.selectList
                });
            },
            downaway() {
                return this.updateOnlineStatus({
                    onlineStatus: 1,
                    ids: this.selectList
                });
            }
        }
    };
</script>

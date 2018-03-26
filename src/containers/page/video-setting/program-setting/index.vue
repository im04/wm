<template>
    <div>
        <search-header :options="searchInit">
            <div class="search-bar bg-white child-middle">
                <span>搜索选项 : </span><el-input v-model="searchInfo.name" placeholder="节目名称" class="repeat-el-input" ></el-input>
                <el-button class="m-left-10" @click="getData()">搜索结果</el-button>
                <el-button @click="reset()">重置</el-button>
            </div>
        </search-header>
        <div class="content">
            <div class="p-tb-12">
                <el-button type="primary" @click="addProgram()" size="small">添加节目</el-button>
                <tipButton :callback="putaway" type="primary" size="small"
                           :confirm="{content:'是否确认上架该节目？',type:'warning'}">
                    上架
                </tipButton>
                <tipButton :callback="downaway" type="primary" size="small"
                           :confirm="{content:'是否确认下架该节目？',type:'warning'}">
                    下架
                </tipButton>
            </div>
            <pagination-content :options="paginationInit"  :current-change="getData">
                <template slot="body">
                    <!--<table-cpt class="b-top-0" :options="tableInit" max-line="12" :ctrl-callback="ctrCallback" :select-callback="selectCallback"/>-->
                    <el-table :data="tableData" :border="true" size="small" @selection-change="selectionChange">
                        <el-table-column type="selection"/>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <ctrl-button :data="scope" :options="ctrlInit"/>
                            </template>
                        </el-table-column>
                        <el-table-column prop="date" label="状态"/>
                        <el-table-column prop="date" label="节目名称">
                            <template slot-scope="scope">
                                <upaway-tag :is-upaway="true">
                                    1234
                                </upaway-tag>
                            </template>
                        </el-table-column>
                        <el-table-column prop="date" label="分类"/>
                        <el-table-column prop="date" label="视频"/>
                        <el-table-column prop="date" label="收藏量"/>
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
            ...mapState('programSetting',[
                'tableData'
            ]),
            requestParams() {
                return {
                    name: this.searchInfo.name,
                    classifyId: this.searchInit[0].activity,
                    onlineStatus: this.searchInit[1].activity,
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
                        {
                            name: '查看',
                            key: 'check',
                            test:row=>'03'.includes(row.statusCode),
                            success:(item,row)=> {
                                this.$router.push(
                                    {
                                        name: '查看视频',
                                        params: {
                                            liveId: row.id
                                        }
                                    }
                                );
                            }
                        },
                        {
                            name: '编辑',
                            key: 'edit',
                            test:row=>'12'.includes(row.statusCode),
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
                            name: '删除',
                            key: 'delete',
                            confirm: {
                                title: '删除视频',
                                content: '是否确认删除该视频？',
                            },
                            test:row=>'12'.includes(row.statusCode),
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
                            test:row=>'0'.includes(row.statusCode),
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
                            test:row=>'3'.includes(row.statusCode),
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
                        activity: '0',
                        dataList: [
                            {
                                label: '全部',
                                value: '0',
                            },
                            {
                                label: '综艺',
                                value: '1',
                            }
                        ]
                    },
                    {
                        activity: 1,
                        dataList: [
                            {
                                label: '上架',
                                value: '1',
                            },
                            {
                                label: '上架',
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
            ...mapActions('programSetting',[
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
                this.$store.dispatch('programSetting/getData',this.requestParams);
            },
            addProgram() {
                this.$router.push({
                    name: '添加节目'
                });
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

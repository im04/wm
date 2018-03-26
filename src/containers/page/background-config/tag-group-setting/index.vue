<template>
    <div class="cmm-content">
        <search-header :options="searchInit" :click-callback="clickCallback" :button-callback="buttonClick">
            <div class="search-bar bg-white child-middle">
                <span>搜索选项 : </span>
                <el-input placeholder="标签组名称" class="repeat-el-input" v-model="searchForm.name"></el-input>
                <el-button class="m-left-10" @click="searchFormOpt()">搜索</el-button>
            </div>
        </search-header>
        <div class="content">
            <tab-cpt :options="tabInit" :tab-click="tabClick">
                <template slot="head">
                    <el-button type="primary"
                               @click="$router.push('/backgroundConfig/tagGroupSetting/tagGroupSettingEdit')"
                               size="small">添加标签组
                    </el-button>
                </template>
                <div tit="数据列表" name="0">
                    <pagination-content :options="paginationInit" :size-change="handleSizeChange"
                                        :current-change="handleCurrentChange">
                        <template slot="body">
                            <el-table :data="tableInit.dataList" :border="true" size="small">
                                <el-table-column prop="name" label="标签组名称"/>
                                <el-table-column prop="catesText" label="关联分类"/>
                                <el-table-column prop="typeText" label="类型"/>
                                <el-table-column label="操作">
                                    <template slot-scope="scope">
                                        <router-link
                                                :to="'/backgroundConfig/tagGroupSetting/tagGroupSettingEdit?id='+scope.row.id"
                                                class="small">编辑
                                        </router-link>&nbsp;
                                        <el-button @click="deleteOpt(scope.$index, scope.row)" type="text"
                                                   size="small">删除
                                        </el-button>
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
                searchHeaderActives: ['1'],
                searchForm: {
                    name: ''
                },
                searchInit: [],
                tabInit: {
                    activeName: '0',
                },
                tableInit: {
                    tableCtrl: {
                        ctrlList: []
                    },
                    dataList: []
                },
                paginationInit: {
                    size: 10,
                    length: 100,
                    currentPage: 1,
                }
            };
        },
        created() {
            this.getData()
        },
        methods: {
            getData() {
                let _this = this;

                let params = this.searchForm
                console.log(params)

                this.$store.dispatch('userList/getUserData', params
                ).then(function (r) {
                    if (r.data.status === 200) {
                    } else {
                        _this.$message.error(r.data.msg)
                    }
                }).finally(function () {
                }).catch(function (error) {
                    console.log(error)
                })

                this.tableInit.dataList = []

                let item = [];
                for (let i = 0; i < this.paginationInit.size; i++) {
                    item = {
                        id: i + 1,
                        name: '综艺节目_' + i + '_' + parseInt(Math.random() * 1000),
                        catesText: '视频，直播',
                        typeText: '单选'
                    }

                    this.tableInit.dataList.push(item);
                }

                this.paginationInit.length = utils.randomNum(50, 100);
            },
            searchFormOpt() {
                this.getData();
                this.paginationInit.currentPage = 1;
            },
            tabCallback(target) {
                let _router = this.$router;
                console.log(arguments);
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
                this.getData()
            },
            tabClick() {
                console.log(arguments)
            },
            selectChange() {
                console.log(arguments)
            },
            deleteOpt(index, row) {
                let _this = this
                this.$confirm('确定在删除吗?此操作不可恢复!', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                            let postData = {
                                id: row.id
                            }
                            console.log(postData)
                            this.$store.dispatch('userList/deleteOpt', postData
                            ).then(function (r) {
                                if (r.data.status === 200) {
                                    _this.tableInit.dataList.splice(index, 1);
                                    _this.$message.success('操作成功');
                                    done();
                                } else {
                                    _this.$message.error(r.data.msg)
                                }
                            }).finally(function () {
                            }).catch(function (error) {
                                console.log(error)
                            })
                        } else {
                            done();
                        }
                    }
                }).then(() => {
                }).catch(() => {
                });

            }
        }
    };
</script>

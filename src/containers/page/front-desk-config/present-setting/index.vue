<template>
    <div class="cmm-content">
        <search-header :options="searchInit" :click-callback="clickCallback" :button-callback="buttonClick">
            <div class="search-bar bg-white child-middle">
                <span>搜索选项 : </span>
                <el-input placeholder="关键词" class="repeat-el-input" v-model="searchForm.name"></el-input>
                <el-button class="m-left-10" @click="searchFormOpt()">搜索</el-button>
            </div>
        </search-header>
        <div class="content">
            <tab-cpt :options="tabInit" :tab-click="tabClick">
                <template slot="head">
                    <el-button type="primary" @click="tabCallback()" size="small">新建礼物</el-button>
                </template>
                <div tit="数据列表" name="0">
                    <pagination-content :options="paginationInit" :size-change="handleSizeChange" :current-change="handleCurrentChange">
                        <template slot="body">
                            <el-table :data="tableInit.dataList" :border="true" size="small" @selection-change="listSelectionChange" >
                                <el-table-column type="selection"/>
                                <el-table-column label="图片">
                                    <template slot-scope="scope">
                                        <img :src="scope.row.img" alt="" class="tb-item-img">
                                    </template>
                                </el-table-column>
                                <el-table-column prop="name" label="礼物名称"/>
                                <el-table-column prop="coin" label="币值"/>
                                <el-table-column prop="experience" label="经验值"/>
                                <el-table-column prop="sort" label="推荐排序"/>
                                <el-table-column prop="count" label="消费次数"/>
                                <el-table-column label="操作">
                                    <template slot-scope="scope">
                                        <router-link :to="'/frontDeskConfig/presentSetting/presentSettingEdit?id='+scope.row.id" class="small">编辑</router-link>&nbsp;&nbsp;
                                        <el-button @click="deleteOpt(scope.$index, scope.row)" type="text" size="small">删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </template>
                        <template slot="floor">
                            <el-button @click="deleteOpt(0, 0)" class="btn" size="small">批量删除</el-button>
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
    import paginationContent from 'components/pagination-content';

    export default {
        components: {
            tabCpt,
            searchHeader,
            paginationContent
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
                },
                selectIds: [],
                listSelection: []
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
                        img: 'https://www.baidu.com/img/bd_logo1.png',
                        name: '礼物名称_' + i + '_' + parseInt(Math.random() * 1000),
                        sort: parseInt(Math.random() * 1000),
                        coin:100,
                        experience:200,
                        count:1
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
                _router.push('/frontDeskConfig/presentSetting/presentSettingEdit');
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
            listSelectionChange(val) {
                this.listSelection = val;
            },
            deleteOpt(index, row) {
                this.selectIds = [];
                let postData = {}
                if(index === 0 && row == 0) {
                    if(this.listSelection.length == 0){
                        this.$message.warning('请选择要操作的项');
                        return;
                    }
                    for(let i=0;i<this.listSelection.length;i++){
                        this.selectIds.push(this.listSelection[i]['id'])
                    }
                    postData = {
                        id: this.selectIds
                    }
                }else {
                    postData = {
                        id: row.id
                    }
                }

                let _this = this
                this.$confirm('确定在删除吗?此操作不可恢复!', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                            console.log(postData)
                            this.$store.dispatch('userList/deleteOpt', postData
                            ).then(function (r) {
                                if (r.data.status === 200) {
                                    //_this.tableInit.dataList.splice(index, 1);
                                    _this.$message.success('操作成功');
                                    _this.getData();
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

            },
            openEdit() {
                this.editForm = {
                    name: ''
                }
                this.editDialogVisible = true
            },
            editOpt(formName) {
                this.$refs[formName].validate((valid) => {
                    if (!valid) {
                        return false
                    }

                    let _this = this;

                    let postData = this.editForm
                    console.log(postData)

                    this.$store.dispatch('userList/deleteOpt', postData
                    ).then(function (r) {
                        if (r.data.status === 200) {
                            _this.$message.success('操作成功');
                            _this.editDialogVisible = false
                            _this.getData()
                        } else {
                            _this.$message.error(r.data.msg)
                        }
                    }).finally(function () {
                    }).catch(function (error) {
                        console.log(error)
                    })
                })
            }
        }
    };
</script>

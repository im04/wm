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
                    <el-button type="primary" @click="openEdit()" size="small">添加热搜词</el-button>
                </template>
                <div tit="数据列表" name="0">
                    <pagination-content :options="paginationInit" :size-change="handleSizeChange"
                                        :current-change="handleCurrentChange">
                        <template slot="body">
                            <el-table :data="tableInit.dataList" :border="true" size="small" @selection-change="listSelectionChange" >
                                <el-table-column type="selection"/>
                                <el-table-column prop="name" label="热搜关键词"/>
                                <el-table-column prop="date" label="添加时间"/>
                                <el-table-column label="排序">
                                    <template slot-scope="scope">
                                        <el-input-number v-model="scope.row.sort" @change="handleChange(scope.row)" label="排序" size="small"></el-input-number>
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作">
                                    <template slot-scope="scope">
                                        <el-button @click="deleteOpt(scope.$index, scope.row)" type="text"
                                                   size="small">删除
                                        </el-button>
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


        <el-dialog title="添加热搜关键词" :visible.sync="editDialogVisible" width="10%" class="dialog-loading">
            <div class="dialog-loading-body">
                <el-form :model="editForm" :rules="editFormRules" ref="editForm">
                    <el-form-item label="热搜关键词" :label-width="formLabelWidth" prop="name">
                        <el-col :span="8">
                            <el-input v-model="editForm.name" placeholder="请输入关键词"></el-input>
                        </el-col>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="editDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="editOpt('editForm')">确 定</el-button>
                </div>
            </div>
        </el-dialog>

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
                editDialogVisible: false,
                editFormVisible: false,
                editFormTitle: '添加分类',
                editForm: {
                    name: ''
                },
                formLabelWidth: '120px',
                editFormRules: {
                    name: [
                        {required: true, message: '请输入', trigger: 'change'}
                    ]
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
                        name: '综艺节目_' + i + '_' + parseInt(Math.random() * 1000),
                        sort: parseInt(Math.random() * 1000),
                        date: '2017-10-10',
                        groupsText: '视频/直播/歌手'
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
            listSelectionChange(val) {
                this.listSelection = val;
            },
            editSort(id, sort) {
                let _this = this;
                let params = {
                    id: id,
                    sort: sort,
                }
                console.log(params)
                this.$store.dispatch('systemSetting/editActivitySort', params
                ).then(function (r) {
                    if(r.data.status === 200 ){
                        _this.getData()
                    }else {
                        _this.$message.error(r.data.msg)
                    }
                }).finally(function () {
                }).catch(function (error) {
                    console.log(error)
                })
            },
            handleChange(row){
                console.log(arguments);
                let _this = this;

                setTimeout(function(){
                    _this.editSort(row.id, row.sort)
                    console.log(row.sort);
                }, 100)
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

<template>
    <div class="cmm-content">
        <search-header :options="searchInit" :click-callback="clickCallback" :button-callback="buttonClick">
            <div class="search-bar bg-white child-middle">
                <span>搜索选项 : </span>
                <el-input placeholder="分类名称" class="repeat-el-input" v-model="searchForm.name"></el-input>
                <el-button class="m-left-10" @click="searchFormOpt()">搜索</el-button>
            </div>
        </search-header>
        <div class="content">
            <tab-cpt :options="tabInit" :tab-click="tabClick">
                <template slot="head">
                    <el-button type="primary" @click="openEdit(0, 0)" size="small">添加分类</el-button>
                </template>
                <div tit="数据列表" name="0">
                    <pagination-content :options="paginationInit" :size-change="handleSizeChange"
                                        :current-change="handleCurrentChange">
                        <template slot="body">
                            <el-table :data="tableInit.dataList" :border="true" size="small">
                                <el-table-column prop="name" label="分类名称"/>
                                <el-table-column prop="groupsText" label="分类分组"/>
                                <el-table-column label="操作">
                                    <template slot-scope="scope">
                                        <el-button @click="openEdit(scope.$index, scope.row)" type="text" size="small">
                                            编辑
                                        </el-button>
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


        <el-dialog :title="editFormTitle" :visible.sync="editDialogVisible" width="10%" class="dialog-loading">
            <div class="dialog-loading-body">
                <el-form :model="editForm" :rules="editFormRules" ref="editForm">
                    <el-form-item label="分类名称" :label-width="formLabelWidth" prop="name">
                        <el-col :span="8">
                            <el-input v-model="editForm.name" placeholder="请输入分类名称"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="分组" :label-width="formLabelWidth" prop="groups">
                        <el-checkbox-group v-model="editForm.groups">
                            <el-checkbox
                                    v-for="item in cateGroups"
                                    :key="item.value"
                                    :label="item.value"
                                    name="groups">
                                {{item.label}}
                            </el-checkbox>
                        </el-checkbox-group>
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
                },
                commonDialogVisible: false,
                editDialogVisible: false,
                editFormVisible: false,
                editFormTitle: '添加分类',
                editForm: {
                    id: '',
                    name: '',
                    groups: []
                },
                cateGroups: [
                    {value: '1', label: '专辑'},
                    {value: '2', label: '单曲'},
                    {value: '3', label: '歌手'},
                    {value: '4', label: '视频'},
                    {value: '5', label: '直播'},
                    {value: '6', label: '电影'}
                ],
                formLabelWidth: '120px',
                editFormRules: {
                    name: [
                        {required: true, message: '请输入', trigger: 'change'}
                    ],
                    groups: [
                        {type: 'array', required: true, message: '请至少选择一个', trigger: 'change'}
                    ]
                },
                currentOptObj: {}
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
                        groups: [
                            {id: i + 10, name: '视频_' + i},
                            {id: 2, name: '直播'},
                            {id: 1, name: '歌手'}
                        ],
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

            },
            openEdit(index, row) {
                if (row == 0) {
                    this.editForm = {
                        id: '',
                        name: '',
                        groups: []
                    }
                } else {

                    let _groups = [];
                    for (let i = 0; i < this.cateGroups.length; i++) {
                        for (let j = 0; j < row.groups.length; j++) {
                            if (this.cateGroups[i].value == row.groups[j].id) {
                                _groups.push(this.cateGroups[i].value)
                            }
                        }
                    }

                    this.editForm = {
                        id: row.id,
                        name: row.name,
                        groups: _groups
                    }
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

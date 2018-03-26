<template>
    <div class="live-room-setting cmm-content">
        <el-collapse class="search-header" v-model="searchHeaderActives">
            <el-collapse-item name="1">
                <template slot="title">
                    <div class="fl m-right-10">
                        筛选查询
                    </div>
                </template>
                <div class="search-bar child-middle" >
                    <el-form :model="searchForm" label-width="80px" label-position="left">
                        <label class="color-third">搜索选项 : </label>
                        <el-date-picker
                                v-model="searchForm.begin"
                                type="date"
                                placeholder="选择日期">
                        </el-date-picker>
                        <span>-</span>
                        <el-date-picker
                                v-model="searchForm.end"
                                type="date"
                                placeholder="选择日期">
                        </el-date-picker>
                        <el-input v-model="searchForm.mobile" placeholder="用户名/手机号码" class="repeat-el-input"></el-input>
                        <el-button class="m-left-10" @click="searchFormOpt('searchForm')">搜索</el-button>
                    </el-form>
                </div>
            </el-collapse-item>
        </el-collapse>

        <div class="content">
            <tab-cpt :options="tabInit" :tab-click="tabClick">
                <template slot="head">
                    <el-button type="primary" @click="$router.push('/userConfig/userList/userEdit')"  size="small">添加内部账号</el-button>
                </template>
                <div tit="用户列表">
                    <pagination-content :options="paginationInit" :size-change="handleSizeChange" :current-change="userHandleCurrentChange">
                        <template slot="body">
                            <el-table :data="tableInit.dataList" :border="true" size="small">
                                <el-table-column prop="name" label="用户名"/>
                                <el-table-column prop="id" label="id"/>
                                <el-table-column prop="mobile" label="手机"/>
                                <el-table-column prop="sex" label="性别"/>
                                <el-table-column prop="level" label="会员等级"/>
                                <el-table-column prop="exp" label="经验值"/>
                                <el-table-column prop="onlineTime" label="在线时长"/>
                                <el-table-column prop="regTime" label="注册时间"/>
                                <el-table-column prop="lastLoginTime" label="最后登录时间"/>
                                <el-table-column label="最后登录地址">
                                    <template slot-scope="scope">
                                        {{scope.row.lastLoginIP}}<br>
                                        ({{scope.row.lastLoginAddr}})
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作">
                                    <template slot-scope="scope">
                                        <el-button @click="unlockClick(scope.$index, scope.row)" v-if="scope.row.lockStatus===2?true:false" type="text" size="small">解禁</el-button>
                                        <el-button @click="lockClick(scope.$index, scope.row)" v-if="scope.row.lockStatus===1?true:false" type="text" class="color-red" size="small">禁言</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </template>
                    </pagination-content>
                </div>
                <div tit="内部用户">
                    <pagination-content :options="paginationInit2" :size-change="handleSizeChange" :current-change="innerUserHandleCurrentChange">
                        <template slot="body">
                            <el-table :data="tableInit2.dataList" :border="true" size="small" ref="innerUserTable" @selection-change="innerUserSelectionChange" tooltip-effect="dark">
                                <el-table-column type="selection"/>
                                <el-table-column prop="name" label="用户名"/>
                                <el-table-column prop="id" label="id"/>
                                <el-table-column prop="mobile" label="手机"/>
                                <el-table-column prop="type" label="身份"/>
                                <el-table-column prop="exp" label="蛙币"/>
                                <el-table-column label="操作">
                                    <template slot-scope="scope">
                                        <router-link :to="'/userConfig/userList/userEdit?id='+scope.row.id" class="small">编辑</router-link>&nbsp;&nbsp;
                                        <el-button @click="deleteOpt(scope.$index, scope.row)" type="text" size="small">删除</el-button>
                                        <el-button @click="openRechange(scope.row.id)" type="text" size="small">充值</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </template>
                        <template slot="floor">
                            <el-button @click="openRechange(0)" class="btn" size="small">批量充值</el-button>
                        </template>
                    </pagination-content>
                </div>
            </tab-cpt>
        </div>


        <el-dialog :title="rechargeFormTitle" :visible.sync="rechargeFormVisible" width="10%" class="dialog-loading">
            <div class="dialog-loading-body">
            <el-form :model="rechargeForm" :rules="rechargeFormRules" ref="rechargeForm">
                <el-form-item label="充值额度" :label-width="formLabelWidth" prop="num">
                    <el-select v-model="rechargeForm.num" placeholder="请选择充值额度">
                        <el-option
                                v-for="item in rechargeOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="rechargeFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="rechangeOpt('rechargeForm')">确 定</el-button>
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
                rechargeLoading: false,
                searchHeaderActives: ['1'],
                searchForm: {
                    begin: '',
                    end: '',
                    mobile: '137'
                },
                currentSelectedTab: 0,
                tabInit: {
                    activeName: '0',
                },
                tableInit: {
                    dataList: []
                },
                paginationInit: {
                    size: 10,
                    length: 100,
                    currentPage: 1,
                },
                tableInit2: {
                    dataList: []
                },
                paginationInit2: {
                    size: 10,
                    length: 100,
                    currentPage: 1
                },
                commonDialogVisible: false,
                cmmDialogLoading: false,
                rechargeFormVisible: false,
                rechargeFormTitle: '批量充值',
                rechargeForm: {
                    num: ''
                },
                rechargeOptions: [
                    { value: '10000', label: '10000' },
                    { value: '50000', label: '50000' },
                    { value: '100000', label: '100000' },
                    { value: '200000', label: '200000' }
                ],
                formLabelWidth: '120px',
                rechargeFormRules:{
                    num: [
                        { required: true, message: '请选择充值额度', trigger: 'change' }
                    ],
                },
                innerUserSelection: [],
                rechargeIds:[],
                currentOptObj:{}
            };
        },
        created() {
            this.getUserData()
            this.getInnerUserData()
        },
        methods: {
            getUserData() {
                let _this = this;

                let params = this.searchForm
                console.log(params)

                this.$store.dispatch('userList/getUserData', params
                ).then(function (r) {
                    if(r.data.status === 200 ){
                    }else {
                        _this.$message.error(r.data.msg)
                    }
                }).finally(function () {
                }).catch(function (error) {
                    console.log(error)
                })

                this.tableInit.dataList = []

                let item = [];
                for(let i = 0; i < this.paginationInit.size; i++) {
                    item = {
                        id: i+1,
                        name: '王_' + i + '_' + parseInt(Math.random()*1000),
                        mobile: '1371910087_' + i,
                        sex: 1,
                        level: 'vip2',
                        exp: '100',
                        onlineTime: '5小时',
                        regTime: '2017-03-06 10:22:25',
                        lastLoginTime: '2017-03-06 10:22:25',
                        lastLoginIP: '127.0.0.1',
                        lastLoginAddr: '本机',
                        lockStatus: utils.randomNum(1, 2)
                    }

                    this.tableInit.dataList.push(item);
                }

                this.paginationInit.length = utils.randomNum(50, 100);
            },
            getInnerUserData() {
                let _this = this;

                let params = this.searchForm
                console.log(params)

                this.$store.dispatch('userList/getInnerUserData', params
                ).then(function (r) {
                    if(r.data.status === 200 ){
                    }else {
                        _this.$message.error(r.data.msg)
                    }
                }).finally(function () {
                }).catch(function (error) {
                    console.log(error)
                })

                this.tableInit2.dataList = []

                let item = [];
                for(let i = 0; i < this.paginationInit2.size; i++) {
                    item = {
                        id: i+1,
                        name: '222王_' + i + '_' + parseInt(Math.random()*1000),
                        mobile: '1371910087_' + i,
                        sex: 1,
                        level: 'vip2',
                        exp: utils.randomNum(1, 100),
                        type: '管理员_'+utils.randomNum(1, 2),
                        onlineTime: '5小时',
                        regTime: '2017-03-06 10:22:25',
                        lastLoginTime: '2017-03-06 10:22:25',
                        lastLoginIP: '127.0.0.1',
                        lastLoginAddr: '本机',
                        lockStatus: utils.randomNum(1, 2)
                    }

                    this.tableInit2.dataList.push(item);
                }

                this.paginationInit2.length = utils.randomNum(50, 100);
            },
            searchFormOpt(formName) {
                console.log(this.searchForm);
                console.log(this.currentSelectedTab);
                if(this.currentSelectedTab == 0) {
                    this.getUserData();
                    this.paginationInit.currentPage = 1;
                } else {
                    this.getInnerUserData();
                    this.paginationInit2.currentPage = 1;
                }
            },
            handleSizeChange() {
                console.log(arguments)
            },
            userHandleCurrentChange(val) {
                console.log(val)
                this.getUserData();
            },
            innerUserHandleCurrentChange(val) {
                console.log(val)
                this.getInnerUserData();
            },
            tabClick(tab, index) {
                this.currentSelectedTab = index
            },
            innerUserSelectionChange(val) {
                this.innerUserSelection = val;
            },
            lockClick(index, row) {
                console.log(row)
                console.log(row.id)
                let _msg = this.$message;

                let params = {
                    id: row.id
                }
                this.$store.dispatch('userList/lockUser', params
                ).then(function (r) {
                    console.log(r);
                    if(r.data.status === 200 ){
                        row.lockStatus=2
                        _msg.success('操作成功')
                    }else {
                        _msg.error(r.data.msg)
                    }
                })
                .catch(function (error) {
                    console.log(error)
                })
            },
            unlockClick(index, row) {
                let _msg = this.$message;

                let params = {
                    id: row.id
                }
                this.$store.dispatch('userList/unlockUser', params
                ).then(function (r) {
                    if(r.data.status === 200 ){
                        row.lockStatus=1
                        _msg.success('操作成功')
                    }else {
                        _msg.error(r.data.msg)
                    }
                }).catch(function (error) {
                    console.log(error)
                })
            },
            openRechange(id) {
                console.log(id)
                this.rechargeIds = [];
                if(id === 0) {
                    //all
                    if(this.innerUserSelection.length == 0){
                        this.$message.warning('请选择要操作的项');
                        return
                    }
                    for(let i=0;i<this.innerUserSelection.length;i++){
                        this.rechargeIds.push(this.innerUserSelection[i]['id'])
                    }
                    this.rechargeFormTitle = '批量充值蛙币'
                }else {
                    this.rechargeIds.push(id);
                    this.rechargeFormTitle = '充值蛙币'
                }

                this.rechargeFormVisible = true
                //this.$refs['rechargeForm'].resetFields();

            },
            rechangeOpt(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid === false) {
                        return false
                    }

                    let _msg = this.$message;
                    let _this = this;

                    let postData = {
                        'ids':this.rechargeIds,
                        'num':this.rechargeForm.num
                    }
                    console.log(postData)
                    this.$store.dispatch('userList/rechangeOpt', postData
                    ).then(function (r) {
                        if(r.data.status === 200 ){
                            _this.rechargeFormVisible = false
                            _msg.success('操作成功')
                        }else {
                            _msg.error(r.data.msg)
                        }
                    })
                    .catch(function (error) {
                        console.log(error)
                    })
                    .finally(function () {
                    })

                });
            },
            deleteOpt(index, row) {
                let _msg = this.$message;
                let _this = this;

                let postData = {
                    id: row.id
                }
                console.log(postData)
                this.$store.dispatch('userList/deleteOpt', postData
                ).then(function (r) {
                    if(r.data.status === 200 ){
                        _this.tableInit2.dataList.splice(index, 1);
                        _msg.success('操作成功');
                    }else {
                        _msg.error(r.data.msg)
                    }
                })
                .finally(function () {
                })
                .catch(function (error) {
                    console.log(error)
                })
            }
        }
    };
</script>
<style type="text/css">
    .el-dialog--small{
        width: 30%;
    }
</style>

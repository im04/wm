<template>
    <div class="cmm-content">

        <div class="content">
            <tab-cpt :options="tabInit" :tab-click="tabClick">
                <template slot="head">
                    <el-button type="primary" @click="tabCallback()" size="small">添加活动页</el-button>
                </template>
                <div tit="数据列表" name="0">
                    <pagination-content :options="paginationInit" :size-change="handleSizeChange" :current-change="handleCurrentChange">
                        <template slot="body">
                            <!--<table-cpt class="b-top-0" :options="tableInit" max-line="12" :ctrl-callback="ctrCallback" :select-callback="selectCallback"/>-->
                            <el-table :data="tableInit.dataList" :border="true" size="small">
                                <el-table-column prop="number" label="编号"/>
                                <el-table-column prop="title" label="活动标题"/>
                                <el-table-column prop="link" label="链接"/>
                                <el-table-column label="排序">
                                    <template slot-scope="scope">
                                        <el-input-number v-model="scope.row.sort" @change="handleChange(scope.row)" label="排序" size="small"></el-input-number>
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作">
                                    <template slot-scope="scope">
                                        <router-link :to="'/frontDeskConfig/activityImage/activityImageEdit?id='+scope.row.id" class="small">编辑</router-link>&nbsp;&nbsp;
                                        <el-button @click="deleteOpt(scope.$index, scope.row)" type="text" size="small">删除</el-button>
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
                tabInit: {
                    activeName: '0',
                },
                currentPage1: 1,
                tableInit: {
                    dataList: []
                },
                paginationInit: {
                    size: 10,
                    length: 1000
                }
            };
        },
        created() {
            this.getData()
        },
        methods: {
            getData() {
                let _this = this;

                let params = []
                console.log(params)

                this.$store.dispatch('systemSetting/getActivityList', params
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
                        number: i + '___' + parseInt(Math.random()*1000),
                        title: '综艺节目_' + parseInt(Math.random()*1000),
                        link: 'http://baidu.com/?a=1',
                        sort: parseInt(Math.random()*1000)
                    }

                    this.tableInit.dataList.push(item);
                }

                this.paginationInit.length = utils.randomNum(50, 100);
            },
            tabCallback(target) {
                let _router = this.$router;
                _router.push('/frontDeskConfig/activityImage/activityImageEdit');
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
                console.log(arguments)
                this.getData()
            },
            tabClick() {
                console.log(arguments)
            },
            deleteOpt(index, row) {
                let _this = this
                let msg = (this.id && row.id) ? '当前标签已标记内容，是否继续删除?' : '确定要删除吗?'
                this.$confirm(msg, '删除提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                            let postData = {
                                id: row.id
                            }
                            console.log(postData)
                            this.$store.dispatch('systemSetting/deleteBannerLocation', postData
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

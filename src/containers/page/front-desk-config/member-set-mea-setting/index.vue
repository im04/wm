<template>
    <div class="cmm-content">
        <div class="content" >
            <el-row class="m-bottom-10">
                <el-col :span="12">
                    <el-button type="primary" class="width-90" size="small" @click="$router.push('/frontDeskConfig/memberSetMeaSetting/memberSetMeaSettingEdit')">添加套餐</el-button>&nbsp;
                </el-col>
                <el-col :span="12" class="text-right">
                    <!--<el-button class="width-80" size="small" @click="">导出</el-button>-->
                    <!--<el-button class="width-80" size="small" @click="">统计</el-button>-->
                </el-col>
            </el-row>

            <pagination-content :options="paginationInit" :size-change="handleSizeChange" :current-change="handleCurrentChange">
                <template slot="body">
                    <el-table :data="tableInit.dataList" :border="true" size="small">
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <!--<el-button @click="topOpt(scope.$index, scope.row)" type="text" size="small">置顶</el-button>-->
                                <router-link :to="'/frontDeskConfig/memberSetMeaSetting/memberSetMeaSettingEdit?id='+scope.row.id" class="small">编辑</router-link>&nbsp;&nbsp;
                                <el-button @click="deleteOpt(scope.$index, scope.row)" type="text" size="small">删除</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column prop="name" label="套餐名称"/>
                        <el-table-column prop="rechargeCount" label="累计充值人次"/>
                        <el-table-column prop="buyChannelText" label="类型"/>
                        <el-table-column prop="originalPrice" label="金额"/>
                        <el-table-column prop="salePrice" label="折后金额"/>
                        <el-table-column prop="coin" label="妙银"/>
                        <el-table-column label="有效期">
                            <template slot-scope="scope">
                                {{scope.row.duration}}/{{scope.row.durationUnitText}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="duration" label="有效期"/>
                        <el-table-column prop="sort" label="排序"/>
                    </el-table>
                </template>
            </pagination-content>
        </div>

    </div>
</template>
<script>
    import searchHeader from 'components/search-header';
    import paginationContent from 'components/pagination-content';
    export default {
        components: {
            searchHeader,
            paginationContent
        },
        data() {
            return {
                searchForm: {
                    pageSize: 100
                },
                searchInit: [
                ],
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
                currentOptObj: {}
            }
        },
        created() {
            this.getData()
        },
        methods: {
            getData() {
                let _this = this;

                let params = this.searchForm;
                console.log(params)

                this.$store.dispatch('memberSetMeaSetting/findBy', params
                ).then(function (r) {

                    let _tmpData = [];
                    let _item = {};

                    for(let val of r.data) {
                        _item = val;
                        _item['buyChannelText'] = utils.getComboTypeText(val.buyChannel);
                        _item['durationUnitText'] = utils.getComboUnitTypeText(val.durationUnit);
                        _tmpData.push(_item);
                    }
                    console.log(_tmpData);

                    _this.tableInit.dataList = _tmpData;
                    _this.paginationInit.length = _tmpData.length;

                    /*
                    "id": 6,
                    "name": "一年会员",
                    "originalPrice": 12,
                    "salePrice": 10,
                    "coin": 100,
                    "buyChannel": 0,
                    "iosProductId": "#",
                    "experience": 0,
                    "duration": 365,
                    "durationUnit": 0,
                    "sort": 0,
                    "createTime": 1510198839000,
                    "updateTime": null
                    */

                }).finally(function () {
                }).catch(function (error) {
                    console.log(error)
                })
            },
            handleSizeChange() {

            },
            handleCurrentChange() {
                console.log(arguments)
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
                            this.$store.dispatch('memberSetMeaSetting/delete', postData
                            ).then(function (r) {
                                if (r.code === 200) {
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
            //暂时不做
            topOpt(index, row) {
                let _this = this
                this.$confirm('确定在置顶吗?', '提示', {
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

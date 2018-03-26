<template>
    <div class="cmm-content">
        <div class="content" >
            <el-row class="m-bottom-10">
                <el-col :span="12">
                    <el-button type="primary" class="width-90" size="small" @click="$router.push('/frontDeskConfig/paySetMeaSetting/paySetMeaSettingEdit')">添加套餐</el-button>&nbsp;
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
                                <router-link :to="'/frontDeskConfig/paySetMeaSetting/paySetMeaSettingEdit?id='+scope.row.id" class="small">编辑</router-link>&nbsp;&nbsp;
                                <el-button @click="deleteOpt(scope.$index, scope.row)" type="text" size="small">删除</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column prop="name" label="名称"/>
                        <el-table-column prop="supportClientText" label="类型"/>
                        <el-table-column prop="rechargeCount" label="累计充值人次"/>
                        <el-table-column prop="salePrice" label="价格"/>
                        <el-table-column prop="baseCoin" label="妙银"/>
                        <el-table-column prop="awardCoin" label="赠送妙银"/>
                        <el-table-column prop="iosProductId" label="内购id"/>
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
                searchForm: {},
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

                _this.commonLoading = true;

                let params = this.searchForm;
                console.log(params);

                this.$store.dispatch('paySetMeaSetting/findBy', params
                ).then(function (r) {

                    let _tmpData = [];
                    let _item = {};

                    for(let val of r.data) {
                        _item = val;
                        _item['supportClientText'] = utils.getComboTypeText(val.supportClient);
                        _tmpData.push(_item);
                    }
                    console.log(_tmpData);

                    _this.tableInit.dataList = _tmpData;
                    _this.paginationInit.length = _tmpData.length;

                    /*
      "id": 4,
      "name": "双11优惠大礼包",
      "salePrice": 0.01,
      "baseCoin": 99,
      "awardCoin": 1,
      "coin": 100,
      "supportClient": 2,
      "iosProductId": null,
      "sort": 0,
                    */

                }).finally(function () {
                }).catch(function (error) {
                    console.log(error);
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
                let _this = this;
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
                            this.$store.dispatch('paySetMeaSetting/delete', postData
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

            }
        }
    };
</script>

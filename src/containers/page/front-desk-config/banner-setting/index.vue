<template>
    <div class="cmm-content">
        <search-header :options="searchInit" :click-callback="clickCallback" :button-callback="buttonClick" style="display: none;">
        </search-header>
        <div class="content" >
            <tab-cpt :options="tabInit" :tab-click="tabClick">
                <template slot="head">
                    <el-button type="primary" @click="tabCallback()" size="small">添加广告位</el-button>
                </template>
                <div tit="数据列表" name="0">
                    <pagination-content :options="paginationInit" :size-change="handleSizeChange" :current-change="handleCurrentChange">
                        <template slot="body">
                            <el-table :data="tableInit.dataList" :border="true" size="small">
                                <el-table-column prop="name" label="广告位名称"/>
                                <el-table-column label="位置">
                                    <template slot-scope="scope">
                                        {{scope.row.clientText}}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="styleText" label="类型"/>
                                <el-table-column prop="position" label="位置数量"/>
                                <el-table-column label="操作">
                                    <template slot-scope="scope">
                                        <router-link :to="'/frontDeskConfig/bannerSetting/bannerSettingEdit?id='+scope.row.id" class="small">查看</router-link>&nbsp;&nbsp;
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
    import paginationContent from 'components/pagination-content';
    export default {
        components: {
            tabCpt,
            searchHeader,
            paginationContent
        },
        data() {
            return {
                searchForm: {
                    pageSize: 100,
                    pageNo: 1
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
                    size: 100,
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

                let params = this.searchForm
                console.log(params)
                let _tmpData = [];
                let _item = {};


                this.$store.dispatch('bannerSetting/findBy', params
                ).then(function (r) {
                    let _tmpData = [];
                    let _item = {};

                    for(let val of r.data) {
                        _item = val;
                        _item['clientText'] = utils.getBannerClientTypeText(val.client);
                        _item['styleText'] = utils.getBannerStyleText(val.style);
                        _tmpData.push(_item);
                    }
                    console.log(_tmpData);

                    _this.tableInit.dataList = _tmpData;
                    _this.paginationInit.length = _tmpData.length;

                    /*
      "id": 7,
      "name": "双11优惠大礼包",
      "style": 1,
      "position": "1",
      "status": 0,
      "createDate": 1510638415000,
      "updateDate": 1510638430000,
      "dataJson": "{\"pic_url\":\"http://baidu.com/?\",\"content_type\":\"sdfsdfsdfsdf\",\"content\":\"aa\"aaaa\",\"needLogin\":\"1\",\"description\":\"aa\"a\",\"sort\":\"100\"}"
                    */

                }).finally(function () {
                }).catch(function (error) {
                    console.log(error);
                })
            },
            tabCallback(target) {
                let _router = this.$router;
                _router.push('/frontDeskConfig/bannerSetting/bannerSettingEdit');
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
                            this.$store.dispatch('bannerSetting/delete', postData
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

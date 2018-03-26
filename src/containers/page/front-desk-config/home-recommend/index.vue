<template>
    <div class="cmm-content">

        <div class="content">
            <tab-cpt :options="tabInit" :tab-click="tabClick">
                <div tit="数据列表" name="0">
                    <pagination-content :options="paginationInit" :size-change="handleSizeChange" :current-change="handleCurrentChange">
                        <template slot="body">
                            <el-table :data="tableInit.dataList" :border="true" size="small">
                                <el-table-column prop="name" label="推荐位名称"/>
                                <el-table-column prop="typeText" label="内容类别"/>
                                <el-table-column prop="statusText" label="是否显示"/>
                                <el-table-column label="排序">
                                    <template slot-scope="scope">
                                        <el-input-number v-model="scope.row.sort" @change="handleChange(scope.row)" label="排序" size="small"></el-input-number>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="count" label="展示内容量"/>
                                <el-table-column label="操作">
                                    <template slot-scope="scope">
                                        <router-link :to="'/frontDeskConfig/homeRecommend/homeRecommendEdit?id='+scope.row.id" class="small">编辑</router-link>&nbsp;&nbsp;
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
                        name: 'Live直播_' + parseInt(Math.random()*1000),
                        typeText: '视频直播-直播',
                        statusText: '显示',
                        count: 1,
                        sort: parseInt(Math.random()*1000)
                    }

                    this.tableInit.dataList.push(item);
                }

                this.paginationInit.length = utils.randomNum(50, 100);
            },
            tabCallback(target) {
                let _router = this.$router;
                _router.push('/frontDeskConfig/homeRecommend/homeRecommendEdit');
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
            handleSizeChange() {
                console.log(arguments)
            },
            handleCurrentChange() {
                console.log(arguments)
                this.getData()
            },
            tabClick() {
                console.log(arguments)
            }
        }
    };
</script>

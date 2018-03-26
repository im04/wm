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
                        <el-input v-model="searchForm.mobile" placeholder="视频名称" class="repeat-el-input"></el-input>
                        <el-button class="m-left-10" @click="searchFormOpt('searchForm')">搜索</el-button>
                    </el-form>
                </div>
            </el-collapse-item>
        </el-collapse>
        <div class="exprot-data">
            <el-row>
                <el-col :span="4" class="text-left">
                    <el-button type="text" size="small" class="color-third">数据列表</el-button>
                </el-col>
                <el-col :span="20">
                    <el-button type="primary" size="small">导出数据</el-button>
                </el-col>
            </el-row>
        </div>

        <div class="content">
            <tab-menu :currentTabMenu="currentTabMenu"></tab-menu>
            <pagination-content :options="paginationInit" :size-change="handleSizeChange"
                                :current-change="userHandleCurrentChange">
                <template slot="body">
                    <el-table :data="tableInit.dataList" :border="true" size="small">
                        <el-table-column prop="number" label="订单编号"/>
                        <el-table-column prop="datetime" label="提交时间"/>
                        <el-table-column prop="name" label="用户账号"/>
                        <el-table-column prop="coin" label="充值金额"/>
                        <el-table-column prop="title" label="兑换哇币金额"/>
                        <el-table-column prop="title" label="支付方式"/>
                    </el-table>
                </template>
            </pagination-content>
        </div>

    </div>
</template>
<script>

    import paginationContent from 'components/pagination-content';
    import tabMenu from '../tab-menu';

    export default {
        components: {

            paginationContent,
            tabMenu
        },
        data() {
            return {
                currentTabMenu: 3,
                searchHeaderActives: ['1'],
                searchForm: {
                    title: ''
                },
                tableInit: {
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

                this.$store.dispatch('userList/getCoinExchangeList', params
                ).then(function (r) {
                    if (r.data.status === 200) {
                    } else {
                        _this.$message.error(r.data.msg)
                    }
                }).finally(function () {
                })
                .catch(function (error) {
                    console.log(error)
                })

                this.tableInit.dataList = []

                let item = [];
                for (let i = 0; i < this.paginationInit.size; i++) {
                    item = {
                        id: i + 1,
                        number: '20171021_' + i + '_' + parseInt(Math.random() * 1000),
                        coin: utils.randomNum(1, 100),
                        name: 'user_' + utils.randomNum(1, 2),
                        datetime: '2017-03-06 10:22:25',
                        title: 'XXX直播门票_' + utils.randomNum(1, 100)
                    }

                    this.tableInit.dataList.push(item);
                }

                this.paginationInit.length = utils.randomNum(50, 100);
            },
            searchFormOpt(formName) {
                this.getData();
                this.paginationInit.currentPage = 1;
            },
            handleSizeChange() {
                console.log(arguments)
            },
            userHandleCurrentChange(val) {
                console.log(val)
                this.getData();
            }
        }
    };
</script>

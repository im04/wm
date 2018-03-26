<template>
    <div>
        <search-header>
            <template solt-scop="search">
                <div class="search-bar bg-white p-lr-40 child-middle">
                    <span>搜索选项 : </span><el-input size="large"  placeholder="请输入内容" class="repeat-el-input" ></el-input><el-input size="large"  placeholder="请输入内容" class="repeat-el-input"> </el-input>
                </div>
            </template>
        </search-header>
        <div class="upload-prevue content">
            <pagination-content>
                <template slot="body">
                    <tab-cpt :options="tabInit" :tab-click="tabClick" :button-callback="buttonCallback">
                        <template slot="head">
                            <el-button type="primary" size="small" @click="buttonCallback()">上传预告</el-button>
                            <el-button size="small">批量添加</el-button>
                        </template>
                        <el-tab-pane label="已经发布" name="0"/>
                    </tab-cpt>
                </template>
                <template slot="floor">
                    <el-select size="small" v-model="value" placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
                    </el-select>
                    <el-button class="btn" size="small">批量下架</el-button>
                </template>
            </pagination-content>
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
                paginationInit: {
                    size: 10,
                    length: 1000
                },
                tabInit: {
                    activeName: '0',
                },
                tableInit: {
                    tableSelect: {
                        callback: function() {
                            console.log(arguments)
                        }
                    },
                    tableCtrl: {
                        ctrlList: [
                            {
                                name: '查看',
                                key: 'check',
                                type: 'text'
                            },
                            {
                                name: '编辑',
                                key: 'edit',
                                type: 'text'
                            },
                            {
                                name: '删除',
                                key: 'delete',
                                type: 'text'
                            }
                        ]
                    },
                    tableHead: [
                        {
                            prop: 'name',
                            label: '预告片名称'
                        },
                        {
                            prop: 'room',
                            label: '关联直播间'
                        },
                        {
                            prop: 'id',
                            label: '直播id'
                        },
                        {
                            prop: 'table',
                            label: '场次'
                        },
                        {
                            prop: 'time',
                            label: '上传时间'
                        },
                        {
                            prop: 'type',
                            label: '内容分类'
                        }
                    ],
                    dataList: [
                        {
                            name: 'abcd',
                            room: 'acd',
                            id: '1',
                            table: '1',
                            time: '2222',
                            type: 'ddd'
                        }
                    ]
                },
                value: '1',
                currentPage1: 1,
                options: [
                    {
                        value: '1',
                        label: '批量推荐'
                    },
                    {
                        value: '2',
                        label: '批量撤出推荐'
                    }
                ],
            }
        },
        methods: {
            buttonCallback(target) {
                this.$router.push('/liveSetting/uploadPrevue/uploadPrevueEdit');
            },
            ctrlCallback() {

            },
            tabClick() {
                console.log(arguments)
            },
            handleSizeChange() {

            },
            handleCurrentChange() {

            }
        }
    }
</script>
<style scoped>

</style>
<template>
    <div class="edit-page-content m-top-30 has-input-width">
        <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="关联直播" class="edit-item">
                <el-input
                        placeholder="请输入直播间名称/直播id"
                        icon="search"
                        v-model="form.input2"
                        :on-icon-click="handleIconClick">
                </el-input>
            </el-form-item>
            <div class="m-left-22">
                <!--<table-cpt class="m-top-20" :options="tableInit" max-line="12"/>-->
                <upload-image class="m-top-20"/>
                <div class="m-top-20">
                    <el-progress :stroke-width="24" :percentage="100" status="success"></el-progress>
                    <el-progress class="m-top-20" :stroke-width="24" :percentage="50" status="exception"></el-progress>
                </div>
                <div class="text-right m-top-30">
                    <el-button class="width-140" type="info">发布</el-button>
                    <el-button class="width-140" type="info">保存为草稿</el-button>
                    <el-button class="width-140" type="info">取消</el-button>
                </div>
            </div>
        </el-form>
    </div>
</template>
<script>

    import uploadImage from 'components/upload-image';
    export default {
        components: {

            uploadImage
        },
        data() {
            var _router = this.$router;
            return {
                form: {

                },
                tableInit: {
                    tableHead: [
                        {
                            prop: 'name',
                            label: '直播间'
                        },
                        {
                            prop: 'room',
                            label: 'id'
                        },
                        {
                            prop: 'id',
                            label: '直播id'
                        },
                        {
                            prop: 'table',
                            label: '场次'
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
                        },
                        {
                            name: 'abcd',
                            room: 'acd',
                            id: '1',
                            table: '1',
                            time: '2222',
                            type: 'ddd'
                        },
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
            tabClick() {
                console.log(arguments)
            },
            handleSizeChange() {

            },
            handleCurrentChange() {

            },
            handleIconClick() {

            }
        }
    }
</script>
<style lang="stylus">
    .upload-prevue-edit {
        margin-top 60px;
        width 80%;
        min-width 800px;
    }
</style>
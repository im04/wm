<template>
    <tr>
        <td>7</td>
        <td>
            <el-input class="width-auto" size="small" placeholder="请输入内容"></el-input>
        </td>
        <td>
            <el-select class="width-auto" v-model="value" placeholder="请选择" size="small">
                <el-option
                        v-for="item in [{label:'选项1',value:1},{label:'选项2',value:1},{label:'选项2',value:1}]"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </td>
        <td>
            <el-date-picker
                    class="width-auto"
                    size="small"
                    align="right"
                    type="date"
                    placeholder="选择日期">
            </el-date-picker>
        </td>
        <td>
            <el-time-select
                    class="width-auto"
                    size="small"
                    :picker-options="{
                        start: '08:30',
                        step: '00:15',
                        end: '18:30'
                     }"
                    placeholder="选择时间">
            </el-time-select>
        </td>
        <td>

        </td>
        <td>
            <el-button type="text">保存</el-button>
            <el-button type="text">取消</el-button>
        </td>
    </tr>
</template>
<script>
    export default {
        data() {
            return {
                value: 1234
            }
        }
    }
</script>
<style lang="stylus" scoped>
    .width-auto {
        width auto;
        margin-left 10px;
        margin-right 10px;
    }
</style>
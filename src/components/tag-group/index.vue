<template>
    <el-form ref="form" :model="options.form" label-width="100px">
        <el-form-item v-for="item in options.tagList" :key="item.title" :label="item.title">
            <el-checkbox-group v-if="item.tagType=='checkbox'" v-model="item.value">
                <el-checkbox v-for="(data,index) in item.dataList" :key="index"  :disabled="disabled" :label="data.name" :true-label="data.value"/>
            </el-checkbox-group>
            <el-radio-group v-if="item.tagType=='radio'" v-model="item.value" :disabled="disabled">
                <el-radio v-for="(data,index) in item.dataList" :key="index" :label="data.value" >{{data.name}}</el-radio>
            </el-radio-group>
        </el-form-item>
    </el-form>
</template>
<script>
    export default {
        props: {
            disabled: {
                type: Boolean,
                default: false
            },
            options: {
                type: Object,
                default :_=> {}
            }
        },
        created() {
            console.log(this.options);
        }
    }
</script>
<style scoped>
</style>
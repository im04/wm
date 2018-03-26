<template>
    <el-select :size="size" v-model="options.value" :placeholder="placeholder||'请选择'" @change="selectChange">
        <el-option
                v-for="item in options.dataList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
        </el-option>
    </el-select>
</template>
<script>
    export default {
        props: {
            placeholder:{},
            size: {},
            selectChange: {
                type: Function,
                default(){}
            },
            options: {
                type: Object,
                default(){return{}}
            }
        }
    }
</script>
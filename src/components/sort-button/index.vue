<template>
    <div class="sort-button ov-hi">
        <el-input-number :disabled="disabled" size="small" v-model="scope.row[$parent.prop]" @change="change"></el-input-number>
    </div>
</template>
<script>
    export default {
        props: {
            change: {
                type: Function,
                default() {}
            },
            disabled: {
                type: Boolean,
                default: false
            },
            scope: {
                type: Object,
                default() {
                    return {
                    }
                }
            }
        },
        mounted() {
            console.log(this.$parent.prop)
        }
    }
</script>
<style lang="stylus">
    .sort-button {
        .el-input {
            width: auto;
        }
    }
</style>
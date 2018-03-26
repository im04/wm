<template>
    <el-table-column :label="init.label" min-width="100">
        <template slot-scope="scope">
            <el-switch  on-color="#13ce66" off-color="#ff4949" on-text="" off-text="" on-value="true" off-value="false" v-model="scope.row[init.prop]" @change="init.callback"></el-switch>
        </template>
    </el-table-column>
</template>
<script>
    export default {
        props: {
            init: {
                type: Object,
                defalut() {
                    return {}
                }
            }
        },
    }
</script>
<style scoped>

</style>
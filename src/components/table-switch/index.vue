<template>
    <!--<el-table-column :label="init.label" min-width="140">-->
        <!--<template slot-scope="scope">-->
            <!--<el-switch active-color="#13ce66" inactive-color="#ff4949" active-text="" inactive-text="" active-value="true" inactive-value="false" v-model="scope.row[$parent.prop]" @change="init.callback"></el-switch>-->
            <el-switch on-color="#13ce66" off-color="#ff4949" on-text="" off-text="" on-value="true" off-value="false" v-model="scope.row[$parent.prop]" @change="callback"></el-switch>
        <!--</template>-->
    <!--</el-table-column>-->
</template>
<script>
    export default {
        props: {
            scope: {
                type: Object,
                default() {
                    return {
                        row: {}
                    }
                }
            },
            callback: {
                type: Function,
                default() {

                }
            }
        },
        created() {
            console.log(3)
        }
    }
</script>
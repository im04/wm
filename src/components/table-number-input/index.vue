<template>
    <!--<el-table-column :label="init.label" min-width="180">-->
        <!--<template slot-scope="scope">-->
            <el-input-number size="small" v-model="scope.row[init.prop]" @change="init.callback"></el-input-number>
        <!--</template>-->
    <!--</el-table-column>-->
</template>
<script>
    export default {
        scope: {
            type: Object,
            default() {
                return {}
            }
        },
        props: {
            init: {
                type: Object,
                default () {
                    return {}
                }
            }
        },
    }
</script>
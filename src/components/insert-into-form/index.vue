<template>
    <div>
        <component :is="label?'elFormItem':'divBox'" :label="label">
            <el-autocomplete
                    :disabled="disabled"
                    class="inline-input"
                    v-model="value"
                    @select="handleSelect"
                    :fetch-suggestions="querySearch"
                    :placeholder="placeholder"
                    :trigger-on-focus="false"
                    @change="valueChange()">
                <el-button :disabled="disabled" slot="append" icon="search"></el-button>
            </el-autocomplete>
            <el-button class="m-left-10" :disabled="disabled" v-if="!disabled" @click="addList()">添加</el-button>
            <slot name="button"></slot>
        </component>
        <!--<div class="m-bottom-22">-->
            <!---->
        <!--</div>-->
        <!--<el-form-item :label="label" v-if="label">-->
            <!--<el-autocomplete-->
                    <!--:disabled="disabled"-->
                    <!--class="inline-input"-->
                    <!--v-model="list"-->
                    <!--@select="handleSelect"-->
                    <!--:fetch-suggestions="querySearch"-->
                    <!--:placeholder="placeholder"-->
                    <!--:trigger-on-focus="false">-->
                <!--<el-button :disabled="disabled" slot="append" icon="search"></el-button>-->
            <!--</el-autocomplete>-->
            <!--<slot name="button"></slot>-->
            <!--&lt;!&ndash;<el-button :disabled="disabled" v-if="!disabled&&!once" @click="addList()">添加</el-button>&ndash;&gt;-->
        <!--</el-form-item>-->
        <slot name="tip"/>
        <el-table :data="tableData" :border="true" size="small">
            <slot name="table"/>
        </el-table>
    </div>
</template>
<script>
    import Vue from 'vue';
    export default {
        props: {
            maxLine: Number,
            label: {
                type: String,
                default:''
            },
            disabled: {
                type: Boolean,
                default: false
            },
            querySearch: {
                type: Function,
                default(){}
            },
            placeholder: {
                type: String,
                default:''
            },
            tableData: {
                type: Array,
                default: _=>[]
            },
            callback:Function,
            once: {
                type: Boolean,
                default: false
            },
        },
        watch: {
            tableData(newVal,oldVal) {
                this.callback&&this.callback(this.tableData);
            }
        },
        components: {
            divBox: Vue.component('divBox',{
                template: '<div class="m-bottom-22"><slot/></div>'
            })
        },
        data() {
            return {
                value: null,
                list: []
            }
        },
        created() {
            this.once&&this.tableData.splice(1);
        },
        methods: {
            addList() {
                if (!Object.keys(this.list).length||this.tableData.includes(this.list))return;
                if (this.once) {
                    this.tableData.splice(0,1,this.list);
                } else {
                    this.tableData.push(this.list);
                }
            },
            handleSelect(item) {
                this.list = item;
            },
            valueChange() {
                this.list = null;
            }
        }
    }
</script>
<style scoped>

</style>
<template>
    <el-table class="table-component default" :data="list"
              :height="height"
              :max-height="maxHeight"
              border
              @selection-change="selectCallback">
        <el-table-column v-if="options.tableHead&&options.tableSelect" type="selection" fixed="left"/>
        <component v-for="item in options.tableHead" :class="item.className" :key="item.name" v-bind:is="item.componentName||'tableDefault'" :init="item"/>
        <el-table-column v-if="options.tableCtrl" min-width="150" label="操作">
            <template slot-scope="scope">
                <el-button v-for="item in options.tableCtrl.ctrlList" v-if="test(item,scope.row)" :key="item.key" :type="item.type" @click="ctrlCallback(scope.row,scope.$index,item.key)">{{item.name}}</el-button>
            </template>
        </el-table-column>
        <component v-if="options.bottomBar" v-bind:is="options.bottomBar.componentName" :options="options.bottomBar.options" slot="append"></component>
    </el-table>
</template>
<script>
    import Vue from 'vue';
    export default {
        props: {
            selectCallback: {
                type: Function,
                default () {}
            },
            ctrlCallback: {
                type: Function,
                default () {}
            },
            options: {
                type: Object,
                default () {
                    return {
                        dataList: [],
                        tableHead: []
                    }
                },
                required: true,
                maxLine: {}
            },
            height: {},
            maxHeight:{},
            maxLine:{}
        },
        components: {
            tableDefault: Vue.component('tableDefault',{
                props: {
                    init: {
                        type: Object,
                        defalut: {}
                    },
                },
                template: '<el-table-column :prop="init.prop" :label="init.label" min-width="150"></el-table-column>'
            })
        },
        created() {
            let components = this.options.tableComponent;
            components&&components.forEach((v)=> {
                this.$options.components[v.name] = v.component
            });
        },
        watch: {
            options: {
                tableComponent(newVal) {
                    newVal&&newVal.forEach((v)=> {
                        !(v.name in this.$options.components)&&(this.$options.components[v.name] = v.component);
                    });
                }
            }
        },
        computed: {
            list() {
                let maxLine = this.maxLine,
                    opt = this.options;
                return (maxLine&&opt.dataList.length)?opt.dataList.slice(0,maxLine):opt.dataList;
            }
        },
        methods: {
            test(item,row) {
                return item.test?item.test(row):true;
            }
        }
    }
</script>
<style lang="stylus">
    .el-table__fixed {
        box-shadow none;
    }
    .table-component.default {
        &.el-table {
            text-align center
            thead div {
                text-align center
            }
            th,.el-table__header-wrapper thead div,.el-table__fixed-header-wrapper thead div {
                background-color: #f0f0f0;
            }
        }
    }
</style>

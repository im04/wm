<template>
    <div class="pagination-content">
        <div>
            <slot name="body"></slot>
        </div>
        <div class="bottom-bar">
            <slot name="floor"></slot>
            <div class="pagination">
                <el-pagination
                        @size-change="sizeChange"
                        @current-change="currentChange"
                        :current-page.sync="options.currentPage"
                        :page-size="options.size"
                        layout="total, prev, pager, next, jumper"
                        :total="options.length">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            currentChange: {
                type: Function,
                default() {}
            },
            sizeChange: {
                type: Function,
                default() {}
            },
            options: {
                type: Object,
                default() {
                    return {}
                }
            }
        }
    }
</script>
<style lang="stylus" scoped>
    .pagination-content {
        df-border = 1px solid #e0e1e1;
        .bottom-bar {
            padding 8px 15px;
            overflow hidden;
            background-color white;
            border-left df-border;
            border-right df-border;
            border-bottom df-border;
            >*{
                vertical-align top;
            }
            .el-button--small {
                padding-top 8px;
                padding-bottom 8px;
            }
            .el-select {
                max-width 160px;
            }
            .pagination {
                float right;
                .el-pagination {
                    padding-top 1px;
                    padding-bottom 1px;
                }
            }
        }
    }
</style>
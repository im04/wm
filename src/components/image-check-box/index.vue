<template>
    <div class="upload-content">
        <div class="upload-pic"><img :src="src"/></div>
        <el-button-group class="width-full upload-btn">
            <el-button @click="checkImg()">查看图片</el-button>
            <el-button :disabled="disabled">删除图片</el-button>
        </el-button-group>
        <el-dialog title="图片预览" :visible.sync="dialogTableVisible" size="full">
            <img ref="img" :src="src" alt="查看图片" title="查看图片">
        </el-dialog>
    </div>
</template>
<script>
    export default {
        props: {
            disabled: {
                type: Boolean,
                default: false
            },
            src: {
                type: String,
                default: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
            },
            options: {
                type: Object,
                default() {
                    return {}
                }
            },
        },
        data() {
            return {
                dialogTableVisible: false
            }
        },
        methods: {
            checkImg() {
                this.dialogTableVisible = true;
            }
        }
    }
</script>
<style lang="stylus">
    .upload-content {
        margin-right 10%;
        width 200px;
        text-align center;
        .upload-pic {
            img {
                width 100%;
                display block;
            }
        }
        .upload-btn {
            margin-top 5px;
            button {
                width 50%;
            }
        }
        .el-dialog {
            top 50%;
            width auto;
            height auto;
            -webkit-transform translate(-50%,-50%);
            -moz-transform translate(-50%,-50%)
            -ms-transform translate(-50%,-50%)
            -o-transform translate(-50%,-50%)
            transform translate(-50%,-50%)
        }
    }
    .el-upload-list {
        float right;
        .el-upload-list__item {
            &:first-child {
                 margin-top 0;
             }
        }
    }
</style>
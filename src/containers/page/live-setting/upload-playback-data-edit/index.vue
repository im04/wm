<template>
    <div class="edit-page-content m-top-30 has-input-width">
        <el-form class="m-left-255" ref="form" label-width="100px">
            <el-table class="m-bottom-22" border>
                <el-table-column prop="name" label="直播"/>
                <el-table-column prop="date" label="id"/>
                <el-table-column prop="date" label="栏目"/>
            </el-table>
            <upload-big-file class="m-bottom-22" :callback="uploadFileFunc"/>
            <div class="text-right m-top-30">
                <el-button class="width-140" type="info">发布</el-button>
                <el-button class="width-140" type="info">保存为草稿</el-button>
                <el-button class="width-140" type="info">取消</el-button>
            </div>
        </el-form>
    </div>
</template>
<script>

    import uploadImage from 'components/upload-image';
    import uploadBigFile from 'components/upload-big-file';
    export default {
        components: {

            uploadImage,
            uploadBigFile
        },
        computed: {
            pro() {
                return this.loaded+'/'+this.total;
            }
        },
        data() {
            return {
                total: null,
                loaded: null,
                fileName: null
            }
        },
        methods: {
            tabClick() {
                console.log(arguments)
            },
            config(item) {
                this.fileName = item.file.name;
                this.total = item.file.size;
            },
            uploadFileFunc(xhr,ks3,url) {
                this.form.fileUrl = url;
                console.log(url);
            },
            uploadProgressFunc(e) {
                this.loaded = e.loaded;
            },
            ctrCallback(item, row) {
                console.log(arguments);
                switch (item.key) {
                    case 'delete':
                        return this.deleteOpt(row);
                    case 'stop':
                        return this.stop();
                }
            },
        }
    }
</script>
<style lang="stylus">
    .upload-playback-data-edit {
        margin-top 60px;
        width 80%;
        min-width 800px;
    }
</style>
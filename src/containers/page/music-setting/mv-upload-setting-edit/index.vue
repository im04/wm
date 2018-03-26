<template>
    <steps class="edit-page-content m-top-30 has-input-width" ref="steps">
        <div tit="上传文件">
            <div class="m-left-255">
                <upload-big-file class="m-bottom-22" :callback="uploadFileFunc"/>
                <div class="text-right m-top-30">
                    <el-button type="primary" class="width-140" @click="next()">下一步</el-button>
                    <el-button class="width-140">取消</el-button>
                </div>
            </div>
        </div>
        <div tit="编辑信息">
            <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                <edit-block title="基本信息">
                    <el-form-item label="上传封面" prop="upload">
                        <upload-image :callback="uploadFunc" :disabled="isDisabled" class="fl"/>
                        <image-check-box :src="form.imageUrl" :disabled="isDisabled" class="fr"/>
                    </el-form-item>
                    <two-cell>
                        <el-form-item slot="left" label="MV名称" prop="title">
                            <el-input :disabled="isDisabled" v-model="form.mvName" placeholder="请输入名称"></el-input>
                        </el-form-item>
                        <el-form-item slot="right" label="是否上架" prop="title">
                            <el-radio-group :disabled="isDisabled" v-model="form.isPutaway">
                                <el-radio label="0">是</el-radio>
                                <el-radio label="1">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </two-cell>
                    <two-cell>
                        <el-form-item slot="left" label="内容类别" prop="title">
                            <el-select :disabled="isDisabled" v-model="form.contentType" placeholder="请选择内容类别">
                                <el-option
                                        v-for="item in contentTypeOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item slot="right" label="文件地址" prop="title">
                            <el-input :disabled="isDisabled" v-model="form.fileUrl" placeholder="请输入文件地址"></el-input>
                        </el-form-item>
                    </two-cell>
                    <two-cell>
                        <el-form-item slot="left" label="发行时间" prop="title">
                            <el-date-picker
                                    :disabled="isDisabled"
                                    v-model="form.issuDate"
                                    type="date"
                                    placeholder="选择时间">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item slot="right" label="地区" prop="title">
                            <el-select :disabled="isDisabled" v-model="form.region" placeholder="请选择地区">
                                <el-option
                                        v-for="item in regionOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </two-cell>
                    <el-form-item label="MV简介">
                        <el-input :disabled="isDisabled" :rows="6" placeholder="可输入3000字，示例：《范特西》是周杰伦2001年发行的专辑，共收录10首歌曲。该专辑的制作人由周杰伦担任。" class="min-height-140" type="textarea" v-model="form.desc"></el-input>
                    </el-form-item>
                </edit-block>
                <edit-block title="关联单曲">
                    <insert-into-form :disabled="isDisabled" label="添加单曲" placeholder="请输入歌名/歌曲id" :query-search="querySearch" :table-data="singleData">
                        <div slot="tip" class="m-bottom-22">只可关联一首单曲，关联单曲后无须关联艺人</div>
                        <template slot="table">
                            <el-table-column prop="date" label="排序"/>
                            <el-table-column prop="date" label="单曲名称"/>
                            <el-table-column prop="date" label="单曲id"/>
                            <el-table-column v-if="!isDisabled" label="操作">
                                <template slot-scope="scope">
                                    <el-button type="text" @click="singleData.splice(scope.$index,1)">删除</el-button>
                                </template>
                            </el-table-column>
                        </template>
                    </insert-into-form>
                </edit-block>
                <edit-block title="关联艺人">
                    <insert-into-form :disabled="isDisabled" label="添加艺人"  placeholder="请输入艺人名称" :query-search="querySearch" :table-data="artistData">
                        <div slot="tip" class="m-bottom-22">已关联<span class="color-red">{{artistData.length}}</span>名艺人</div>
                        <template slot="table">
                            <el-table-column prop="date" label="排序"/>
                            <el-table-column prop="date" label="艺人名称"/>
                            <el-table-column prop="date" label="艺人id"/>
                            <el-table-column v-if="!isDisabled" label="操作">
                                <template slot-scope="scope">
                                    <el-button type="text" @click="artistData.splice(scope.$index,1)">删除</el-button>
                                </template>
                            </el-table-column>
                        </template>
                    </insert-into-form>
                </edit-block>
                <edit-block title="添加标签">
                    <tag-group :disabled="isDisabled" :options="tagInit"/>
                </edit-block>
            </el-form>
            <div class="text-right m-top-30">
                <el-button type="primary" class="width-140">保存</el-button>
                <el-button class="width-140" @click="prev()">取消</el-button>
            </div>
        </div>
    </steps>
</template>
<script>
    import editBlock from 'components/edit-block';
    import uploadImage from 'components/upload-image';
    import uploadBigFile from 'components/upload-big-file';
    import imageCheckBox from 'components/image-check-box';

    import twoCell from 'components/two-cell';
    import steps from 'components/steps';
    import tagGroup from 'components/tag-group';
    import ctrlButton from 'components/ctrl-button';
    import insertIntoForm from 'components/insert-into-form';
    import { mapState } from 'vuex';
    export default {
        components: {
            editBlock,
            uploadImage,

            imageCheckBox,
            twoCell,
            steps,
            tagGroup,
            ctrlButton,
            insertIntoForm,
            uploadBigFile
        },
        computed: {
            ...mapState('mvUploadSettingEdit',[
                'contentTypeOptions',
                'regionOptions',
                'singleData',
                'artistData',
                'tagInit',
                'searchData'
            ])
        },
        data() {
            return {
                total: null,
                loaded: null,
                fileName: null,
                isDisabled: !!this.$route.meta.isDisabled,
                form: {
                    imageUrl: '',
                    mvName: '0',
                    isPutaway: '0',
                    contentType: '0',
                    fileUrl: '0',
                    issuDate: '0',
                    region: '0',
                    desc: '0',
                },
                rules: {
                    upload: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    title: [
                        { required: true, message: '请选择活动区域', trigger: 'change' }
                    ],
                    type: [
                        { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    desc: [
                        { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                    ]
                }
            };
        },
        methods: {
            uploadFunc(e,ks3,image) {
                this.form.imageUrl = image;
            },
            next() {
                this.$refs.steps.next();
            },
            prev() {
                this.$refs.steps.prev();
            },
            handleIconClick() {

            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            config(item) {
                this.fileName = item.file.name;
                this.total = item.file.size;
            },
            uploadFileFunc(xhr,ks3,url) {
                this.form.fileUrl = url;
                console.log(url);
            },
            uploadProgressFunc(e,upload) {
                console.log(upload);
                upload.config.stopFlag = true;
                this.loaded = e.loaded;
            },
            ctrlCallback(item, row) {
                console.log(arguments);
                switch (item.key) {
                    case 'delete':
                        return this.deleteOpt(row);
                    case 'stop':
                        return this.stop();
                }
            },
            deleteOpt(row) {
                this.$store.dispatch('uploadVideoEdit/deleteLive',{
                    data: row
                }).then((data)=>{
                    this.$message({
                        message: data.data.msg,
                        type: 'success'
                    });
                }).catch((data)=>{
                    this.$message({
                        message: data.data.msg,
                        type: 'error'
                    });
                });
            },
            querySearch(queryString, cb) {
                var results = queryString ? this.searchData.filter((v)=>{
                    return v.value.includes(queryString);
                }) : [];
                cb&&cb(results);
            }
        }
    }
</script>
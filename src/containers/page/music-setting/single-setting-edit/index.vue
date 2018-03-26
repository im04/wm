<template>
    <steps class="edit-page-content m-top-30 has-input-width" ref="steps">
        <div tit="上传文件">
            <div class="m-left-255">
                <upload-big-file class="m-bottom-22" :callback="uploadFunc"/>
                <div class="text-right m-top-30">
                    <el-button type="primary" class="width-140" @click="next()">下一步</el-button>
                    <el-button class="width-140">取消</el-button>
                </div>
            </div>
        </div>
        <div tit="编辑信息">
            <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                <edit-block class="has-input-max" title="基本信息">
                    <two-cell>
                        <el-form-item slot="left" label="歌名" prop="title">
                            <el-input :disabled="isDisabled" v-model="form.singleName" placeholder="请输入名称"></el-input>
                        </el-form-item>
                        <el-form-item slot="right" label="是否上架" prop="title">
                            <el-radio-group :disabled="isDisabled" v-model="form.isPutaway">
                                <el-radio label="0">是</el-radio>
                                <el-radio label="1">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </two-cell>
                    <two-cell>
                        <el-form-item slot="left" label="音乐类型" prop="type">
                            <el-select :disabled="isDisabled" v-model="form.musicType" placeholder="请选择专辑语言">
                                <el-option
                                        v-for="item in musicTypeOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item slot="right" label="语种" prop="title">
                            <el-select v-model="form.lang" placeholder="请选择语种">
                                <el-option
                                        v-for="item in langOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </two-cell>
                    <two-cell>
                        <el-form-item slot="left" label="作词" prop="title">
                            <el-input v-model="form.wordsWriter" placeholder="请输入作词者"></el-input>
                        </el-form-item>
                        <el-form-item slot="right" label="作曲" prop="title">
                            <el-input v-model="form.compose" placeholder="请输入作曲者"></el-input>
                        </el-form-item>
                    </two-cell>
                </edit-block>
                <edit-block class="has-input-max" title="歌手信息">
                    <insert-into-form label="添加歌手" :disabled="isDisabled" placeholder="请输入歌手姓名" :query-search="querySearch" :table-data="singerData">
                        <div slot="tip" class="m-bottom-22">已关联<span class="color-red">{{singerData.length}}</span>名歌手</div>
                        <template slot="table">
                            <el-table-column prop="date" label="排序"/>
                            <el-table-column prop="date" label="艺人名称"/>
                            <el-table-column prop="date" label="艺人id"/>
                            <el-table-column v-if="!isDisabled" label="操作">
                                <template slot-scope="scope">
                                    <el-button type="text" @click="singerData.splice(scope.$index,1)">删除</el-button>
                                </template>
                            </el-table-column>
                        </template>
                    </insert-into-form>
                </edit-block>
                <edit-block class="has-input-max" title="所属专辑">
                    <insert-into-form label="搜索专辑" :disabled="isDisabled" :once="true" placeholder="请输入专辑名/专辑id" :query-search="querySearch" :table-data="specialData">
                        <div slot="tip" class="m-bottom-22">单曲只可属于一张专辑</div>
                        <template slot="table">
                            <el-table-column prop="date" label="专辑名称"/>
                            <el-table-column prop="date" label="专辑id"/>
                            <el-table-column v-if="!isDisabled" label="操作">
                                <template slot-scope="scope">
                                    <el-button type="text" @click="specialData.splice(scope.$index,1)">删除</el-button>
                                </template>
                            </el-table-column>
                        </template>
                    </insert-into-form>
                </edit-block>
                <edit-block class="has-input-max" title="歌词文件">
                    <el-form-item label="上传歌词" prop="title">
                        <upload-image :disabled="isDisabled"/>
                    </el-form-item>
                    <el-table :data="lyricData">
                        <el-table-column prop="date" label="类型"/>
                        <el-table-column prop="date" label="文件名称"/>
                        <el-table-column prop="date" label="上传时间"/>
                        <el-table-column v-if="!isDisabled" label="操作">
                            <template slot-scope="scope">
                                <el-button type="text" @click="lyricData.splice(scope.$index,1)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
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
    import imageCheckBox from 'components/image-check-box';

    import tableLiveRoomCtrl from 'components/table-live-room-ctrl';
    import tableBottomForm from 'components/table-bottom-form';
    import twoCell from 'components/two-cell';
    import steps from 'components/steps';
    import tagGroup from 'components/tag-group';
    import insertIntoForm from 'components/insert-into-form';
    import ctrlButton from 'components/ctrl-button';
    import uploadBigFile from 'components/upload-big-file';
    import { mapState } from 'vuex';
    export default {
        components: {
            editBlock,
            uploadImage,

            imageCheckBox,
            tableBottomForm,
            twoCell,
            steps,
            tagGroup,
            insertIntoForm,
            ctrlButton,
            uploadBigFile
        },
        computed: {
            ...mapState('singleSettingEdit',[
                'tagInit',
                'musicTypeOptions',
                'langOptions',
                'singerData',
                'specialData',
                'lyricData',
                'searchData',
            ]),
            pro() {
                return this.loaded+'/'+this.total;
            }
        },
        data() {
            return {
                isDisabled: this.$route.meta.isDisabled,
                form: {
                    singleName: '0',
                    isPutaway: '0',
                    musicType: '0',
                    lang: '0',
                    wordsWriter: '0',
                    compose: '0',
                },
                ctrlInit: {
                    ctrlList: [
                        {
                            name: '暂停',
                            key: 'uploadPrevue',
                        },
                        {
                            name: '删除',
                            key: 'delete',
                        }
                    ]
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
            next() {
                this.$refs.steps.next();
            },
            prev() {
                this.$refs.steps.prev();
            },
            ctrlCallback: function() {
                console.log(arguments);
            },
            config(item) {
                this.fileName = item.file.name;
                this.total = item.file.size;
            },
            uploadFunc(xhr,ks3,url) {
                this.form.fileUrl = url;
                console.log(url);
            },
            uploadProgressFunc(e,upload) {
                console.log(upload);
                upload.config.stopFlag = true;
                this.loaded = e.loaded;
            },
            handleIconClick() {

            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
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
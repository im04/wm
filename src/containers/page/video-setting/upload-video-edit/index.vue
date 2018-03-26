<template>
    <steps class="edit-page-content m-top-30 has-input-width" ref="steps">
        <div tit="上传文件">
            <div class="m-left-255">
                <el-form ref="form1" :model="form" :rules="rules1" label-width="100px">
                    <el-form-item label="观看形式" prop="vidowType">
                        <el-radio-group :disabled="isDisabled" v-model="videoType">
                            <el-radio label="isVr">vr</el-radio>
                            <el-radio label="isOrdinary">普通</el-radio>
                            <el-radio label="isShort">小视频</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="转码率" prop="bitrates">
                        <el-checkbox-group v-model="form.bitrates">
                            <el-checkbox :disabled="isDisabled||videoType=='isVr'" label="1">1080p</el-checkbox>
                            <el-checkbox :disabled="isDisabled||videoType=='isVr'" label="2">720p</el-checkbox>
                            <el-checkbox :disabled="isDisabled||videoType=='isVr'" label="3">标清</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="视频地址" prop="url">
                        <el-input :disabled="isDisabled" v-model="form.url" placeholder="请输入金山云视频地址"></el-input>
                    </el-form-item>
                    <upload-big-file :disabled="isDisabled||/^https?:\/\/.+/.test(form.url)" class="m-bottom-22" :options="fileOptions" :callback="uploadFileFunc"/>
                </el-form>
                <div class="text-right m-top-30">
                    <el-button :disabled="!form.url" type="primary" class="width-140" @click="next()">下一步</el-button>
                    <el-button class="width-140" @click="$route.back()">取消</el-button>
                </div>
            </div>
        </div>
        <div tit="编辑信息">
            <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                <edit-block class="has-input-max" title="基本信息">
                    <el-form-item label="上传封面" prop="upload">
                        <upload-image :callback="uploadFunc" :disabled="isDisabled" class="fl"/>
                        <image-check-box :src="form.coverUrl" class="fr"/>
                    </el-form-item>
                    <el-form-item label="视频名称" prop="title">
                        <el-input :disabled="isDisabled" v-model="form.title" placeholder="请输入名称"></el-input>
                    </el-form-item>
                    <two-cell>
                        <el-form-item slot="left" label="是否独家">
                            <el-radio-group :disabled="isDisabled" v-model="form.isExclusive">
                                <el-radio label="1">是</el-radio>
                                <el-radio label="2">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item slot="right" label="是否上架">
                            <el-radio-group :disabled="isDisabled" v-model="form.onlineStatus">
                                <el-radio label="1">是</el-radio>
                                <el-radio label="2">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </two-cell>
                    <el-form-item label="视频简介" prop="describes">
                        <el-input :disabled="isDisabled" :rows="6" placeholder="可输入3000字，示例：《范特西》是周杰伦2001年发行的专辑，共收录10首歌曲。该专辑的制作人由周杰伦担任。" class="min-height-140" type="textarea" v-model="form.describes"></el-input>
                    </el-form-item>
                </edit-block>
                <edit-block title="添加标签">
                    <el-form-item label="内容类别" prop="classifyId">
                        <el-select :disabled="isDisabled" v-model="form.classifyId" placeholder="请选择内容类别">
                            <el-option
                                    v-for="item in videoTypeOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <tag-group :disabled="isDisabled" :options="tagInit"/>
                </edit-block>
                <edit-block class="has-input-max" title="所属节目">
                    <insert-into-form label="搜索节目" :once="true" :disabled="isDisabled&&form.programId" placeholder="请输入节目名/节目id"
                                      :query-search="programSearch" :table-data="programData" :callback="getProgramId">
                        <div slot="tip" class="m-bottom-22">只可属于一个节目</div>
                        <template slot="table">
                            <el-table-column prop="date" label="节目名称"/>
                            <el-table-column prop="date" label="节目id"/>
                            <el-table-column v-if="!isDisabled" label="操作">
                                <template slot-scope="scope">
                                    <el-button type="text" @click="programData.splice(scope.$index,1)">删除</el-button>
                                </template>
                            </el-table-column>
                        </template>
                    </insert-into-form>
                </edit-block>
                <edit-block class="has-input-max" title="关联艺人">
                    <insert-into-form label="添加艺人" :disabled="isDisabled" placeholder="请输入艺人名称"
                                      :query-search="artistSearch" :table-data="artistData" :callback="getArtist">
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
            </el-form>
            <div class="text-right m-top-30">
                <el-button v-if="!isDisabled" type="primary" class="width-140" @click="save()">保存</el-button>
                <el-button v-if="isDisabled" type="primary" class="width-140" @click="edit()">编辑</el-button>
                <el-button class="width-140" @click="prev()">上一步</el-button>
            </div>
        </div>
    </steps>
</template>
<script>
    import editBlock from 'components/edit-block';
    import uploadImage from 'components/upload-image';
    import uploadBigFile from 'components/upload-big-file';
    import imageCheckBox from 'components/image-check-box';
    import tableLiveRoomCtrl from 'components/table-live-room-ctrl';
    import tableBottomForm from 'components/table-bottom-form';
    import twoCell from 'components/two-cell';
    import steps from 'components/steps';
    import tagGroup from 'components/tag-group';
    import insertIntoForm from 'components/insert-into-form';
    import ctrlButton from 'components/ctrl-button';
    import { mapState, mapActions } from 'vuex';
    export default {
        components: {
            editBlock,
            uploadImage,
            uploadBigFile,
            imageCheckBox,
            tableBottomForm,
            twoCell,
            steps,
            tagGroup,
            insertIntoForm,
            ctrlButton
        },
        computed: {
            ...mapState('uploadVideoEdit',[
                'videoTypeOptions',
                'tagInit',
            ])
        },
        created() {
            this.getVideoDetail({
                id: this.$route.params.id
            })
        },
        data() {
            return {
                videoType: 'isVr',
                isDisabled: this.$route.meta.isDisabled,
                fileOptions: null,
                programData: [],
                artistData: [],
                form: {
                    id: null,
                    title: null,
                    describes: null,
                    tagIds: [1,2,3,4,5],
                    classifyId: null,
                    coverUrl: null,
                    url: null,
                    isVr: null,
                    isOrdinary: null,
                    isShort: null,
                    onlineStatus: '1',
                    isExclusive: '1',
                    bitrates: [],
                    artistIds: ['0,1','1,2','2,3'],
                    programId: '1',
                    totalTime: 25
                },
                rules1: {
                    url: [
                        { message: '请输入正确的视频地址', trigger: 'blur',
                            validator:(rule, value, callback)=>{
                                if (/^https?:\/\/.+/.test(value)) {
                                    callback();
                                } else {
                                    callback(new Error('请输入正确的视频地址'));
                                }
                            }
                        }
                    ]
                },
                rules: {
                    describes: [
                        {  required: true, message: '请输入描述', trigger: 'blur' }
                    ],
                    classifyId: [
                        { required: true, message: '请选择内容类别', trigger: 'change' }
                    ],
                    title: [
                        { required: true, message: '请输入视频名称', trigger: 'blur' }
                    ]
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
            };
        },
        methods: {
            ...mapActions('uploadVideoEdit',[
                'saveProgram',
                'getVideoDetail'
            ]),
            ...mapActions('commond',[
                'getArtistList',
                'getProgramList'
            ]),
            resetVideoType(value) {
                this.form.isVr = 0;
                this.form.isOrdinary = 0;
                this.form.isShort = 0;
                this.form[value] = 1;
            },
            save() {
                this.resetVideoType(this.videoType);
                this.$refs.form.validate(v=>{
                    if(v){
                        this.saveProgram(this.form).then((rep)=>{
                            if (rep&&rep.code == 200) {
                                this.$confirm('视频保存成功！', '保存成功', {
                                    confirmButtonText: '确定',
                                    cancelButtonText: '取消',
                                    type: 'success'
                                }).then(() => {
                                    this.$router.back();
                                }).catch(() => {
                                    this.$router.back();
                                });
                            }
                        }).catch(err=>{
                            this.$message({
                                message: '保存视频失败！',
                                type: 'error'
                            })
                        });
                    } else {
                        return false;
                    }
                });
            },
            edit() {
                this.$route.push({
                    name: '编辑视频',
                    liveId: 111
                })
            },
            getProgramId(item) {
                if (item.length) {
                    this.form.programId = item[0].programId;
                }
            },
            getArtist(item) {
                if (item.length) {
                    this.form.artistIds = item.map(v=>v.artistId);
                }
            },
            next() {
                this.$refs.form1.validate(v=>{
                    if(v){
                        this.$refs.steps.next();
                    } else {
                        return false;
                    }
                });
            },
            prev() {
                this.$refs.steps.prev();
            },
            uploadFunc(e,ks3,image) {
                this.form.coverUrl = image;
            },
            uploadFileFunc(xhr,ks3,url) {
                this.form.url = url;
            },
            artistSearch(queryString, cb) {
                this.getArtistList({
                    pageSize: 0,
                    id: 0,
                    keywords: queryString,
                }).then((rep)=>{
                    let data = rep&&rep.data;
                    if (data) {
                        cb(data.forEach(v=>v.value=v.title)||[]);
                    }
                })
            },
            programSearch(queryString, cb) {
                let cid = this.form.classifyId;
                if (!cid) {
                    this.$message({
                        message: '请先选择内容分类',
                        type: 'warning'
                    })
                    return cb([])
                }
                this.getProgramList({
                    classifyId: this.form.classifyId,
                    name: queryString,
                    onlineStatus: 1,
                }).then((rep)=>{
                    let data = rep&&rep.data;
                    if (data&&data.result) {
                        console.log(data.result.forEach(v=>v.value=v.title));
                        cb(data.result.forEach(v=>v.value=v.title)||[]);
                    }
                }).catch((err)=>{
                    console.log(err);
                })
            },
        }
    }
</script>
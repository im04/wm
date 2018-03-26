<template>
    <div class="edit-page-content p-bottom-50 m-top-30 has-input-width">
        <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <edit-block title="基本信息">
                <el-form-item label="上传封面" prop="upload">
                    <upload-image :callback="uploadFunc" :disabled="isDisabled" class="fl"/>
                    <image-check-box :src="form.coverUrl" class="fr"/>
                </el-form-item>
                <two-cell>
                    <el-form-item slot="left" label="节目名称" prop="title">
                        <el-input :disabled="isDisabled" v-model="form.title" placeholder="请输入栏目标题"></el-input>
                    </el-form-item>
                    <el-form-item slot="right" label="是否上架">
                        <el-radio-group :disabled="isDisabled" v-model="form.onLineStatus">
                            <el-radio label="1">是</el-radio>
                            <el-radio label="2">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </two-cell>
                <el-form-item label="简介" prop="describes">
                    <el-input :disabled="isDisabled" :rows="6" placeholder="可输入3000字，示例：《范特西》是周杰伦2001年发行的专辑，共收录10首歌曲。该专辑的制作人由周杰伦担任。" class="min-height-140" type="textarea" v-model="form.describes"></el-input>
                </el-form-item>
            </edit-block>
            <edit-block title="添加标签">
                <el-form-item label="内容类别" prop="classifyId">
                    <el-select :disabled="isDisabled" v-model="form.classifyId" placeholder="请选择内容类别">
                        <el-option
                                v-for="item in programaTypeOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <tag-group :disabled="isDisabled" :options="tagInit"/>
            </edit-block>
            <edit-block title="视频列表">
                <insert-into-form label="关联视频" :disabled="isDisabled" placeholder="请输入视频名称/id" :query-search="querySearch" :table-data="videoData">
                    <div slot="tip" class="m-bottom-22">已经关联<span class="color-red">{{videoData.length}}</span>个视频</div>
                    <template slot="table">
                        <el-table-column label="排序" prop="data"/>
                        <el-table-column prop="title" label="视频名称"/>
                        <el-table-column prop="id" label="视频id"/>
                        <el-table-column v-if="!isDisabled" label="操作">
                            <template slot-scope="scope">
                                <el-button type="text" @click="videoData.splice(scope.$index,1)">删除</el-button>
                            </template>
                        </el-table-column>
                    </template>
                </insert-into-form>
            </edit-block>
        </el-form>
        <div class="text-right m-top-30">
            <el-button v-if="!isDisabled" type="primary" class="width-140" @click="save()">保存</el-button>
            <el-button v-if="isDisabled" type="primary" class="width-140" @click="edit()">编辑</el-button>
            <el-button type="primary" class="width-140">取消</el-button>
        </div>
    </div>
</template>
<script>
    import editBlock from 'components/edit-block';
    import uploadImage from 'components/upload-image';
    import imageCheckBox from 'components/image-check-box';

    import tableLiveRoomCtrl from 'components/table-live-room-ctrl';
    import tableBottomForm from 'components/table-bottom-form';
    import tagGroup from 'components/tag-group';
    import twoCell from 'components/two-cell';
    import insertIntoForm from 'components/insert-into-form';
    import sortButton from 'components/sort-button';
    import { mapState, mapActions } from 'vuex';
    export default {
        components: {
            editBlock,
            uploadImage,

            imageCheckBox,
            tableBottomForm,
            tagGroup,
            twoCell,
            insertIntoForm,
            sortButton
        },
        computed: {
            ...mapState('programSettingEdit',[
                'programaTypeOptions',
                'tagInit',
            ]),
        },
        data() {
            return {
                isDisabled: this.$route.meta.isDisabled,
                form: {
                    id: null,
                    title: null,
                    describes: null,
                    coverUrl: null,
                    onLineStatus: '1',
                    totalNumber: 25,
                    updateNumber: 10,
                    classifyId: null,
                    tagIds: [1,2,3],
                    videoIds: ['1234,1'],
                    isRecommend: 1,
                },
                videoData: [],
                rules: {
                    describes: [
                        {  required: true, message: '请输入描述', trigger: 'blur' }
                    ],
                    classifyId: [
                        { required: true, message: '请选择内容类别', trigger: 'change' }
                    ],
                    title: [
                        { required: true, message: '请输入节目名称', trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            ...mapActions('programSettingEdit',[
                'saveProgram'
            ]),
            ...mapActions('commond',[
                'getArtistList',
                'getProgramList'
            ]),
            save() {
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
                                message: '保存节目失败！',
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
                    name: '编辑节目',
                    id: 111
                })
            },
            uploadFunc(e,ks3,image) {
                this.form.coverUrl = image;
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
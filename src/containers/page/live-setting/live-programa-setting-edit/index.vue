<template>
    <div class="edit-page-content m-top-30 has-input-width">
        <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <edit-block title="基本信息">
                <el-form-item label="上传封面" prop="upload">
                    <upload-image :callback="uploadFunc" :disabled="isDisabled" class="fl"/>
                    <image-check-box :src="form.imageUrl" :disabled="isDisabled" class="fr"/>
                </el-form-item>
                <two-cell>
                    <el-form-item slot="left" label="栏目标题" prop="title">
                        <el-input :disabled="isDisabled" v-model="form.title" placeholder="请输入栏目标题"></el-input>
                    </el-form-item>
                    <el-form-item slot="right" label="是否上架" prop="title">
                        <el-radio-group :disabled="isDisabled" v-model="form.isPutaway">
                            <el-radio label="0">是</el-radio>
                            <el-radio label="1">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </two-cell>
                <el-form-item label="内容类别" prop="type">
                    <el-select :disabled="isDisabled" v-model="form.type" placeholder="请选择内容类别">
                        <el-option
                                v-for="item in programaTypeOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="艺人简介">
                    <el-input :disabled="isDisabled" :rows="6" placeholder="可输入3000字，示例：《范特西》是周杰伦2001年发行的专辑，共收录10首歌曲。该专辑的制作人由周杰伦担任。" class="min-height-140" type="textarea" v-model="form.desc"></el-input>
                </el-form-item>
            </edit-block>
            <edit-block title="关联艺人">
                <insert-into-form :disabled="isDisabled" placeholder="请输入艺人名称" :query-search="querySearch" :table-data="artistData">
                    <div slot="tip" class="m-bottom-22">已经关联<span class="color-red">{{artistData.length}}</span>名艺人</div>
                    <template slot="table">
                        <el-table-column label="排序">
                            <template slot-scope="scope">
                                <el-input-number :disabled="isDisabled" size="small" v-model="scope.row.index"/>
                            </template>
                        </el-table-column>
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
            <edit-block title="直播列表">
                <insert-into-form :disabled="isDisabled" placeholder="关联直播" :query-search="querySearch" :table-data="liveData">
                    <div slot="tip" class="m-bottom-22">已经关联<span class="color-red">{{liveData.length}}</span>个视频</div>
                    <template slot="table">
                        <el-table-column label="排序">
                            <template slot-scope="scope">
                                <el-input-number :disabled="isDisabled" size="small" v-model="scope.row.index"/>
                            </template>
                        </el-table-column>
                        <el-table-column prop="date" label="直播名称"/>
                        <el-table-column prop="date" label="直播id"/>
                        <el-table-column prop="date" label="直播厅"/>
                        <el-table-column prop="date" label="开始时间"/>
                        <el-table-column prop="date" label="状态"/>
                        <el-table-column v-if="!isDisabled" label="操作">
                            <template slot-scope="scope">
                                <el-button type="text" @click="liveData.splice(scope.$index,1)">删除</el-button>
                            </template>
                        </el-table-column>
                    </template>
                </insert-into-form>
            </edit-block>
        </el-form>
        <div class="text-right m-top-30">
            <el-button type="primary" class="width-140">发布</el-button>
            <el-button type="primary" class="width-140">保存为草稿</el-button>
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
    import twoCell from 'components/two-cell';
    import { mapState } from 'vuex';
    import insertIntoForm from 'components/insert-into-form';
    import sortButton from 'components/sort-button';
    export default {
        components: {
            editBlock,
            uploadImage,

            imageCheckBox,
            tableBottomForm,
            twoCell,
            insertIntoForm,
            sortButton
        },
        computed: {
            ...mapState('liveProgramaSettingEdit',[
                'programaTypeOptions',
                'programaRoomOptions',
                'artistData',
                'liveData',
                'searchData'
            ]),
            isDisabled(){
                return this.$route.meta.isDisabled
            }
        },
        data() {
            return {
                options: [{
                    value: '选项1',
                    label: '选项1'
                }, {
                    value: '选项2',
                    label: '选项2'
                } ],
                form: {
                    imageUrl: '',
                    title: '1234',
                    isPutaway: '0',
                    type: '0',
                    desc: '描述'
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
            ctrlCallback: function() {
                console.log(arguments);
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
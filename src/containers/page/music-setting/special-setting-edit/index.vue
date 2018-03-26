<template>
    <div class="edit-page-content m-top-30 has-input-width">
        <edit-block title="基本信息">
            <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                <el-form-item label="上传封面" prop="upload">
                    <upload-image :callback="uploadFunc" :disabled="isDisabled" class="fl"/>
                    <image-check-box :disabled="isDisabled" :src="form.imageUrl" class="fr"/>
                </el-form-item>
                <two-cell>
                    <el-form-item slot="left" label="专辑名称" prop="title">
                        <el-input :disabled="isDisabled" v-model="form.specialName" placeholder="请输入名称"></el-input>
                    </el-form-item>
                    <el-form-item slot="right" label="是否上架" prop="title">
                        <el-radio-group :disabled="isDisabled" v-model="form.isPutaway">
                            <el-radio label="0">是</el-radio>
                            <el-radio label="1">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </two-cell>
                <two-cell>
                    <el-form-item slot="left" label="版权来源" prop="type">
                        <el-select :disabled="isDisabled" v-model="form.copyrightSource" placeholder="请选择版权来源">
                            <el-option
                                    v-for="item in copyrightSourceOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item slot="right" label="唱片公司" prop="title">
                        <el-input :disabled="isDisabled" v-model="form.recordCompany" placeholder="请输入名称"></el-input>
                    </el-form-item>
                </two-cell>
                <two-cell>
                    <el-form-item slot="left" label="专辑语言" prop="type">
                        <el-select :disabled="isDisabled" v-model="form.specialLang" placeholder="请选择专辑语言">
                            <el-option
                                    v-for="item in specialLangOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item slot="right" label="音乐类型" prop="type">
                        <el-select :disabled="isDisabled" v-model="form.musicType" placeholder="请选择专辑语言">
                            <el-option
                                    v-for="item in musicTypeOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </two-cell>
                <two-cell>
                    <el-form-item slot="left" label="发行时间" prop="type">
                        <el-select :disabled="isDisabled" v-model="form.issueDate" placeholder="请选择发行时间">
                            <el-option
                                    v-for="item in issueDateOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item slot="right" label="单曲数" prop="title">
                        <el-input :disabled="isDisabled" v-model="form.SingleNumber" placeholder="请输入单曲数"></el-input>
                    </el-form-item>
                </two-cell>
                <el-form-item label="录音类型">
                    <el-radio-group :disabled="isDisabled" v-model="form.recType">
                        <el-radio label="0">录音室版</el-radio>
                        <el-radio label="1">现场版</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="付费方式">
                    <el-radio-group :disabled="isDisabled" v-model="form.paying">
                        <el-radio label="0">免费</el-radio>
                        <el-radio label="1">单独购买</el-radio>
                        <el-input class="small-btn m-left-10" v-model="form.name" placeholder="请输入金额"></el-input>元
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="是否独家">
                    <el-radio-group :disabled="isDisabled" v-model="form.isExclusive">
                        <el-radio label="0">是</el-radio>
                        <el-radio label="1">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="专辑介绍">
                    <el-input :disabled="isDisabled" v-model="form.desc" :rows="6" placeholder="可输入3000字，示例：《范特西》是周杰伦2001年发行的专辑，共收录10首歌曲。该专辑的制作人由周杰伦担任。" class="min-height-140" type="textarea"></el-input>
                </el-form-item>
            </el-form>
        </edit-block>
        <edit-block class="has-input-max" title="歌手信息">
            <insert-into-form :disabled="isDisabled" :once="true" placeholder="请输入歌手姓名" :query-search="querySearch" :table-data="singerData">
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
        <edit-block class="has-input-max-h" title="单曲信息">
            <insert-into-form :disabled="isDisabled" placeholder="请输入单曲名称/id" :query-search="querySearch" :table-data="singleData">
                <template slot="table">
                    <el-table-column prop="date" label="排序"/>
                    <el-table-column prop="date" label="id"/>
                    <el-table-column prop="date" label="单曲名"/>
                    <el-table-column prop="date" label="歌手"/>
                    <el-table-column prop="date" label="语言"/>
                    <el-table-column prop="date" label="风格"/>
                    <el-table-column v-if="!isDisabled" label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" @click="singleData.splice(scope.$index,1)">删除</el-button>
                        </template>
                    </el-table-column>
                </template>
            </insert-into-form>
        </edit-block>
        <edit-block title="添加标签">
            <tag-group :disabled="isDisabled" :options="tagInit"/>
        </edit-block>
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
    import uploadBigFile from 'components/upload-big-file';
    import imageCheckBox from 'components/image-check-box';

    import tableLiveRoomCtrl from 'components/table-live-room-ctrl';
    import tableBottomForm from 'components/table-bottom-form';
    import tagGroup from 'components/tag-group';
    import insertIntoForm from 'components/insert-into-form';
    import sortButton from 'components/sort-button';
    import ctrlButton from 'components/ctrl-button';
    import twoCell from 'components/two-cell';
    import { mapState } from 'vuex';
    export default {
        components: {
            editBlock,
            uploadImage,

            imageCheckBox,
            tableBottomForm,
            tagGroup,
            insertIntoForm,
            sortButton,
            ctrlButton,
            twoCell,
            uploadBigFile
        },
        computed: {
            ...mapState('specialSettingEdit',[
                'copyrightSourceOptions',
                'specialLangOptions',
                'musicTypeOptions',
                'issueDateOptions',
                'singerData',
                'singleData',
                'tagInit',
                'searchData'
            ])
        },
        data() {
            return {
                isDisabled: this.$route.meta.isDisabled,
                form: {
                    imageUrl:'',
                    specialName:'0',
                    isPutaway:'0',
                    copyrightSource:'0',
                    recordCompany:'0',
                    specialLang:'0',
                    musicType:'0',
                    issueDate:'0',
                    SingleNumber:1,
                    recType:'0',
                    paying:'0',
                    isExclusive:'0',
                    desc:'1234'
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
            uploadFunc() {
                console.log(1);
            },
            uploadProgressFunc() {
                console.log(2);
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
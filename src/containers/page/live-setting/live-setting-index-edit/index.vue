<template>
    <steps class="edit-page-content m-top-30 has-input-width" ref="steps">
        <div tit="基本信息">
            <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                <edit-block title="基本信息">
                    <el-form-item label="上传封面" prop="upload">
                        <upload-image class="fl" :disabled="isDisabled"
                                      :callback="uploadFunc"
                                      :progress-function="uploadProgressFunc"/>
                        <span class="fl m-left-20">尺寸: 1000*1000</span>
                        <!--<image-check-box :disabled="isDisabled" :src="form.imageUrl" class="fr"/>-->
                    </el-form-item>
                    <el-form-item slot="left" label="直播标题" prop="title">
                        <el-input :disabled="isDisabled" v-model="form.liveTitle" placeholder="请输入名称"></el-input>
                    </el-form-item>
                    <two-cell>
                        <el-form-item slot="left" label="直播厅" prop="title">
                            <el-select :disabled="isDisabled" v-model="form.liveRoom" placeholder="请选择直播厅">
                                <el-option v-for="item in liveRoomOptions" :value="item.value" :label="item.label" :key="item.label"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item slot="right" label="使用机位">
                            <el-radio-group :disabled="isDisabled" v-model="form.usingCamera">
                                <el-radio v-for="(item, index) in usingCameraOptions" :label="item.value" :key="index">{{item.label}}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </two-cell>
                    <el-form-item label="开播日期">
                        <el-date-picker
                                :disabled="isDisabled"
                                v-model="form.startDate"
                                type="date"
                                placeholder="选择日期">
                        </el-date-picker>
                        <el-time-select
                                :disabled="isDisabled"
                                class="width-140 m-left-80"
                                placeholder="起始时间"
                                v-model="form.startTime"
                                :picker-options="{
                                    start: '08:30',
                                    step: '00:15',
                                    end: '18:30'
                                }">
                        </el-time-select>
                        <span>-</span>
                        <el-time-select
                                :disabled="isDisabled"
                                class="width-140"
                                placeholder="结束时间"
                                v-model="form.endTime"
                                :picker-options="{
                                    start: '08:30',
                                    step: '00:15',
                                    end: '18:30',
                                    minTime: form.startTime
                                }">
                        </el-time-select>
                    </el-form-item>
                    <el-form-item label="直播简介">
                        <el-input :disabled="isDisabled" :rows="6" placeholder="可输入3000字，示例：《范特西》是周杰伦2001年发行的专辑，共收录10首歌曲。该专辑的制作人由周杰伦担任。" class="min-height-140" type="textarea" v-model="form.desc"></el-input>
                    </el-form-item>
                    <el-form-item slot="right" label="是否上架" prop="title">
                        <el-radio-group :disabled="isDisabled" v-model="form.isPutaway">
                            <el-radio label="0">设为上架</el-radio>
                            <el-radio label="1">设为下架</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </edit-block>
                <edit-block title="分类标签">
                    <el-form-item slot="left" label="内容分类" prop="title">
                        <el-select :disabled="isDisabled" v-model="form.liveType" placeholder="请选择内容类别">
                            <el-option v-for="item in liveTypeOptions" :value="item.value" :label="item.label" :key="item.label"></el-option>
                        </el-select>
                    </el-form-item>
                    <tag-group :disabled="isDisabled" :options="tagInit"/>
                </edit-block>
                <edit-block class="has-input-max" title="互动设置">
                    <el-form-item label="互动设置">
                        <el-checkbox-group v-model="form.interactionSetting">
                            <el-checkbox :disabled="isDisabled" label="允许用户连线" name="type"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </edit-block>
                <edit-block class="has-input-max" title="收费设置">
                    <el-form-item label="付费方式">
                        <el-radio-group :disabled="isDisabled" v-model="form.pay">
                            <el-radio label="0">免费</el-radio>
                            <el-radio label="1">单独购买</el-radio>
                            <el-input class="small-btn m-left-10" :disabled="isDisabled||form.pay != '1'" v-model="form.payNumber" placeholder="请输入金额"></el-input>元
                        </el-radio-group>
                    </el-form-item>
                </edit-block>
                <edit-block class="has-input-max" title="直播配置">
                    <el-form-item label="回放设置">
                        <el-checkbox-group v-model="form.playbackSetting">
                            <el-checkbox :disabled="isDisabled" label="观看需要会员权限" name="type2"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </edit-block>
            </el-form>
            <div class="text-right m-top-30">
                <el-button type="primary" class="width-140" @click="next()">下一步</el-button>
                <el-button class="width-140">取消</el-button>
            </div>
        </div>
        <div tit="关联设置">
            <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                <edit-block class="has-input-max" title="关联艺人">
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
                <edit-block class="has-input-max" title="关联栏目">
                    <insert-into-form :disabled="isDisabled" :once="true" placeholder="请输入直播栏目名/栏目id" :query-search="querySearch" :table-data="programaData">
                        <el-button slot="button" @click="dialogFormVisible=true">创建栏目</el-button>
                        <div slot="tip" class="m-bottom-22">只可属于一个节目</div>
                        <template slot="table">
                            <el-table-column prop="date" label="直播栏目名称"/>
                            <el-table-column prop="date" label="栏目id"/>
                            <el-table-column v-if="!isDisabled" label="操作">
                                <template slot-scope="scope">
                                    <el-button type="text" @click="programaData.splice(scope.$index,1)">删除</el-button>
                                </template>
                            </el-table-column>
                        </template>
                    </insert-into-form>
                </edit-block>
                <edit-block class="has-input-max" title="添加管理员">
                    <insert-into-form :disabled="status=='playing'?false:isDisabled" placeholder="请输入姓名或手机号搜索" :query-search="querySearch" :table-data="manageData">
                        <div slot="tip" class="m-bottom-22">已经添加<span class="color-red">{{manageData.length}}</span>名管理员</div>
                        <template slot="table">
                            <el-table-column label="排序">
                                <template slot-scope="scope">
                                    <el-input-number :disabled="isDisabled" size="small" v-model="scope.row.number"/>
                                </template>
                            </el-table-column>
                            <el-table-column prop="date" label="姓名"/>
                            <el-table-column prop="date" label="手机号"/>
                            <el-table-column v-if="!isDisabled" label="操作">
                                <template slot-scope="scope">
                                    <el-button type="text" @click="manageData.splice(scope.$index,1)">删除</el-button>
                                </template>
                            </el-table-column>
                        </template>
                    </insert-into-form>
                </edit-block>
                <!--<edit-block title="预告回放">-->
                    <!--<el-table border :data="playbackData">-->
                        <!--<el-table-column prop="name" label="类型"/>-->
                        <!--<el-table-column prop="date" label="文件名称"/>-->
                        <!--<el-table-column prop="date" label="上传时间"/>-->
                        <!--<el-table-column v-if="status == 'end'?true:!isDisabled" label="操作">-->
                            <!--<template slot-scope="scope">-->
                                <!--<ctrl-button :data="scope" :options="ctrlInit" :click-callback="ctrCallback"/>-->
                            <!--</template>-->
                        <!--</el-table-column>-->
                    <!--</el-table>-->
                <!--</edit-block>-->
            </el-form>
            <div class="text-right m-top-30">
                <el-button type="primary" class="width-140" @click="saveData()">保存</el-button>
                <el-button class="width-140" @click="prev()">返回</el-button>
            </div>
            <el-dialog title="添加直播栏目" :visible.sync="dialogFormVisible">
                <el-form :model="programaForm">
                    <el-form-item label="上传封面">
                        <upload-image class="fl" :disabled="isDisabled"
                                      :callback="uploadFunc"
                                      :progress-function="uploadProgressFunc"/>
                        <span class="fl m-left-20">尺寸: 1000*1000</span>
                    </el-form-item>
                    <el-form-item label="栏目标题">
                        <el-input :disabled="isDisabled" v-model="programaForm.liveTitle" placeholder="请输入名称"></el-input>
                    </el-form-item>
                    <el-form-item label="内容类别" prop="title">
                        <el-select :disabled="isDisabled" v-model="programaForm.liveType" placeholder="请选择内容类别">
                            <el-option v-for="item in liveTypeOptions" :value="item.value" :label="item.label" :key="item.label"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="直播简介">
                        <el-input v-model="programaForm.desc" :disabled="isDisabled" :rows="6" placeholder="可输入3000字，示例：《范特西》是周杰伦2001年发行的专辑，共收录10首歌曲。该专辑的制作人由周杰伦担任。" type="textarea"></el-input>
                    </el-form-item>
                    <div slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="dialogFormVisible = false">保存</el-button>
                        <el-button @click="dialogFormVisible = false">取消</el-button>
                    </div>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="dialogFormVisible = false">保存</el-button>
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                </div>
            </el-dialog>
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
    import sortButton from 'components/sort-button';
    import ctrlButton from 'components/ctrl-button';
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
            sortButton,
            ctrlButton
        },
        computed: {
            ...mapState('liveSettingIndexEdit',[
                'liveTypeOptions',
                'liveRoomOptions',
                'usingCameraOptions',
                'programaData',
                'tagInit',
                'artistData',
                'manageData',
                'playbackData',
                'searchData'
            ]),
            isDisabled() {
                let r = this.$route;
                console.log(r.params.status);
                switch (r.params.status) {
                    case 'playing':
                        return true;
                    case 'end':
                        return true;
                    case 'notStarted':
                        return false;
                    default:
                        return r.meta.isDisabled
                }
            }
        },
        data() {
            return {
                dialogFormVisible: false,
                programaForm: {},
                status: this.$route.params.status,
                ctrlInit: {
                    ctrlList: [
                        {
                            name: '上传预告',
                            key: 'uploadPrevue',
                        },
                        {
                            name: '上传回放',
                            key: 'uploadPlayback',
                            test: _ => this.status!='notStarted'

                        },
                        {
                            name: '删除',
                            key: 'delete',
                        }
                    ]
                },
                tabInit:{
                    activeName: '0'
                },
                form: {
                    imageUrl: 'http://www.baidu.com/img/bd_logo1.png',
                    liveTitle: '测试title',
                    isPutaway: '1',
                    liveType: '2',
                    liveRoom: '3',
                    startDate: new Date(2017,10,6),
                    startTime: '09:00',
                    endTime: '09:15',
                    desc: '测试描述',
                    livePrograma: '2',
                    usingCamera: '2',
                    interactionSetting: '1',
                    pay: '1',
                    payNumber: '120',
                    playbackSetting: '0',
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
            uploadProgressFunc() {
                console.log(2);
            },
            ctrCallback(arg, row) {
                switch (arg.key) {
                    case 'uploadPrevue':
                        return this.$router.push({
                            name : '上传预告片'
                        });
                    case 'uploadPlayback':
                        return this.$router.push({
                            name : '上传回放'
                        });
                    case 'delete':
                        return this.deleteOpt(row);
                }
            },
            deleteOpt(row) {
                this.$store.dispatch('liveSettingIndex/deleteLive',{
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
            next() {
                this.$refs.steps.next();
            },
            prev() {
                this.$refs.steps.prev();
            },
            saveData() {
                console.log(this.form);
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
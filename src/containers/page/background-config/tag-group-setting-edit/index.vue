<template>
    <div class="edit-page-content m-top-30">
        <edit-block class="has-input-max" title="基本信息">
            <el-form ref="form" :model="form" :rules="rules">
                <el-form-item label="标签组名称" prop="name" label-width="120px">
                    <el-col :span="8">
                        <el-input v-model="form.name" placeholder="请输入名称"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="关联方式" prop="type" label-width="120px">
                    <el-radio-group v-model="form.type">
                        <el-radio label="1" >分类</el-radio>
                        <el-radio label="2" >分类组</el-radio>
                    </el-radio-group>
                </el-form-item>
                <div class="container-link" v-show="form.type == '1'">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="分类" prop="checkType" label-width="120px" class="m-right-10">
                                <el-select v-model="form.cateI" placeholder="请选择分类分组" @change="getLevelI($event)">
                                    <el-option
                                            v-for="item in cateI"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item prop="checkTypeII">
                                <el-select v-model="form.cateII" placeholder="请选择分类" @change="getLevelII($event)">
                                    <el-option
                                            v-for="item in cateII"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                        </el-form-item>
                        </el-col>
                    </el-row>
                </div>
                <div class="m-bottom-22 container-content" v-show="form.type == '2'">
                    <el-form-item label="分类分组" prop="checkType" label-width="120px">
                        <el-checkbox-group v-model="form.groups">
                            <el-checkbox
                                    v-for="item in cateGroups"
                                    :key="item.value"
                                    :label="item.value"
                                    name="groups">
                                {{item.label}}
                            </el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </div>
                <el-form-item label="选择方式" prop="selectType" label-width="120px">
                    <el-radio-group v-model="form.selectType">
                        <el-radio label="1" >多选</el-radio>
                        <el-radio label="2" >单选</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
        </edit-block>
        <edit-block class="has-input-max" title="标签">
            <div class="m-bottom-22 ov-hi">
                <el-button class="fr" type="primary" @click="addTagOpt()" size="small">添加</el-button>
            </div>
            <el-table :data="tableInit.dataList">
                <el-table-column prop="sort" label="排序"/>
                <el-table-column prop="name" label="标签名称"/>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button @click="openTagOpt(scope.$index, scope.row)" type="text" size="small">编辑</el-button>
                        <el-button @click="deleteOpt(scope.$index, scope.row)" type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </edit-block>
        <div class="text-right m-top-30">
            <el-button type="primary" class="width-140" @click="submitForm('form')">保存</el-button>
            <el-button class="width-140" @click="$router.go(-1)">取消</el-button>
        </div>

        <el-dialog title="编辑标签" :visible.sync="editTagDialogVisible" width="10%" class="dialog-loading">
            <div class="dialog-loading-body">
                <el-form :model="editTagForm" :rules="editTagFormRules" ref="editTagForm">
                    <el-form-item label="原名" label-width="120px">
                        <el-col :span="8">
                            {{editTagForm.oldName}}
                        </el-col>
                    </el-form-item>
                    <el-form-item label="新名称" label-width="120px" prop="checkEditTagName">
                        <el-col :span="8">
                            <el-input v-model="editTagForm.name" placeholder="请输入名称"></el-input>
                        </el-col>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer text-right">
                    <el-button @click="editTagDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="editTagOpt('editTagForm')">确 定</el-button>
                </div>
            </div>
        </el-dialog>
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
    export default {
        components: {
            editBlock,
            uploadImage,
            imageCheckBox,
            tableBottomForm,
            tagGroup,
            twoCell
        },
        data() {
            let id = this.$route.query.id

            var validateType = (rule, value, callback) => {
                console.log(this.form.type)
                if (!this.form.type) {
                    callback(new Error('请先选择关联方式'));
                } else if (this.form.type == 1) {
                    if (!this.form.cateI) {
                        callback(new Error('请选择分类'));
                    }
                } else if (this.form.type == 2) {
                    if (this.form.groups.length == 0) {
                        callback(new Error('请选择分类分组'));
                    }
                }
                callback();
            };
            var validateTypeII = (rule, value, callback) => {
                console.log(this.form.type, this.form.cateII)
                if (!this.form.type) {
                    callback(new Error('请先选择关联方式'));
                } else if (this.form.type == 1) {
                    if (!this.form.cateII) {
                        callback(new Error('请选择分类'));
                    }
                }
                callback();
            };

            var validateEditTagName = (rule, value, callback) => {
                console.log(this.editTagForm.name)
                if (!this.editTagForm.name) {
                    callback(new Error('请输入'));
                } else  {
                    if(!this.checkTagName(this.editTagForm.name)){
                        callback(new Error('标签名已存在'));
                    }else{
                        callback();
                    }
                }
            };

            return {
                id: id,
                selectContentList: [],
                tableInit: {
                    dataList: []
                },
                cates:[],
                cateI:[],
                cateII:[],
                cateGroups: [
                    {value: '1', label: '专辑'},
                    {value: '2', label: '单曲'},
                    {value: '3', label: '歌手'},
                    {value: '4', label: '视频'},
                    {value: '5', label: '直播'},
                    {value: '6', label: '电影'}
                ],
                entity:{},
                form: {
                    id: id,
                    name: '',
                    type: '2',
                    cateI: '',
                    cateII: '',
                    groups:[],
                    selectType: '',
                    contents: []
                },
                rules: {
                    checkType: [
                        { validator: validateType, trigger: 'change' }
                    ],
                    checkTypeII: [
                        { validator: validateTypeII, trigger: 'change' }
                    ],
                    name: [
                        { required: true, message: '请输入', trigger: 'blur' }
                    ],
                    type: [
                        { required: true, message: '请选择', trigger: 'change' }
                    ],
                    selectType: [
                        { required: true, message: '请选择', trigger: 'change' }
                    ]
                },
                editTagDialogVisible: false,
                editTagForm: {
                    id: id,
                    oldName: '',
                    name: '',
                    sort: ''
                },
                editTagFormRules: {
                    checkEditTagName: [
                        { validator: validateEditTagName, trigger: 'change' }
                    ],
                }
            }
        },
        created() {
            this.getInitData();
            let id = this.$route.query.id;
            if (id) {
                this.getEntityData(id);
            }
        },
        methods: {
            getLevelI(value) {
                console.log(value)

                this.cateII = []
                this.form.cateII = ''

                let cateLen = this.cates.length
                let _cate2 = []
                for (let i = 0; i < cateLen; i++) {
                    if(this.cates[i] && this.cates[i].value == value) {
                        let _item = this.cates[i]
                        let subLen = _item.subs ? _item.subs.length : 0
                        for (let j = 0; j < subLen; j++) {
                            let _sub = _item.subs[j]
                            _cate2.push({value: _sub.value, label: _sub.label});
                        }
                    }
                }
                this.cateII = _cate2
            },
            getLevelII(value) {
                console.log(value)
            },
            getInitData() {
                //分类数据
                this.cates = [
                    {value: 1, label: 'APP', subs:[ {value: 10, label: 'sub_app1'},{value: 11, label: 'sub_app2'} ] },
                    {value: 2, label: 'APP2', subs:[ {value: 12, label: 'sub2_app1'},{value: 13, label: 'sub2_app2'} ] }
                ];

                for (let i = 0; i < this.cates.length; i++) {
                    let _item = this.cates[i];
                    this.cateI.push({value: _item.value, label: _item.label});
                }
            },
            getEntityData(id) {
                this.form = {
                    id: id,
                    name: '',
                    type: '1',
                    cateI: 2,
                    cateII: 13,
                    groups:['2', '3'],
                    selectType: '',
                    contents: []
                };
                this.getLevelI(this.form.cateI);
                this.form.cateII = 13;

                this.tableInit.dataList = [];
                let item = [];
                for (let i = 0; i < 10; i++) {
                    item = {
                        id: i + 1,
                        sort: i + 1,
                        name: '内容_' + parseInt(Math.random() * 1000)
                    };
                    this.tableInit.dataList.push(item);
                }

            },
            checkTagName(name) {
                if(!name) {
                    return false
                }
                let len = this.tableInit.dataList.length
                for (let i = 0; i < len; i++) {
                    if (this.tableInit.dataList[i].name == name) {
                        return false
                    }
                }
                return true;
            },
            addTagOpt() {
                let _this = this
                this.$prompt('请输入标签名', '添加标签', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /\S+/,
                    inputErrorMessage: '请输入标签名',
                    inputValidator: function( value ) {
                        console.log(value)
                        if(!_this.checkTagName(value)){
                            return '标签名已存在'
                        }
                        return true
                    }
                }).then(({ value }) => {
                    let item = {
                        id: 0,
                        sort: 100 + parseInt(Math.random() * 1000),
                        name: value
                    };
                    this.tableInit.dataList.push(item);
                }).catch(() => {
                });

            },
            openTagOpt(index, row) {
                this.editTagDialogVisible = true;
                this.editTagForm = {
                    id: row.id,
                    name: '',
                    oldName: row.name,
                    sort: row.sort,
                    index: index
                }
            },
            editTagOpt(formName) {
                this.$refs[formName].validate((valid) => {
                    if (!valid) {
                        return false
                    }

                    let newItem = {
                        id: this.editTagForm.id,
                        name: this.editTagForm.name,
                        sort: this.editTagForm.sort
                    };

                    const index = this.editTagForm.index;
                    this.tableInit.dataList.splice(index, 1, newItem);

                    this.editTagDialogVisible = false
                })
            },
            deleteOpt(index, row) {
                let _this = this
                let msg = (this.id && row.id) ? '当前标签已标记内容，是否继续删除?' : '确定要删除吗?'
                this.$confirm(msg, '删除提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {

                            _this.tableInit.dataList.splice(index, 1);
                            done()
                            return

                            //删除时要发请求?
                            let postData = {
                                id: row.id
                            }
                            console.log(postData)
                            this.$store.dispatch('userList/deleteOpt', postData
                            ).then(function (r) {
                                if (r.data.status === 200) {
                                    _this.tableInit.dataList.splice(index, 1);
                                    done();
                                } else {
                                    _this.$message.error(r.data.msg);
                                }
                            }).finally(function () {
                            }).catch(function (error) {
                                console.log(error)
                            })
                        } else {
                            done();
                        }
                    }
                }).then(() => {
                }).catch(() => {
                });

            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    let _this = this;
                    if (!valid) {
                        return false;
                    }

                    if(this.form.type == 2){
                        this.form.contents = this.tableInit.dataList;
                    }

                    let _router = this.$router;

                    let postData = this.form;
                    console.log(postData);

                    this.$store.dispatch('systemSetting/editBannerContent', postData
                    ).then(function (r) {
                        if(r.data.status === 200 ) {
                            _this.$message.success('操作成功');
                            _router.push('/backgroundConfig/tagGroupSetting');
                        }else {
                            _this.$message.error(r.data.msg);
                        }
                    }).finally(function () {
                    }).catch(function (error) {
                        console.log(error);
                    })
                });
            }
        }
    }
</script>
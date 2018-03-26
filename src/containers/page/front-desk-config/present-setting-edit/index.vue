<template>
    <div class="edit-page-content m-top-30 has-input-width cmm-content">
        <edit-block class="has-input-max" title="基本信息">
            <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                <el-form-item label="上传封面" prop="checkImg">
                    <upload-image class="fl"
                                  :callback="uploadFunc"
                                  :progress-function="uploadProgressFunc"/>
                    <image-check-box :src="form.coverImg" class="fr"/>
                </el-form-item>
                <el-form-item label="礼物名称" prop="name">
                    <el-input v-model="form.name" placeholder="请输入礼物名称"></el-input>
                </el-form-item>
                <two-cell>
                    <el-form-item slot="left" label="支持连发" prop="type1">
                        <el-radio-group v-model="form.type1">
                            <el-radio label="1">支持</el-radio>
                            <el-radio label="2">不支持</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item slot="right" label="付费方式" prop="checkType2">
                        <el-radio-group v-model="form.type2">
                            <el-radio label="1">免费</el-radio>
                            <el-radio label="2">单独购买</el-radio>
                        </el-radio-group>
                        <el-input-number v-model="form.fee" placeholder="请输入金额" class="container-num" :controls="false" :min="0" :max="999999"></el-input-number>
                    </el-form-item>
                </two-cell>
                <two-cell>
                    <el-form-item slot="left" label="经验值" prop="experience">
                        <el-input-number v-model="form.experience" controls-position="right" class="container-num" :min="0" :max="999999"></el-input-number>
                    </el-form-item>
                    <el-form-item slot="right" label="排序" prop="sort">
                        <el-input-number v-model="form.sort" placeholder="请输入排序" class="container-num"></el-input-number>
                    </el-form-item>
                </two-cell>

                <el-form-item label="动效文件" prop="checkFile">
                    <upload-image class="fl"
                                  :callback="uploadFunc1"
                                  :progress-function="uploadProgressFunc1"/>
                </el-form-item>

                <el-table :data="tableInit.dataList" >
                    <el-table-column label="文件名称">
                        <template slot-scope="scope">
                            {{scope.row.filename}}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button @click="deleteOpt(scope.$index, scope.row)" type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>

            </el-form>
        </edit-block>
        <div class="text-center m-top-30">
            <el-button type="primary" class="width-140" @click="submitForm('form')">保存</el-button>
            <el-button class="width-140" @click="$router.go(-1)">取消</el-button>
        </div>
    </div>
</template>
<script>
    import editBlock from 'components/edit-block';
    import uploadImage from 'components/upload-image';
    import imageCheckBox from 'components/image-check-box';
    import twoCell from 'components/two-cell';
    export default {
        components: {
            editBlock,
            twoCell,
            uploadImage,
            imageCheckBox
        },
        data() {
            let id = this.$route.query.id

            var validateImg = (rule, value, callback) => {
                console.log(this.defaultImg)
                console.log(this.form.coverImg)
                if (!this.form.coverImg) {
                    callback(new Error('请上传封面'));
                } else if (this.form.coverImg == this.defaultImg) {
                    callback(new Error('请上传封面'));
                } else {
                    callback();
                }
            };
            var validateType2 = (rule, value, callback) => {
                console.log(this.defaultImg)
                console.log(this.form.coverImg)
                if (!this.form.type2) {
                    callback(new Error('请选择'));
                } else if (this.form.type2 == 2 && (!this.form.fee)) {
                    callback(new Error('请输入金额'));
                } else {
                    callback();
                }
            };
            let defaultImg = 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg'

            return {
                id: id,
                defaultImg: defaultImg,
                tableInit: {
                    dataList: []
                },
                form: {
                    id: id,
                    coverImg: defaultImg,
                    name: '',
                    type1: '',
                    type2: '',
                    fee: '',
                    experience: '',
                    sort: '',
                    dynamicFile: ''
                },
                rules: {
                    checkImg: [
                        { validator: validateImg, trigger: 'change' }
                    ],
                    name: [
                        { required: true, message: '请输入', trigger: 'change' }
                    ],
                    type1: [
                        { required: true, message: '请选择', trigger: 'change' }
                    ],
                    checkType2: [
                        { validator: validateType2, trigger: 'change' }
                    ]
                }
            };
        },
        created() {
            let id = this.$route.query.id
            if (id) {
                this.getEntityData(id)
            }
        },
        methods: {
            uploadFunc() {
                console.log(1);
                this.form.coverImg = this.defaultImg + '?a=1111';
            },
            uploadProgressFunc() {
                console.log(2);
            },
            uploadFunc1() {
                console.log(1);
                this.form.dynamicFile = this.defaultImg + '?a=111111';
                let item = {
                    filename:this.form.dynamicFile
                }
                this.tableInit.dataList.push(item);
            },
            uploadProgressFunc1() {
                console.log(2);
            },
            getEntityData(id) {
                this.form= {
                    id: id,
                    coverImg: this.defaultImg+'?a=111221',
                    name: 'sdfsdfsdf',
                    type1: '',
                    type2: '1',
                    fee: '10',
                    experience: '200',
                    sort: '100',
                    dynamicFile: 'http//baidu.com/?a=1'
                }

                let item = {
                    filename:this.form.dynamicFile
                }
                this.tableInit.dataList.push(item);

            },
            deleteOpt(index, row) {
                let _this = this
                let msg = '确定要删除吗?'
                this.$confirm(msg, '删除提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                            _this.tableInit.dataList.splice(index, 1);
                            done();
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
                        return false
                    }

                    let _router = this.$router;

                    let postData = this.form
                    console.log(postData)

                    this.$store.dispatch('systemSetting/editBannerContent', postData
                    ).then(function (r) {
                        if(r.data.status === 200 ) {
                            _this.$message.success('操作成功');

                            _router.push('/frontDeskConfig/presentSetting');
                        }else {
                            _this.$message.error(r.data.msg)
                        }
                    }).finally(function () {
                    }).catch(function (error) {
                        console.log(error)
                    })
                });
            }
        }
    }
</script>
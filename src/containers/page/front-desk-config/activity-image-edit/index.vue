<template>
    <div class="edit-page-content has-input-max m-top-30 cmm-content">
        <el-form ref="form" :model="form" :rules="rules" label-width="120px">
            <div class="m-left-255">
                <el-form-item label="上传封面" prop="checkImg">
                    <upload-image class="fl"
                                  :callback="uploadFunc"
                                  :progress-function="uploadProgressFunc"/>
                    <image-check-box :src="form.coverImg" class="fr"/>
                </el-form-item>
                <el-form-item label="活动标题" prop="title">
                    <el-col :span="16">
                    <el-input v-model="form.title" placeholder="请输入活动标题"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="排序" prop="sort">
                    <el-input-number v-model="form.sort" placeholder="排序"></el-input-number>
                </el-form-item>
                <el-form-item label="链接地址" prop="linkUrl">
                    <el-col :span="16">
                    <el-input class="width-full" v-model="form.linkUrl" placeholder="请输入链接地址"></el-input>
                    </el-col>
                </el-form-item>
            </div>
        </el-form>
        <div class="line line-dashed pull-in"></div>
        <div class="text-right m-top-10">
            <el-button type="primary" class="width-140" @click="submitForm('form')">保存</el-button>
            <el-button class="width-140" @click="$router.go(-1)">取消</el-button>
        </div>
    </div>
</template>
<script>
    import uploadImage from 'components/upload-image';
    import imageCheckBox from 'components/image-check-box';
    export default {
        components: {
            uploadImage,
            imageCheckBox,
        },
        data() {
            let id = this.$route.query.id
            let defaultImg = 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg'
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
            return {
                defaultImg: defaultImg,
                form: {
                    id: id,
                    coverImg: defaultImg,
                    title: '',
                    sort: '10',
                    linkUrl: ''
                },
                rules: {
                    checkImg: [
                        { validator: validateImg, trigger: 'change' }
                    ],
                    title: [
                        { required: true, message: '请输入活动标题', trigger: 'change' }
                    ],
                    sort: [
                        { type: 'number', required: true, message: '请输入排序', trigger: 'change' }
                    ],
                    linkUrl: [
                        { required: true, message: '请输入链接地址', trigger: 'change' }
                    ]
                }
            };
        },
        created() {
            let id = this.$route.query.id
            if (id) {
                this.getData(id)
            }
        },
        methods: {
            uploadFunc() {
                console.log(1);
                this.form.coverImg = this.defaultImg + '?a=1111'
            },
            uploadProgressFunc() {
                console.log(2);
            },
            getData(id) {

                let _this = this;
                let params = { id: id }

                this.$store.dispatch('systemSetting/getActivity', params
                ).then(function (r) {
                    if (r.data.status === 200) {
                        _this.form = {
                            id: id,
                            coverImg: _this.defaultImg + '?t=111',
                            title: 'xxxxxx',
                            sort: '101',
                            linkUrl: 'http://www.baidu.com/?'
                        }
                    } else {
                        _this.$message.error(r.data.msg)
                    }
                }).finally(function () {

                }).catch(function (error) {
                    console.log(error)
                })
            },
            uploadFunc() {
                console.log(arguments);
                console.log(1);
                this.form.coverImg = this.defaultImg + '?t=111'
            },
            uploadProgressFunc() {
                console.log(2);
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

                    this.$store.dispatch('systemSetting/editActivity', postData
                    ).then(function (r) {
                        if(r.data.status === 200 ) {
                            _this.$message.success('操作成功');
                            _this.$router.go(-1)
                            //_router.push('/userConfig/userList/');
                        }else {
                            _this.$message.error(r.data.msg)
                        }
                    }).finally(function () {
                    }).catch(function (error) {
                        console.log(error)
                    })
                });
            },
        }
    }
</script>
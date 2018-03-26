<template>
    <div class="p-top-50">
            <div class="p-bottom-50 bg-default">
                <edit-block class="has-input-max" title="基本信息">
                    <el-form ref="form" :model="form" :rules="rules" label-width="80px" label-position="left">
                        <el-form-item label="手机号" prop="mobile">
                            <el-input v-model="form.mobile" placeholder="请输入手机号码"></el-input>
                        </el-form-item>
                        <el-form-item label="ID">
                            <label>{{form.number}}</label>
                        </el-form-item>
                        <el-form-item label="昵称" prop="nickname">
                            <el-input v-model="form.nickname" placeholder="请输入昵称"></el-input>
                        </el-form-item>
                        <el-form-item label="性别" prop="sex">
                            <el-radio-group v-model="form.sex">
                                <el-radio label="1">男</el-radio>
                                <el-radio label="2">女</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="身份">
                            <el-checkbox-group v-model="form.type">
                                <el-checkbox name="type">管理员</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        <div class="line line-dashed pull-in"></div>
                        <el-form-item>
                            <el-button type="primary" class="width-140" @click="submitForm('form')">保存</el-button>
                            <el-button class="width-140" @click="$router.go(-1)">取消</el-button>
                        </el-form-item>
                    </el-form>
                </edit-block>
            </div>
        </div>

</template>

<script>
    import editBlock from 'components/edit-block';
    export default {
        components: {
            editBlock
        },
        data() {
            let id=this.$route.query.id
            return {
                form: {
                    id: id,
                    mobile: '13719100871',
                    number: '132456456',
                    nickname: 'nickname',
                    sex: '',
                    type: true
                },
                rules: {
                    mobile: [
                        { required: true, message: '请输入手机号码', trigger: 'blur' },
                        { min: 11, max: 11, message: '长度为11位', trigger: 'blur' }
                    ],
                    nickname: [
                        { required: true, message: '请输入昵称', trigger: 'blur' }
                    ],
                    sex: [
                        { required: true, message: '请选择性别', trigger: 'change' }
                    ]
                }
            }
        },
        created() {
            let id=this.$route.query.id
            console.log(id)
            if(id){
                this.getData(id)
            }
        },
        methods: {
            getData(id) {
                this.form={
                    id: id,
                    mobile: '13719100871',
                    number: '132456456_'+Math.random(),
                    nickname: 'nickname_'+Math.random(),
                    sex: '',
                    type: true
                }
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    let _msg = this.$message;
                    if (!valid) {
                        _msg.warning('请完善表单信息')
                        return false
                    }

                    let _router = this.$router;

                    let postData = this.form
                    console.log(postData)

                    this.$store.dispatch('userList/editUser', postData
                    ).then(function (r) {
                        if(r.data.status === 200 ) {
                            _msg.success('操作成功');
                            _router.push('/userConfig/userList/');
                        }else {
                            _msg.error(r.data.msg)
                        }
                    })
                    .catch(function (error) {
                        console.log(error)
                    })
                });
            }
        }
    }
</script>

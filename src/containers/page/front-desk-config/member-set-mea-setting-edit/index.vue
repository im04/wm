<template>
    <div class="edit-page-content m-top-30">
        <edit-block class="has-input-max" title="基本信息">
            <el-form ref="form" :model="form" :rules="rules">
                <el-row :gutter="20">
                    <el-col :span="10">
                        <el-form-item label="套餐名称" prop="name" label-width="120px">
                            <el-input placeholder="请输入套餐名称" v-model="form.name">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="10">
                        <el-form-item label="类型" prop="buyChannel" label-width="120px">
                            <el-radio-group v-model="form.buyChannel">
                                <el-radio
                                        v-for="item in getComboType"
                                        :key="item.value"
                                        :label="item.value">
                                    {{item.label}}
                                </el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="内购ID" prop="iosProductId" label-width="100px">
                            <el-input v-model="form.iosProductId" placeholder="请输入内购ID"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="10">
                        <el-form-item label="原价" prop="originalPrice" label-width="120px">
                            <el-input type="number" placeholder="请输入原价" v-model.number="form.originalPrice" :min=0 :max=999999>
                                <template slot="append">元</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="折后价" prop="salePrice" label-width="100px">
                            <el-input type="number" placeholder="请输入原价" v-model.number="form.salePrice" :min="0" :max="999999">
                                <template slot="append">元</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="10">
                        <el-form-item label="妙银" prop="coin" label-width="120px">
                            <el-input type="number" placeholder="请输入妙银" v-model.number="form.coin" :min="0" :max="999999">
                                <template slot="append">币</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="有效天数" prop="duration" label-width="100px">
                            <el-input placeholder="请输入有效天数" v-model.number="form.duration" :min="1" :max="999999" class="input-with-select">
                                <el-select v-model="form.durationUnit" slot="append" placeholder="请选择" class="width-65">
                                    <el-option
                                        v-for="item in getComboUnitType"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="10">
                        <el-form-item label="排序" prop="sort" label-width="120px">
                            <el-input type="number" placeholder="请输入排序" v-model.number="form.sort" :min="0" :max="999999">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </edit-block>
        <div class="line line-dashed"></div>
        <div class="text-center m-top-30">
            <el-button type="primary" class="width-140" @click="submitForm('form')">保存</el-button>
            <el-button class="width-140" @click="$router.go(-1)">取消</el-button>
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
            let id = this.$route.query.id;

            var validateThirdId = (rule, value, callback) => {
                console.log(this.form.buyChannel)
                if (!this.form.buyChannel) {
                    callback(new Error('请选择类型'));
                } else if (this.form.buyChannel == 1 && !this.form.iosProductId) {
                    callback(new Error('请输入'));
                } else {
                    callback();
                }
            };

            return {
                id: id,
                getComboType: utils.getComboType(),
                getComboUnitType: utils.getComboUnitType(),
                form: {
                    id: id,
                    name:'',
                    buyChannel: '',
                    iosProductId: '',
                    originalPrice:'',
                    salePrice:'',
                    coin: '',
                    duration: 30,
                    durationUnit: '0',
                    sort: ''
                },
                rules: {
                    iosProductId: [
                        { validator: validateThirdId, trigger: 'change' }
                    ],
                    name: [
                        {  required: true, message: '请输入', trigger: 'blur' }
                    ],
                    buyChannel: [
                        { required: true, message: '请选择', trigger: 'change' }
                    ],
                    durationUnit: [
                        { required: true, message: '请选择', trigger: 'change' }
                    ],
                    originalPrice: [
                        { type:'number', required: true, message: '请输入有效的数字', trigger: 'change' }
                    ],
                    salePrice: [
                        { type:'number', required: true, message: '请输入有效的数字', trigger: 'change' }
                    ],
                    coin: [
                        { type:'number', required: true, message: '请输入有效的数字', trigger: 'change' }
                    ],
                    duration: [
                        { type:'number', required: true, message: '请输入有效的数字', trigger: 'change' }
                    ],
                    sort: [
                        {  type:'number', required: true, message: '请输入', trigger: 'change' }
                    ]
                }
            }
        },
        created() {
            let id = this.$route.query.id;
            if (id) {
                this.getEntityData(id);
            }
        },
        methods: {
            getEntityData(id) {
                let _this = this;
                this.$store.dispatch('memberSetMeaSetting/detail', { id: id }
                ).then(function (r) {
                    _this.form = r.data;
                    _this.form.buyChannel = _this.form.buyChannel.toString();
                    _this.form.durationUnit = _this.form.durationUnit.toString();
                    console.log(r.data);
                }).finally(function () {
                }).catch(function (error) {
                    console.log(error)
                })

            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    let _this = this;
                    if (!valid) {
                        return false
                    }

                    let _router = this.$router;

                    let postData = this.form;
                    console.log(postData);

                    this.$store.dispatch('memberSetMeaSetting/save', postData
                    ).then(function (r) {
                        if(r.code === 200 ) {
                            _this.$message.success('操作成功');
                            _router.push('/frontDeskConfig/memberSetMeaSetting');
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
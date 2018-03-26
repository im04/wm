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
                        <el-form-item label="类型" prop="supportClient" label-width="120px">
                            <el-radio-group v-model="form.supportClient">
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
                        <el-form-item label="价格" prop="salePrice" label-width="120px">
                            <el-input type="number" placeholder="请输入价格" v-model.number="form.salePrice" :min=0 :max=999999>
                                <template slot="append">元</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="10">
                        <el-form-item label="妙银" prop="baseCoin" label-width="120px">
                            <el-input type="number" placeholder="请输入妙银" v-model.number="form.baseCoin" :min="0" :max="999999">
                                <template slot="append">币</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="赠送妙银" prop="awardCoin" label-width="100px">
                            <el-input type="number" placeholder="请输入赠送妙银" v-model.number="form.awardCoin" :min="0" :max="999999">
                                <template slot="append">币</template>
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
                console.log(this.form.supportClient)
                if (!this.form.supportClient) {
                    callback(new Error('请选择类型'));
                } else if (this.form.supportClient == 1 && !this.form.iosProductId) {
                    callback(new Error('请输入'));
                } else {
                    callback();
                }
            };

            /*
      "id": 4,
      "name": "双11优惠大礼包",
      "salePrice": 0.01,
      "baseCoin": 99,
      "awardCoin": 1,
      "coin": 100,
      "supportClient": 2,
      "iosProductId": null,
      "sort": 0,
             */

            let comboType = utils.getComboType();
            comboType.splice(0, 1);

            return {
                id: id,
                getComboType: comboType,
                form: {
                    id: id,
                    name:'',
                    salePrice:'',
                    baseCoin: '',
                    awardCoin: '',
                    coin: '',
                    supportClient: '',
                    iosProductId: '',
                    sort: ''
                },
                rules: {
                    iosProductId: [
                        { validator: validateThirdId, trigger: 'change' }
                    ],
                    name: [
                        {  required: true, message: '请输入', trigger: 'blur' }
                    ],
                    supportClient: [
                        { required: true, message: '请选择', trigger: 'change' }
                    ],
                    salePrice: [
                        { type:'number', required: true, message: '请输入有效的数字', trigger: 'change' }
                    ],
                    baseCoin: [
                        { type:'number', required: true, message: '请输入有效的数字', trigger: 'change' }
                    ],
                    awardCoin: [
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
                this.$store.dispatch('paySetMeaSetting/get', { id: id }
                ).then(function (r) {
                    _this.form = r.data;
                    if(_this.form.createTime){
                        delete _this.form.createTime;
                    }
                    if(_this.form.updateTime){
                        delete _this.form.updateTime;
                    }
                    _this.form.supportClient = _this.form.supportClient.toString();
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

                    this.$store.dispatch('paySetMeaSetting/save', postData
                    ).then(function (r) {
                        if(r.code === 200 ) {
                            _this.$message.success('操作成功');
                            _router.push('/frontDeskConfig/paySetMeaSetting');
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
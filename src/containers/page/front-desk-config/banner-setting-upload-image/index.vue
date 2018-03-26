<template>
    <div class="edit-page-content m-top-30 cmm-content">
        <el-form ref="form" :model="form" :rules="rules" label-width="120px">
            <div class="m-left-255">
                <el-form-item label="上传封面" prop="checkImg">
                    <upload-image class="fl"
                                  :callback="uploadFunc"
                                  :progress-function="uploadProgressFunc"/>
                    <image-check-box :src="form.imgUrl" class="fr"/>
                </el-form-item>

                <el-form-item label="需要登录" prop="needLogin">
                    <el-radio-group v-model="form.needLogin">
                        <el-radio label="1" v-model="form.needLogin">是</el-radio>
                        <el-radio label="2" v-model="form.needLogin">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="类型" prop="type">
                    <el-radio-group v-model="form.type">
                        <el-radio label="1" >链接</el-radio>
                        <el-radio label="2" >内容</el-radio>
                    </el-radio-group>
                </el-form-item>
                <div class="container-link" v-show="form.type == '1'">
                    <el-form-item label="链接地址" prop="checkLink">
                        <el-col :span="16">
                            <el-input v-model="form.linkUrl" placeholder="链接地址"></el-input>
                        </el-col>
                    </el-form-item>
                </div>
                <div class="m-bottom-22 container-content" v-show="form.type == '2'">
                    <el-row class="m-bottom-22">
                        <el-col :span="8" class="m-right-10">
                            <el-select class="width-full" v-model="searchFrm.cateI" placeholder="请选择一级分类" @change="getLevelI($event)">
                                <el-option
                                        v-for="item in cateI"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="8">
                            <el-select class="width-full" v-model="searchFrm.cateII" placeholder="请选择二级分类">
                                <el-option
                                        v-for="item in cateII"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                    <el-row class="m-bottom-22">
                        <el-col :span="10">
                            <el-autocomplete
                                    :fetch-suggestions="querySearch"
                                    placeholder="请输入内容名称/id"
                                    :trigger-on-focus="false"
                                    v-model="searchFrm.keyword"
                                    @select="handleSelect">
                            </el-autocomplete>
                            <label class="remark">请先选择分类</label>
                        </el-col>
                    </el-row>
                    <el-row class="m-bottom-22">
                        <el-table class="m-bottom-22" :data="tableInit.dataList">
                            <el-table-column prop="name" label="内容名称"/>
                            <el-table-column prop="id" label="id"/>
                            <el-table-column prop="cate2Text" label="二级分类"/>
                            <el-table-column prop="cate1Text" label="一级分类"/>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-button @click="deleteOpt(scope.$index, scope.row)" type="text" size="small">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-row>
                </div>
                <el-form-item label="备注">
                    <el-input :rows="6" v-model="form.remark" placeholder="可输入3000字，示例：《范特西》是周杰伦2001年发行的专辑，共收录10首歌曲。该专辑的制作人由周杰伦担任。" class="min-height-140" type="textarea"></el-input>
                </el-form-item>
            </div>
        </el-form>
        <div class="text-right m-top-30">
            <el-button type="primary" class="width-140" @click="submitForm('form')">保存</el-button>
            <el-button class="width-140" @click="$router.go(-1)">取消</el-button>
        </div>
    </div>
</template>
<script>
    import uploadImage from 'components/upload-image';
    import imageCheckBox from 'components/image-check-box';
    import { mapState, mapActions } from 'vuex';
    export default {
        components: {
            uploadImage,
            imageCheckBox
        },
        computed: {
            ...mapState('bannerSetting',[
                'tableData', 'currentId', 'currentItem'
            ])
        },
        data() {
            let id = this.$route.query.id

            var validateImg = (rule, value, callback) => {
                console.log(this.imgUrl)
                console.log(this.form.imgUrl)
                if (!this.form.imgUrl) {
                    callback(new Error('请上传封面'));
                } else if (this.form.imgUrl == this.defaultImg) {
                    callback(new Error('请上传封面'));
                } else {
                    callback();
                }
            };
            var validateLink = (rule, value, callback) => {
                console.log(value)
                console.log(this.form.type)
                if (this.form.type == 1 && !this.form.linkUrl) {
                    callback(new Error('请输入链接地址'));
                } else {
                    callback();
                }
            };

            let defaultImg = 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg'

            return {
                id: id,
                defaultImg: defaultImg,
                selectContentList: [],
                tableInit: {
                    dataList: []
                },
                cateI:[],
                cateII:[],
                form: {
                    currentIndex:0,
                    id: id,
                    imgUrl: defaultImg,
                    needLogin: '',
                    type: '2',
                    linkUrl: '',
                    cateI: '',
                    cateII: '',
                    contents: [],
                    remark: ''
                },
                searchFrm: {
                    cateI: '',
                    cateII: '',
                    keyword: ''
                },
                rules: {
                    checkImg: [
                        { validator: validateImg, trigger: 'change' }
                    ],
                    checkLink: [
                        { validator: validateLink, trigger: 'change' }
                    ],
                    locationI: [
                        { type: 'number', required: true, message: '请选择', trigger: 'change' }
                    ],
                    locationII: [
                        { type: 'number', required: true, message: '请选择', trigger: 'change' }
                    ],
                    needLogin: [
                        { required: true, message: '请选择', trigger: 'change' }
                    ],
                    type: [
                        { required: true, message: '请选择', trigger: 'change' }
                    ]
                }
            };
        },
        created() {
            this.getInitData();
            console.log(this.currentItem);
        },
        methods: {
            uploadFunc() {
                console.log(1);
                this.form.coverImg = this.defaultImg + '?a=1111'
            },
            uploadProgressFunc() {
                console.log(2);
            },
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
            getInitData() {
                //分类数据
                this.cates = [
                    {value: 1, label: 'APP', subs:[ {value: 10, label: 'sub_app1'},{value: 11, label: 'sub_app2'} ] },
                    {value: 2, label: 'APP2', subs:[ {value: 12, label: 'sub2_app1'},{value: 13, label: 'sub2_app2'} ] }
                ]

                for (let i = 0; i < this.cates.length; i++) {
                    let _item = this.cates[i]
                    this.cateI.push({value: _item.value, label: _item.label});
                }

                console.log(this.tableData);

                this.cateI = [
                    {value: 1, label: 'APP'},
                    {value: 2, label: 'APP2'}
                ]
                this.cateII = [
                    {value: 10, label: '首页'},
                    {value: 11, label: '首页2'}
                ]

                this.form = this.currentItem;
                console.log(this.form);

                let item = {
                    id: 1,
                    name: '内容_' + parseInt(Math.random() * 1000),
                    cate1Text: '左上',
                    cate2Text: '1' + parseInt(Math.random() * 1000),
                    type: 1
                };

                this.tableInit.dataList.push(item);
            },
            deleteOpt(index, row) {
                this.tableInit.dataList.splice(index, 1);
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    let _this = this;
                    if (!valid) {
                        return false
                    }

                    let postData = this.form;
                    console.log(postData);

                    this.tableData.splice(this.form.currentIndex, 1, postData);

                    //this.$message.success('操作成功');
                    this.$router.go(-1);
                });
            },
            loadContent() {
                console.log(this.searchFrm.keyword)

                let postData = this.searchFrm
                console.log(postData)
                this.$store.dispatch('systemSetting/getContentByCate', postData
                ).then(function (r) {
                    if(r.data.status === 200 ) {

                    }else {

                    }
                }).catch(function (error) {
                    console.log(error)
                })

                this.selectContentList = []
                let item = [];
                for (let i = 0; i < 15; i++) {
                    item = {
                        id: i + 10,
                        value: '内容11_' + parseInt(Math.random() * 1000),
                        cate1Text: '内容11_',
                        cate2Text: '内容11_',
                        type: 1
                    }
                    this.selectContentList.push(item);
                }
            },
            handleSelect(item) {
                console.log(item, this.searchFrm.keyword);

                if(this.tableInit.dataList.length >0) {
                    this.$message.error('已存在一条内容了,请先删除');
                    return;
                }

                let ii = {
                    id: item.id,
                    name: item.value,
                    cate1Text: item.cate1Text,
                    cate2Text: item.cate2Text
                }
                this.tableInit.dataList.push(ii);
            },
            querySearch(queryString, cb) {
                console.log(this.searchFrm);
                if(!this.searchFrm.cateI || !this.searchFrm.cateII) {
                    this.$message.info('请先选择分类');
                    return false;
                }
                this.loadContent()
                var result = this.selectContentList
                cb && cb(result);
            }
        }
    }
</script>
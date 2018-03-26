<template>
    <div class="edit-page-content m-top-30">
        <edit-block class="has-input-max" title="基本信息">
            <el-form ref="form" :model="form" :rules="rules">
                <el-form-item label="推荐位名称" prop="name" label-width="120px">
                    <el-col :span="8">
                        <el-input v-model="form.name" placeholder="请输入名称"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="是否显示" prop="status" label-width="120px">
                    <el-radio-group v-model="form.status">
                        <el-radio label="1" >显示</el-radio>
                        <el-radio label="2" >不显示</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="内容类型" prop="type" label-width="120px">
                    <el-select v-model="form.type" placeholder="内容类别">
                        <el-option
                                v-for="item in types"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </edit-block>
        <edit-block class="has-input-max" title="关联内容">
            <el-row class="m-bottom-20">
                <el-col :span="6">
                    <el-select v-model="searchFrm.cateI" placeholder="请选择分类">
                        <el-option
                                v-for="item in cates"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="6" class="m-right-10">
                    <el-autocomplete
                            :fetch-suggestions="querySearch"
                            placeholder="请输入内容名称/id"
                            :trigger-on-focus="false"
                            v-model="searchFrm.keyword"
                            @select="handleSelect">
                    </el-autocomplete>
                </el-col>
                <el-col :span="6">
                    <el-select v-model="searchFrm.cateII" placeholder="请选择场次">
                        <el-option
                                v-for="item in types"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>

            <el-table :data="tableInit.dataList">
                <el-table-column prop="sort" label="排序"/>
                <el-table-column prop="name" label="内容名称"/>
                <el-table-column prop="id" label="id"/>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button @click="deleteOpt(scope.$index, scope.row)" type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </edit-block>
        <div class="text-right m-top-30">
            <el-button type="primary" class="width-140" @click="submitForm('form')">保存</el-button>
            <el-button class="width-140" @click="$router.go(-1)">取消</el-button>
        </div>

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
            let id = this.$route.query.id;

            return {
                id: id,
                selectContentList: [],
                tableInit: {
                    dataList: []
                },
                types: [],
                cates: [],
                entity:{},
                form: {
                    id: id,
                    name: '',
                    status: '',
                    type: '',
                    contents: []
                },
                rules: {
                    name: [
                        { required: true, message: '请输入', trigger: 'blur' }
                    ],
                    status: [
                        { required: true, message: '请选择', trigger: 'change' }
                    ],
                    type: [
                        { type: 'number', required: true, message: '请选择', trigger: 'change' }
                    ]
                },
                searchFrm: {
                    cateI: '',
                    cateII: '',
                    keyword: ''
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
            getInitData() {
                //分类数据
                this.types = this.cates = [
                    {value: 1, label: 'APP' },
                    {value: 2, label: 'APP2' }
                ]
            },
            getEntityData(id) {
                this.form = {
                    id: id,
                    name: '推荐位名称推荐位名称',
                    status: '1',
                    type: '',
                    contents: []
                };

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
                let len = this.tableInit.dataList.length;
                for (let i = 0; i < len; i++) {
                    if (this.tableInit.dataList[i].name == name) {
                        return false
                    }
                }
                return true;
            },
            deleteOpt(index, row) {
                let _this = this;
                let msg = '确定要删除吗?';
                this.$confirm(msg, '删除提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {

                            _this.tableInit.dataList.splice(index, 1);
                            done();
                            return;

                            //删除时要发请求?
                            let postData = {
                                id: row.id
                            };
                            console.log(postData);
                            this.$store.dispatch('userList/deleteOpt', postData
                            ).then(function (r) {
                                if (r.data.status === 200) {
                                    _this.tableInit.dataList.splice(index, 1);
                                    done();
                                } else {
                                    _this.$message.error(r.data.msg)
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
                        return false
                    }

                    if(this.form.type == 2){
                        this.form.contents = this.tableInit.dataList
                    }

                    let _router = this.$router;

                    let postData = this.form;
                    console.log(postData);

                    this.$store.dispatch('systemSetting/editBannerContent', postData
                    ).then(function (r) {
                        if(r.data.status === 200 ) {
                            _this.$message.success('操作成功');
                            _router.push('/frontDeskConfig/homeRecommend');
                        }else {
                            _this.$message.error(r.data.msg)
                        }
                    }).finally(function () {
                    }).catch(function (error) {
                        console.log(error)
                    })
                });
            },
            loadContent() {
                console.log(this.searchFrm.keyword);

                let postData = this.searchFrm;
                console.log(postData);
                this.$store.dispatch('systemSetting/getContentByCate', postData
                ).then(function (r) {
                    if(r.data.status === 200 ) {

                    }else {

                    }
                }).catch(function (error) {
                    console.log(error)
                });

                this.selectContentList = [];
                let item = [];
                for (let i = 0; i < 15; i++) {
                    item = {
                        id: i + 100,
                        value: '内容11_' + parseInt(Math.random() * 1000),
                        sort: i + 1,
                        type: 1
                    };
                    this.selectContentList.push(item);
                }
            },
            handleSelect(item) {
                console.log(item, this.searchFrm.keyword);

                let isAdded = false;
                for(let i in this.tableInit.dataList) {
                    if(this.tableInit.dataList[i].id == item.id) {
                        isAdded = true;
                        break;
                    }
                }
                if(isAdded) {
                    this.$message.error('该内容已存在');
                    return
                }

                let ii = {
                    id: item.id,
                    name: item.value,
                    sort: item.sort
                };
                this.tableInit.dataList.push(ii);
            },
            querySearch(queryString, cb) {
                console.log(this.searchFrm);
                if(!this.searchFrm.cateI || !this.searchFrm.cateII) {
                    //this.$message.info('请先选择分类');
                    //return false;
                }
                this.loadContent();
                var result = this.selectContentList;
                cb && cb(result);
            }
        }
    }
</script>
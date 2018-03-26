<template>
    <div class="edit-page-content m-top-30 cmm-content">
        <el-form ref="form" :model="form" :rules="rules" label-width="120px">
            <edit-block class="has-input-max" title="基本信息">
                <el-form-item label="广告位名称" prop="name">
                    <el-input v-model="form.name" placeholder="请输入广告位名称"></el-input>
                </el-form-item>
                <el-form-item label="位置" required>
                    <el-col :span="7">
                        <el-form-item prop="client">
                            <el-select v-model="form.locationI" placeholder="请选择" @change="getLevelII($event)">
                                <el-option
                                        v-for="item in locationI"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="1"></el-col>
                    <el-col :span="7">
                        <el-form-item prop="locationII">
                            <el-select v-model="form.locationII" placeholder="请选择" @change="getLevelIII($event)">
                                <el-option
                                        v-for="item in locationII"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="1"></el-col>
                    <el-col :span="7">
                        <el-form-item prop="locationIII">
                            <el-select v-model="form.locationIII" placeholder="请选择">
                                <el-option
                                        v-for="item in locationIII"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="类型" prop="type">
                    <el-col :span="7">
                        <el-select v-model="form.style" placeholder="请选择类型">
                            <el-option
                                    v-for="item in types"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="1"></el-col>
                    <el-col :span="8">
                        <el-form-item label="位置数量" prop="position">
                            <el-input type="number" placeholder="请输入位置数量" v-model.number="form.position" :min="0" :max="999999">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-form-item>
            </edit-block>

            <edit-block class="has-input-max" title="关联内容">
                <el-table :data="tableInit.dataList" >
                    <el-table-column label="位置">
                        <template slot-scope="scope">
                            {{scope.row.location1Text}}-
                            {{scope.row.location2Text}}
                        </template>
                    </el-table-column>
                    <el-table-column label="Width*Height">
                        <template slot-scope="scope">
                            {{scope.row.width}}*{{scope.row.height}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="linkUrl" label="URL"/>
                    <el-table-column prop="imgUrl" label="图片"/>
                    <el-table-column prop="remark" label="备注"/>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button @click="editOpt(scope.$index, scope.row)" type="text" size="small">编辑
                            </el-button>
                            <el-button @click="deleteOpt(scope.$index, scope.row)" type="text" size="small">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!--<el-row>-->
                    <!--<el-col :span="24">-->
                        <!--<router-link :to="{ path:'/frontDeskConfig/bannerSetting/bannerSettingUploadImage', query: { id: id }}" >添加 </router-link>-->
                    <!--</el-col>-->
                <!--</el-row>-->
                <div>

                </div>
            </edit-block>
        </el-form>
        <div class="text-right m-top-30">
            <el-button type="primary" class="width-140" @click="submitForm('form')">保存</el-button>
            <el-button class="width-140" @click="$router.go(-1)">取消</el-button>
        </div>

    </div>
</template>
<script>
    import tabCpt from 'components/tab';
    import editBlock from 'components/edit-block';
    import { mapState, mapActions } from 'vuex';

    export default {
        components: {
            tabCpt,
            editBlock
        },
        computed: {
            ...mapState('bannerSetting', [
                'tableData', 'currentId', 'currentItem'
            ])
        },
        data() {
            let id = this.$route.query.id

            return {
                lastId:'',
                id: id,
                cates:[],
                locationI: [],
                locationII: [],
                locationIII: [],
                types: utils.getBannerStyle(),
                entity:{
                    locationI: '',
                    locationII: '',
                    locationIII: ''
                },
                sltFlg:{
                    ii:0,
                    iii:0
                },
                form: {
                    id: id,
                    name: '',
                    client: '',
                    locationI: '',
                    locationII: '',
                    locationIII: '',
                    position: '',
                    style: ''
                },
                tableInit: {
                    dataList: []
                },
                paginationInit: {
                    size: 10,
                    length: 32,
                    currentPage: 1,
                },
                rules: {
                    name: [
                        { required: true, message: '请输入广告位名称', trigger: 'blur' }
                    ],
                    locationI: [
                        { required: true, message: '请选择', trigger: 'change' }
                    ],
                    locationII: [
                        { required: true, message: '请选择', trigger: 'change' }
                    ],
                    locationIII: [
                        {required: true, message: '请选择', trigger: 'change' }
                    ],
                    style: [
                        { required: true, message: '请选择', trigger: 'change' }
                    ],
                    position: [
                        {  type: 'number', required: true, message: '请选择', trigger: 'change' }
                    ]
                }
            };
        },
        mounted() {
            console.log('mounted');
        },
        created() {
            console.log('created');
            console.log(this.currentId);
            this.getInitData();

            let id = this.$route.query.id
            this.$store.dispatch('bannerSetting/setCurrentId', id);
            console.log(this.currentId);

            if (id) {
                this.getEntityData(id)
            }else{
                this.getLevelI()
            }
            this.lastId = id;
        },
        methods: {
            getLevelI() {
                let tmpLocationI = []
                for(let val of this.cates) {
                    tmpLocationI.push({value: val.value, label: val.label});
                }
                this.locationI = tmpLocationI;
                this.form.locationI = this.entity.locationI;
            },
            getLevelII(value) {
                console.log(value)

                this.locationII = []
                this.locationIII = []
                this.form.locationII = ''
                this.form.locationIII = ''

                let tmpLocationII = []
                for(let val of this.cates) {
                    if(val.subs && val.value == this.form.locationI) {
                        for(let val2 of val.subs) {
                            tmpLocationII.push({value: val2.value, label: val2.label});
                        }
                    }
                }

                this.locationII = tmpLocationII
                if(this.sltFlg.ii == 0) {
                    this.sltFlg.ii +=1
                    this.form.locationII = this.entity.locationII
                }
            },
            getLevelIII(value) {
                console.log(value)

                this.locationIII = []
                this.form.locationIII = ''

                let tmpLocationIII = []
                for(let val of this.cates) {
                    if(val.subs && val.value == this.form.locationI) {
                        for(let val2 of val.subs) {
                            if(val2.subs && val2.value == this.form.locationII) {
                                for(let val3 of val2.subs) {
                                    tmpLocationIII.push({value: val3.value, label: val3.label});
                                }
                            }
                        }
                    }
                }
                this.locationIII = tmpLocationIII
                if(this.sltFlg.iii == 0) {
                    this.sltFlg.iii +=1
                    this.form.locationIII = this.entity.locationIII
                }
            },
            getInitData() {
                //位置数据
                this.cates = [
                    {value: '0', label: 'APP', subs:[ {value: '10', label: 'sub_app1'},{value: '11', label: 'sub_app2'} ] },
                    {value: '1', label: 'APP2', subs:[ {value: '12', label: 'sub2_app1', subs:[ {value: '10', label: 'sub21_app1'},{value: '11', label: 'sub21_app2'} ]},{value: '13', label: 'sub2_app2', subs:[ {value: '10', label: 'sub22_app1'},{value: '11', label: 'sub22_app2'} ]} ] }
                ]
            },
            getEntityData(id) {
                let _this = this;
                console.log(id);
                this.$store.dispatch('bannerSetting/get', { id: id }
                ).then(function (r) {
                    _this.form = r.data;
                    _this.form.position = parseInt(_this.form.position);
                    _this.form.style = _this.form.style.toString();
                    //服务端未返回client
                    _this.entity.locationI="1";
                    _this.entity.locationII="12";
                    _this.entity.locationIII="10";
                    if(_this.form.createDate){
                        delete _this.form.createDate;
                    }
                    if(_this.form.updateDate){
                        delete _this.form.updateDate;
                    }
                    console.log(r.data);
                    _this.getLevelI();

                }).finally(function () {
                }).catch(function (error) {
                    console.log(error)
                })

                let items = [];
                for (let i = 0; i < 5; i++) {
                    let item = {
                        id: i + 1,
                        location1Text: '左上',
                        location2Text: '1' + parseInt(Math.random() * 1000),
                        width: 100,
                        height: 200,
                        needLogin: '1',
                        type: '2',
                        linkUrl: 'http://baidu.com/?',
                        imgUrl: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?t=1',
                        remark: '备注_' + parseInt(Math.random() * 1000)
                    };

                    items.push(item);
                }

                //有正在编辑的 & 列表 不重置数据
                if(!(_this.tableData && _this.currentItem && _this.currentItem.id)) {
                    console.log('重置数据重置数据重置数据');
                    console.log(_this.tableData);
                    console.log(_this.currentItem);
                    console.log(_this.currentItem.length);
                    console.log('end重置数据重置数据重置数据');
                    _this.$store.dispatch('bannerSetting/setTableData', items);
                }
                console.log(_this.tableData);

                this.tableInit.dataList = _this.tableData;
            },
            ctrlClick() {
                this.$router.push('/frontDeskConfig/bannerSetting/bannerSettingUploadImage');
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    let _this = this;
                    if (!valid) {
                        return false
                    }

                    let _router = this.$router;

                    let postData = this.form;
                    let items = [
                        {
                            pic_url:'http://baidu.com/?111',
                            content_type:'sdfsdfsdfsdf',
                            content:'aaaaaa',
                            needLogin:'1',
                            description:"aaa",
                            sort:'100'
                        },
                        {
                            pic_url:'http://baidu.com/?222',
                            content_type:'sdfsdfsdfsdf',
                            content:'bbbbbbbb',
                            needLogin:'1',
                            description:"bbbbbb",
                            sort:'101'
                        }
                    ];
                    //postData.dataJson = JSON.stringify(items);
                    postData.dataJson = JSON.stringify(this.tableInit.dataList);
                    console.log(postData)

                    this.$store.dispatch('bannerSetting/save', postData
                    ).then(function (r) {
                        if(r.code === 200 ) {
                            _this.$message.success('操作成功');
                            _router.push('/frontDeskConfig/bannerSetting');
                        }else {
                            _this.$message.error(r.data.msg)
                        }
                    }).finally(function () {
                    }).catch(function (error) {
                        console.log(error)
                    })
                });
            },
            editOpt(index, row) {
                row.currentIndex = index; //
                this.$store.dispatch('bannerSetting/setCurrentItem', row);
                this.$router.push('/frontDeskConfig/bannerSetting/bannerSettingUploadImage?id=' + row.id);
            },
            deleteOpt(index, row) {
                let _this = this
                this.$confirm('确定在删除吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                            let postData = {
                                id: row.id
                            }
                            console.log(postData)

                            _this.tableInit.dataList.splice(index, 1);
                            done();

                        } else {
                            done();
                        }
                    }
                }).then(() => {
                }).catch(() => {
                });
            }
        }
    }
</script>
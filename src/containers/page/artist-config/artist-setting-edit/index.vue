<template>
    <div class="edit-page-content m-top-30">
        <edit-block class="has-input-max" title="基本信息">
            <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                <el-form-item label="艺人名称" prop="title">
                    <el-input v-model="form.title" placeholder="请输入名称"></el-input>
                </el-form-item>
                <el-form-item label="艺人id" prop="type">
                    <span>MC93784585</span>
                    <el-radio-group class="m-left-30" v-model="form.resource">
                        <el-radio label="是"></el-radio>
                        <el-radio label="否"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="上传照片" prop="type">
                    <upload-image/>
                </el-form-item>
                <el-form-item label="栏目简介">
                    <el-input :rows="6" placeholder="可输入3000字，示例：《范特西》是周杰伦2001年发行的专辑，共收录10首歌曲。该专辑的制作人由周杰伦担任。" class="min-height-140" type="textarea" v-model="form.desc"></el-input>
                </el-form-item>
            </el-form>
        </edit-block>
        <edit-block class="has-input-max" title="歌手信息">
            <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                <el-form-item label="歌手身份" prop="title">
                    <el-checkbox-group v-model="form.resource">
                        <el-checkbox label="开通"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="音乐风格" prop="title">
                    <el-select v-model="form.type" placeholder="请选择音乐风格">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="歌手信息" prop="title">
                    <el-checkbox-group v-model="form.resource">
                        <el-checkbox label="早年经历"></el-checkbox>
                        <el-checkbox label="代表作品"></el-checkbox>
                        <el-checkbox label="获奖经历"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <div class="m-bottom-22">
                    <el-input :rows="6" placeholder="早年经历" class="min-height-140" type="textarea" v-model="form.desc"></el-input>
                </div>
                <div class="m-bottom-22">
                    <el-input :rows="6" placeholder="代表作品" class="min-height-140" type="textarea" v-model="form.desc"></el-input>
                </div>
                <div class="m-bottom-22">
                    <el-input :rows="6" placeholder="获奖经历" class="min-height-140" type="textarea" v-model="form.desc"></el-input>
                </div>
            </el-form>
        </edit-block>
        <edit-block class="has-input-max-h" title="添加标签">
            <tag-group :options="tagInit"/>
        </edit-block>
        <div class="text-right m-top-30">
            <el-button type="primary" class="width-140">保存</el-button>
            <el-button type="primary" class="width-140">取消</el-button>
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
    export default {
        components: {
            editBlock,
            uploadImage,
            imageCheckBox,
            tableBottomForm,
            tagGroup
        },
        data() {
            return {
                options: [{
                    value: '选项1',
                    label: '选项1'
                }, {
                    value: '选项2',
                    label: '选项2'
                } ],
                tagInit: {
                    tagList: [
                        {
                            title: '标签组一',
                            value: '1',
                            dataList: [
                                {
                                    name: '国语',
                                    value: '1'
                                },
                                {
                                    name: '英语',
                                    value: '2'
                                }
                            ]
                        },
                        {
                            title: '标签组二',
                            value: '1',
                            dataList: [
                                {
                                    name: '黑色',
                                    value: '1'
                                },
                                {
                                    name: '白色',
                                    value: '2'
                                },
                                {
                                    name: '黑色',
                                    value: '3'
                                },
                                {
                                    name: '白色',
                                    value: '4'
                                }
                            ]
                        },
                        {
                            title: '标签组三',
                            value: '1',
                            dataList: [
                                {
                                    name: '黑色',
                                    value: '1'
                                },
                                {
                                    name: '白色',
                                    value: '2'
                                },
                                {
                                    name: '黑色',
                                    value: '3'
                                },
                                {
                                    name: '白色',
                                    value: '4'
                                }
                            ]
                        }
                    ]
                },
                tableInit: {
                    tableCtrl: {
                        ctrlList: [
                            {
                                name: '删除',
                                key: 'delete',
                                type: 'text'
                            }
                        ]
                    },
                    tableHead: [
                        {
                            prop: 'number2',
                            label: '排序'
                        },
                        {
                            prop: 'name',
                            label: '艺人名称',
                        },
                        {
                            prop: 'number',
                            label: '艺人id'
                        }
                    ],
                    dataList: [{
                        number: '10',
                        date: '2016-05-03',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄',
                        open: 'true'
                    }, {
                        date: '2016-05-02',
                        number: '11',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }, {
                        date: '2016-05-04',
                        number: '12',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }, ]
                },
                tableInit2: {
                    tableCtrl: {
                        ctrlList: [
                            {
                                name: '删除',
                                key: 'delete',
                                type: 'text'
                            }
                        ],
                    },
                    tableHead: [
                        {
                            prop: 'id',
                            label: '排序'
                        },
                        {
                            prop: 'number',
                            label: '直播名称'
                        },
                        {
                            prop: 'name',
                            label: '直播id',
                        },
                        {
                            prop: 'number',
                            label: '直播厅'
                        },
                        {
                            prop: 'date',
                            label: '开始时间'
                        },
                        {
                            prop: 'date',
                            label: '状态'
                        }
                    ],
                    dataList: [{
                        number: '10',
                        date: '2016-05-03',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄',
                        open: 'true',
                        state: 1
                    }, {
                        date: '2016-05-02',
                        number: '11',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄',
                        state: 2
                    }, {
                        date: '2016-05-04',
                        number: '12',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄',
                        state: 3
                    }, ]
                },
                form: {

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
                var results = queryString ? this.loadAll().filter((v)=>{
                    return v.value.includes(queryString);
                }) : [];
                // 调用 callback 返回建议列表的数据
                cb&&cb(results);
            },
            loadAll() {
                return [
                    { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
                    { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
                    { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
                    { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
                    { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
                    { "value": "贡茶", "address": "上海市长宁区金钟路633号" },
                    { "value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号" },
                    { "value": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号" },
                    { "value": "十二泷町", "address": "上海市北翟路1444弄81号B幢-107" },
                    { "value": "星移浓缩咖啡", "address": "上海市嘉定区新郁路817号" },
                    { "value": "阿姨奶茶/豪大大", "address": "嘉定区曹安路1611号" }
                ]
            }
        }
    }
</script>
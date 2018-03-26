const url = Config.url;
const music = Config.url.music;
export default {
    specialSetting: {
        namespaced: true,
        state: {
            tableReleased: null,
            tableDraft: null,
        },
        mutations: {
            tableReleased(state,data) {
                state.tableReleased = data;
            },
            tableDraft(state,data) {
                state.tableDraft = data;
            }
        },
        actions: {
            getData({commit}, params) {
                http.axios({
                    method: 'get',
                    url: music.single.get,
                    responseType:'json',
                    params: params
                }).then((rep)=> {
                    console.log(rep);
                    // response.data&&commit('tableReleased',response.data);
                }).catch((rep)=>{
                    console.log(rep);
                });
            },
            getTableDraftData({commit}, params) {
                http.axios({
                    method: 'get',
                    url: url.tableDraft,
                    responseType:'json',
                    data: params
                }).then((response)=> {
                    response.data&&commit('tableDraft',response.data);
                }).finally(()=>{
                    console.log(2222);
                });
            },
            deleteLive({commit}, params){
                return http.axios({
                    method: 'get',
                    url: url.deleteButton,
                    responseType:'json',
                    data: params
                })
            },
            setTopLive({commit},params){
                return http.axios({
                    method: 'get',
                    url: url.setTop,
                    responseType:'json',
                    data: params
                })
            }
        }
    },
    specialSettingEdit: {
        namespaced: true,
        state: {
            copyrightSourceOptions: [
                {
                    value: '0',
                    label: '选项一'
                },
                {
                    value: '1',
                    label: '选项二'
                },
                {
                    value: '2',
                    label: '选项三'
                }
            ],
            specialLangOptions: [
                {
                    value: '0',
                    label: '选项一'
                },
                {
                    value: '1',
                    label: '选项二'
                },
                {
                    value: '2',
                    label: '选项三'
                }
            ],
            musicTypeOptions: [
                {
                    value: '0',
                    label: '选项一'
                },
                {
                    value: '1',
                    label: '选项二'
                },
                {
                    value: '2',
                    label: '选项三'
                }
            ],
            issueDateOptions: [
                {
                    value: '0',
                    label: '选项一'
                },
                {
                    value: '1',
                    label: '选项二'
                },
                {
                    value: '2',
                    label: '选项三'
                }
            ],
            singerData: [
                {
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
                }
            ],
            singleData: [
                {
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
                }
            ],
            tagInit: {
                tagList: [
                    {
                        title: '标签组一',
                        value: '1',
                        tagType: 'checkbox',
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
                        tagType: 'checkbox',
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
                        tagType: 'radio',
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
            searchData: [
                {
                    value: '123',
                    number: '替换',
                    date: '替换2016-05-03',
                    name: '替换类型',
                    address: '替换上海市普陀区金沙江路 1518 弄',
                    open: '替换true'
                }, {
                    value: '456',
                    date: '替换2016-05-02',
                    number: '替换11',
                    name: '替换王小虎',
                    address: '替换上海市普陀区金沙江路 1518 弄'
                }, {
                    value: '789',
                    date: '替换2016-05-04',
                    number: '替换12',
                    name: '替换王小虎',
                    address: '替换上海市普陀区金沙江路 1518 弄'
                }
            ]
        },
        mutations: {
        
        },
        actions: {
        
        }
    },
    singleSetting: {
        namespaced: true,
        state: {
            tableReleased: null,
            tableDraft: null,
        },
        mutations: {
            tableReleased(state,data) {
                state.tableReleased = data;
            },
            tableDraft(state,data) {
                state.tableDraft = data;
            }
        },
        actions: {
            getTableReleasedData({commit}, params) {
                http.axios({
                    method: 'get',
                    url: url.tableReleased,
                    responseType:'json',
                    data: params
                }).then((response)=> {
                    response.data&&commit('tableReleased',response.data);
                }).finally(()=>{
                    console.log(2222);
                });
            },
            getTableDraftData({commit}, params) {
                http.axios({
                    method: 'get',
                    url: url.tableDraft,
                    responseType:'json',
                    data: params
                }).then((response)=> {
                    response.data&&commit('tableDraft',response.data);
                }).finally(()=>{
                    console.log(2222);
                });
            },
            deleteLive({commit}, params){
                return http.axios({
                    method: 'get',
                    url: url.deleteButton,
                    responseType:'json',
                    data: params
                })
            },
            setTopLive({commit},params){
                return http.axios({
                    method: 'get',
                    url: url.setTop,
                    responseType:'json',
                    data: params
                })
            }
        }
    },
    singleSettingEdit: {
        namespaced: true,
        state: {
            musicTypeOptions: [
                {
                    value: '0',
                    label: '选项一'
                },
                {
                    value: '1',
                    label: '选项二'
                },
                {
                    value: '2',
                    label: '选项三'
                }
            ],
            langOptions: [
                {
                    value: '0',
                    label: '选项一'
                },
                {
                    value: '1',
                    label: '选项二'
                },
                {
                    value: '2',
                    label: '选项三'
                }
            ],
            singerData: [
                {
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
                }
            ],
            specialData: [
                {
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
                }
            ],
            lyricData: [
                {
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
                }
            ],
            tagInit: {
                tagList: [
                    {
                        title: '标签组一',
                        value: '1',
                        tagType: 'checkbox',
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
                        tagType: 'checkbox',
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
                        tagType: 'radio',
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
            searchData: [
                {
                    value: '123',
                    number: '替换',
                    date: '替换2016-05-03',
                    name: '替换类型',
                    address: '替换上海市普陀区金沙江路 1518 弄',
                    open: '替换true'
                }, {
                    value: '456',
                    date: '替换2016-05-02',
                    number: '替换11',
                    name: '替换王小虎',
                    address: '替换上海市普陀区金沙江路 1518 弄'
                }, {
                    value: '789',
                    date: '替换2016-05-04',
                    number: '替换12',
                    name: '替换王小虎',
                    address: '替换上海市普陀区金沙江路 1518 弄'
                }
            ]
        },
        mutations: {
        
        },
        actions: {
        
        }
    },
    mvUploadSetting: {
        namespaced: true,
        state: {
            tableReleased: null,
            tableDraft: null,
        },
        mutations: {
            tableReleased(state,data) {
                state.tableReleased = data;
            },
            tableDraft(state,data) {
                state.tableDraft = data;
            }
        },
        actions: {
            getTableReleasedData({commit}, params) {
                http.axios({
                    method: 'get',
                    url: url.tableReleased,
                    responseType:'json',
                    data: params
                }).then((response)=> {
                    response.data&&commit('tableReleased',response.data);
                }).finally(()=>{
                    console.log(2222);
                });
            },
            getTableDraftData({commit}, params) {
                http.axios({
                    method: 'get',
                    url: url.tableDraft,
                    responseType:'json',
                    data: params
                }).then((response)=> {
                    response.data&&commit('tableDraft',response.data);
                }).finally(()=>{
                    console.log(2222);
                });
            },
            deleteLive({commit}, params){
                return http.axios({
                    method: 'get',
                    url: url.deleteButton,
                    responseType:'json',
                    data: params
                })
            },
            setTopLive({commit},params){
                return http.axios({
                    method: 'get',
                    url: url.setTop,
                    responseType:'json',
                    data: params
                })
            }
        }
    },
    mvUploadSettingEdit: {
        namespaced: true,
        state: {
            contentTypeOptions: [
                {
                    value: '0',
                    label: '选项一'
                },
                {
                    value: '1',
                    label: '选项二'
                },
                {
                    value: '2',
                    label: '选项三'
                }
            ],
            regionOptions: [
                {
                    value: '0',
                    label: '选项一'
                },
                {
                    value: '1',
                    label: '选项二'
                },
                {
                    value: '2',
                    label: '选项三'
                }
            ],
            singleData: [
                {
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
                }
            ],
            artistData: [
                {
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
                }
            ],
            tagInit: {
                tagList: [
                    {
                        title: '标签组一',
                        value: '1',
                        tagType: 'checkbox',
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
                        tagType: 'checkbox',
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
                        tagType: 'radio',
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
            searchData: [
                {
                    value: '123',
                    number: '替换',
                    date: '替换2016-05-03',
                    name: '替换类型',
                    address: '替换上海市普陀区金沙江路 1518 弄',
                    open: '替换true'
                }, {
                    value: '456',
                    date: '替换2016-05-02',
                    number: '替换11',
                    name: '替换王小虎',
                    address: '替换上海市普陀区金沙江路 1518 弄'
                }, {
                    value: '789',
                    date: '替换2016-05-04',
                    number: '替换12',
                    name: '替换王小虎',
                    address: '替换上海市普陀区金沙江路 1518 弄'
                }
            ]
        },
        mutations: {
        
        },
        actions: {
        
        }
    },
}
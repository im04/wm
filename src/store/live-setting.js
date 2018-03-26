const url = Config.url;
const live = Config.url.live;
export default {
    liveSettingIndex: {
        namespaced: true,
        state: {
            tableData: null,
        },
        mutations: {
            tableData(state,data) {
                state.tableData = data;
            }
        },
        actions: {
            getTableData({commit}, params) {
                http.axios({
                    method: 'get',
                    url: url.tableReleased,
                    responseType:'json',
                    params: params
                }).then((response)=> {
                    response.data&&commit('tableData',response.data);
                }).finally(()=>{
                    console.log(2222);
                });
            },
            getTableReleasedData({commit}, params) {
                console.log(params);
                // http.axios({
                //     method: 'get',
                //     url: url.tableReleased,
                //     responseType:'json',
                //     params: params
                // }).then((response)=> {
                //     response.data&&commit('tableData',response.data);
                // }).finally(()=>{
                //     console.log(2222);
                // });
            },
            getTableDraftData({commit}, params) {
                console.log(params);
                // http.axios({
                //     method: 'get',
                //     url: url.tableReleased,
                //     responseType:'json',
                //     params: params
                // }).then((response)=> {
                //     response.data&&commit('tableData',response.data);
                // }).finally(()=>{
                //     console.log(2222);
                // });
            },
            deleteLive({commit}, params){
                // return http.axios({
                //     method: 'get',
                //     url: url.deleteButton,
                //     responseType:'json',
                //     data: params
                // })
            },
            setAsPrevue({commit},params){
                // return http.axios({
                //     method: 'get',
                //     url: url.setTop,
                //     responseType:'json',
                //     data: params
                // })
            }
        }
    },
    liveSettingIndexEdit: {
        namespaced: true,
        state: {
            liveTypeOptions: [
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
            liveRoomOptions: [
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
                },
                {
                    value: '3',
                    label: '选项四'
                }
            ],
            usingCameraOptions: [
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
                },
                {
                    value: '3',
                    label: '选项四'
                }
            ],
            programaData: [
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
            artistData: [
                {
                    index: '10',
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                    open: 'true'
                }, {
                    date: '2016-05-02',
                    index: '11',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    index: '12',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }
            ],
            manageData: [
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
            playbackData: [
                {
                    number: '10',
                    date: '2016-05-03',
                    name: '类型',
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
    liveProgramaSetting: {
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
    liveProgramaSettingEdit: {
        namespaced: true,
        state: {
            programaTypeOptions: [
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
            programaRoomOptions: [
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
                },
                {
                    value: '3',
                    label: '选项四'
                }
            ],
            usingCameraOptions: [
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
                },
                {
                    value: '3',
                    label: '选项四'
                }
            ],
            programaData: [
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
            artistData: [
                {
                    index: '10',
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                    open: 'true'
                }, {
                    date: '2016-05-02',
                    index: '11',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    index: '12',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }
            ],
            liveData: [
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
            playbackData: [
                {
                    number: '10',
                    date: '2016-05-03',
                    name: '类型',
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
    liveSchedule: {
        namespaced: true,
        state: {
            liveTypeOptions: [
                {
                    value: '0',
                    label: '分类一'
                },
                {
                    value: '1',
                    label: '分类二'
                },
                {
                    value: '2',
                    label: '分类三'
                }
            ],
            liveStatusOptions: [
                {
                    value: '0',
                    label: '状态一'
                },
                {
                    value: '1',
                    label: '状态二'
                },
                {
                    value: '2',
                    label: '状态三'
                }
            ],
            roomList: [
                {
                    name: '一号直播间',
                    number: 1000
                },
                {
                    name: '2号直播间',
                    number: 1000
                },
                {
                    name: '3号直播间',
                    number: 1000
                },{
                    name: '4号直播间',
                    number: 1000
                },
                {
                    name: '5号直播间',
                    number: 1000
                },{
                    name: '6号直播间',
                    number: 1000
                },{
                    name: '7号直播间',
                    number: 1000
                }
            ],
            tableData: [
                {
                    usingCamera:'0',
                    statusCode: '1',
                    liveId: '123',
                    status: '进行中',
                    msg1: '周杰伦广州体育馆演唱会',
                    msg2: '摩羯座系列',
                    time1: '14:00—16:30',
                    time2: '2小时25分钟',
                    time3: '01:12:46',
                    date: '2016-05-03',
                    liveRoom: '一号厅',
                    liveNumber: '3号VR机',
                    startTime: '1510023246822',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                },
                {
                    usingCamera:'1',
                    statusCode: '2',
                    liveId: '123',
                    status: '已结束',
                    msg1: '周杰伦广州体育馆演唱会',
                    msg2: '摩羯座系列',
                    time1: '14:00—16:30',
                    time2: '1小时25分钟',
                    time3: '01:12:46',
                    date: '2016-05-02',
                    liveRoom: '二号厅',
                    liveNumber: '3号VR机',
                    startTime: '1510022567040',
                    name: '王小虎1',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                },
                {
                    usingCamera:'2',
                    statusCode: '0',
                    liveId: '123',
                    status: '未开始',
                    msg1: '周杰伦广州体育馆演唱会',
                    msg2: '摩羯座系列',
                    time1: '14:00—16:30',
                    time2: '3小时25分钟',
                    time3: '01:12:46',
                    date: '2016-05-04',
                    liveRoom: '一号厅',
                    liveNumber: '4号VR机',
                    startTime: '1510022138359',
                    name: '王小虎2',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                },
                {
                    usingCamera:'3',
                    statusCode: '1',
                    liveId: '123',
                    status: '进行中',
                    msg1: '周杰伦广州体育馆演唱会',
                    msg2: '摩羯座系列',
                    time1: '14:00—16:30',
                    time2: '4小时25分钟',
                    time3: '01:12:46',
                    date: '2016-05-01',
                    startTime: '1510019522622',
                    name: '王小虎3',
                    province: '上海',
                    city: '普陀区',
                    liveRoom: '一号厅',
                    liveNumber: '6号VR机',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }
            ],
            jw: [
                {
                    value: '0',
                    label: 'vr'
                },
                {
                    value: '1',
                    label: '4k'
                },
                {
                    value: '2',
                    label: 'vr2'
                },
                {
                    value: '3',
                    label: '4k2'
                }
            ]
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
}
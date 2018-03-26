const url = Config.url;
const video = url.video;
import { Message } from 'element-ui';
export default {
    programSetting: {
        namespaced: true,
        state: {
            tableData: null
        },
        mutations: {
            getData(state,params){
                state.tableData = params.result;
            }
        },
        actions: {
            updateOnlineStatus({commit},params) {//更新上下架状态
                if (!params.ids||!params.ids.length) {
                    Message({
                        message: '请先从表格内勾选节目！',
                        type: 'warning'
                    });
                    return false;
                } else {
                    return http.axios({
                        method: 'post',
                        url: video.program.updateOnlineStatus,
                        responseType:'json',
                        params: {
                            onlineStatus: params.onlineStatus
                        },
                        data: {
                            ids: params.ids
                        }
                    });
                }
            },
            updateRemconnendStatus({commit},params) {//更新节目推荐状态
                return http.axios({
                    method: 'post',
                    url: video.program.updateRemconnendStatus,
                    responseType:'json',
                    params: {
                        remconnendSta: params.remconnendSta
                    },
                    data: {
                        ids: params.ids
                    }
                });
            },
            getData({commit},params) {//获取视频列表
                http.axios({
                    method: 'get',
                    url: video.program.findBy,
                    responseType:'json',
                    params: params
                }).then((data)=> {
                    console.log(data);
                    if (data.code == 200&&data.data) {
                        commit('getData',data.data)
                    }
                }).catch((rep)=>{
                    console.log(rep);
                });
            },
            delete({commit},params){
                return http.axios({
                    method: 'post',
                    url: video.program.delete,
                    responseType:'json',
                    data: params
                });
            }
        }
    },
    programSettingEdit: {
        namespaced: true,
        state: {
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
            ]
        },
        mutations: {
        
        },
        actions: {
            saveProgram({commit}, params) {
                return http.axios({
                    method: 'post',
                    url: video.program.save,
                    responseType:'json',
                    data: params
                })
            }
        }
    },
    uploadVideo: {
        namespaced: true,
        state: {
            tableData: null
        },
        mutations: {
            getData(state,params){
                state.tableData = params.result;
            }
        },
        actions: {
            updateOnlineStatus({commit},params) {//更新上下架状态
                if (!params.ids||!params.ids.length) {
                    Message({
                        message: '请先从表格内勾选视频！',
                        type: 'warning'
                    });
                    return false;
                } else {
                    return http.axios({
                        method: 'post',
                        url: video.video.updateOnlineStatus,
                        responseType:'json',
                        params: {
                            onlineStatus: params.onlineStatus
                        },
                        data: params.ids
                    });
                }
            },
            updateRemconnendStatus({commit},params) {//更新节目推荐状态
                return http.axios({
                    method: 'post',
                    url: video.video.updateRemconnendStatus,
                    responseType:'json',
                    params: {
                        remconnendStatus: params.remconnendStatus
                    },
                    data: params.ids
                });
            },
            getData({commit},params) {//获取视频列表
                http.axios({
                    method: 'get',
                    url: video.video.findBy,
                    responseType:'text',
                    params: params
                }).then((data)=> {
                    if (data.code == 200&&data.data) {
                        commit('getData',data.data)
                    }
                }).catch((rep)=>{
                    console.log(rep);
                });
            },
            delete({commit},params){
                return http.axios({
                    method: 'post',
                    url: video.video.delete,
                    responseType:'json',
                    data: params
                });
            }
        }
    },
    uploadVideoEdit: {
        namespaced: true,
        state: {
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
            videoTypeOptions: [
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
            ]
        },
        mutations: {
        
        },
        actions: {
            saveProgram({commit}, params) {
                console.log(params);
                return http.axios({
                    method: 'post',
                    url: video.video.save,
                    responseType:'json',
                    data: params
                })
            },
            getVideoDetail({commit}, params) {
                return http.axios({
                    method: 'get',
                    url: video.video.get,
                    responseType: 'json',
                    params: params
                })
            }
        }
    }
}
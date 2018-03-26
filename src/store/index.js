import advertisingSetting from './advertising-setting.js';
import artistConfig from './artist-config.js';
import backgroundConfig from './background-config.js';
import frontDeskConfig from './front-desk-config.js';
import liveSetting from './live-setting.js';
import musicSetting from './music-setting.js';
import userConfig from './user-config.js';
import videoSetting from './video-setting.js';
import { Message } from 'element-ui';

http.axios.defaults.headers.common['X-Access-Token'] = '123456';
http.axios.interceptors.request.use(
    config => {
        store.loading.state.count++;
        return config;
    },
    err => {
        store.loading.state.count++;
        return Promise.reject(err);
    }
);

http.axios.interceptors.response.use(
    response => {
        store.loading.state.count--;
        if (response.status == 200) {
            return response.data;
        } else {
            return response;
        }
    },
    error => {
        store.loading.state.count--;
        if (error.response) {
            switch (error.response.status) {
                case 501:
                    // Message({message: '请求被禁止',type: 'error'});
                    console.log({message: '请求被禁止',type: 'error'});
                    break;
                case 500:
                    // Message({message: '程序异常',type: 'error'});
                    console.log({message: '程序异常',type: 'error'});
                    break;
                case 404:
                    // Message({message: 'url无效或资源访问受限',type: 'error'});
                    console.log({message: 'url无效或资源访问受限',type: 'error'});
                    break;
                case 403:
                    // Message({message: '服务器拒绝处理请求',type: 'error'});
                    console.log({message: '服务器拒绝处理请求',type: 'error'});
                    break;
                case 400:
                    // Message({message: '参数错误',type: 'error'});
                    console.log({message: '参数错误',type: 'error'});
                    break;
            }
        }
        return Promise.reject(error);   // 返回接口返回的错误信息
    }
);
const url = Config.url;
const menu = url.config.menu;
const video = url.video;
const user = url.user;
const store = {
    loading: {
        namespaced: true,
        state: {
            count: 0
        }
    },
    login: {
        namespaced: true,
        state: {
            count: 0,
            list: []
        },
        mutations: {
            test (state,test) {
                console.log('mutations');
                state.count++;
                state.list.push(test)
            },
        },
        actions: {
            test ({commit}, text) {
                console.log('actions');
                setTimeout(function(){
                    commit('test',text);
                },1000)
            },
            getMenu({commit}, params) {
                http.axios({
                    method: 'get',
                    url: menu.findBy,
                    responseType:'json',
                    params: params
                }).then((response)=> {
                    console.log(response)
                })
            }
        }
    },
    commond: {
        namespaced: true,
        state: {
        
        },
        mutations: {
            getData(state,params){
            
            }
        },
        actions: {
            getVideoList({commit},params) {//获取视频列表
                return http.axios({
                    method: 'get',
                    url: video.video.findBy,
                    responseType: 'json',
                    params: params
                });
            },
            getProgramList({commit},params) {//获取节目列表
                return http.axios({
                    method: 'get',
                    url: video.program.findBy,
                    responseType:'json',
                    params: params
                });
            },
            getArtistList({commit},params) {//获取艺人列表
                return http.axios({
                    method: 'post',
                    url: user.artist.findBy,
                    responseType:'json',
                    data: params
                });
            }
        }
    },
    ...advertisingSetting,
    ...artistConfig,
    ...backgroundConfig,
    ...frontDeskConfig,
    ...liveSetting,
    ...musicSetting,
    ...userConfig,
    ...videoSetting,
};
export default {
    modules: store
}

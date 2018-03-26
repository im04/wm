/**
 * 系统设置
 */
const url = Config.url;
export default {
    systemSetting: {
        namespaced: true,
        state: {},
        mutations: {},
        actions: {
            //banner
            getBannerLocationList({commit}, params) {
                let url = '/api/userConfig/cmmOpt';
                return http.axios({
                    method: 'post',
                    url: url,
                    data: params
                })
            },
            deleteBannerLocation({commit}, params) {
                let url = '/api/userConfig/cmmOpt';
                return http.axios({
                    method: 'post',
                    url: url,
                    data: params
                })
            },
            getContentByCate({commit}, params) {
                return http.axios({
                    method: 'post',
                    url: url.cmmOpt,
                    data: params
                })
            },
            editBannerContent({commit}, params) {
                return http.axios({
                    method: 'post',
                    url: url.cmmOpt,
                    data: params
                })
            },

            //活动页
            getActivityList({commit}, params) {
                return http.axios({
                    method: 'post',
                    url: url.sysGetActivityList,
                    data: params
                })
            },
            getActivity({commit}, params) {
                return http.axios({
                    method: 'post',
                    url: url.sysGetActivity,
                    data: params
                })
            },
            deleteActivity({commit}, params) {
                return http.axios({
                    method: 'post',
                    url: url.sysDeleteActivity,
                    data: params
                })
            },
            editActivity({commit}, params) {
                return http.axios({
                    method: 'post',
                    url: url.sysEditActivity,
                    data: params
                })
            },
            editActivitySort({commit}, params) {
                return http.axios({
                    method: 'post',
                    url: url.sysEditActivitySort,
                    data: params
                })
            }

        }
    },
    memberSetMeaSetting: {
        namespaced: true,
        state: {},
        mutations: {},
        actions: {
            save({commit}, params) {
                return http.axios({
                    method: 'post',
                    url: url.user.membersPackage.save,
                    data: params
                })
            },
            delete({commit}, params) {
                return http.axios({
                    method: 'post',
                    url: url.user.membersPackage.delete,
                    params: params
                })
            },
            findBy({commit}, params) {
                return http.axios({
                    method: 'post',
                    url: url.user.membersPackage.findBy,
                    data: params
                })
            },
            detail({commit}, params) {
                return http.axios({
                    method: 'get',
                    url: url.user.membersPackage.detail,
                    params: params
                })
            }

        }
    },
    paySetMeaSetting: {
        namespaced: true,
        state: {},
        mutations: {},
        actions: {
            save({commit}, params) {
                return http.axios({
                    method: 'post',
                    url: url.pay.pay.save,
                    params: params
                })
            },
            findBy({commit}, params) {
                return http.axios({
                    method: 'get',
                    url: url.pay.pay.findBy,
                    params: params
                })
            },
            get({commit}, params) {
                return http.axios({
                    method: 'get',
                    url: url.pay.pay.get,
                    params: params
                })
            },
            delete({commit}, params) {
                return http.axios({
                    method: 'post',
                    url: url.pay.pay.delete,
                    params: params
                })
            }

        }
    },
    bannerSetting: {
        namespaced: true,
        state: {
            tableData: [],
            currentId: '',
            currentItem: {}
        },
        mutations: {
            setTableData(state, data) {
                state.tableData = data;
            },
            setCurrentId(state, id) {
                state.currentId = id;
            },
            setCurrentItem(state, item) {
                state.currentItem = item;
            }
        },
        actions: {
            setTableData({commit}, data) {
                commit('setTableData', data);
            },
            setCurrentId({commit}, id) {
                commit('setCurrentId', id);
            },
            setCurrentItem({commit}, item) {
                commit('setCurrentItem', item);
            },
            save({commit}, params) {
                return http.axios({
                    method: 'post',
                    url: url.config.banner.save,
                    data: params
                })
            },
            findBy({commit}, params) {
                return http.axios({
                    method: 'get',
                    url: url.config.banner.findBy,
                    params: params
                })
            },
            get({commit}, params) {
                return http.axios({
                    method: 'get',
                    url: url.config.banner.detail,
                    params: params
                })
            },
            delete({commit}, params) {
                return http.axios({
                    method: 'post',
                    url: url.config.banner.delete,
                    params: params
                })
            }

        }
    }
}
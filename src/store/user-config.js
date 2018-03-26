/**
 * 数据模块
 */
const url = Config.url;
export default {
    userList: {
        namespaced: true,
        state: {
        },
        mutations: {

        },
        actions: {
            getUserData({commit}, params) {
                let url = '/api/userConfig/cmmOpt';
                return http.axios({
                    method: 'post',
                    url: url,
                    data: params
                })
            },
            getInnerUserData({commit}, params) {
                let url = '/api/userConfig/cmmOpt';
                return http.axios({
                    method: 'post',
                    url: url,
                    data: params
                })
            },
            unlockUser({commit}, params) {
                let url = '/api/userConfig/cmmOpt';
                return http.axios({
                    method: 'post',
                    url: url,
                    data: params
                })
            },
            lockUser({commit}, params) {
                let url = '/api/userConfig/cmmOpt';
                return http.axios({
                    method: 'post',
                    url: url,
                    data: params
                })
            },
            editUser({commit}, params) {
                return http.axios({
                    method: 'post',
                    url: url.dataModEditUser,
                    data: params
                })
            },
            rechangeOpt({commit}, params) {
                let url = '/api/userConfig/cmmOpt';
                return http.axios({
                    method: 'post',
                    url: url,
                    data: params
                })
            },
            deleteOpt({commit}, params) {
                let url = '/api/userConfig/cmmOpt';
                return http.axios({
                    method: 'post',
                    url: url,
                    data: params
                })
            },
            getOrderList({commit}, params) {
                let url = '/api/userConfig/cmmOpt';
                return http.axios({
                    method: 'post',
                    url: url,
                    data: params
                })
            },
            getMemberRechargeList({commit}, params) {
                let url = '/api/userConfig/cmmOpt';
                return http.axios({
                    method: 'post',
                    url: url,
                    data: params
                })
            },
            getCoinExchangeList({commit}, params) {
                let url = '/api/userConfig/cmmOpt';
                return http.axios({
                    method: 'post',
                    url: url,
                    data: params
                })
            }

        }
    }
}
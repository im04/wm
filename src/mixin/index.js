const filter = {
    onlineStatus: {
        '1': '上架',
        '2': '下架'
    },
    bitrateStatus: {
        '1': '正在转码',
        '2': '转码成功',
        '3': '转码失败'
    },
    isRecommend: {
        '1': '不推荐',
        '0': '推荐'
    }
}
export default {
    data(){
        return {

        }
    },
    methods: {
        timeFilter(row) {
            return utils.initTime(new Date(row.createTime));
        },
        videoStatusFilter(row) {
            return filter.onlineStatus[row.onlineStatus]+'-'+filter.bitrateStatus[row.bitrateStatus];
        },
        recommendFilter(row) {
            return filter.isRecommend[row.isRecommend];
        }
    }
};
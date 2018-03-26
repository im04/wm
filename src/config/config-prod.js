const host = '/api';

const music_domain = 'http://music.vr-mu.com/group-b';
const video_domain = 'http://video.vr-mu.com/group-b';
const user_domain = 'http://user.vr-mu.com/group-b';
const live_domain = 'http://live.vr-mu.com/group-b';
const payment_domain = 'http://payment.vr-mu.com/group-b';
const configs_domain = 'http://configs.vr-mu.com/group-b';

module.exports = {
    url: {
        /*
        *   音乐模块
        */
        music: {
            single: {//单曲
                create: music_domain + '/music/basic/create',// 创建单曲
                modify: music_domain + '/music/basic/modify',// 修改单曲信息
                get: music_domain + '/music/basic/get',// 获取单曲信息
                batchDelete: music_domain + '/music/basic/batch-delete',// 批量删除单曲
                batchShelve: music_domain + '/music/basic/batch-shelve',// 批量删除上架
                batchUnShelve: music_domain + '/music/basic/batch-un-shelve',// 批量删除下架
                batchRecommend: music_domain + '/music/basic/batch-recommend',// 批量删除设置为推荐
                batchNotRecommend: music_domain + '/music/basic/batch-not-recommend',// 批量删除设置为不推荐
                uploadLyric: music_domain + '/music/basic/upload-lyric',// 上传歌词
            },
            special: {//专辑
                save: music_domain + '/music/album/basic/save',//保存/新建专辑
                get: music_domain + '/music/album/basic/get',//获取专辑信息
                batchDelete: music_domain + '/music/album/basic/batch-delete',//批量删除专辑
                batchShelve: music_domain + '/music/album/basic/batch-shelve',//批量上架专辑
                batchUnShelve: music_domain + '/music/album/basic/batch-un-shelve',//批量下架专辑
                batchNotRecommend: music_domain + '/music/album/basic/batch-not-recommend',//批量设置为不推荐
                batchRecommend: music_domain + '/music/album/basic/batch-recommend'//批量设置为推荐
            },
            mv:{//MV
            
            },
            singer:{//歌手
            
            },
            musicComment:{//评论
            
            },
        },
        /*
        *   视频模块
        */
        video: {
            program: {//节目
                findBy: video_domain + '/video/program/basic/find-by',//节目列表
                save: video_domain + '/video/program/basic/save',//添加/修改节目
                get: video_domain + '/video/program/basic/get',//获取节目详情
                delete: video_domain + '/video/program/basic/delete',//删除节目
                updateOnlineStatus: video_domain + '/video/program/basic/update-online-status',//更新节目上架状态
                updateRemconnendStatus: video_domain + '/video/program/basic/update-remconnend-status'//更新节目推荐状态
            },
            video: {//视频
                findBy: video_domain + '/video/basic/find-by',//节目列表
                findByTitle: video_domain + '/video/basic/find-by-title',//根据视频名称关键字搜索视频列表
                save: video_domain + '/video/basic/save',//添加/修改节目
                get: video_domain + '/video/basic/get',//获取视频详情
                delete: video_domain + '/video/basic/delete',//删除节目
                updateOnlineStatus: video_domain + '/video/basic/update-online-status',//更新节目上架状态
                updateRemconnendStatus: video_domain + '/video/basic/update-remconnend-status'//更新节目推荐状态
            },
        },
        /*
        *    直播模块
        */
        live: {
            live: {//直播
                setPushUrl: live_domain + '/live/kscloud/basic/set-push-url',//直播推流地址复制
                startLive: live_domain + '/live/record/basic/start-live',//直播开播
                endLive: live_domain + '/live/record/basic/end-live',//直播结束
            },
            present: {//礼物
                findby: live_domain + '/live/gift/basic/findby',//礼物列表
                getById: live_domain + '/live/gift/basic/get-by-id',//礼物详情
                save: live_domain + '/live/gift/basic/save',//添加/修改礼物
                delete: live_domain + '/live/gift/basic/delete',//删除礼物
            },
        },
        /*
        *   用户模块
        */
        user: {
            user: {//用户
                save: user_domain + '/user/basic/save',//添加/编辑用户
                delete: user_domain + '/user/basic/delete',//删除用户
                detail: user_domain + '/user/basic/detail',//用户详情
                findBy: user_domain + '/user/basic/findBy'//用户列表
            },
            artist: {//艺人
                save: user_domain + '/user/artist/basic/save',//添加/编辑艺人
                delete: user_domain + '/user/artist/basic/delete',//删除艺人
                detail: user_domain + '/user/artist/basic/detail',//艺人详情
                findBy: user_domain + '/user/artist/basic/find-by'//艺人列表
            },
            MembersPackage: {//会员套餐
                save: user_domain + '/user/combo/basic/save',//添加/编辑套餐
                delete: user_domain + '/user/combo/basic/delete',//删除套餐
                detail: user_domain + '/user/combo/basic/detail',//套餐详情
                findBy: user_domain + '/user/combo/basic/find-by'//套餐列表
            },
            signInAward: {//签到额外奖励
                save: user_domain + '/user/sign/basic/save',//添加/编辑签到奖励
                delete: user_domain + '/user/sign/basic/delete',//删除签到奖励
                detail: user_domain + '/user/sign/basic/detail',//签到奖励详情
                findBy: user_domain + '/user/sign/basic/find-by'//签到奖励列表
            },
            experienceAward: {//经验奖励
                save: user_domain + '/user/experience/basic/save',//添加/编辑经验奖励
                delete: user_domain + '/user/experience/basic/delete',//删除经验奖励
                detail: user_domain + '/user/experience/basic/detail',//经验奖励详情
                findBy: user_domain + '/user/experience/basic/find-by'//经验奖励列表
            },
            levelOfMembership: {//会员等级
                save: user_domain + '/user/level/basic/save',//添加/编辑会员等级
                delete: user_domain + '/user/level/basic/delete',//删除会员等级
                detail: user_domain + '/user/level/basic/detail',//会员等级详情
                findBy: user_domain + '/user/level/basic/find-by'//会员等级列表
            },
        },
        /*
        *   支付模块
        */
        pay: {
            pay: {//哇币套餐
                findBy: payment_domain + '/payment/coin/combo/basic/findBy',//哇币套餐列表
                get: payment_domain + '/payment/coin/combo/basic/get',//哇币套餐详情
                save: payment_domain + '/payment/coin/combo/basic/save'//添加/编辑哇币套餐
            },
        },
        /*
        *   配置模块
        */
        config: {
            region: {//地区
                save: configs_domain + '/user/region/basic/save',//添加/修改地区
                delete: configs_domain + '/user/region/basic/delete',//删除地区
                detail: configs_domain + '/user/region/basic/detail',//地区详情
                findBy: configs_domain + '/user/region/basic/find-by'//地区列表
            },
            theme: {//icon
                save: configs_domain + '/user/theme/basic/save',//添加/修改icon
                delete: configs_domain + '/user/theme/basic/delete',//删除icon
                detail: configs_domain + '/user/theme/basic/detail',//icon详情
                findBy: configs_domain + '/user/theme/basic/find-by'//icon列表
            },
            activity: {//活动
                save: configs_domain + '/user/activity/basic/save',//添加/修改活动
                delete: configs_domain + '/user/activity/basic/delete',//删除活动
                detail: configs_domain + '/user/activity/basic/detail',//活动详情
                findBy: configs_domain + '/user/activity/basic/find-by'//活动列表
            },
            banner: {//Banner
                save: configs_domain + '/user/level/basic/save',//添加/修改Banner
                delete: configs_domain + '/user/level/basic/delete',//删除Banner
                detail: configs_domain + '/user/level/basic/detail',//Banne详情
                findBy: configs_domain + '/user/level/basic/find-by'//Banne列表
            },
            admin: {//管理员
                save: configs_domain + '/user/level/basic/save',//添加/修改管理员信息
                delete: configs_domain + '/user/level/basic/delete',//删除管理员信息
                detail: configs_domain + '/user/level/basic/detail',//查看管理员详情
                findBy: configs_domain + '/user/level/basic/find-by'//查询管理员列表
            },
            department: {//部门
                save: configs_domain + '/user/level/basic/save',//添加/修改部门信息
                delete: configs_domain + '/user/level/basic/delete',//删除部门信息
                detail: configs_domain + '/user/level/basic/detail',//查看部门详情
                findBy: configs_domain + '/user/level/basic/find-by'//查询部门列表
            },
            resourse: {//权限
                save: configs_domain + '/user/level/basic/save',//添加/修改权限信息
                delete: configs_domain + '/user/level/basic/delete',//删除权限信息
                detail: configs_domain + '/user/level/basic/detail',//查看权限详情
                findBy: configs_domain + '/user/level/basic/find-by'//查询权限列表
            },
            menu: {//菜单
                save: configs_domain + '/user/level/basic/save',//添加/修改菜单信息
                delete: configs_domain + '/user/level/basic/delete',//删除菜单信息
                detail: configs_domain + '/user/level/basic/detail',//查看菜单详情
                findBy: configs_domain + '/user/level/basic/find-by'//查询菜单列表
            }
        },
        
        
        
        
        tableReleased: host + '/liveSetting/tableReleased',
        deleteButton: host + '/liveSetting/deleteButton',
        setTop: host + '/liveSetting/setTop',
        //系统设置
        //  ->banner
        sysGetBannerLocationList: host + '/userConfig/cmmOpt',
        sysDeleteBannerLocation: host + '/userConfig/cmmOpt',
        
        //  ->活动页
        sysGetActivityList: host + '/userConfig/cmmOpt',
        sysGetActivity: host + '/userConfig/cmmOpt',
        sysDeleteActivity: host + '/userConfig/cmmOpt',
        sysEditActivity: host + '/userConfig/cmmOpt',
        sysEditActivitySort: host + '/userConfig/cmmOpt',
        
        //数据模块
        dataModGetUserData: host + '/userConfig/cmmOpt',
        dataModGetInnerUserData: host + '/userConfig/cmmOpt',
        dataModUnlockUser: host + '/userConfig/cmmOpt',
        dataModLockUser: host + '/userConfig/cmmOpt',
        dataModEditUser: host + '/userConfig/cmmOpt?a=1',
        dataModRechangeOpt: host + '/userConfig/cmmOpt',
        dataModGetOrderList: host + '/userConfig/cmmOpt',
        dataModGetMemberRechargeList: host + '/userConfig/cmmOpt',
        dataModGetCoinExchangeList: host + '/userConfig/cmmOpt',
        
        // with test
        cmmOpt: host + '/userConfig/cmmOpt'
    }
};
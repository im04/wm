export default [
    {
        name: '直播管理',
        path: '/liveSetting',
        children: [
            {
                name: '直播场次',
                path: 'liveSettingIndex'
            },
            {
                name: '直播栏目管理',
                path: 'liveProgramaSetting'
            },
            {
                name: '直播日程表',
                path: 'liveSchedule',
            },
            // {
            //     name: '预告片上传',
            //     path: 'uploadPrevue',
            // },
            // {
            //     name: '回放上传',
            //     path: 'uploadPlaybackData',
            // }
        ]
    },
    {
        name: '视频管理',
        path: '/videoSetting',
        children: [
            {
                name: '节目管理',
                path: 'programSetting',
            },
            {
                name: '视频管理',
                path: 'uploadVideo',
            }
        ]
    },
    {
        name: '音乐管理',
        path: '/musicSetting',
        redirect: '/musicSetting/specialSetting',
        children: [
            {
                name: '专辑管理',
                path: 'specialSetting',
            },
            {
                name: '单曲管理',
                path: 'singleSetting',
            },
            {
                name: 'mv上传管理',
                path: 'mvUploadSetting',
            }
        ]
    },
    {
        name: '艺人管理',
        path: '/artistConfig',
        children: [
            {
                name: '艺人管理',
                path: 'artistSetting',
            }
        ]
    },
    {
        name: '后台基础配置',
        path: '/backgroundConfig',
        redirect: '/backgroundConfig/liveRoomConfig',
        children: [
            {
                name: '直播厅配置',
                path: 'liveRoomConfig',
            },
            {
                name: '分类管理',
                path: 'classifySetting',
            },
            {
                name: '标签组管理',
                path: 'tagGroupSetting',
            },
            {
                name: '部门管理',
                path: 'departmentSetting',
            },
            {
                name: '员工管理',
                path: 'employeeSetting',
            },
            // {
            //     name: '内部账号管理',
            //     path: 'innerAccountSetting',
            //     children: [
            //
            //     ]
            // }
        ]
    },
    {
        name: '前台基础配置',
        path: '/frontDeskConfig',
        children: [
            {
                name: 'banner管理',
                path: 'bannerSetting',
            },
            {
                name: '活动页管理',
                path: 'activityImage',
            },
            {
                name: '首页推荐位管理',
                path: 'homeRecommend',
            },
            {
                name: '专题管理',
                path: 'special',
            },
            {
                name: '礼物设置',
                path: 'presentSetting',
            },
            {
                name: '妙银套餐管理',
                path: 'paySetMeaSetting',
            },
            {
                name: '会员套餐管理',
                path: 'memberSetMeaSetting',
            },
            {
                name: '热门搜索关键词管理',
                path: 'keywordSetting',
            },
            {
                name: '屏蔽词汇管理',
                path: 'vocabularyShieldSetting',
            },
            {
                name: '内容push',
                path: 'contentPush',
            }
        ]
    },
    {
        name: '数据模块',
        path: '/userConfig',
        children: [
            {
                name: '用户信息',
                path: 'userList',
            },
            {
                name: '订单系统',
                path: 'orderList',
            }
        ]
    },
    {
        name: '设置',
        path: '/userConfig',
    },
    {
        name: '反馈',
        path: '/userConfig',
    }
]
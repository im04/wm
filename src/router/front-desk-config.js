const root = () => import(/* webpackChunkName: "home" */  'containers/home');
const container = () => import(/* webpackChunkName: "container" */  'containers/container');
export default {
    name: '前台基础配置',
    path: '/frontDeskConfig',
    component: root,
    redirect: '/frontDeskConfig/presentSetting',
    children: [
        {
            name: 'banner管理',
            path: 'bannerSetting',
            component: container,
            props:{
                level: 2,
                name: 'banner-setting',
                component: () => import(/* webpackChunkName: "banner-setting" */  'containers/page/front-desk-config/banner-setting')
            },
            meta: {
                level: 2
            },
            children:[
                {
                    name: '添加广告位',
                    path: 'bannerSettingEdit',
                    component: () => import(/* webpackChunkName: "banner-setting-edit" */  'containers/page/front-desk-config/banner-setting-edit'),
                },
                {
                    name: '上传图片',
                    path: 'bannerSettingUploadImage',
                    component: () => import(/* webpackChunkName: "banner-setting-upload-image" */  'containers/page/front-desk-config/banner-setting-upload-image'),
                }
            ]
        },
        {
            name: '活动图管理',
            path: 'activityImage',
            component: container,
            props:{
                level: 2,
                name: 'activity-image',
                component: () => import(/* webpackChunkName: "activity-image" */  'containers/page/front-desk-config/activity-image')
            },
            meta: {
                level: 2
            },
            children:[
                {
                    name: '添加banner',
                    path: 'activityImageEdit',
                    component: () => import(/* webpackChunkName: "activity-image-edit" */  'containers/page/front-desk-config/activity-image-edit'),
                }
            ]
        },
        {
            name: '首页推荐位管理',
            path: 'homeRecommend',
            component: container,
            props:{
                level: 2,
                name: 'home-recommend',
                component: () => import(/* webpackChunkName: "home-recommend" */  'containers/page/front-desk-config/home-recommend')
            },
            meta: {
                level: 2
            },
            children:[
                {
                    name: '编辑推荐位',
                    path: 'homeRecommendEdit',
                    component: () => import(/* webpackChunkName: "home-recommend-edit" */  'containers/page/front-desk-config/home-recommend-edit'),
                }
            ]
        },
        {
            name: '专题管理',
            path: 'special',
            component: container,
            props:{
                level: 2,
                name: 'special',
                component: () => import(/* webpackChunkName: "front-desk-config/special" */  'containers/page/front-desk-config/special')
            },
            meta: {
                level: 2
            },
            children:[
                {
                    name: '编辑专题',
                    path: 'specialEdit',
                    component: () => import(/* webpackChunkName: "special-edit" */  'containers/page/front-desk-config/special-edit'),
                }
            ]
        },
        {
            name: '礼物设置',
            path: 'presentSetting',
            component: container,
            props:{
                level: 2,
                name: 'present-setting',
                component: () => import(/* webpackChunkName: "present-setting" */  'containers/page/front-desk-config/present-setting')
            },
            meta: {
                level: 2
            },
            children:[
                {
                    name: 'present-setting-edit',
                    path: 'presentSettingEdit',
                    component: () => import(/* webpackChunkName: "present-setting-edit" */  'containers/page/front-desk-config/present-setting-edit'),
                }
            ]
        },
        {
            name: '妙银套餐管理',
            path: 'paySetMeaSetting',
            component: container,
            props:{
                level: 2,
                name: 'pay-set-mea-setting',
                component: () => import(/* webpackChunkName: "pay-set-mea-setting" */  'containers/page/front-desk-config/pay-set-mea-setting')
            },
            children:[
                {
                    name: '编辑套餐',
                    path: 'paySetMeaSettingEdit',
                    component: () => import(/* webpackChunkName: "pay-set-mea-setting-edit" */  'containers/page/front-desk-config/pay-set-mea-setting-edit'),
                }
            ]
        },
        {
            name: '会员套餐管理',
            path: 'memberSetMeaSetting',
            component: container,
            props:{
                level: 2,
                name: 'member-set-mea-setting',
                component: () => import(/* webpackChunkName: "member-set-mea-setting" */  'containers/page/front-desk-config/member-set-mea-setting')
            },
            children:[
                {
                    name: 'member-set-mea-setting-edit',
                    path: 'memberSetMeaSettingEdit',
                    component: () => import(/* webpackChunkName: "member-set-mea-setting-edit" */  'containers/page/front-desk-config/member-set-mea-setting-edit'),
                }
            ]
        },
        {
            name: '热门搜索关键词管理',
            path: 'keywordSetting',
            component: () => import(/* webpackChunkName: "keyword-setting" */  'containers/page/front-desk-config/keyword-setting')
        },
        {
            name: '屏蔽词汇管理',
            path: 'vocabularyShieldSetting',
            component: () => import(/* webpackChunkName: "vocabulary-shield-setting" */  'containers/page/front-desk-config/vocabulary-shield-setting')
        },
        {
            name: '内容push',
            path: 'contentPush',
            component: container,
            props:{
                level: 2,
                name: 'content-push',
                component: () => import(/* webpackChunkName: "content-push" */  'containers/page/front-desk-config/content-push')
            },
            meta: {
                level: 2
            },
            children:[
                {
                    name: '新建消息',
                    path: 'contentPushEdit',
                    component: () => import(/* webpackChunkName: "content-push-edit" */  'containers/page/front-desk-config/content-push-edit'),
                }
            ]
        }
    ]
}
const root = () => import(/* webpackChunkName: "home" */  'containers/home');
const container = () => import(/* webpackChunkName: "container" */  'containers/container');
export default {
    name: '直播管理 ',
    path: '/liveSetting',
    iconClass: 'el-icon-upload',
    redirect: '/liveSetting/liveSettingIndex',
    component: root,
    children: [
        {
            name: '直播场次',
            path: 'liveSettingIndex',
            component: container,
            props:{
                level: 2,
                name: 'live-setting-index',
                component:() => import(/* webpackChunkName: "live-setting-index" */  'containers/page/live-setting/live-setting-index')
            },
            meta: {
                ctrl: ['edit','delete','check']
            },
            children: [
                {
                    name: '添加直播间',
                    path: 'liveSettingIndexAdd',
                    component: () => import(/* webpackChunkName: "live-setting-index-edit" */  'containers/page/live-setting/live-setting-index-edit'),
                    meta: {
                        isDisabled: false
                    }
                },
                {
                    name: '查看直播间',
                    path: 'liveSettingIndexCheck/:liveId',
                    component: () => import(/* webpackChunkName: "live-setting-index-edit" */  'containers/page/live-setting/live-setting-index-edit'),
                    meta: {
                        isDisabled: true
                    }
                },
                {
                    name: '编辑直播间',
                    path: 'liveSettingIndexEdit/:liveId/:status',
                    component: () => import(/* webpackChunkName: "live-setting-index-edit" */  'containers/page/live-setting/live-setting-index-edit'),
                    meta: {
                        isDisabled: false
                    }
                },
                {
                    name: '上传预告片',
                    path: 'uploadPrevueEdit',
                    component: () => import(/* webpackChunkName: "upload-playback-data-edit" */  'containers/page/live-setting/upload-playback-data-edit'),
                },
                {
                    name: '上传回放',
                    path: 'uploadPlaybackDataEdit',
                    component: () => import(/* webpackChunkName: "upload-playback-data-edit" */  'containers/page/live-setting/upload-playback-data-edit'),
                }
            ]
        },
        {
            name: '直播栏目管理',
            path: 'liveProgramaSetting',
            component: container,
            props:{
                level: 2,
                name: 'live-programa-setting',
                component:() => import(/* webpackChunkName: "live-programa-setting" */  'containers/page/live-setting/live-programa-setting')
            },
            meta: {

            },
            children:[
                {
                    name: '添加直播栏目',
                    path: 'liveProgramaSettingEdit',
                    component: () => import(/* webpackChunkName: "live-programa-setting-edit" */  'containers/page/live-setting/live-programa-setting-edit'),
                    meta: {
                        isDisabled: false
                    }
                },
                {
                    name: '查看直播栏目',
                    path: 'liveProgramaSettingEdit/:liveId',
                    component: () => import(/* webpackChunkName: "live-programa-setting-edit" */  'containers/page/live-setting/live-programa-setting-edit'),
                    meta: {
                        isDisabled: true
                    }
                },
                {
                    name: '编辑直播栏目',
                    path: 'liveProgramaSettingEdit/:liveId',
                    component: () => import(/* webpackChunkName: "live-programa-setting-edit" */  'containers/page/live-setting/live-programa-setting-edit'),
                    meta: {
                        isDisabled: false
                    }
                }
            ]
        },
        {
            name: '直播日程表',
            path: 'liveSchedule',
            component: () => import(/* webpackChunkName: "live-schedule" */  'containers/page/live-setting/live-schedule')
        },
        // {
        //     name: '预告片上传',
        //     path: 'uploadPrevue',
        //     component: container,
        //     props:{
        //         name: 'upload-prevue',
        //         component: () => import(/* webpackChunkName: "upload-prevue" */  'containers/page/live-setting/upload-prevue')
        //     },
        //     meta: {
        //         level: 2
        //     },
        //     children:[{
        //         name: '上传预告片',
        //         path: 'uploadPrevueEdit',
        //         component: () => import(/* webpackChunkName: "upload-prevue-edit" */  'containers/page/live-setting/upload-prevue-edit'),
        //     }]
        // },
        // {
        //     name: '回放上传',
        //     path: 'uploadPlaybackData',
        //     component: container,
        //     props:{
        //         name: 'upload-playback-data',
        //         component: () => import(/* webpackChunkName: "upload-playback-data" */  'containers/page/live-setting/upload-playback-data')
        //     },
        //     meta: {
        //         level: 2
        //     },
        //     children:[{
        //         name: '上传回放',
        //         path: 'uploadPlaybackDataEdit',
        //         component: () => import(/* webpackChunkName: "upload-playback-data-edit" */  'containers/page/live-setting/upload-playback-data-edit'),
        //     }]
        // }
    ]
}